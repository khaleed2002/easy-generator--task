# API Documentation

## Authentication

### Public Endpoints

#### POST `/api/auth/sign-up`

- **Description:** Register a new user.
- **Request Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "Password123!",
    "name": "John Doe"
  }
  ```
- **Responses:**
  - `201 Created`
    ```json
    {
      "access_token": "<jwt>",
      "refresh_token": "<jwt>"
    }
    ```
  - `400 Bad Request` — Validation errors.

#### POST `/api/auth/sign-in`

- **Description:** Log in an existing user.
- **Request Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "Password123!"
  }
  ```
- **Responses:**
  - `200 OK`
    ```json
    {
      "access_token": "<jwt>",
      "refresh_token": "<jwt>"
    }
    ```
  - `403 Forbidden` — Invalid credentials.

### Protected Endpoints (Require Bearer Token)

#### POST `/api/auth/logout`

- **Description:** Log out the user and invalidate the refresh token.
- **Headers:**
  - `Authorization: Bearer <access_token>`
- **Responses:**
  - `200 OK` — Successfully logged out.
  - `401 Unauthorized` — Invalid or missing token.

#### POST `/api/auth/refresh`

- **Description:** Refresh access and refresh tokens.
- **Request Body:**
  ```json
  {
    "refresh_token": "<jwt>"
  }
  ```
- **Responses:**
  - `200 OK`
    ```json
    {
      "access_token": "<jwt>",
      "refresh_token": "<jwt>"
    }
    ```
  - `403 Forbidden` — Invalid or expired refresh token.

---

## Error Response Example

```json
{
  "statusCode": 400,
  "message": ["property `email` should be provided in request body."],
  "error": "Bad Request"
}
```

---

- All protected endpoints require a valid JWT access token in the `Authorization` header.
- Passwords must contain at least one letter, one number, and one special character.
