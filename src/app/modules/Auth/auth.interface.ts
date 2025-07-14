import z from "zod";
import { loginZodSchema } from "./auth.validation";

export type TLoginPayload = z.infer<typeof loginZodSchema>;