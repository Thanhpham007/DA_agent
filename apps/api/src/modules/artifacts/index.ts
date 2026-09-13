import type { FastifyInstance } from 'fastify';
import { apiPaths } from '@da-agent/shared';

export async function artifactRoutes(app: FastifyInstance) {
  app.get(apiPaths.artifacts, async () => []);
}
