import { getUsers } from "./users.js";

export type LoginResult =
  | { success: true; username: string }
  | {
      success: false;
      code:
        | "MISSING_CREDENTIALS"
        | "BLANK_USERNAME"
        | "BLANK_PASSWORD"
        | "INVALID_CREDENTIALS";
    };

/**
 * Validate credentials and attempt login. Business logic only; no HTTP.
 * Trims username before validation.
 */
export function login(username: string, password: string): LoginResult {
  const trimmedUsername = username.trim();

  if (trimmedUsername === "" && password === "") {
    return { success: false, code: "MISSING_CREDENTIALS" };
  }
  if (trimmedUsername === "") {
    return { success: false, code: "BLANK_USERNAME" };
  }
  if (password === "") {
    return { success: false, code: "BLANK_PASSWORD" };
  }

  const users = getUsers();
  const user = users.find((u) => u.username === trimmedUsername);
  if (!user || user.password !== password) {
    return { success: false, code: "INVALID_CREDENTIALS" };
  }

  return { success: true, username: trimmedUsername };
}
