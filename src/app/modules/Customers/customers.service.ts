import { TCustomer } from "./customers.interface";
import Customer from "./customers.model";

export const createCustomerService = async (payload: TCustomer) => {
const result = await Customer.create(payload);

return result; 
} 