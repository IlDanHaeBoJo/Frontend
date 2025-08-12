import React, { useState, useEffect } from "react";
import * as S from "./style";
import ResultDetailModal from "./ResultDetailModal";
import { getMyCpxResults, getCpxResultDetail } from "../../apis/cpx";

interface CpxDetail {
  conversation_transcript: string;
  memo: string;
  system_evaluation_data: string;
  detail_id: number;
  result_id: number;
  last_updated_at: string;
}

interface CpxEvaluation {
  overall_score: number;
  detailed_feedback: string;
  evaluation_status: string;
  evaluation_id: number;
  result_id: number;
  evaluator_id: number;
  evaluation_date: string;
  created_at: string;
  updated_at: string;
}

interface ResultDetail {
  student_id: number;
  patient_name: string;
  evaluation_status: string;
  result_id: number;
  practice_date: string;
  created_at: string;
  updated_at: string;
  cpx_detail: CpxDetail;
  cpx_evaluation: CpxEvaluation;
}

interface CpxResult {
  student_id: number;
  patient_name: string;
  evaluation_status: string;
  result_id: number;
  practice_date: string;
  created_at: string;
  updated_at: string;
}

const Result = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<CpxResult[]>([]);
  const [selectedResultDetail, setSelectedResultDetail] =
    useState<ResultDetail | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const data = await getMyCpxResults();
        setResults(data);
      } catch (error) {
        console.error("Failed to fetch results:", error);
      }
    };

    fetchResults();
  }, []);

  const totalPages = Math.ceil(results.length / itemsPerPage);
  const currentResults = results.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const openModal = async (resultId: number) => {
    setIsModalOpen(true);
    setIsLoading(true);
    try {
      const data = await getCpxResultDetail(resultId);
      setSelectedResultDetail(data);
    } catch (error) {
      console.error("Failed to fetch result detail:", error);
    } finally {
      setIsLoading(false);
    }
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
            <S.HeaderItem>환자 이름</S.HeaderItem>
            <S.HeaderItem>실습 날짜</S.HeaderItem>
            <S.HeaderItem>평가 상태</S.HeaderItem>
          </S.BoardHeader>
          {currentResults.map((result) => (
            <S.BoardRow
              key={result.result_id}
              onClick={() => openModal(result.result_id)}
            >
              <S.RowItem>{result.result_id}</S.RowItem>
              <S.RowItem>{result.patient_name}</S.RowItem>
              <S.RowItem>
                {new Date(result.practice_date).toLocaleDateString()}
              </S.RowItem>
              <S.RowItem>
                <S.StatusTag status={result.evaluation_status}>
                  {result.evaluation_status}
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
        <ResultDetailModal
          onClose={closeModal}
          isLoading={isLoading}
          resultDetail={selectedResultDetail}
        />
      )}
    </>
  );
};

export default Result;
