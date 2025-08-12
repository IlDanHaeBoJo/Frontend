import React from "react";
import * as S from "./style";
import { ResultDetail } from "../../types/result";

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
