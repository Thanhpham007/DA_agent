import { apiPaths, type ArtifactItem, type Connector, type TaskItem, type UploadedFile, type UserProfile } from '@da-agent/shared';
import {
  connectorsList,
  currentUser,
  initialArtifacts,
  initialFiles,
  initialTasks,
} from '../stores/mockData';

const apiBase = import.meta.env.VITE_API_URL ?? '';

async function getJson<T>(path: string, fallback: T): Promise<T> {
  if (!apiBase) {
    return fallback;
  }
  const response = await fetch(`${apiBase}${path}`);
  if (!response.ok) {
    return fallback;
  }
  return response.json() as Promise<T>;
}

export function listTasks(): Promise<TaskItem[]> {
  return getJson(apiPaths.tasks, initialTasks);
}

export function listFiles(): Promise<UploadedFile[]> {
  return getJson(apiPaths.files, initialFiles);
}

export function listConnectors(): Promise<Connector[]> {
  return getJson(apiPaths.connectors, connectorsList);
}

export function listArtifacts(): Promise<ArtifactItem[]> {
  return getJson(apiPaths.artifacts, initialArtifacts);
}

export function getCurrentUser(): Promise<UserProfile> {
  return getJson(apiPaths.me, currentUser);
}
