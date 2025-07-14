import { TSupplier } from './supplier.interface'
import { Supplier } from './supplier.model'
import { generateSupplierCode } from './supplier.utils'

export const createSupplierService = async (payload: TSupplier) => {
  const supplierCode = await generateSupplierCode(
    payload?.country ? payload?.country : 'BD',
  )
  payload.code = supplierCode

  const result = await Supplier.create(payload)

  return result
}
