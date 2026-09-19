# Services

API client layer for LINKSUPPLIED.

This directory will house:
- **api/client.ts** — Base HTTP client (axios/fetch wrapper) with auth headers, error handling, and retry logic
- **api/endpoints/** — Domain-specific API modules (companies, matching, verification, auth, etc.)
- **websocket.ts** — Real-time messaging client (when messaging is implemented)

Currently empty — all data is mock (see `src/data/`). When backend APIs are connected, mock data imports will be replaced with service calls.
