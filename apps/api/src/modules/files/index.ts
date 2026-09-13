import type { FastifyInstance } from 'fastify';
import { apiPaths } from '@da-agent/shared';

export async function fileRoutes(app: FastifyInstance) {
  app.get(apiPaths.files, async () => []);
}
