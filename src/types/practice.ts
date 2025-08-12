export interface ServerMessage {
  type: string;
  message?: string;
  user_text?: string;
  ai_text?: string;
  audio_url?: string;
  avatar_action?: string;
  conversation_ended?: boolean;
  scenarios?: Record<string, { name: string; description: string }>;
  scenario_name?: string;
}
