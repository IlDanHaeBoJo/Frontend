import styled from "styled-components";

export const Container = styled.div`
  padding: 40px;
  background-color: #fcfcff;
`;

export const Title = styled.h1`
  font-family: "Inter", sans-serif;
  font-weight: 700;
  font-size: 36px;
  color: #1a1a33;
  margin-bottom: 30px;
`;

export const NoticeCard = styled.div`
  background-color: #ffffff;
  border: 1px solid #e5edff;
  border-radius: 12px;
  padding: 25px;
  margin-bottom: 20px;
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

export const NoticeTitle = styled.h2`
  display: flex;
  align-items: center;
  gap: 15px;
  font-family: "Inter", sans-serif;
  font-weight: 700;
  font-size: 20px;
  color: #1a1a33;
`;

export const ImportantBadge = styled.span`
  background-color: #e53333;
  color: #ffffff;
  padding: 5px 10px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 700;
`;

export const NoticeDate = styled.span`
  font-family: "Inter", sans-serif;
  font-size: 16px;
  color: #808099;
`;

export const NoticeContent = styled.p`
  font-family: "Inter", sans-serif;
  font-size: 16px;
  color: #666680;
  line-height: 1.6;
`;
