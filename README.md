# DA Agent

Monorepo for the data-analysis workspace: web UI, API, and a future AI worker.

## Layout

```
apps/web          React + Vite UI
apps/api          Fastify API (auth, files, tasks, connectors, chat)
packages/shared   Shared models and API paths
services/ai       Python AI worker (not wired yet)
infra             Local Postgres + Redis
```

## Run locally

Prerequisites: Node.js 20+

```bash
npm install
npm run dev:web
```

API skeleton:

```bash
npm run dev:api
```

Infrastructure:

```bash
docker compose -f infra/docker-compose.yml up -d
```

The UI still uses in-memory mock data. `apps/web/src/api` will call the API when `VITE_API_URL` is set (or via the Vite proxy to `http://localhost:4000`).
