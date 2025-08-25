export interface CpxDetail {
  conversation_transcript?: string;
  memo: string;
  system_evaluation_data: any;
  detail_id: number;
  result_id: number;
  last_updated_at: string;
}

export interface CpxEvaluation {
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

export interface ResultDetail {
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

export interface CpxResult {
  student_id: number;
  patient_name: string;
  evaluation_status: string;
  result_id: number;
  practice_date: string;
  created_at: string;
  updated_at: string;
}
