import React, { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./style";
import { ServerMessage } from "../../types/practice";

const PracticeProgress = () => {
  // 상태 관리
  const [isConnected, setIsConnected] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPracticeStarted, setIsPracticeStarted] = useState(false);
  const [timer, setTimer] = useState(0);
  const [statusMessage, setStatusMessage] = useState("대기 중");
  const [patientName, setPatientName] = useState("환자");
  const [conversation, setConversation] = useState<
    { speaker: "user" | "ai"; text: string }[]
  >([]);
  const navigate = useNavigate();

  // Ref 관리
  const timerInterval = useRef<NodeJS.Timeout | null>(null);
  const websocket = useRef<WebSocket | null>(null);
  const audioContext = useRef<AudioContext | null>(null);
  const audioStream = useRef<MediaStream | null>(null);
  const audioSource = useRef<MediaStreamAudioSourceNode | null>(null);
  const audioWorkletNode = useRef<AudioWorkletNode | null>(null);
  const audioPlayer = useRef<HTMLAudioElement | null>(null);
  const audioQueue = useRef<string[]>([]);

  const processAudioQueue = useCallback(async () => {
    if (isPlaying || audioQueue.current.length === 0) {
      return;
    }

    setIsPlaying(true);
    const audioUrl = audioQueue.current.shift();

    if (audioUrl && audioPlayer.current) {
      try {
        const correctedUrl = audioUrl.replace("/static/audio/", "/cache/tts/");
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}${correctedUrl}`
        );
        const audioBlob = await response.blob();
        const objectUrl = URL.createObjectURL(audioBlob);
        audioPlayer.current.src = objectUrl;
        audioPlayer.current.play();
        audioPlayer.current.onended = () => {
          URL.revokeObjectURL(objectUrl);
          setIsPlaying(false);
        };
      } catch (error) {
        console.error("Error fetching or playing audio:", error);
        setIsPlaying(false);
      }
    } else {
      setIsPlaying(false);
    }
  }, [isPlaying]);

  // 웹소켓 연결 및 해제
  const connectWebSocket = useCallback(() => {
    const userId = `user_${Date.now()}`; // 임시 사용자 ID
    const wsUrl = `${process.env.REACT_APP_WEBSOCKET_URL}/ws/${userId}`;

    if (websocket.current) {
      websocket.current.close();
    }

    const ws = new WebSocket(wsUrl);

    ws.onopen = () => {
      console.log("WebSocket connected");
      setIsConnected(true);
      setStatusMessage("서버에 연결되었습니다. 시나리오를 선택해주세요.");
    };

    ws.onmessage = (event) => {
      const message: ServerMessage = JSON.parse(event.data);
      console.log("Received message:", message);
      handleServerMessage(message);
    };

    ws.onclose = () => {
      console.log("WebSocket disconnected");
      setIsConnected(false);
      setIsRecording(false);
      setStatusMessage("연결이 끊어졌습니다. 다시 시도해주세요.");
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
      setStatusMessage("연결 오류가 발생했습니다.");
    };

    websocket.current = ws;
  }, []);

  // 서버 메시지 처리
  const handleServerMessage = (message: ServerMessage) => {
    setStatusMessage(message.message || statusMessage);

    switch (message.type) {
      case "session_started":
        setPatientName(message.scenario_name || "환자");
        break;
      case "voice_response":
        if (message.user_text) {
          setConversation((prev) => [
            ...prev,
            { speaker: "user", text: message.user_text! },
          ]);
        }
        if (message.ai_text) {
          setConversation((prev) => [
            ...prev,
            { speaker: "ai", text: message.ai_text! },
          ]);
        }
        if (message.audio_url) {
          setIsRecording(false); // TTS 수신 시 녹음 중단
          audioQueue.current.push(message.audio_url);
          processAudioQueue();
        }
        break;
      case "conversation_ended":
        setIsRecording(false);
        // 세션 종료 처리
        break;
    }
  };

  // 오디오 처리 초기화
  const initAudio = useCallback(async () => {
    try {
      if (!audioContext.current) {
        audioContext.current = new AudioContext({ sampleRate: 16000 });
        await audioContext.current.audioWorklet.addModule("/audioProcessor.js");
      }

      if (audioContext.current.state === "suspended") {
        await audioContext.current.resume();
      }

      if (!audioStream.current) {
        audioStream.current = await navigator.mediaDevices.getUserMedia({
          audio: {
            echoCancellation: true,
            noiseSuppression: true,
          },
        });
      }

      if (!audioSource.current) {
        audioSource.current = audioContext.current.createMediaStreamSource(
          audioStream.current
        );
      }

      if (!audioWorkletNode.current) {
        audioWorkletNode.current = new AudioWorkletNode(
          audioContext.current,
          "audio-processor"
        );

        audioWorkletNode.current.port.onmessage = (event) => {
          if (websocket.current?.readyState === WebSocket.OPEN) {
            websocket.current.send(event.data);
          }
        };
      }
    } catch (error) {
      console.error("Error initializing audio:", error);
      setStatusMessage("마이크를 사용할 수 없습니다.");
    }
  }, []);

  // 실습 시작/종료 핸들러
  const handleStartPractice = () => {
    setIsPracticeStarted(true);
    timerInterval.current = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 1000);
  };

  const handleToggleRecording = async () => {
    if (!isConnected) {
      connectWebSocket();
      return;
    }

    if (isPlaying) {
      setStatusMessage("환자가 말하는 중입니다...");
      return;
    }

    if (!isRecording) {
      await initAudio();
      setIsRecording(true);
    } else {
      setIsRecording(false);
    }
  };

  const handleSubmit = () => {
    if (timerInterval.current) {
      clearInterval(timerInterval.current);
    }
    setIsRecording(false);
    if (websocket.current) {
      websocket.current.close();
    }
    // 필요한 경우 오디오 컨텍스트 등 다른 리소스도 정리
    if (audioContext.current && audioContext.current.state !== "closed") {
      audioContext.current.close();
    }
    navigate("/result");
  };

  // 컴포넌트 마운트/언마운트 시 효과
  useEffect(() => {
    connectWebSocket();
    audioPlayer.current = new Audio();

    return () => {
      websocket.current?.close();
      audioStream.current?.getTracks().forEach((track) => track.stop());
      if (audioContext.current && audioContext.current.state !== "closed") {
        audioContext.current.close();
      }
    };
  }, [connectWebSocket]);

  // 녹음 상태 변경 시 효과
  useEffect(() => {
    if (isRecording && audioSource.current && audioWorkletNode.current) {
      audioSource.current.connect(audioWorkletNode.current);
    } else {
      audioSource.current?.disconnect();
    }
  }, [isRecording]);

  useEffect(() => {
    if (!isPlaying) {
      processAudioQueue();
    }
  }, [isPlaying, processAudioQueue]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <S.Container>
      <S.ControlSection>
        <S.Timer>{formatTime(timer)}</S.Timer>
        <S.Button onClick={handleStartPractice} disabled={isPracticeStarted}>
          실습 시작
        </S.Button>
        <S.Button
          onClick={handleToggleRecording}
          disabled={!isConnected || !isPracticeStarted}
        >
          {isRecording ? "대화 중지" : "대화 시작"}
        </S.Button>
        {/* 추후에 tts 출력이 끝나고 바로 마이크 입력을 받게 된다면 '실습 시작' 버튼 하나로 변경될 수 있음. */}
        <S.SubmitButton onClick={handleSubmit}>✅ 제출</S.SubmitButton>
      </S.ControlSection>
      <S.PracticeArea>
        <S.PatientVideoArea>
          <S.PatientAvatar>👨‍💼</S.PatientAvatar>
          <S.PatientName>{patientName}</S.PatientName>
          <S.StatusBadge>
            {isConnected
              ? isRecording
                ? "🟢 대화 중"
                : "🟡 대기 중"
              : "🔴 연결 끊김"}
          </S.StatusBadge>
        </S.PatientVideoArea>
        <S.InfoPanel>
          <S.MemoCard>
            <S.CardHeader>
              <span>📝</span>
              <span>메모장</span>
            </S.CardHeader>
            <S.MemoArea
              height="200px"
              placeholder="이곳에 메모를 작성하세요."
            />
          </S.MemoCard>
          <S.MemoCard>
            <S.CardHeader>
              <span>📜</span>
              <span>진찰 내역</span>
            </S.CardHeader>
            <S.MemoArea height="100px" placeholder="진찰 내역을 입력하세요." />
          </S.MemoCard>
          {/* 확인용 대화내용 로그 추후에 삭제 */}
          <S.MemoCard>
            <S.CardHeader>
              <span>✍️</span>
              <span>대화 내용</span>
            </S.CardHeader>
            <S.NotesArea>
              {conversation.map((entry, index) => (
                <div key={index}>
                  <strong>
                    {entry.speaker === "user" ? "나: " : "환자: "}
                  </strong>
                  {entry.text}
                </div>
              ))}
            </S.NotesArea>
          </S.MemoCard>
        </S.InfoPanel>
      </S.PracticeArea>
    </S.Container>
  );
};

export default PracticeProgress;
