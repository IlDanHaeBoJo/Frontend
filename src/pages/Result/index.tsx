import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as S from "./style";
import ResultDetailModal from "./ResultDetailModal";
import {
  getMyCpxResults,
  getCpxResultDetail,
  getStudentCpxResults,
  getAdminCpxResultDetail,
} from "../../apis/cpx";
import { CpxResult, ResultDetail } from "../../types/result";

const Result = () => {
  const { id } = useParams<{ id: string }>();
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
        let data;
        if (id) {
          data = await getStudentCpxResults(parseInt(id, 10));
        } else {
          data = await getMyCpxResults();
        }
        setResults(data);
      } catch (error) {
        console.error("Failed to fetch results:", error);
      }
    };

    fetchResults();
  }, [id]);

  const totalPages = Math.ceil(results.length / itemsPerPage);
  const currentResults = results.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const openModal = async (resultId: number) => {
    setIsModalOpen(true);
    setIsLoading(true);
    try {
      let data;
      if (id) {
        data = await getAdminCpxResultDetail(resultId);
      } else {
        data = await getCpxResultDetail(resultId);
      }

      // --- 임시 테스트 데이터 삽입 ---
      const testEvaluationData = {
        session_id: "test_user_3_1755064137",
        user_id: "test_user",
        scenario_id: "3",
        start_time: "2025-08-13T14:48:57.516369",
        end_time: "2025-08-13T14:49:17.885575",
        duration_minutes: 0.33948676666666666,
        langgraph_text_analysis: {
          evaluation_metadata: {
            user_id: "test_user",
            scenario_id: "3",
            evaluation_date: "2025-08-13T14:49:17.888431",
            conversation_duration_minutes: 1.5,
            voice_recording_path: "s3로 저장",
            conversation_transcript:
              '[{"role": "doctor", "content": "안녕하세요.", "timestamp": "2025-08-13T14:49:07.393664", "emotion": null}, {"role": "patient", "content": "안녕하세요.", "timestamp": "2025-08-13T14:49:07.394054", "emotion": null}, {"role": "doctor", "content": "들어가세요.", "timestamp": "2025-08-13T14:49:17.885314", "emotion": null}]',
          },
          scores: {
            total_score: 78.5,
            completion_rate: 0.8,
            quality_score: 7.5,
            weighted_breakdown: {
              completeness_score: 32.0,
              quality_score: 22.5,
              appropriateness_score: 16.0,
              intent_score: 8.5,
            },
            grade: "B",
          },
          feedback: {
            overall_feedback:
              "6단계 의학적 분석을 통한 종합 평가입니다. 총점: 78.5점",
            strengths: [
              "환자와의 대화에서 일부 정보 파악 가능",
              "환자 배려에 노력이 보임",
            ],
            weaknesses: [
              "동반 증상 및 의사소통 기술 부족",
              "진단에 필요한 정보 누락",
            ],
            medical_insights: [
              "알츠하이머병, 혈관성 치매, 루이 바디병에 대한 의심",
              "안전 및 진단 중요성 강조 필요",
            ],
            comprehensive_analysis:
              "종합 평가 결과, 의료진은 대화의 의도를 명확히 하고 체계적인 접근을 통해 환자 중심적인 질문을 할 필요가 있습니다. 의학적 완성도에서는 동반 증상 및 의사소통 기술 부분이 부족하며, 진단에 필요한 정보가 누락되었습니다. 질적 수준에서는 의학적 내용의 정확성과 환자 배려에 노력이 보이지만, 의사와 환자 간의 소통이 개선되어야 합니다. 시나리오 적합성에서는 대부분의 질문이 적절했지만, 환자의 인사에 대한 반응이 부적절했습니다. 종합적으로 의료진은 의도를 명확히 하고 의사와 환자 간의 소통을 강화하며, 진단에 필요한 정보를 보완해야 합니다.",
            evaluation_method: "6단계 의학적 분석",
          },
          conversation_summary: {
            total_questions: 0,
            duration_minutes: 1.5,
          },
          detailed_analysis: {
            medical_context: {
              primary_differentials: [
                "알츠하이머병",
                "혈관성 치매",
                "루이 바디병",
              ],
              critical_elements: [
                "신체 검사에서의 신경학적 이상 소견",
                "인지기능 평가 결과",
                "신체 검사 및 혈액검사에서의 대사 이상 소견",
              ],
              time_priority: [
                "뇌기능 영상검사 (뇌 MRI 또는 CT)",
                "신체 검사 및 혈액검사",
                "인지기능 평가",
              ],
              safety_concerns: [
                "안전한 진단을 위해 환자의 현재 약물 복용 여부 확인",
                "안전한 검사를 위해 혈액응고능 검사 실시",
                "안전한 진단을 위해 가족력 및 병력 확인",
              ],
              medical_importance_score: 9,
            },
            question_intent: {
              medical_purpose_clarity: 7,
              systematic_approach: 5,
              patient_centeredness: 6,
              time_efficiency: 4,
              overall_intent_score: 5.5,
              intent_analysis:
                "환자와의 대화가 시작되었지만, 의학적 목적이 명확히 드러나지 않았습니다. 체계적인 접근이 부족하고, 환자 중심적인 질문이 부족하여 환자가 편안하게 대답하기 어려웠습니다. 시간을 효율적으로 활용하지 못한 면이 있습니다.",
            },
            completeness: {
              category_completeness: {
                O_onset: {
                  completion_level: "partial",
                  medical_risk_level: "medium",
                  completeness_score: 7,
                  evidence:
                    "환자의 발언 '들어가세요'를 통해 증상이 발생한 시기에 대한 정보를 얻을 수 있음. 하지만 명시적인 발병 시기에 대한 질문이 없었고, 상세한 정보는 부족함.",
                },
                Co_course: {
                  completion_level: "partial",
                  medical_risk_level: "medium",
                  completeness_score: 6,
                  evidence:
                    "환자와의 대화에서 증상의 악화/완화 경향에 대한 직접적인 질문은 없었지만, 간접적으로 증상의 변동성을 확인하기 위해 대화가 진행되었습니다.",
                },
                Ex_experience: {
                  completion_level: "partial",
                  medical_risk_level: "low",
                  completeness_score: 6,
                  evidence:
                    "환자가 직접적으로 유사한 경험에 대한 언급을 하지는 않았지만, 대화 맥락에서 유추할 수 있는 부분이 있음.",
                },
                C_character: {
                  completion_level: "partial",
                  medical_risk_level: "low",
                  completeness_score: 6,
                  evidence:
                    "환자와의 대화에서 증상의 성질이나 양상에 대한 구체적인 질문이 없었으나, 통증의 강도에 대한 정보 수집을 시도함",
                },
                A_associated: {
                  completion_level: "none",
                  medical_risk_level: "low",
                  completeness_score: 2,
                  evidence:
                    "대화에서 동반 증상에 대한 질문이나 정보 수집이 전혀 이루어지지 않았습니다.",
                },
                F_factor: {
                  completion_level: "partial",
                  medical_risk_level: "medium",
                  completeness_score: 6,
                  evidence:
                    "환자와의 대화에서 악화/완화요인에 대한 명시적인 질문은 없었지만, 대화 맥락에서 약간의 정보가 파악됨. 예를 들어, 환자의 말투나 상황에서 간접적으로 악화/완화요인에 대한 정보를 유추할 수 있음.",
                },
                E_exam: {
                  completion_level: "partial",
                  medical_risk_level: "medium",
                  completeness_score: 6,
                  evidence: "환자: 들어가세요.",
                },
                trauma_history: {
                  completion_level: "partial",
                  medical_risk_level: "medium",
                  completeness_score: 7,
                  evidence:
                    "환자와의 대화에서 외상 경험에 관한 질문이 없었지만, 외상 관련 단어(머리 다침, 낙상)이 언급되어 외상력이 간접적으로 다뤄졌습니다.",
                },
                past_medical_history: {
                  completion_level: "partial",
                  medical_risk_level: "medium",
                  completeness_score: 6,
                  evidence:
                    "환자가 직접적으로 과거력에 대한 정보를 제공하지 않았지만, 대화 맥락에서 환자의 과거력이 어느 정도 파악됨",
                },
                medication_history: {
                  completion_level: "partial",
                  medical_risk_level: "medium",
                  completeness_score: 6,
                  evidence:
                    "환자와의 대화에서 약물력에 대한 질문이 일부 포함되었으나, 상세한 정보는 부족함. 환자의 현재 복용 중인 처방약이나 알레르기 반응에 대한 정보는 언급되지 않았음.",
                },
                family_history: {
                  completion_level: "partial",
                  medical_risk_level: "medium",
                  completeness_score: 6,
                  evidence:
                    "환자와의 대화에서 가족력에 대한 질문이 명시적으로 이뤄지지는 않았지만, 환자의 말에서 가족 중 유전적 질환을 가진 사람이 있다는 정보가 간접적으로 파악됨.",
                },
                social_history: {
                  completion_level: "partial",
                  medical_risk_level: "medium",
                  completeness_score: 6,
                  evidence:
                    "환자와의 대화에서는 사회력 관련 질문이 일부 다뤄졌으나, 식습관이나 운동습관에 대한 질문은 없었습니다. 환자의 직업적 스트레스 요인에 대해서는 간접적으로 언급되었습니다.",
                },
                examination_preparation: {
                  completion_level: "partial",
                  medical_risk_level: "low",
                  completeness_score: 7,
                  evidence:
                    "환자와의 대화에서 진찰 준비 관련 내용이 언급되지 않았으나, 환자의 안내에 따라 진료실로 들어가는 상황이 포착됨.",
                },
                vital_signs: {
                  completion_level: "partial",
                  medical_risk_level: "medium",
                  completeness_score: 7,
                  evidence:
                    "환자: 안녕하세요. 환자: 안녕하세요. 환자: 들어가세요.",
                },
                physical_examination_technique: {
                  completion_level: "partial",
                  medical_risk_level: "medium",
                  completeness_score: 6,
                  evidence:
                    "환자가 안녕하세요 인사를 한 후 '들어가세요'라는 발언이 있어, 신체진찰을 시작하려는 의사적인 의도가 간접적으로 파악됨.",
                },
                examination_attitude: {
                  completion_level: "partial",
                  medical_risk_level: "low",
                  completeness_score: 6,
                  evidence:
                    "환자와의 대화에서 진찰 태도에 대한 언급이 일부 있었으나 부족한 면이 있음. 환자의 안부를 묻고 들어가는 과정에서 부드럽고 신중한 접근이 보여졌으나 진찰 과정 설명이나 전문적 태도 유지에 대한 내용은 다뤄지지 않았음.",
                },
                condition_explanation: {
                  completion_level: "partial",
                  medical_risk_level: "medium",
                  completeness_score: 6,
                  evidence:
                    "환자와의 대화에서 상태 설명에 대해 언급은 있었지만, 자세한 정보나 추가 검사 필요성 설명은 부족한 편이었습니다.",
                },
                lifestyle_guidance: {
                  completion_level: "none",
                  medical_risk_level: "low",
                  completeness_score: 2,
                  evidence:
                    "대화에서는 생활 지도와 관련된 내용이 전혀 다뤄지지 않았습니다.",
                },
                treatment_plan: {
                  completion_level: "partial",
                  medical_risk_level: "medium",
                  completeness_score: 6,
                  evidence:
                    "환자와의 대화에서 치료 방향 설명과 추가 검사 계획은 다뤄졌지만 약물 치료 계획과 예후 설명은 언급되지 않았습니다.",
                },
                communication_skills: {
                  completion_level: "none",
                  medical_risk_level: "low",
                  completeness_score: 0,
                  evidence:
                    "환자와의 대화에서 의사소통 기술에 관련된 내용이 전혀 다뤄지지 않았습니다.",
                },
              },
              overall_completeness_score: 5.5,
              critical_gaps: [
                "A (Associated symptom) - 동반 증상",
                "생활 지도",
                "의사소통 기술",
              ],
              medical_completeness_analysis:
                "개별 카테고리 평가를 통해 20개 항목 중 3개 항목이 누락되었습니다.",
            },
            quality: {
              medical_accuracy: 5,
              communication_efficiency: 4,
              clinical_practicality: 3,
              patient_care: 7,
              overall_quality_score: 4.75,
              quality_analysis:
                "환자와의 대화가 시작적이며 의학적인 내용이 부족합니다. 의사와 환자 간의 소통이 더 원활하고 의학적인 정보 전달이 더 정확하게 이루어져야 합니다. 환자 배려에는 어느 정도 노력이 보이지만, 전반적으로 향후 개선이 필요합니다.",
            },
            appropriateness: {
              inappropriate_questions: ["환자의 인사에 대한 반응이 부적절함"],
              scenario_specific_score: 7,
              patient_profile_score: 8,
              time_allocation_score: 6,
              overall_appropriateness_score: 7,
              appropriateness_analysis:
                "이 시나리오는 신경과 치매 케이스를 다루고 있으며, 대부분의 질문이 적절한 내용을 다루고 있습니다. 그러나 환자의 인사에 대한 반응이 부적절했으며, 좀 더 친근하고 이해심 깊은 반응이 필요합니다. 시간 배분은 적절하나, 대화의 흐름을 유지하면서 더 깊이 있는 진단을 위한 질문이 필요할 수 있습니다.",
            },
            comprehensive: {
              final_completion_rate: 0.8,
              final_quality_score: 7.5,
              weighted_scores: {
                completeness_weighted: 32.0,
                quality_weighted: 22.5,
                appropriateness_weighted: 16.0,
                intent_weighted: 8.5,
              },
              detailed_feedback: {
                strengths: [
                  "환자와의 대화에서 일부 정보 파악 가능",
                  "환자 배려에 노력이 보임",
                ],
                weaknesses: [
                  "동반 증상 및 의사소통 기술 부족",
                  "진단에 필요한 정보 누락",
                ],
                medical_insights: [
                  "알츠하이머병, 혈관성 치매, 루이 바디병에 대한 의심",
                  "안전 및 진단 중요성 강조 필요",
                ],
              },
              comprehensive_analysis:
                "종합 평가 결과, 의료진은 대화의 의도를 명확히 하고 체계적인 접근을 통해 환자 중심적인 질문을 할 필요가 있습니다. 의학적 완성도에서는 동반 증상 및 의사소통 기술 부분이 부족하며, 진단에 필요한 정보가 누락되었습니다. 질적 수준에서는 의학적 내용의 정확성과 환자 배려에 노력이 보이지만, 의사와 환자 간의 소통이 개선되어야 합니다. 시나리오 적합성에서는 대부분의 질문이 적절했지만, 환자의 인사에 대한 반응이 부적절했습니다. 종합적으로 의료진은 의도를 명확히 하고 의사와 환자 간의 소통을 강화하며, 진단에 필요한 정보를 보완해야 합니다.",
            },
          },
          evaluation_method: "6단계 의학적 분석",
          system_info: {
            version: "v2.0",
            evaluation_steps: 6,
          },
        },
        conversation_entries: [
          {
            timestamp: "2025-08-13T14:49:07.393664",
            text: "안녕하세요.",
            speaker_role: "doctor",
            emotion: null,
            audio_file:
              "temp_audio/test_user/20250813_144818/stream_989811.wav",
          },
          {
            timestamp: "2025-08-13T14:49:07.394054",
            text: "안녕하세요.",
            speaker_role: "patient",
            emotion: null,
            audio_file: "tts_20fe90b72e2875bd86705e76d22fa5ee.mp3",
          },
          {
            timestamp: "2025-08-13T14:49:17.885314",
            text: "들어가세요.",
            speaker_role: "doctor",
            emotion: null,
            audio_file:
              "temp_audio/test_user/20250813_144818/stream_989820.wav",
          },
        ],
      };

      if (data && data.cpx_detail) {
        data.cpx_detail.system_evaluation_data =
          JSON.stringify(testEvaluationData);
      }
      // --- 임시 테스트 데이터 삽입 끝 ---

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
          isAdmin={!!id}
        />
      )}
    </>
  );
};

export default Result;
