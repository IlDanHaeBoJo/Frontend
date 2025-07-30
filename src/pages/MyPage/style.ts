import styled from "styled-components";

export const Container = styled.div`
  padding: 40px;
  background-color: #ffffff;
`;

export const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
  padding: 40px;
  background-color: #ffffff;
  border: 1px solid #ccd9ff;
  border-radius: 16px;
  margin-bottom: 30px;
`;

export const ProfileImage = styled.div`
  width: 120px;
  height: 120px;
  background-color: #e6e6e6;
  border-radius: 60px;
`;

export const UserName = styled.h1`
  font-family: "Inter", sans-serif;
  font-weight: 700;
  font-size: 32px;
  color: #1a1a1a;
  margin: 0;
`;

export const UserEmail = styled.p`
  font-family: "Inter", sans-serif;
  font-size: 18px;
  color: #666666;
  margin: 10px 0 0 0;
`;

export const InfoSection = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
`;

export const InfoCard = styled.div`
  background-color: #ffffff;
  border: 1px solid #ccd9ff;
  border-radius: 16px;
  padding: 30px;
`;

export const CardTitle = styled.h2`
  font-family: "Inter", sans-serif;
  font-weight: 700;
  font-size: 24px;
  color: #1a1a1a;
  margin-bottom: 30px;
`;

export const InfoItem = styled.div`
  margin-bottom: 25px;
`;

export const InfoLabel = styled.p`
  font-family: "Inter", sans-serif;
  font-size: 16px;
  color: #666666;
  margin: 0 0 5px 0;
`;

export const InfoValue = styled.p`
  font-family: "Inter", sans-serif;
  font-weight: 600;
  font-size: 18px;
  color: #1a1a1a;
  margin: 0;
`;

export const InputLabel = styled.p`
  font-family: "Inter", sans-serif;
  font-size: 16px;
  color: #666666;
  margin: 20px 0 5px 0;
`;

export const Input = styled.input`
  width: 100%;
  height: 50px;
  padding: 0 15px;
  background-color: #ffffff;
  border: 1px solid #cccccc;
  border-radius: 8px;
  font-family: "Inter", sans-serif;
  font-size: 16px;
`;

export const Button = styled.button`
  width: 100%;
  height: 50px;
  margin-top: 30px;
  background-color: #3366cc;
  border: none;
  border-radius: 8px;
  font-family: "Inter", sans-serif;
  font-weight: 700;
  font-size: 18px;
  color: #ffffff;
  cursor: pointer;

  &:hover {
    background-color: #254e99;
  }
`;
