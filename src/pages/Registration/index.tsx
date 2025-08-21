import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import * as S from "./style";
import { publicApi } from "../../apis";

interface IFormInput {
  username: string;
  password: string;
  passwordConfirm: string;
  email: string;
  name: string;
  role: "student" | "admin";
  student_id?: string;
  major?: string;
}

const Registration = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<IFormInput>({
    defaultValues: {
      role: "student",
    },
  });

  const role = watch("role");

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    // We don't need passwordConfirm in the final object
    const { passwordConfirm, ...submitData } = data;
    console.log("Submitting data:", submitData);
    console.log("Using baseURL:", publicApi.defaults.baseURL);

    try {
      const response = await publicApi.post("/auth/register", submitData);
      console.log("Registration successful:", response.data);
      alert("회원가입이 완료되었습니다.");
      window.location.href = "/login";
    } catch (error) {
      console.error("Registration failed:", error);
      alert("회원가입에 실패했습니다.");
    }
  };

  return (
    <S.Container>
      <S.RegistrationBox as="form" onSubmit={handleSubmit(onSubmit)}>
        <S.Title>회원가입</S.Title>
        <S.ToggleButtonContainer>
          <S.ToggleButton
            type="button"
            active={role === "student"}
            onClick={() => setValue("role", "student")}
          >
            학생
          </S.ToggleButton>
          <S.ToggleButton
            type="button"
            active={role === "admin"}
            onClick={() => setValue("role", "admin")}
          >
            교수
          </S.ToggleButton>
        </S.ToggleButtonContainer>

        <S.Label>아이디</S.Label>
        <S.Input
          {...register("username", { required: "아이디를 입력해주세요." })}
          placeholder="아이디를 입력하세요"
        />
        {errors.username && <S.ErrorMsg>{errors.username.message}</S.ErrorMsg>}

        <S.Label>비밀번호</S.Label>
        <S.Input
          type="password"
          {...register("password", { required: "비밀번호를 입력해주세요." })}
          placeholder="비밀번호를 입력하세요"
        />
        {errors.password && <S.ErrorMsg>{errors.password.message}</S.ErrorMsg>}

        <S.Input
          type="password"
          {...register("passwordConfirm", {
            required: "비밀번호를 다시 입력해주세요.",
            validate: (value) =>
              value === watch("password") || "비밀번호가 일치하지 않습니다.",
          })}
          placeholder="비밀번호를 다시 입력하세요"
        />
        {watch("passwordConfirm") && (
          <S.PasswordMatchMessage
            isMatch={watch("password") === watch("passwordConfirm")}
          >
            {watch("password") === watch("passwordConfirm")
              ? "비밀번호가 일치합니다."
              : "비밀번호가 일치하지 않습니다."}
          </S.PasswordMatchMessage>
        )}
        {errors.passwordConfirm && (
          <S.ErrorMsg>{errors.passwordConfirm.message}</S.ErrorMsg>
        )}

        <S.Label>이름</S.Label>
        <S.Input
          {...register("name", { required: "이름을 입력해주세요." })}
          placeholder="이름을 입력하세요"
        />
        {errors.name && <S.ErrorMsg>{errors.name.message}</S.ErrorMsg>}

        <S.Label>이메일</S.Label>
        <S.Input
          type="email"
          {...register("email", {
            required: "이메일을 입력해주세요.",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "유효한 이메일 주소를 입력해주세요.",
            },
          })}
          placeholder="이메일을 입력하세요"
        />
        {errors.email && <S.ErrorMsg>{errors.email.message}</S.ErrorMsg>}

        {role === "student" && (
          <>
            <S.Label>학번</S.Label>
            <S.Input
              {...register("student_id")}
              placeholder="학번 (선택 사항)"
            />
            <S.Label>전공</S.Label>
            <S.Input {...register("major")} placeholder="전공 (선택 사항)" />
          </>
        )}

        <S.RegistrationButton type="submit">회원가입</S.RegistrationButton>
      </S.RegistrationBox>
    </S.Container>
  );
};

export default Registration;
