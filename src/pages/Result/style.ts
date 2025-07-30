import styled from "styled-components";

export const Container = styled.div`
  padding: 50px;
  background-color: #ffffff;
`;

export const Board = styled.div`
  width: 1100px;
  margin: 0 auto;
  border: 1px solid #e6e6e6;
`;

export const BoardHeader = styled.div`
  display: flex;
  background-color: #f2f7ff;
  height: 50px;
  align-items: center;
  padding: 0 20px;
`;

export const HeaderItem = styled.div`
  font-family: "Inter", sans-serif;
  font-weight: 700;
  font-size: 16px;
  color: #000000;
  text-align: center;
  flex: 1;
`;

export const BoardRow = styled.div`
  display: flex;
  height: 60px;
  align-items: center;
  padding: 0 20px;
  border-bottom: 1px solid #e6e6e6;

  &:last-child {
    border-bottom: none;
  }
`;

export const RowItem = styled.div`
  font-family: "Inter", sans-serif;
  font-size: 16px;
  color: #000000;
  text-align: center;
  flex: 1;
`;

export const StatusTag = styled.div<{ status: string }>`
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 14px;
  display: inline-block;

  ${({ status }) => {
    switch (status) {
      case "진행중":
        return `
          background-color: #e5f2ff;
          color: #3366cc;
        `;
      case "완료":
        return `
          background-color: #d9ffe5;
          color: #1a8033;
        `;
      case "이의신청":
        return `
          background-color: #ffe5cc;
          color: #cc6600;
        `;
      case "교수님 확인":
        return `
          background-color: #f2e5ff;
          color: #6633cc;
        `;
      default:
        return "";
    }
  }}
`;
