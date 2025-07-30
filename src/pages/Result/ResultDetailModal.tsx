import React from "react";
import * as S from "./style";

interface ResultDetailModalProps {
  onClose: () => void;
  isLoading: boolean;
}

const ResultDetailModal: React.FC<ResultDetailModalProps> = ({
  onClose,
  isLoading,
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
        {isLoading ? (
          <S.LoadingSpinner />
        ) : (
          <S.ModalContent>
            <S.CloseButton onClick={onClose}>×</S.CloseButton>
            <S.ConversationSectionContainer>
              <S.Section flex={6}>
                <S.SectionTitle>대화 내역</S.SectionTitle>
                <S.ConversationBox>
                  <p>
                    <strong>의사:</strong> 안녕하세요, 김민준님. 어디가 불편해서
                    오셨나요?
                  </p>
                  <p style={{ color: "#3366cc" }}>
                    <strong>환자(AI):</strong> 네, 선생님. 요즘 계속 머리가
                    아파서 왔습니다.
                  </p>
                </S.ConversationBox>
              </S.Section>
              <S.Section flex={4}>
                <S.SectionTitle>메모 내역</S.SectionTitle>
                <S.ConversationBox>
                  <p>머리가 아프대</p>
                </S.ConversationBox>
              </S.Section>
            </S.ConversationSectionContainer>
            <S.FeedbackSection>
              <S.SectionTitle>AI 평가 내역</S.SectionTitle>
              <S.FeedbackContent>
                <strong>1. 병력 청취 (History Taking)</strong>
                <p>
                  OLDCAFE 항목 중 Onset, Location, Duration은 잘 질문하였으나,
                  Character, Aggravating/Alleviating factors, Associated
                  symptoms에 대한 질문이 부족했습니다. 특히 두통의
                  양상(Character)을 파악하는 것이 중요합니다.
                </p>
                <strong>2. 신체 진찰 (Physical Examination)</strong>
                <p>
                  두통을 호소하는 환자에게 기본적인 신경학적 검사(Neurologic
                  examination)를 시행하는 것이 좋습니다. 시야 검사, 동공 반사,
                  안면 근육 움직임 등을 확인하는 과정이 누락되었습니다.
                </p>
                <strong>3. 환자 교육 (Patient Education)</strong>
                <p>
                  환자에게 공감하는 태도는 좋았으나, 추정 진단과 감별 진단에
                  대한 설명이 부족했습니다. 환자가 자신의 상태를 이해하고 안심할
                  수 있도록, 가능한 진단과 앞으로의 검사 계획에 대해 명확히
                  설명해주는 것이 중요합니다.
                </p>
              </S.FeedbackContent>
            </S.FeedbackSection>
            <S.ProfessorFeedbackSection>
              <S.SectionTitle>교수님 피드백</S.SectionTitle>
              <S.FeedbackContent>
                <p>
                  전반적으로 잘 진행했지만, AI 피드백처럼 환자의 주 증상인
                  두통에 대해 더 깊이 파고드는 질문이 필요해 보입니다. 다음
                  실습에서는 감별 진단을 염두에 두고 질문하는 연습을 해보세요.
                </p>
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
