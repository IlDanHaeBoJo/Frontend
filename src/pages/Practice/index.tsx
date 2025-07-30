import React from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./style";

const Practice = () => {
  const navigate = useNavigate();

  const handleStartPractice = () => {
    navigate("/practice-progress");
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
        <S.Dropdown>
          <span>분야를 선택하세요</span>
          <span>▼</span>
        </S.Dropdown>
        <S.StartButton onClick={handleStartPractice}>실습 시작</S.StartButton>
      </S.OptionBox>
      <S.OptionBox>
        <S.Title>랜덤 상황 실습</S.Title>
        <S.Description>
          분야가 랜덤으로 선택되어
          <br />
          실제 상황과 유사한 실습을 진행합니다.
        </S.Description>
        <S.Dropdown>
          <span>분야를 선택하세요</span>
          <span>▼</span>
        </S.Dropdown>
        <S.StartButton onClick={handleStartPractice}>실습 시작</S.StartButton>
      </S.OptionBox>
    </S.Container>
  );
};

export default Practice;
