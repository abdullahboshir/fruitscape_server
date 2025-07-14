import { Supplier } from './supplier.model'


export const findLastSupplier = async (
  country: string,
  dateCode: string
): Promise<string | undefined> => {
  try {
    const regexPattern = new RegExp(`^SUP-${country}-${dateCode}-\\d{3}$`, 'i')

    const lastSupplier = await Supplier.findOne({ code: { $regex: regexPattern } })
      .sort({ createdAt: -1 })
      .lean()

    return typeof lastSupplier?.code === 'string' ? lastSupplier.code : undefined
  } catch (error) {
    console.error('❌ Error finding last supplier:', error)
    return undefined
  }
}


export const generateIncrement = (lastCode: string | undefined): string => {
  try {
    let newIncrement = '001'

    if (lastCode) {
      const match = lastCode.match(/-(\d{3})$/)
      if (match && match[1]) {
        const lastNumber = parseInt(match[1], 10)
        newIncrement = String(lastNumber + 1).padStart(3, '0')
      }
    }

    return newIncrement
  } catch (error) {
    console.error('❌ Error generating increment:', error)
    return '001'
  }
}


export const generateSupplierCode = async (
  country: string
): Promise<string> => {
  const prefix = 'SUP'
  const countryCode = country.trim().toUpperCase()

  const now = new Date()
  const yy = now.getFullYear().toString().slice(-2)
  const mm = (now.getMonth() + 1).toString().padStart(2, '0')
  const dd = now.getDate().toString().padStart(2, '0')
  const dateCode = `${yy}${mm}${dd}`

  const lastCode = await findLastSupplier(countryCode, dateCode)
  const increment = generateIncrement(lastCode)

  return `${prefix}-${countryCode}-${dateCode}-${increment}`
}
