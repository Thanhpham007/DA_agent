import type { FastifyInstance } from 'fastify';
import { apiPaths } from '@da-agent/shared';
import { enqueueChatJob } from '../../queue/index.js';

export async function chatRoutes(app: FastifyInstance) {
  app.post(apiPaths.taskMessagesPattern, async (request) => {
    const { taskId } = request.params as { taskId: string };
    const body = (request.body ?? {}) as { text?: string; fileIds?: string[]; model?: string };
    return enqueueChatJob({
      taskId,
      messageId: `msg-${Date.now()}`,
      text: body.text ?? '',
      fileIds: body.fileIds,
      model: body.model,
    });
  });
}
