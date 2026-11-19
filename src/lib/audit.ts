import { prisma } from "./prisma";

export interface LogAuditParams {
  userId?: string | null;
  userEmail?: string | null;
  userRole?: string | null;
  action: string;
  entityType: string;
  entityId?: string | null;
  details?: Record<string, any> | string | null;
  ipAddress?: string | null;
}

/**
 * Audit Logger: Immutably records critical actions taken across the ERP.
 * Tracks user, role, entity, timestamp, and details for anti-fraud & transparency.
 */
export async function logAudit(params: LogAuditParams) {
  try {
    const detailsString =
      typeof params.details === "object"
        ? JSON.stringify(params.details)
        : params.details || null;

    return await prisma.auditLog.create({
      data: {
        userId: params.userId || null,
        userEmail: params.userEmail || null,
        userRole: params.userRole || null,
        action: params.action,
        entityType: params.entityType,
        entityId: params.entityId || null,
        details: detailsString,
        ipAddress: params.ipAddress || null,
      },
    });
  } catch (error) {
    // Audit log should never crash the main transaction, but must be reported
    console.error("Audit log failed to record:", error);
  }
}
