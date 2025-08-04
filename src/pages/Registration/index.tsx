import React, { useState } from "react";
import * as S from "./style";

const Registration = () => {
  const [role, setRole] = useState("student"); // 'student' or 'professor'

  return (
    <S.Container>
      <S.RegistrationBox>
        <S.Title>회원가입</S.Title>
        <S.ToggleButtonContainer>
          <S.ToggleButton
            active={role === "student"}
            onClick={() => setRole("student")}
          >
            학생
          </S.ToggleButton>
          <S.ToggleButton
            active={role === "professor"}
            onClick={() => setRole("professor")}
          >
            교수
          </S.ToggleButton>
        </S.ToggleButtonContainer>
        <S.Input placeholder="아이디를 입력하세요" />
        <S.Input type="password" placeholder="비밀번호를 입력하세요" />
        <S.Input type="password" placeholder="비밀번호를 다시 입력하세요" />
        <S.RegistrationButton>회원가입</S.RegistrationButton>
      </S.RegistrationBox>
    </S.Container>
  );
};

export default Registration;
