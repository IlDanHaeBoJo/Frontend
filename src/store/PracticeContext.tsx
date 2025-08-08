import React, {
  createContext,
  useContext,
  useState,
  useRef,
  ReactNode,
  useCallback,
} from "react";
import { useUser } from "./UserContext";

// --- 타입 정의 ---
interface Scenarios {
  [key: string]: string;
}

interface Scenario {
  id: string;
  name: string;
}

interface PracticeContextType {
  isConnected: boolean;
  isScenarioConfirmed: boolean;
  scenarios: Scenarios;
  selectedScenario: Scenario | null;
  statusMessage: string;
  connect: () => void;
  disconnect: () => void;
  selectScenario: (scenarioId: string) => void;
  websocket: React.RefObject<WebSocket | null>;
}

const PracticeContext = createContext<PracticeContextType | undefined>(
  undefined
);

export const usePractice = () => {
  const context = useContext(PracticeContext);
  if (!context) {
    throw new Error("usePractice must be used within a PracticeProvider");
  }
  return context;
};

interface PracticeProviderProps {
  children: ReactNode;
}

export const PracticeProvider = ({ children }: PracticeProviderProps) => {
  const { user } = useUser();
  const [isConnected, setIsConnected] = useState(false);
  const [scenarios, setScenarios] = useState<Scenarios>({});
  const [statusMessage, setStatusMessage] = useState("⚪ 실습 준비");
  const [isScenarioConfirmed, setIsScenarioConfirmed] = useState(false);
  const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(
    null
  );
  const websocket = useRef<WebSocket | null>(null);

  const WEBSOCKET_URL = `${process.env.REACT_APP_WEBSOCKET_URL}/ws/${
    user?.id || "test_user"
  }`;

  const handleServerMessage = useCallback((data: any) => {
    try {
      const response = JSON.parse(data);
      console.log("Server response:", response);
      switch (response.type) {
        case "scenario_selection":
          setScenarios(response.scenarios || {});
          setStatusMessage(response.message || "시나리오를 선택해주세요.");
          break;
        case "scenario_selected":
          setIsScenarioConfirmed(true);
          setStatusMessage(
            response.message || "시나리오 선택 완료! 실습을 시작하세요."
          );
          break;
        // Other cases will be handled in the PracticeProgress component
        // by listening to the websocket instance directly.
      }
    } catch (e) {
      console.warn("Received non-JSON message:", data);
    }
  }, []);

  const connect = useCallback(() => {
    if (websocket.current || !user?.id) return;

    const ws = new WebSocket(WEBSOCKET_URL);
    websocket.current = ws;

    ws.onopen = () => {
      console.log("WebSocket connected");
      setIsConnected(true);
      setStatusMessage("🔗 서버 연결 성공. 시나리오를 선택하세요.");
    };

    ws.onmessage = (event) => handleServerMessage(event.data);

    ws.onerror = (error) => {
      console.error("WebSocket Error:", error);
      setStatusMessage("❌ 서버 연결 오류 발생");
      setIsConnected(false);
    };

    ws.onclose = (event) => {
      console.log(
        `WebSocket disconnected: Code=${event.code}, Reason=${event.reason}`
      );
      websocket.current = null;
      setIsConnected(false);
      setIsScenarioConfirmed(false);
      setScenarios({});
      setStatusMessage("⚪ 실습 준비");
    };
  }, [WEBSOCKET_URL, user?.id, handleServerMessage]);

  const disconnect = () => {
    if (websocket.current) {
      websocket.current.close();
    }
  };

  const selectScenario = (scenarioId: string) => {
    if (websocket.current && websocket.current.readyState === WebSocket.OPEN) {
      const scenarioName = scenarios[scenarioId];
      setSelectedScenario({ id: scenarioId, name: scenarioName });

      const command = {
        type: "select_scenario",
        scenario_id: scenarioId,
      };
      websocket.current.send(JSON.stringify(command));
    }
  };

  const value = {
    isConnected,
    isScenarioConfirmed,
    scenarios,
    selectedScenario,
    statusMessage,
    connect,
    disconnect,
    selectScenario,
    websocket,
  };

  return (
    <PracticeContext.Provider value={value}>
      {children}
    </PracticeContext.Provider>
  );
};
