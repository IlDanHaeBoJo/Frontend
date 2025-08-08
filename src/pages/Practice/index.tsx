import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./style";
import { usePractice } from "../../store/PracticeContext";

const Practice = () => {
  const navigate = useNavigate();
  const {
    connect,
    disconnect,
    scenarios,
    selectScenario,
    isConnected,
    isScenarioConfirmed,
    statusMessage,
  } = usePractice();
  const [selectedScenario, setSelectedScenario] = useState("");

  // Connect to WebSocket on mount
  useEffect(() => {
    connect();
    return () => {
      // Optional: disconnect if leaving the page before starting
      // disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // When a scenario is selected and confirmed by the server, navigate
  useEffect(() => {
    if (isScenarioConfirmed) {
      navigate("/practice-progress");
    }
  }, [isScenarioConfirmed, navigate]);

  // Update local state when scenarios are fetched
  useEffect(() => {
    if (scenarios && Object.keys(scenarios).length > 0 && !selectedScenario) {
      setSelectedScenario(Object.keys(scenarios)[0]);
    }
  }, [scenarios, selectedScenario]);

  const handleStartPractice = () => {
    if (selectedScenario) {
      selectScenario(selectedScenario);
    } else {
      alert("실습할 시나리오를 선택해주세요.");
    }
  };

  const handleStartRandomPractice = () => {
    const scenarioKeys = Object.keys(scenarios);
    if (scenarioKeys.length > 0) {
      const randomScenarioId =
        scenarioKeys[Math.floor(Math.random() * scenarioKeys.length)];
      selectScenario(randomScenarioId);
    } else {
      alert("불러올 시나리오가 없습니다.");
    }
  };

  return (
    <S.Container>
      <S.OptionBox>
        <S.Title>분야 선택 실습</S.Title>
        <S.Description>
          {isConnected
            ? "원하는 특정 분야를 선택하여 실습을 진행합니다."
            : "서버에 연결 중입니다..."}
          <br />
        </S.Description>
        <S.Dropdown
          as="select"
          value={selectedScenario}
          onChange={(e) => setSelectedScenario(e.target.value)}
          disabled={!isConnected || Object.keys(scenarios).length === 0}
        >
          <option value="" disabled>
            {isConnected ? "분야를 선택하세요" : "연결 중..."}
          </option>
          {Object.entries(scenarios).map(([id, name]) => (
            <option key={id} value={id}>
              {name}
            </option>
          ))}
        </S.Dropdown>
        <S.StartButton
          onClick={handleStartPractice}
          disabled={!selectedScenario || !isConnected}
        >
          실습 시작
        </S.StartButton>
      </S.OptionBox>
      <S.OptionBox>
        <S.Title>랜덤 상황 실습</S.Title>
        <S.Description>
          분야가 랜덤으로 선택되어
          <br />
          실제 상황과 유사한 실습을 진행합니다.
        </S.Description>
        <S.StartButton
          onClick={handleStartRandomPractice}
          disabled={!isConnected || Object.keys(scenarios).length === 0}
        >
          실습 시작
        </S.StartButton>
      </S.OptionBox>
    </S.Container>
  );
};

export default Practice;
