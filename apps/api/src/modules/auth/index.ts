import type { FastifyInstance } from 'fastify';
import { apiPaths } from '@da-agent/shared';

export async function authRoutes(app: FastifyInstance) {
  app.get(apiPaths.me, async () => ({
    email: 'phuthanh1206@gmail.com',
    name: 'Phu Thanh',
    avatarUrl: '',
    tokens: 50,
    plan: 'free' as const,
  }));
}
