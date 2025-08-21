import styled from "styled-components";
import { colors } from "../../styles/colors";

export const Container = styled.div`
  padding: 20px;
  background-color: ${colors.white};
  min-height: calc(100vh - 250px);
`;

export const ControlSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
`;

export const Timer = styled.div`
  font-family: "Inter", sans-serif;
  font-weight: 700;
  font-size: 32px;
  color: ${colors.gray700};
`;

export const Button = styled.button<{ active?: boolean }>`
  width: 140px;
  height: 50px;
  border: none;
  border-radius: 8px;
  font-family: "Inter", sans-serif;
  font-weight: 700;
  font-size: 16px;
  color: ${colors.white};
  cursor: pointer;
  background-color: ${(props) => (props.active ? colors.red : colors.blue)};

  &:disabled {
    background-color: #a69e96;
    cursor: not-allowed;
  }
`;

export const SubmitButton = styled(Button)`
  background-color: ${colors.green};
`;

export const PracticeArea = styled.div`
  display: flex;
  gap: 20px;
  width: fit-content;
  margin: 0 auto;
`;

export const PatientVideoArea = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f7faff;
  border-radius: 20px;
  padding: 20px;
  width: 700px;
  height: 450px;
`;

export const PatientAvatar = styled.div`
  width: 250px;
  height: 250px;
  background-color: #5980b2;
  color: ${colors.white};
  border-radius: 125px;
  margin-bottom: 20px;
  overflow: hidden;
`;

export const PatientName = styled.div`
  font-family: "Inter", sans-serif;
  font-weight: 700;
  font-size: 28px;
  color: ${colors.indigoGray3};
  margin-bottom: 10px;
`;

export const StatusBadge = styled.div`
  padding: 10px 20px;
  background-color: #3d6699;
  color: ${colors.white};
  border-radius: 22px;
  font-family: "Inter", sans-serif;
  font-weight: 600;
  font-size: 16px;
`;

export const InfoPanel = styled.div`
  width: 450px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const InfoCard = styled.div`
  background-color: ${colors.whiteBlue};
  border: 1px solid ${colors.cloudBlue2};
  border-radius: 16px;
  padding: 20px;
`;

export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;

  span:first-child {
    font-size: 20px;
  }

  span:last-child {
    font-family: "Inter", sans-serif;
    font-weight: 700;
    font-size: 20px;
    color: ${colors.indigoGray4};
  }
`;

export const InfoGrid = styled.div`
  p {
    font-family: "Inter", sans-serif;
    font-weight: 500;
    font-size: 16px;
    color: ${colors.indigoGray3};
  }
`;

export const MemoCard = styled(InfoCard)`
  background-color: ${colors.whiteBlue};
  border: 1px solid ${colors.lavenderBlue2};
`;

export const MemoArea = styled.textarea<{ height: string }>`
  width: 100%;
  height: ${(props) => props.height};
  border: 1px solid ${colors.cloudBlue2};
  border-radius: 8px;
  padding: 10px;
  font-family: "Inter", sans-serif;
  font-size: 14px;
  color: ${colors.gray500};
  line-height: 1.5;
  resize: vertical;
  box-sizing: border-box;
  &:focus {
    outline: none;
    border-color: ${colors.blue};
  }
`;

export const NotesArea = styled.div`
  font-family: "Inter", sans-serif;
  font-size: 14px;
  color: ${colors.gray500};
  line-height: 1.5;
`;
