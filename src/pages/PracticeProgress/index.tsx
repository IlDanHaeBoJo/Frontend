import React, { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./style";
import { ServerMessage } from "../../types/practice";
import elderlyMen from "../../assets/elderly_men.png";
import { useUser } from "../../store/UserContext";

const PracticeProgress = () => {
  // 사용자 정보
  const { user } = useUser();
  
  // 상태 관리
  const [isConnected, setIsConnected] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPracticeStarted, setIsPracticeStarted] = useState(false);
  const [isTTSPlaying, setIsTTSPlaying] = useState(false);
  type ActivityStatus = "listening" | "processing" | "talking" | "idle";
  const [activityStatus, setActivityStatus] = useState<ActivityStatus>("idle");
  const [timer, setTimer] = useState(0);
  const [statusMessage, setStatusMessage] = useState("대기 중");
  const [patientName, setPatientName] = useState("환자");
  const [conversation, setConversation] = useState<
    { speaker_role: "doctor" | "patient"; text: string }[]
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

    setActivityStatus("talking");
    setIsPlaying(true);
    setIsTTSPlaying(true);
    
    if (audioSource.current && audioWorkletNode.current) {
      try {
        audioSource.current.disconnect(audioWorkletNode.current);
        console.log("🎤 마이크 입력 일시 차단 (TTS 재생 중)");
      } catch (error) {
        console.error("오디오 연결 해제 오류:", error);
      }
    }
    
    if (audioWorkletNode.current) {
      audioWorkletNode.current.port.postMessage({
        command: "setTTSState",
        isPlaying: true
      });
    }

    const audioData = audioQueue.current.shift();

    if (audioData && audioPlayer.current) {
      try {
        console.log(`🔊 TTS Base64 오디오 수신: ${audioData.length} 문자`);
        
        const binaryString = atob(audioData);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }
        const audioBlob = new Blob([bytes], { type: 'audio/mpeg' });
        
        const objectUrl = URL.createObjectURL(audioBlob);
        audioPlayer.current.src = objectUrl;
        
        console.log("🔊 TTS 음성 재생 시작 (메모리 버퍼)");
        await audioPlayer.current.play();
        
        audioPlayer.current.onended = async () => {
          console.log("✅ TTS 음성 재생 완료");
          URL.revokeObjectURL(objectUrl);
          
          await new Promise(resolve => setTimeout(resolve, 500));
          
          if (audioSource.current && audioWorkletNode.current) {
            try {
              audioSource.current.connect(audioWorkletNode.current);
              console.log("🎤 마이크 입력 재개");
            } catch (error) {
              console.error("오디오 연결 재개 오류:", error);
            }
          }
          
          if (audioWorkletNode.current) {
            audioWorkletNode.current.port.postMessage({
              command: "setTTSState",
              isPlaying: false
            });
          }
          
          setIsTTSPlaying(false);
          setIsPlaying(false);
          setActivityStatus("listening");
        };
      } catch (error) {
        console.error("TTS 재생 오류:", error);
        setIsTTSPlaying(false);
        setIsPlaying(false);
        setActivityStatus("listening");
      }
    } else {
      setIsTTSPlaying(false);
      setIsPlaying(false);
      setActivityStatus("listening");
    }
  }, [isPlaying]);

  // 웹소켓 연결 및 해제
  const connectWebSocket = useCallback(() => {
    const userId = user?.id;
    
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
      case "listening":
      case "no_speech":
        setActivityStatus("listening");
        break;
      case "processing":
        setActivityStatus("processing");
        break;
      case "session_started":
        setPatientName(message.scenario_name || "환자");
        break;
      case "voice_response":
        if (message.user_text) {
          setConversation((prev) => [
            ...prev,
            { speaker_role: "doctor", text: message.user_text! },
          ]);
        }
        if (message.ai_text) {
          setConversation((prev) => [
            ...prev,
            { speaker_role: "patient", text: message.ai_text! },
          ]);
        }
        if (message.tts_audio_base64) {
          audioQueue.current.push(message.tts_audio_base64);
          processAudioQueue();
        }
        break;
      case "conversation_ended":
        if (audioSource.current && audioWorkletNode.current) {
          audioSource.current.disconnect(audioWorkletNode.current);
        }
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
  const handleTogglePractice = async () => {
    if (!isPracticeStarted) {
      await initAudio();
      if (audioSource.current && audioWorkletNode.current) {
        audioSource.current.connect(audioWorkletNode.current);
      }
      setActivityStatus("listening");
      setIsPracticeStarted(true);
      timerInterval.current = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerInterval.current) {
        clearInterval(timerInterval.current);
      }
      if (audioSource.current && audioWorkletNode.current) {
        audioSource.current.disconnect(audioWorkletNode.current);
      }
      setActivityStatus("idle");
      setIsPracticeStarted(false);
    }
  };

  const handleSubmit = () => {
    if (timerInterval.current) {
      clearInterval(timerInterval.current);
    }
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
    if (!isPlaying && isPracticeStarted) {
      if (audioSource.current && audioWorkletNode.current) {
        audioSource.current.connect(audioWorkletNode.current);
      }
    }
  }, [isPlaying, isPracticeStarted]);

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
        <S.Button onClick={handleTogglePractice} active={isPracticeStarted}>
          {isPracticeStarted ? "실습 중단" : "실습 시작"}
        </S.Button>
        <S.SubmitButton onClick={handleSubmit}>✅ 제출</S.SubmitButton>
      </S.ControlSection>
      <S.PracticeArea>
        <S.PatientVideoArea>
          <S.PatientAvatar>
            <img
              src={elderlyMen}
              alt="Patient"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </S.PatientAvatar>
          <S.PatientName>{patientName}</S.PatientName>
          <S.StatusBadge>
            {!isConnected
              ? "🔴 연결 끊김"
              : !isPracticeStarted
              ? "🟡 대기 중"
              : activityStatus === "listening"
              ? "🟢 듣는 중"
              : activityStatus === "processing"
              ? "🔵 분석 중"
              : "🗣️ 말하는 중"}
          </S.StatusBadge>
        </S.PatientVideoArea>
        <S.InfoPanel>
          <S.MemoCard>
            <S.CardHeader>
              <span>✍️</span>
              <span>메모장</span>
            </S.CardHeader>
            <S.MemoArea
              height="200px"
              placeholder="이곳에 메모를 작성하세요."
            />
          </S.MemoCard>
          {/* 확인용 대화내용 로그 추후에 삭제 */}
          {/* <S.MemoCard>
            <S.CardHeader>
              <span>✍️</span>
              <span>대화 내용 -삭제예정</span>
            </S.CardHeader>
            <S.NotesArea>
              {conversation.map((entry, index) => (
                <div key={index}>
                  <strong>
                    {entry.speaker_role === "doctor" ? "나: " : "환자: "}
                  </strong>
                  {entry.text}
                </div>
              ))}
            </S.NotesArea>
          </S.MemoCard> */}
        </S.InfoPanel>
      </S.PracticeArea>
    </S.Container>
  );
};

export default PracticeProgress;
