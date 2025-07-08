# API Documentation

## Authentication

> All authentication endpoints are prefixed with `/auth` (optionally under a global `/api` prefix).  
> Access tokens are returned in responses; refresh tokens are set as HTTP-only cookies under the name `refresh_token`.

---

## Public Endpoints

### `POST /auth/sign-up`

- **Purpose**: Register a new user.
- **Request Body** (JSON):

  ```json
  {
    "email": "user@example.com",
    "password": "Password123!",
    "name": "John Doe"
  }
  ```

- **Responses**:

  - **201 Created**

    ```json
    {
      "access_token": "<jwt>"
    }
    ```

    - Sets a `refresh_token` HTTP-only cookie.

  - **400 Bad Request**
    Validation errors (e.g. missing fields, invalid email, weak password).
  - **409 Conflict**
    Email already in use:

    ```json
    {
      "statusCode": 409,
      "message": "User with this email already exists",
      "error": "Conflict"
    }
    ```

### `POST /auth/sign-in`

- **Purpose**: Authenticate an existing user.
- **Request Body** (JSON):

  ```json
  {
    "email": "user@example.com",
    "password": "Password123!"
  }
  ```

- **Responses**:

  - **200 OK**

    ```json
    {
      "access_token": "<jwt>"
    }
    ```

    - Sets a `refresh_token` HTTP-only cookie.

  - **401 Unauthorized**
    Invalid credentials:

    ```json
    {
      "statusCode": 401,
      "message": "Invalid Credentials",
      "error": "Unauthorized"
    }
    ```

---

## Protected Endpoints

### `POST /auth/logout`

- **Purpose**: Log out the user and revoke their refresh token.
- **Headers**:

  ```
  Authorization: Bearer <access_token>
  ```

- **Responses**:

  - **200 OK**

    ```json
    {}
    ```

    - Clears the `refresh_token` cookie.

  - **401 Unauthorized**
    Missing or invalid access token.

### `POST /auth/refresh`

- **Purpose**: Issue a new access token using the refresh token.
- **Cookies**:
  Reads `refresh_token` from HTTP-only cookie (no request body).
- **Responses**:

  - **200 OK**

    ```json
    {
      "access_token": "<new_jwt>"
    }
    ```

    - Sets a new `refresh_token` cookie.

  - **403 Forbidden**
    Missing or invalid refresh token:

    ```json
    {
      "statusCode": 403,
      "message": "Access Denied",
      "error": "Forbidden"
    }
    ```

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

## Password Requirements

- Minimum length: 8 characters
- At least one uppercase letter (`A–Z`)
- At least one lowercase letter (`a–z`)
- At least one digit (`0–9`)
- At least one special character (e.g. `!@#$&*`)

---

> **Note**:
>
> - Refresh tokens are **never** exposed in response bodies—only via secure HTTP-only cookies.
> - All protected endpoints must include `Authorization: Bearer <access_token>`.

```

```
