import React from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./style";

const Login = () => {
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate("/registration");
  };

  return (
    <S.Container>
      <S.LoginBox>
        <S.Title>로그인</S.Title>
        <S.Input placeholder="아이디를 입력하세요" />
        <S.Input type="password" placeholder="비밀번호를 입력하세요" />
        <S.LoginButton>로그인</S.LoginButton>
        <S.RegisterText onClick={handleRegisterClick}>회원가입</S.RegisterText>
      </S.LoginBox>
    </S.Container>
  );
};

export default Login;
