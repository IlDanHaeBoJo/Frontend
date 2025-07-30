import styled from "styled-components";

export const Container = styled.div`
  padding: 20px;
  background-color: #ffffff;
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
  color: #333333;
`;

export const Button = styled.button`
  width: 140px;
  height: 50px;
  border: none;
  border-radius: 8px;
  font-family: "Inter", sans-serif;
  font-weight: 700;
  font-size: 16px;
  color: #ffffff;
  cursor: pointer;
  background-color: #3366cc;

  &:disabled {
    background-color: #a69e96;
    cursor: not-allowed;
  }
`;

export const SubmitButton = styled(Button)`
  background-color: #29a645;
`;

export const PracticeArea = styled.div`
  display: flex;
  gap: 20px;
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
`;

export const PatientAvatar = styled.div`
  width: 250px;
  height: 250px;
  line-height: 250px;
  text-align: center;
  background-color: #5980b2;
  color: #ffffff;
  border-radius: 125px;
  font-size: 100px;
  margin-bottom: 20px;
`;

export const PatientName = styled.div`
  font-family: "Inter", sans-serif;
  font-weight: 700;
  font-size: 28px;
  color: #33334d;
  margin-bottom: 10px;
`;

export const StatusBadge = styled.div`
  padding: 10px 20px;
  background-color: #3d6699;
  color: #ffffff;
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
  background-color: #fcfcff;
  border: 1px solid #e5edff;
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
    color: #1a1a33;
  }
`;

export const InfoGrid = styled.div`
  p {
    font-family: "Inter", sans-serif;
    font-weight: 500;
    font-size: 16px;
    color: #33334d;
  }
`;

export const NotesCard = styled(InfoCard)`
  background-color: #fafcfc;
  border: 1px solid #e5ebf2;
`;

export const NotesArea = styled.div`
  font-family: "Inter", sans-serif;
  font-size: 14px;
  color: #808080;
  line-height: 1.5;
`;
