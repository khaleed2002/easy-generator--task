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
```

You can also use the Nx Console extension for VS Code for a visual experience.

---

---

## API Endpoints

### Auth

#### Public Endpoints

- **POST `/api/auth/sign-up`**

  - Registers a new user.
  - **Body:**
    ```json
    {
      "email": "user@example.com",
      "password": "Password123!",
      "name": "John Doe"
    }
    ```
  - **Returns:**
    - `201 Created` with tokens:
      ```json
      {
        "access_token": "...",
        "refresh_token": "..."
      }
      ```

- **POST `/api/auth/sign-in`**
  - Logs in a user.
  - **Body:**
    ```json
    {
      "email": "user@example.com",
      "password": "Password123!"
    }
    ```
  - **Returns:**
    - `200 OK` with tokens:
      ```json
      {
        "access_token": "...",
        "refresh_token": "..."
      }
      ```

#### Protected Endpoints (require Bearer token)

- **POST `/api/auth/logout`**

  - Logs out the user (invalidates refresh token).
  - **Headers:**
    - `Authorization: Bearer <access_token>`
  - **Returns:**
    - `200 OK` on success.

- **POST `/api/auth/refresh`**
  - Refreshes access and refresh tokens.
  - **Body:**
    ```json
    {
      "refresh_token": "..."
    }
    ```
  - **Returns:**
    - `200 OK` with new tokens:
      ```json
      {
        "access_token": "...",
        "refresh_token": "..."
      }
      ```

---

## Notes

- All protected endpoints require a valid JWT access token in the `Authorization` header.
