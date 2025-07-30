import React from "react";
import * as S from "./style";

const Result = () => {
  const results = [
    { id: 1, name: "박서준", date: "2025-07-29", status: "진행중" },
    { id: 2, name: "이수진", date: "2025-07-28", status: "완료" },
    { id: 3, name: "최민호", date: "2025-07-27", status: "이의신청" },
    { id: 4, name: "김현우", date: "2025-07-26", status: "교수님 확인" },
  ];

  return (
    <S.Container>
      <S.Board>
        <S.BoardHeader>
          <S.HeaderItem>번호</S.HeaderItem>
          <S.HeaderItem>이름</S.HeaderItem>
          <S.HeaderItem>날짜</S.HeaderItem>
          <S.HeaderItem>평가 상태</S.HeaderItem>
        </S.BoardHeader>
        {results.map((result) => (
          <S.BoardRow key={result.id}>
            <S.RowItem>{result.id}</S.RowItem>
            <S.RowItem>{result.name}</S.RowItem>
            <S.RowItem>{result.date}</S.RowItem>
            <S.RowItem>
              <S.StatusTag status={result.status}>{result.status}</S.StatusTag>
            </S.RowItem>
          </S.BoardRow>
        ))}
      </S.Board>
    </S.Container>
  );
};

export default Result;
