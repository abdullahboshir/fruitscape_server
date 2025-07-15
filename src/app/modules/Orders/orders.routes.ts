import { Router } from "express";
import { validateRequest } from "../../middlewares/validateRequest";
import { createOrderZodSchema } from "./orders.validation";
import { createOrderController } from "./orders.controller";

const router = Router();


router.post('/create', validateRequest(createOrderZodSchema), createOrderController)



export const OrderRoutes = router;