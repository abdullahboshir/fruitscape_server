import { IOrder } from "./orders.interface";
import { Order } from "./orders.model";

export const createOrderService = async (payload: IOrder) => {
    const result = await Order.create(payload)
    return result;
}