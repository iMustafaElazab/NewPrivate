interface ChatCompletionResponseDTO {
  [x: string]: any;
  choices?: (Choice | null)[] | null;
  created?: number | null;
  id?: string | null;
  model?: string | null;
  objectX?: string | null;
  usage?: Usage | null;
}

interface Choice {
  finishReason?: string | null;
  index?: number | null;
  message?: Message | null;
}

export interface Message {
  content?: string | null;
  role?: string | null;
}

interface Usage {
  completionTokens?: number | null;
  promptTokens?: number | null;
  totalTokens?: number | null;
}

export default ChatCompletionResponseDTO;
