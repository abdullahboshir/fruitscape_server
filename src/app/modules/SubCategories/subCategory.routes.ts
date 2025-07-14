import { Router } from "express";
import { validateRequest } from "../../middlewares/validateRequest";
import { subcategoryZodSchema } from "./subCategory.validation";
import { createSubCategoryController } from "./subCategory.controller";

const router = Router();


router.post('/create', validateRequest(subcategoryZodSchema), createSubCategoryController)

export const subCategoryRoutes = router;