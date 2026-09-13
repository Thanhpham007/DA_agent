import Fastify from 'fastify';
import cors from '@fastify/cors';
import { apiPaths } from '@da-agent/shared';
import { authRoutes } from './modules/auth/index.js';
import { fileRoutes } from './modules/files/index.js';
import { taskRoutes } from './modules/tasks/index.js';
import { connectorRoutes } from './modules/connectors/index.js';
import { chatRoutes } from './modules/chat/index.js';
import { artifactRoutes } from './modules/artifacts/index.js';

const port = Number(process.env.API_PORT ?? 4000);

const app = Fastify({ logger: true });

await app.register(cors, { origin: true });

app.get(apiPaths.health, async () => ({ ok: true, service: 'api' as const }));

await app.register(authRoutes);
await app.register(fileRoutes);
await app.register(taskRoutes);
await app.register(connectorRoutes);
await app.register(chatRoutes);
await app.register(artifactRoutes);

await app.listen({ port, host: '0.0.0.0' });
