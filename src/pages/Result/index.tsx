import React, { useState } from "react";
import * as S from "./style";
import ResultDetailModal from "./ResultDetailModal";

const Result = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const allResults = Array.from({ length: 25 }, (_, i) => ({
    id: i + 1,
    name: `학생 ${i + 1}`,
    date: `2025-07-${29 - i}`,
    status: ["진행중", "완료", "이의신청", "교수님 확인"][i % 4],
  }));

  const totalPages = Math.ceil(allResults.length / itemsPerPage);
  const currentResults = allResults.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const openModal = () => {
    setIsModalOpen(true);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const closeModal = () => setIsModalOpen(false);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <S.Container>
        <S.Board>
          <S.BoardHeader>
            <S.HeaderItem>번호</S.HeaderItem>
            <S.HeaderItem>이름</S.HeaderItem>
            <S.HeaderItem>날짜</S.HeaderItem>
            <S.HeaderItem>평가 상태</S.HeaderItem>
          </S.BoardHeader>
          {currentResults.map((result) => (
            <S.BoardRow key={result.id} onClick={openModal}>
              <S.RowItem>{result.id}</S.RowItem>
              <S.RowItem>{result.name}</S.RowItem>
              <S.RowItem>{result.date}</S.RowItem>
              <S.RowItem>
                <S.StatusTag status={result.status}>
                  {result.status}
                </S.StatusTag>
              </S.RowItem>
            </S.BoardRow>
          ))}
        </S.Board>
        <S.PaginationContainer>
          {Array.from({ length: totalPages }, (_, i) => (
            <S.PageButton
              key={i + 1}
              isActive={currentPage === i + 1}
              onClick={() => handlePageChange(i + 1)}
            >
              {i + 1}
            </S.PageButton>
          ))}
        </S.PaginationContainer>
      </S.Container>
      {isModalOpen && (
        <ResultDetailModal onClose={closeModal} isLoading={isLoading} />
      )}
    </>
  );
};

export default Result;
