import { Router } from "express";
import { supplierZodSchema } from "./supplier.validation";
import { createSupplierController } from "./supplier.controller";
import { validateRequest } from "../../middlewares/validateRequest";



const router = Router();


router.post('/create', validateRequest(supplierZodSchema), createSupplierController)


export const SupplierRoutes = router;