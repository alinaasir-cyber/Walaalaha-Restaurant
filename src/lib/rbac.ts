import { getSessionFromCookies, SessionPayload } from "./auth";

export type AppRole =
  | "SUPER_ADMIN"
  | "ADMIN"
  | "CASHIER"
  | "WAITER"
  | "ACCOUNTANT"
  | "CHEF"
  | "STORE_KEEPER";

export class UnauthorizedError extends Error {
  constructor(message = "Unauthorized: Please log in to proceed.") {
    super(message);
    this.name = "UnauthorizedError";
  }
}

export class ForbiddenError extends Error {
  constructor(message = "Forbidden: You do not have permission to access this resource.") {
    super(message);
    this.name = "ForbiddenError";
  }
}

/**
 * Requires an authenticated user session.
 * Throws UnauthorizedError if no valid session cookie is present.
 */
export async function requireUser(): Promise<SessionPayload> {
  const session = await getSessionFromCookies();
  if (!session) {
    throw new UnauthorizedError();
  }
  return session;
}

/**
 * Enforces Role-Based Access Control (RBAC) on the server.
 * Never trust UI button visibility: every API / Server Action must call this!
 */
export async function requireRole(allowedRoles: AppRole[]): Promise<SessionPayload> {
  const session = await requireUser();
  if (!allowedRoles.includes(session.role as AppRole)) {
    throw new ForbiddenError(
      `Access denied. Role '${session.role}' is not authorized. Required: [${allowedRoles.join(", ")}]`
    );
  }
  return session;
}
