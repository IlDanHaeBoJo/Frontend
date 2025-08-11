import styled from "styled-components";
import { colors } from "../../styles/colors";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 90px);
  background-color: ${colors.lavenderBlue1};
`;

export const LoginBox = styled.div`
  width: 500px;
  padding: 40px;
  background-color: ${colors.white};
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Title = styled.h2`
  font-family: "Inter", sans-serif;
  font-weight: 700;
  font-size: 28px;
  color: ${colors.black};
  margin-bottom: 40px;
`;

export const Input = styled.input`
  width: 380px;
  height: 50px;
  padding: 0 20px;
  background-color: ${colors.white};
  border: 1px solid ${colors.gray400};
  border-radius: 4px;
  margin-bottom: 20px;
  font-family: "Inter", sans-serif;
  font-size: 16px;
  box-sizing: border-box;

  &::placeholder {
    color: ${colors.gray500};
  }
`;

export const LoginButton = styled.button`
  width: 380px;
  height: 60px;
  background-color: ${colors.blue};
  border: none;
  border-radius: 4px;
  font-family: "Inter", sans-serif;
  font-weight: 700;
  font-size: 20px;
  color: ${colors.white};
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

export const ErrorMsg = styled.p`
  color: ${colors.red};
  font-size: 12px;
  margin-top: -15px;
  margin-bottom: 10px;
  align-self: flex-start;
  margin-left: 65px;
`;

export const RegisterText = styled.p`
  margin-top: 20px;
  color: ${colors.gray600};
  cursor: pointer;
  text-decoration: underline;
`;
