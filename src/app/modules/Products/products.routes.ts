import { Router } from "express";
import { validateRequest } from "../../middlewares/validateRequest";
import { productZodSchema } from "./products.validation";
import { createProductController } from "./products.controller";


const router = Router();


router.post('/create', validateRequest(productZodSchema), createProductController)



export const ProductRoutes = router;