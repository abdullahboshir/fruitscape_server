import { Category } from "../Categories/categories.model";
import { ISubcategory } from "./subCategory.interface";
import { SubCategory } from "./subCategory.model";



export const createSubCategoryService = async (payload: ISubcategory) => {
const result = await SubCategory.create(payload)
return result;
}