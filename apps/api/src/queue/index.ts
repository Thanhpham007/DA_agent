export type AiJob = {
  taskId: string;
  messageId: string;
  text: string;
  fileIds?: string[];
  model?: string;
};

export async function enqueueChatJob(job: AiJob): Promise<{ queued: boolean; job: AiJob }> {
  // Placeholder: swap for Redis + BullMQ when the AI worker is wired.
  return { queued: false, job };
}
