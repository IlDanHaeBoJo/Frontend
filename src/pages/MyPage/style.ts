import styled from "styled-components";
import { colors } from "../../styles/colors";

export const Container = styled.div`
  padding: 40px;
  max-width: 1500px;
  margin: 0 auto;
  background-color: ${colors.white};
  min-height: calc(100vh - 170px);
`;

export const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
  padding: 40px;
  background-color: ${colors.white};
  border: 1px solid ${colors.lavenderBlue3};
  border-radius: 16px;
  margin-bottom: 30px;
`;

export const ProfileImage = styled.div`
  width: 120px;
  height: 120px;
  background-color: ${colors.gray200};
  border-radius: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 60px;
`;

export const UserName = styled.h1`
  font-family: "Inter", sans-serif;
  font-weight: 700;
  font-size: 32px;
  color: ${colors.gray800};
  margin: 0;
`;

export const UserEmail = styled.p`
  font-family: "Inter", sans-serif;
  font-size: 18px;
  color: ${colors.gray600};
  margin: 10px 0 0 0;
`;

export const InfoSection = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
`;

export const InfoCard = styled.div`
  background-color: ${colors.white};
  border: 1px solid ${colors.lavenderBlue3};
  border-radius: 16px;
  padding: 30px;
`;

export const CardTitle = styled.h2`
  font-family: "Inter", sans-serif;
  font-weight: 700;
  font-size: 24px;
  color: ${colors.gray800};
  margin-bottom: 30px;
`;

export const InfoItem = styled.div`
  margin-bottom: 25px;
`;

export const InfoLabel = styled.p`
  font-family: "Inter", sans-serif;
  font-size: 16px;
  color: ${colors.gray600};
  margin: 0 0 5px 0;
`;

export const InfoValue = styled.p`
  font-family: "Inter", sans-serif;
  font-weight: 600;
  font-size: 18px;
  color: ${colors.gray800};
  margin: 0;
`;

export const InputLabel = styled.p`
  font-family: "Inter", sans-serif;
  font-size: 16px;
  color: ${colors.gray600};
  margin: 20px 0 5px 0;
`;

export const Input = styled.input`
  width: 100%;
  height: 50px;
  padding: 0 15px;
  background-color: ${colors.white};
  border: 1px solid ${colors.gray300};
  border-radius: 8px;
  font-family: "Inter", sans-serif;
  font-size: 16px;
  box-sizing: border-box;
`;

export const Button = styled.button`
  width: 100%;
  height: 50px;
  margin-top: 30px;
  background-color: ${colors.blue};
  border: none;
  border-radius: 8px;
  font-family: "Inter", sans-serif;
  font-weight: 700;
  font-size: 18px;
  color: ${colors.white};
  cursor: pointer;

  &:hover {
    background-color: ${colors.darkBlue};
  }
`;

export const PasswordMatchMessage = styled.p<{ isMatch: boolean }>`
  font-family: "Inter", sans-serif;
  font-size: 14px;
  color: ${({ isMatch }) => (isMatch ? colors.blue : colors.red)};
  margin-top: 10px;
`;
