import { ICategory } from "./categories.interface";
import { Category } from "./categories.model";

export const createCategoryService = async (payload: ICategory) => {
const result = await Category.create(payload);
return result;
};