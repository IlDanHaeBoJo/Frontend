import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./style";
import { getScenarioImage, getScenarioList } from "../../apis/scenario";
import { Scenario } from "../../types/scenario";

const Practice = () => {
  const navigate = useNavigate();
  const [selectedScenario, setSelectedScenario] = useState<number | "">("");
  const [scenarioList, setScenarioList] = useState<Scenario[]>([]);
  const [selectedScenarioImage, setSelectedScenarioImage] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  // 시나리오 목록 가져오기
  useEffect(() => {
    const fetchScenarioList = async () => {
      try {
        const scenarios = await getScenarioList();
        console.log("백엔드에서 받은 시나리오 데이터:", scenarios);
        
        // 데이터가 배열인지 확인하고, 배열이 아니면 기본값 사용
        if (Array.isArray(scenarios)) {
          setScenarioList(scenarios);
        } else {
          console.error("시나리오 데이터가 배열이 아닙니다:", scenarios);
          // 기본 데이터 사용
          setScenarioList([
            { scenario_id: 1, scenario_name: "시나리오 1: 기억력 저하", patient_image_url: "" },
            { scenario_id: 2, scenario_name: "시나리오 2: 복통", patient_image_url: "" },
          ]);
        }
      } catch (error) {
        console.error("시나리오 목록을 가져오는데 실패했습니다:", error);
        // 에러 시 기본 데이터 사용
        setScenarioList([
          { scenario_id: 1, scenario_name: "시나리오 1: 기억력 저하", patient_image_url: "" },
          { scenario_id: 2, scenario_name: "시나리오 2: 복통", patient_image_url: "" },
        ]);
      }
    };

    fetchScenarioList();
  }, []);

  // 시나리오 선택 시 - 이미지는 실습 시작할 때만 로드
  const handleScenarioChange = async (scenarioId: number) => {
    setSelectedScenario(scenarioId);
    // 이미지 로딩 제거 - 실습 시작할 때만 로드
  };

  const handleStartPractice = async () => {
    if (selectedScenario) {
      try {
        // 실습 시작할 때만 환자 이미지 URL 가져오기
        const scenarioData = await getScenarioImage(selectedScenario);
        navigate("/practice-progress", {
          state: { 
            scenarioId: selectedScenario,
            patientImageUrl: scenarioData.patient_image_url 
          },
        });
      } catch (error) {
        console.error("환자 이미지를 가져오는데 실패했습니다:", error);
        // 이미지 없이도 실습 진행
        navigate("/practice-progress", {
          state: { 
            scenarioId: selectedScenario,
            patientImageUrl: "" 
          },
        });
      }
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
          onChange={(e) => {
            const scenarioId = e.target.value ? parseInt(e.target.value) : "";
            if (scenarioId) {
              handleScenarioChange(scenarioId);
            } else {
              setSelectedScenario("");
              setSelectedScenarioImage("");
            }
          }}
        >
          <option value="">분야를 선택하세요</option>
          {Array.isArray(scenarioList) && scenarioList.map((scenario) => (
            <option key={scenario.scenario_id} value={scenario.scenario_id}>
              {scenario.scenario_name}
            </option>
          ))}
        </S.Select>
        
        {/* 환자 이미지 표시 제거 - 실습 시작할 때만 표시 */}
        
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
