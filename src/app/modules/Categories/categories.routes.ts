import { Router } from "express";
import { validateRequest } from "../../middlewares/validateRequest";
import { categoryZodSchema } from "./categories.validation";
import { createCategoryController } from "./categories.controller";

const router = Router();

router.post('/create', validateRequest(categoryZodSchema), createCategoryController)


export const CategoryRoutes = router;