export interface ServerMessage {
  type: string;
  message?: string;
  user_text?: string;
  ai_text?: string;
  tts_audio_base64?: string;
  avatar_action?: string;
  conversation_ended?: boolean;
  scenarios?: Record<string, { name: string; description: string }>;
  scenario_name?: string;
  result_id?: number;
}
