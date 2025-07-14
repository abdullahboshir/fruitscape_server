import { Request, Response } from "express"
import { createCustomerService } from "./customers.service"

export const createCustomerController = async (req: Request, res: Response) => {
    const data = await createCustomerService(req.body)

    res.status(200).json({
        success: true,
        message: 'Account has been Created Successfully',
        data
    })
}