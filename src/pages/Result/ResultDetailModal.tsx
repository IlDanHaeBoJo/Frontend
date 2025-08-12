import React from "react";
import * as S from "./style";

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

interface ResultDetailModalProps {
  onClose: () => void;
  isLoading: boolean;
  resultDetail: ResultDetail | null;
}

const ResultDetailModal: React.FC<ResultDetailModalProps> = ({
  onClose,
  isLoading,
  resultDetail,
}) => {
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
              <S.FeedbackContent>
                {resultDetail.cpx_evaluation.detailed_feedback}
              </S.FeedbackContent>
            </S.ProfessorFeedbackSection>
            <S.PdfButton>PDF로 저장</S.PdfButton>
          </S.ModalContent>
        )}
      </S.ModalWrapper>
    </S.ModalOverlay>
  );
};

export default ResultDetailModal;
