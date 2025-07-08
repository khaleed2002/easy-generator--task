# Easy Generator Task Backend

This is a **NestJS** backend for authentication and user management, using MongoDB and JWT.

---

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- Docker (for local MongoDB)

### Environment Variables

Create a `.env` file in the root of `apps/server/` with the following:

```
MONGODB_URI=<your-mongodb-uri>
JWT_SECRET=<your-jwt-secret>
JWT_EXPIRES_IN=7d
```

- If you want a local MongoDB instance, run:
  ```bash
  docker-compose up
  ```
  This will start MongoDB and you can use the URI: `mongodb://admin:saskq%40Pasa%40%23s25s%4054@localhost:27017/easy-generator--task?authSource=admin`

## Running the Project with Nx

First, install dependencies at the root of the repo:

```bash
npm install
```

Then, to start the backend server, run:

```bash
npx nx run @easy-generator--task/server:serve

You can also use the Nx Console extension for VS Code for a visual experience.

---

---

## API Documentation

Full API documentation is available in [API_DOCS.md](./API_DOCS.md).
```
