# Easy Generator Task

This project is a fullstack authentication system built with **NestJS** (backend) and **React 19** (frontend), using MongoDB, JWT, and modern UI/UX best practices.

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

### Start the Backend (NestJS)

```bash
npx nx run @easy-generator--task/server:serve
```

### Start the Frontend (React)

```bash
npx nx run @easy-generator--task/client:dev
```

You can also use the Nx Console extension for VS Code for a visual experience.

---

---

---

## Features

- **Modern React 19** with functional components and hooks
- **Reusable UI components** for forms and feedback
- **Live validation** for sign up requirements (with check/cross icons)
- **Loading spinners** for async actions (using lucide-react)
- **Authentication** with JWT, refresh tokens, and protected routes
- **Beautiful UI** with Tailwind CSS

---

## API Documentation

Full API documentation is available in [API_DOCS](/README.api.md).

```

```
