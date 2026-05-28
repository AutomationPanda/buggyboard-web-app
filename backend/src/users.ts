import { readFileSync, existsSync } from "fs";
import { join } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

export interface UserAccount {
  username: string;
  password: string;
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/** Path to users.json at project root (parent of backend). */
function getUsersPath(): string {
  return join(__dirname, "..", "..", "users.json");
}

/**
 * Load all user accounts from users.json at project root.
 * Every user must have a unique username (enforced when adding users; file is source of truth).
 */
export function getUsers(): UserAccount[] {
  const path = getUsersPath();
  if (!existsSync(path)) {
    return [];
  }
  const raw = readFileSync(path, "utf-8");
  const data = JSON.parse(raw) as unknown;
  if (!Array.isArray(data)) {
    return [];
  }
  return data.filter(
    (item): item is UserAccount =>
      typeof item === "object" &&
      item !== null &&
      typeof (item as UserAccount).username === "string" &&
      typeof (item as UserAccount).password === "string"
  );
}
