# Easy Generator Task

This project is a fullstack authentication system built with **NestJS** (backend) and **React 19** (frontend), using MongoDB, JWT, and modern UI/UX best practices.

---

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- Docker (for local MongoDB)

### Environment Variables

Your server and client apps require some environment variables to run correctly. Follow the steps below to set them up.

---

#### 1. Server (`apps/server/`)

1. Create a file named `.env` in the root of `apps/server/`.
2. Populate it with the following variables:

   ```dotenv
   # MongoDB connection string
   MONGODB_URI=

   # Server port (default: 3000)
   PORT=

   # JWT configuration
   JWT_SECRET=
   JWT_EXPIRES_IN=

   # Node environment (development | production)
   NODE_ENV=
   ```

3. **Quick‑start Example:**
   If you want to run a local MongoDB via Docker, execute:

   ```bash
   docker-compose up -d
   ```

   Then copy & paste these values into your `.env`:

   ```dotenv
   MONGODB_URI=mongodb://admin:saskq%40Pasa%40%23s25s%4054@localhost:27017/easy-generator--task?authSource=admin
   PORT=3000
   JWT_SECRET=265saws@#ASASwps58q
   JWT_EXPIRES_IN=7d
   NODE_ENV=development
   ```

---

#### 2. Client (`apps/client/`)

1. Create a file named `.env` in the root of `apps/client/`.

2. Add these variables:

   ```dotenv
   # Base URL for API requests
   API_URL=

   # Client dev server port (default: 4200)
   PORT=
   ```

3. **Quick‑start Example:**
   Copy & paste this into your client `.env`:

   ```dotenv
   API_URL=http://localhost:3000/api
   PORT=4200
   ```

````

## Running the Project with Nx

First, install dependencies at the root of the repo:

```bash
npm install
````

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


## API Documentation

Full API documentation is available in [API_DOCS](/README.api.md).
