import AppError from '../../errors/AppError'
import { Category } from '../Categories/categories.model'
import { IProduct } from './products.interface'
import { Product } from './products.model'
import { generateProductCode } from './products.util'

export const createProductService = async (payload: IProduct) => {
  const category = await Category.findOne({ name: payload?.category })

  if (!category) {
    new AppError(200, 'The User already has registered!')
  }

  const productSku = await generateProductCode(category?.name? category?.name : 'others', payload?.origin);

  payload.sku = productSku;

  const result = await Product.create(payload);
  return result;
}
