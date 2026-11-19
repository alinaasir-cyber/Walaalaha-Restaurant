import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const orderItemInputSchema = z.object({
  menuItemId: z.string().min(1, "Menu item ID is required"),
  quantity: z.number().int().positive("Quantity must be a positive whole number"),
  notes: z.string().optional(),
});

export const createOrderSchema = z.object({
  tableId: z.string().optional(),
  type: z.enum(["DINE_IN", "TAKEAWAY", "DELIVERY"]),
  items: z.array(orderItemInputSchema).min(1, "Order must contain at least 1 item"),
  notes: z.string().optional(),
});

export const paymentSchema = z.object({
  orderId: z.string().min(1, "Order ID is required"),
  method: z.enum(["CASH", "EVC_PLUS", "ZAAD", "SAHAL", "PREMIER_BANK", "CARD"]),
  amount: z.number().positive("Payment amount must be greater than 0"),
  referenceCode: z.string().optional(),
});
