export const API_PREFIX = '/api/v1';

export const apiPaths = {
  health: '/health',
  me: `${API_PREFIX}/me`,
  files: `${API_PREFIX}/files`,
  file: (id: string) => `${API_PREFIX}/files/${id}`,
  tasks: `${API_PREFIX}/tasks`,
  task: (id: string) => `${API_PREFIX}/tasks/${id}`,
  taskMessages: (id: string) => `${API_PREFIX}/tasks/${id}/messages`,
  taskMessagesPattern: `${API_PREFIX}/tasks/:taskId/messages`,
  connectors: `${API_PREFIX}/connectors`,
  connector: (id: string) => `${API_PREFIX}/connectors/${id}`,
  artifacts: `${API_PREFIX}/artifacts`,
  artifact: (id: string) => `${API_PREFIX}/artifacts/${id}`,
} as const;

export interface CreateTaskRequest {
  title?: string;
}

export interface SendChatMessageRequest {
  text: string;
  fileIds?: string[];
  model?: string;
}

export interface ToggleConnectorRequest {
  connected: boolean;
}

export interface HealthResponse {
  ok: boolean;
  service: 'api';
}
