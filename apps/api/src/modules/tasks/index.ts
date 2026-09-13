import type { FastifyInstance } from 'fastify';
import { apiPaths } from '@da-agent/shared';

export async function taskRoutes(app: FastifyInstance) {
  app.get(apiPaths.tasks, async () => []);
}
