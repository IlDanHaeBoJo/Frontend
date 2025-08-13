import React, { useState, useEffect } from "react";
import * as S from "./style";
import { ResultDetail } from "../../types/result";
import { saveCpxFeedback } from "../../apis/cpx";

interface ResultDetailModalProps {
  onClose: () => void;
  isLoading: boolean;
  resultDetail: ResultDetail | null;
  isAdmin: boolean;
}

const ResultDetailModal: React.FC<ResultDetailModalProps> = ({
  onClose,
  isLoading,
  resultDetail,
  isAdmin,
}) => {
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (resultDetail) {
      setFeedback(resultDetail.cpx_evaluation.detailed_feedback || "");
      setScore(resultDetail.cpx_evaluation.overall_score || 0);
    }
  }, [resultDetail]);

  const handleSaveFeedback = async () => {
    if (!resultDetail) return;

    try {
      await saveCpxFeedback(resultDetail.result_id, {
        overall_score: score,
        detailed_feedback: feedback,
        evaluation_status: "피드백 완료",
      });
      alert("피드백이 성공적으로 저장되었습니다.");
      onClose();
    } catch (error) {
      console.error("Failed to save feedback:", error);
      alert("피드백 저장에 실패했습니다.");
    }
  };

  const handleOverlayClick = () => {
    onClose();
  };

  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <S.ModalOverlay onClick={handleOverlayClick}>
      <S.ModalWrapper onClick={handleContentClick}>
        {isLoading || !resultDetail ? (
          <S.LoadingSpinner />
        ) : (
          <S.ModalContent>
            <S.CloseButton onClick={onClose}>×</S.CloseButton>
            <S.ConversationSectionContainer>
              <S.Section flex={6}>
                <S.SectionTitle>대화 내역</S.SectionTitle>
                <S.ConversationBox>
                  {resultDetail.cpx_detail.conversation_transcript}
                </S.ConversationBox>
              </S.Section>
              <S.Section flex={4}>
                <S.SectionTitle>메모 내역</S.SectionTitle>
                <S.ConversationBox>
                  {resultDetail.cpx_detail.memo}
                </S.ConversationBox>
              </S.Section>
            </S.ConversationSectionContainer>
            <S.FeedbackSection>
              <S.SectionTitle>AI 평가 내역</S.SectionTitle>
              <S.FeedbackContent>
                {resultDetail.cpx_detail.system_evaluation_data}
              </S.FeedbackContent>
            </S.FeedbackSection>
            <S.ProfessorFeedbackSection>
              <S.SectionTitle>교수님 피드백</S.SectionTitle>
              {isAdmin ? (
                <>
                  <S.FeedbackTextarea
                    value={feedback}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                      setFeedback(e.target.value)
                    }
                    placeholder="피드백을 입력하세요..."
                  />
                  <S.ScoreInput
                    type="number"
                    value={score}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setScore(parseInt(e.target.value, 10))
                    }
                    placeholder="점수 입력"
                  />
                </>
              ) : (
                <S.FeedbackContent>
                  {resultDetail.cpx_evaluation.detailed_feedback}
                </S.FeedbackContent>
              )}
            </S.ProfessorFeedbackSection>
            {isAdmin ? (
              <S.PdfButton onClick={handleSaveFeedback}>
                피드백 저장
              </S.PdfButton>
            ) : (
              <S.PdfButton>PDF로 저장</S.PdfButton>
            )}
          </S.ModalContent>
        )}
      </S.ModalWrapper>
    </S.ModalOverlay>
  );
};

export default ResultDetailModal;
