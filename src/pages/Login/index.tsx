import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import * as S from "./style";
import { api, publicApi } from "../../apis";
import { setAccessToken, setRefreshToken } from "../../store/tokenManager";
import { useUser } from "../../store/UserContext";
import ResetPasswordModal from "./ResetPasswordModal";

interface IFormInput {
  username: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate();
  const { setUser, setIsAuthenticated } = useUser();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const handleRegisterClick = () => {
    navigate("/registration");
  };

  const handleFindPasswordClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      const loginResponse = await publicApi.post("/auth/login", data);
      const { access_token, refresh_token } = loginResponse.data;

      if (access_token && refresh_token) {
        setAccessToken(access_token);
        setRefreshToken(refresh_token);

        const meResponse = await api.get("/users/me");
        setUser(meResponse.data);
        setIsAuthenticated(true);

        alert("로그인 되었습니다.");
        navigate("/mypage");
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("아이디 또는 비밀번호가 일치하지 않습니다.");
    }
  };

  return (
    <S.Container>
      {isModalOpen && <ResetPasswordModal onClose={handleCloseModal} />}
      <S.LoginBox as="form" onSubmit={handleSubmit(onSubmit)}>
        <S.Title>로그인</S.Title>
        <S.Input
          {...register("username", { required: "아이디를 입력해주세요." })}
          placeholder="아이디를 입력하세요"
        />
        {errors.username && <S.ErrorMsg>{errors.username.message}</S.ErrorMsg>}
        <S.Input
          type="password"
          {...register("password", { required: "비밀번호를 입력해주세요." })}
          placeholder="비밀번호를 입력하세요"
        />
        {errors.password && <S.ErrorMsg>{errors.password.message}</S.ErrorMsg>}
        <S.LoginButton type="submit">로그인</S.LoginButton>
        <S.RegisterContainer>
          <S.RegisterText onClick={handleRegisterClick}>
            회원가입
          </S.RegisterText>
          <S.RegisterText onClick={handleFindPasswordClick}>
            비밀번호 재설정
          </S.RegisterText>
        </S.RegisterContainer>
      </S.LoginBox>
    </S.Container>
  );
};

export default Login;
