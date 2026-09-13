import type { FastifyInstance } from 'fastify';
import { apiPaths } from '@da-agent/shared';

export async function connectorRoutes(app: FastifyInstance) {
  app.get(apiPaths.connectors, async () => []);
}
