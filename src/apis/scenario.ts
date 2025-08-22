import { api } from ".";
import { ScenarioImageResponse, Scenario } from "../types/scenario";



// 시나리오 번호로 환자 이미지 URL 가져오기
export const getScenarioImage = async (
  scenarioId: number
): Promise<Scenario> => {
  try {
    // 백엔드 API 사용
    const response = await api.get(`/patient-images/scenarios/${scenarioId}/image`);
    const data: ScenarioImageResponse = response.data;
    
    // 백엔드 응답을 프론트엔드 형태로 변환
    // Presigned URL을 직접 사용
    const imageUrl = data.presigned_url || "";
    console.log(`시나리오 ${data.scenario_id} Presigned URL:`, imageUrl);
    
    return {
      scenario_id: parseInt(data.scenario_id),
      scenario_name: `시나리오 ${data.scenario_id}`, // 기본 이름 사용
      description: "", // 기본 설명 사용
      patient_image_url: imageUrl
    };
  } catch (error) {
    console.error("시나리오 이미지 조회 실패:", error);
    throw error;
  }
};

// 모든 시나리오 목록 가져오기
export const getScenarioList = async (): Promise<Scenario[]> => {
  try {
    // 백엔드 API 사용
    const response = await api.get("/scenarios");
    console.log("백엔드 API 응답:", response);
    console.log("응답 데이터:", response.data);
    
    // 백엔드 응답 구조에 따라 데이터 추출
    let scenarios: any[];
    if (Array.isArray(response.data)) {
      scenarios = response.data;
    } else if (response.data.scenarios && Array.isArray(response.data.scenarios)) {
      scenarios = response.data.scenarios;
    } else {
      console.error("예상하지 못한 응답 구조:", response.data);
      throw new Error("백엔드 응답 구조가 예상과 다릅니다");
    }
    
    console.log("추출된 시나리오 데이터:", scenarios);
    
         // 백엔드 응답을 프론트엔드 형태로 변환
     const convertedScenarios: Scenario[] = scenarios.map((data: any) => {
       return {
         scenario_id: parseInt(data.id || data.scenario_id),
         scenario_name: data.name || `시나리오 ${data.id || data.scenario_id}`, // 기본 이름 사용
         description: data.description || "", // 기본 설명 사용
         patient_image_url: "" // 목록에서는 이미지 URL을 제공하지 않음
       };
     });
    
    console.log("변환된 시나리오 데이터:", convertedScenarios);
    return convertedScenarios;
  } catch (error) {
    console.error("시나리오 목록 조회 실패:", error);
    throw error;
  }
};
