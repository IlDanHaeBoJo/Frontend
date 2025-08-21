import styled from "styled-components";
import { colors } from "../../styles/colors";

export const Container = styled.div`
  padding: 40px;
  margin: 0 auto;
  max-width: 1500px;
  background-color: ${colors.white};
  min-height: calc(100vh - 170px);
`;

export const Title = styled.h1`
  font-family: "Inter", sans-serif;
  font-weight: 700;
  font-size: 32px;
  color: ${colors.black};
  margin-bottom: 30px;
`;

export const StudentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 30px;
`;

export const StudentCard = styled.div`
  background-color: ${colors.white};
  border: 1px solid ${colors.lavenderBlue3};
  border-radius: 8px;
  padding: 25px;
`;

export const StudentName = styled.h2`
  font-family: "Inter", sans-serif;
  font-weight: 700;
  font-size: 22px;
  color: ${colors.black};
  margin: 0 0 10px 0;
`;

export const StudentId = styled.p`
  font-family: "Inter", sans-serif;
  font-size: 16px;
  color: ${colors.gray600};
  margin: 0 0 20px 0;
`;

export const Stats = styled.div`
  display: flex;
  gap: 20px;
  background-color: ${colors.whiteBlue};
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 20px;
`;

export const Stat = styled.div`
  text-align: center;
  flex: 1;
`;

export const StatValue = styled.p`
  font-family: "Inter", sans-serif;
  font-weight: 700;
  font-size: 24px;
  color: ${colors.blue};
  margin: 0;
`;

export const StatLabel = styled.p`
  font-family: "Inter", sans-serif;
  font-size: 12px;
  color: ${colors.gray600};
  margin: 5px 0 0 0;
`;

export const LastPractice = styled.p`
  font-family: "Inter", sans-serif;
  font-size: 14px;
  color: ${colors.gray600};
  margin: 0 0 15px 0;
`;

export const EvalButton = styled.button`
  width: 100%;
  height: 45px;
  background-color: ${colors.blue};
  border: none;
  border-radius: 4px;
  font-family: "Inter", sans-serif;
  font-weight: 700;
  font-size: 16px;
  color: ${colors.white};
  cursor: pointer;

  &:hover {
    background-color: ${colors.darkBlue};
  }
`;
