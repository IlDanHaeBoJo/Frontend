import React, { useState, useEffect } from "react";
import * as S from "./style";
import { ResultDetail } from "../../types/result";
import { saveCpxFeedback } from "../../apis/cpx";
import ReactMarkdown from "react-markdown";

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
      window.location.reload();
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
                  {(() => {
                    try {
                      const data =
                        typeof resultDetail.cpx_detail
                          .system_evaluation_data === "string"
                          ? JSON.parse(
                              resultDetail.cpx_detail.system_evaluation_data
                            )
                          : resultDetail.cpx_detail.system_evaluation_data;

                      const conversationEntries = data.conversation_entries;

                      if (
                        !conversationEntries ||
                        !Array.isArray(conversationEntries)
                      ) {
                        return "대화 내역을 불러올 수 없습니다.";
                      }

                      return conversationEntries.map(
                        (entry: any, index: number) => (
                          <div key={index}>
                            <strong
                              style={{
                                color:
                                  entry.role === "doctor"
                                    ? "#007bff"
                                    : "#28a745",
                              }}
                            >
                              {entry.role === "doctor" ? "의사" : "환자"}:
                            </strong>{" "}
                            {entry.text}
                          </div>
                        )
                      );
                    } catch (e) {
                      // Fallback on error
                      return resultDetail.cpx_detail.conversation_transcript;
                    }
                  })()}
                </S.ConversationBox>
              </S.Section>
              <S.Section flex={4}>
                <S.SectionTitle>메모 내역</S.SectionTitle>
                <S.ConversationBox>
                  {resultDetail.cpx_detail.memo}
                </S.ConversationBox>
              </S.Section>
            </S.ConversationSectionContainer>
            <S.SectionTitle>AI 평가 내역</S.SectionTitle>
            <S.FeedbackSection>
              {(() => {
                try {
                  const data =
                    typeof resultDetail.cpx_detail.system_evaluation_data ===
                    "string"
                      ? JSON.parse(
                          resultDetail.cpx_detail.system_evaluation_data
                        )
                      : resultDetail.cpx_detail.system_evaluation_data;

                  const analysis = data.langgraph_text_analysis || {};

                  // 👉 markdown_feedback을 렌더링
                  if (analysis.markdown_feedback) {
                    return (
                      <div style={{ whiteSpace: "pre-wrap" }}>
                        <ReactMarkdown>
                          {analysis.markdown_feedback}
                        </ReactMarkdown>
                      </div>
                    );
                  }

                  return "AI 평가 내역이 없습니다.";
                } catch (e) {
                  return (
                    <pre>
                      {JSON.stringify(
                        resultDetail.cpx_detail.system_evaluation_data,
                        null,
                        2
                      )}
                    </pre>
                  );
                }
              })()}
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
                  <S.ScoreInputContainer>
                    <S.ScoreLabel>점수 :</S.ScoreLabel>
                    <S.ScoreInput
                      type="number"
                      value={score}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setScore(parseInt(e.target.value, 10))
                      }
                    />
                  </S.ScoreInputContainer>
                </>
              ) : (
                <S.FeedbackContent>
                  {resultDetail.cpx_evaluation.detailed_feedback}
                </S.FeedbackContent>
              )}
            </S.ProfessorFeedbackSection>
            {/* {isAdmin ? (
              <S.PdfButton onClick={handleSaveFeedback}>
                피드백 저장
              </S.PdfButton>
            ) : (
              <S.PdfButton>PDF로 저장</S.PdfButton>
            )} */}
            {isAdmin && (
              <S.PdfButton onClick={handleSaveFeedback}>
                피드백 저장
              </S.PdfButton>
            )}
          </S.ModalContent>
        )}
      </S.ModalWrapper>
    </S.ModalOverlay>
  );
};

export default ResultDetailModal;
