import styled from "styled-components";
import { colors } from "../../styles/colors";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 90px);
  background-color: ${colors.lavenderBlue1};
`;

export const RegistrationBox = styled.div`
  width: 500px;
  padding: 40px;
  margin: 30px;
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

export const Label = styled.label`
  align-self: flex-start;
  margin-left: 65px;
  margin-bottom: 5px;
  font-family: "Inter", sans-serif;
  font-weight: 500;
  font-size: 14px;
  color: ${colors.gray700};
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

export const RegistrationButton = styled.button`
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
  margin: 20px 0;

  &:hover {
    background-color: ${colors.darkBlue};
  }
`;

export const ToggleButtonContainer = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

export const ToggleButton = styled.button<{ active: boolean }>`
  width: 190px;
  height: 50px;
  background-color: ${(props) =>
    props.active ? colors.blue : colors.lavenderBlue1};
  color: ${(props) => (props.active ? colors.white : colors.gray700)};
  border: 1px solid ${(props) => (props.active ? colors.blue : "#dcdcdc")};
  font-family: "Inter", sans-serif;
  font-weight: 700;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s, border-color 0.3s;

  &:first-child {
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
    border-right: none;
  }

  &:last-child {
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
  }

  &:hover {
    background-color: ${(props) =>
      props.active ? colors.darkBlue : "#e9ecef"};
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

export const PasswordMatchMessage = styled.p<{ isMatch: boolean }>`
  font-family: "Inter", sans-serif;
  font-size: 14px;
  color: ${({ isMatch }) => (isMatch ? colors.blue : colors.red)};
  margin-top: -15px;
  margin-bottom: 10px;
  align-self: flex-start;
  margin-left: 65px;
`;
