export interface UserProfile {
  email: string;
  name: string;
  avatarUrl: string;
  tokens: number;
  plan: 'free' | 'pro' | 'team';
}

export interface UploadedFile {
  id: string;
  name: string;
  size: number;
  sizeFormatted: string;
  uploadDate: string;
  type: string;
  status: 'ready' | 'processing' | 'error';
  contentSnippet?: string;
  dataRowCount?: number;
}

export interface TaskItem {
  id: string;
  title: string;
  updatedAt: string;
  messageCount: number;
  tags?: string[];
  preview?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  timestamp: string;
  text: string;
  reasoning?: string;
  isReasoningExpanded?: boolean;
  code?: string;
  codeOutput?: string;
  artifact?: {
    type: 'chart' | 'table' | 'slide' | 'code';
    title: string;
    data?: unknown;
  };
  attachments?: string[];
}

export type ConnectorCategory = 'all' | 'data-warehouses' | 'databases' | 'integrations';

export interface Connector {
  id: string;
  name: string;
  description: string;
  category: 'data-warehouses' | 'databases' | 'integrations';
  categoryLabel: 'Database' | 'Data Warehouse' | 'Integration';
  isNew?: boolean;
  connected?: boolean;
  iconType:
    | 'postgres'
    | 'bigquery'
    | 'snowflake'
    | 'mysql'
    | 'sqlserver'
    | 'supabase'
    | 'gdrive'
    | 'gsheets'
    | 'onedrive'
    | 'sharepoint'
    | 'gads'
    | 'metaads';
}

export interface ArtifactItem {
  id: string;
  title: string;
  type: 'chart' | 'image' | 'slide' | 'dataset' | 'report';
  createdAt: string;
  sourceTaskTitle: string;
  thumbnailUrl?: string;
  dataSummary?: string;
}
