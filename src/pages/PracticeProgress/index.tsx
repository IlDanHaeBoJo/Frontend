import React, { useState, useRef, useEffect, useCallback } from "react";
import * as S from "./style";

// 오디오 처리 관련 타입 정의
interface ServerMessage {
  type: string;
  message?: string;
  user_text?: string;
  ai_text?: string;
  audio_url?: string;
  avatar_action?: string;
  conversation_ended?: boolean;
  scenarios?: Record<string, { name: string; description: string }>;
  scenario_name?: string;
}

const PracticeProgress = () => {
  // 상태 관리
  const [isConnected, setIsConnected] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [statusMessage, setStatusMessage] = useState("대기 중");
  const [patientName, setPatientName] = useState("환자");
  const [conversation, setConversation] = useState<
    { speaker: "user" | "ai"; text: string }[]
  >([]);
  const [scenarios, setScenarios] = useState<ServerMessage["scenarios"]>({});
  const [selectedScenario, setSelectedScenario] = useState("");

  // Ref 관리
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
        const response = await fetch(`http://localhost:8000${correctedUrl}`);
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
    const wsUrl = `ws://localhost:8000/ws/${userId}`;

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
      case "scenario_selection":
        setScenarios(message.scenarios || {});
        break;
      case "scenario_selected":
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

  // 시나리오 선택 핸들러
  const handleSelectScenario = (scenarioId: string) => {
    if (websocket.current?.readyState === WebSocket.OPEN) {
      setSelectedScenario(scenarioId);
      const command = { type: "select_scenario", scenario_id: scenarioId };
      websocket.current.send(JSON.stringify(command));
    }
  };

  // 컴포넌트 마운트/언마운트 시 효과
  useEffect(() => {
    connectWebSocket();
    audioPlayer.current = new Audio();

    return () => {
      websocket.current?.close();
      audioStream.current?.getTracks().forEach((track) => track.stop());
      audioContext.current?.close();
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

  return (
    <S.Container>
      <S.ControlSection>
        <S.Timer>00:00</S.Timer>
        <S.Button onClick={handleToggleRecording} disabled={!isConnected}>
          {isRecording ? "실습 중지" : "실습 시작"}
        </S.Button>
        <S.Button disabled={!isRecording}>실습 종료</S.Button>
        <S.SubmitButton>✅ 제출</S.SubmitButton>
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
          <S.InfoCard>
            <S.CardHeader>
              <span>📋</span>
              <span>시나리오 선택</span>
            </S.CardHeader>
            <S.InfoGrid>
              {Object.entries(scenarios || {}).map(([id, { name }]) => (
                <S.Button
                  key={id}
                  onClick={() => handleSelectScenario(id)}
                  disabled={isRecording || selectedScenario === id}
                >
                  {name}
                </S.Button>
              ))}
            </S.InfoGrid>
          </S.InfoCard>
          <S.NotesCard>
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
          </S.NotesCard>
        </S.InfoPanel>
      </S.PracticeArea>
    </S.Container>
  );
};

export default PracticeProgress;
