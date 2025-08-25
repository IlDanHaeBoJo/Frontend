import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./style";

const Practice = () => {
  const navigate = useNavigate();
  const [selectedScenario, setSelectedScenario] = useState<number | "">("");

  const scenarioList = [
    { scenario_id: 1, scenario_name: "시나리오 1: 기억력 저하" },
    { scenario_id: 2, scenario_name: "시나리오 2: 복통" },
  ];

  const handleStartPractice = () => {
    if (selectedScenario) {
      navigate("/practice-progress", {
        state: { scenarioId: selectedScenario },
      });
    } else {
      alert("분야를 선택하세요.");
    }
  };

  return (
    <S.Container>
      <S.OptionBox>
        <S.Title>분야 선택 실습</S.Title>
        <S.Description>
          원하는 특정 분야를 선택하여
          <br />
          실습을 진행합니다.
        </S.Description>
        <S.Select
          onChange={(e) =>
            setSelectedScenario(e.target.value ? parseInt(e.target.value) : "")
          }
        >
          <option value="">분야를 선택하세요</option>
          {scenarioList.map((scenario) => (
            <option key={scenario.scenario_id} value={scenario.scenario_id}>
              {scenario.scenario_name}
            </option>
          ))}
        </S.Select>
        <S.StartButton onClick={handleStartPractice}>실습 시작</S.StartButton>
      </S.OptionBox>
      <S.OptionBox>
        <S.Title>랜덤 상황 실습</S.Title>
        <S.Description>
          분야가 랜덤으로 선택되어
          <br />
          실제 상황과 유사한 실습을 진행합니다.
        </S.Description>
        <S.Dropdown isHidden={true}>
          <span>분야를 선택하세요</span>
          <span>▼</span>
        </S.Dropdown>
        <S.StartButton onClick={() => navigate("/practice-progress")}>
          실습 시작
        </S.StartButton>
      </S.OptionBox>
    </S.Container>
  );
};

export default Practice;
