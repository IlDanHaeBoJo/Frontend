// 백엔드에서 실제 반환하는 필드명
export interface ScenarioImageResponse {
  scenario_id: string;
  image_info: {
    s3_key: string;
    filename: string;
    file_size: number;
    file_type: string;
    last_modified: string;
    etag: string;
  };
  presigned_url: string;
  expires_in: number;
  message: string;
}

// 프론트엔드에서 사용하는 변환된 형태
export interface Scenario {
  scenario_id: number;
  scenario_name: string;
  description?: string;
  patient_image_url?: string;
}
