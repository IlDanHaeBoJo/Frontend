import React from "react";
import * as S from "./style";

const Registration = () => {
  return (
    <S.Container>
      <S.RegistrationBox>
        <S.Title>회원가입</S.Title>
        <S.Input placeholder="아이디를 입력하세요" />
        <S.Input type="password" placeholder="비밀번호를 입력하세요" />
        <S.Input type="password" placeholder="비밀번호를 다시 입력하세요" />
        <S.RegistrationButton>회원가입</S.RegistrationButton>
      </S.RegistrationBox>
    </S.Container>
  );
};

export default Registration;
