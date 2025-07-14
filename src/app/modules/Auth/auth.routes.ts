import { Router } from "express";
import { loginController } from "./auth.controller";
import { loginZodSchema } from "./auth.validation";
import { validateRequest } from "../../middlewares/validateRequest";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../Users/users.constant";


const router = Router();


router.post('/login', validateRequest(loginZodSchema), loginController)


export const AuthRoutes = router;