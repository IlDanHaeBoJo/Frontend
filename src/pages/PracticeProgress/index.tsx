import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./style";
import { usePractice } from "../../store/PracticeContext";

// --- 타입 정의 ---
interface ChatMessage {
  sender: "나" | "가상 환자";
  text: string;
}

const PracticeProgress = () => {
  const navigate = useNavigate();
  const {
    websocket,
    disconnect,
    isScenarioConfirmed,
    selectedScenario,
    statusMessage: contextStatusMessage,
  } = usePractice();

  // --- 상태 관리 ---
  const [isRecording, setIsRecording] = useState(false);
  const [statusMessage, setStatusMessage] = useState("⚪ 실습 준비");
  const [timer, setTimer] = useState("00:00");
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);

  // --- Ref 관리 ---
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // --- Effects ---
  useEffect(() => {
    // Redirect if not properly navigated
    if (!isScenarioConfirmed) {
      alert("잘못된 접근입니다. 시나리오 선택 페이지로 돌아갑니다.");
      navigate("/practice");
      return;
    }

    // Set initial status message from context
    setStatusMessage(contextStatusMessage);

    const ws = websocket.current;
    if (ws) {
      // Override onmessage to handle in-progress messages
      ws.onmessage = (event) => handleServerMessage(event.data);
    }

    // Cleanup on component unmount
    return () => {
      console.log("PracticeProgress useEffect cleanup running.");
      if (ws) {
        // Restore original onmessage or clear it if necessary
        // For simplicity, we assume leaving this page means the practice is over.
      }
      stopMic();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isScenarioConfirmed, navigate, websocket]);

  const handleServerMessage = (data: any) => {
    try {
      const response = JSON.parse(data);
      console.log("In-progress response:", response);

      switch (response.type) {
        case "listening":
          setStatusMessage("👂 환자가 듣고 있습니다...");
          break;
        case "processing":
          setStatusMessage("🤔 환자가 생각 중입니다...");
          break;
        case "voice_response":
          if (response.user_text)
            setChatHistory((p) => [
              ...p,
              { sender: "나", text: response.user_text },
            ]);
          if (response.ai_text)
            setChatHistory((p) => [
              ...p,
              { sender: "가상 환자", text: response.ai_text },
            ]);
          if (response.audio_url) playAudio(response.audio_url);
          break;
        case "no_speech":
          setStatusMessage("🔇 음성이 감지되지 않았습니다.");
          break;
        case "error":
          setStatusMessage(`❌ 서버 오류: ${response.message}`);
          break;
        // scenario_selected is handled by the context now
        default:
          console.log("Received unhandled message type:", response.type);
          break;
      }
    } catch (e) {
      console.warn("Received non-JSON message:", data);
    }
  };

  // --- Mic & Timer Logic ---
  const startMic = async () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setStatusMessage("❌ 이 브라우저에서는 마이크를 지원하지 않습니다.");
      return;
    }
    try {
      setStatusMessage("🎤 마이크 권한 요청 중...");
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setupMediaRecorder(stream);
      mediaRecorder.current?.start(500);
      setIsRecording(true);
      setStatusMessage("🟢 대화 진행 중...");
      startTimer();
      setChatHistory([]);
    } catch (err) {
      setStatusMessage("❌ 마이크 접근이 거부되었습니다.");
      console.error("Microphone access error:", err);
    }
  };

  const stopMic = () => {
    if (mediaRecorder.current?.state === "recording") {
      mediaRecorder.current.stop();
    }
    setIsRecording(false);
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
  };

  const setupMediaRecorder = (stream: MediaStream) => {
    const options = { mimeType: "audio/webm;codecs=opus" };
    if (!MediaRecorder.isTypeSupported(options.mimeType)) {
      console.warn(
        `MIME type ${options.mimeType} not supported. Falling back to default.`
      );
      mediaRecorder.current = new MediaRecorder(stream);
    } else {
      mediaRecorder.current = new MediaRecorder(stream, options);
    }

    console.log(
      "MediaRecorder setup complete with MIME type:",
      mediaRecorder.current.mimeType
    );

    mediaRecorder.current.ondataavailable = (event) => {
      console.log(`Data available: ${event.data.size} bytes`);
      if (
        event.data.size > 0 &&
        websocket.current?.readyState === WebSocket.OPEN
      ) {
        console.log("Sending audio data to WebSocket.");
        websocket.current.send(event.data);
      } else if (websocket.current?.readyState !== WebSocket.OPEN) {
        console.warn(
          "WebSocket is not open. Current state:",
          websocket.current?.readyState
        );
      }
    };

    mediaRecorder.current.onstart = () => {
      console.log("MediaRecorder started.");
    };

    mediaRecorder.current.onstop = () => {
      console.log("MediaRecorder stopped.");
      setStatusMessage("▶️ 대기 중");
    };

    mediaRecorder.current.onerror = (event) => {
      console.error("MediaRecorder error:", event);
    };
  };

  const playAudio = (audioUrl: string) => {
    const baseUrl = process.env.REACT_APP_API_URL || "http://localhost:8000";
    const fullUrl = `${baseUrl}${audioUrl}`;
    const audio = new Audio(fullUrl);
    audio.play();
    audio.onplay = () => setStatusMessage("🔊 환자 음성 재생 중...");
    audio.onended = () => setStatusMessage("🟢 대화 진행 중...");
  };

  const startTimer = () => {
    let seconds = 0;
    timerIntervalRef.current = setInterval(() => {
      seconds++;
      const mins = Math.floor(seconds / 60)
        .toString()
        .padStart(2, "0");
      const secs = (seconds % 60).toString().padStart(2, "0");
      setTimer(`${mins}:${secs}`);
    }, 1000);
  };

  const handleEndPractice = () => {
    stopMic();
    disconnect(); // This will trigger the onclose event in context and reset state
    navigate("/practice");
  };

  // --- Render Logic ---
  const renderControls = () => {
    if (!isScenarioConfirmed) {
      return <S.Button disabled>로딩 중...</S.Button>;
    }
    return (
      <>
        <S.Button onClick={isRecording ? stopMic : startMic}>
          {isRecording ? "녹음 중지" : "실습 시작"}
        </S.Button>
        <S.Button onClick={handleEndPractice}>실습 종료</S.Button>
      </>
    );
  };

  return (
    <S.Container>
      <S.ControlSection>
        <S.Timer>{timer}</S.Timer>
        {renderControls()}
        <S.SubmitButton>✅ 제출</S.SubmitButton>
      </S.ControlSection>
      <S.PracticeArea>
        <S.PatientVideoArea>
          <S.PatientAvatar>👨‍💼</S.PatientAvatar>
          <S.PatientName>
            {selectedScenario?.name || "환자 정보 로딩 중..."}
          </S.PatientName>
          <S.StatusBadge>{statusMessage}</S.StatusBadge>
        </S.PatientVideoArea>
        <S.InfoPanel>
          <S.InfoCard>
            <S.CardHeader>
              <span>📋</span>
              <span>환자 정보</span>
            </S.CardHeader>
            <S.InfoGrid>
              <p>👤 이름: {selectedScenario?.name || "정보 없음"}</p>
            </S.InfoGrid>
          </S.InfoCard>
          <S.NotesCard>
            <S.CardHeader>
              <span>✍️</span>
              <span>대화 기록</span>
            </S.CardHeader>
            <S.NotesArea>
              {chatHistory.length === 0 ? (
                <p>실습을 시작하면 대화 내용이 여기에 표시됩니다.</p>
              ) : (
                chatHistory.map((chat, index) => (
                  <div key={index}>
                    <strong>{chat.sender}:</strong> {chat.text}
                  </div>
                ))
              )}
            </S.NotesArea>
          </S.NotesCard>
        </S.InfoPanel>
      </S.PracticeArea>
    </S.Container>
  );
};

export default PracticeProgress;
