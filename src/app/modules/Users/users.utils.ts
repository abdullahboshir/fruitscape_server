import { USER_ROLE } from "./users.constant"
import User from "./users.model"


export const findLastUser = async (
  role: string,
): Promise<string | undefined> => {
  try {
    const lastUser = await User.findOne({ role }, { id: 1 })
      .sort({ createdAt: -1 })
      .lean()

    return typeof lastUser?.id === 'string' ? lastUser.id : undefined
  } catch (error) {
    console.error('Error fetching last student user:', error)
    return undefined
  }
}


export const generateIncreament = (lastIncrement: string | undefined) => {
  try {
    let newIncrement = '00001'

    if (lastIncrement) {
        const match = lastIncrement.match(/^CUS-\d{6}-[A-Z]{2}(\d{5})$/);
      if (match && match[1]) {
        const lastIncrement = parseInt(match[1], 10)
        newIncrement = String(lastIncrement + 1).padStart(5, '0')
      }
    }
    return newIncrement
  } catch (error) {
    console.error('Error fetching last student user:', error)
    return undefined
  }
}


export const genereteCustomerId = async (name: {firstName: string, lastName: string}) => {
    const {firstName, lastName} = name;
    const shortName = (firstName.trim().charAt(0) + lastName.trim().charAt(0)).toUpperCase();
    const prefix = 'CUS';
    const date = new Date().toISOString().slice(2, 10).replace(/-/g, "");
    const lastUserId = await findLastUser(USER_ROLE?.customer);
    const newIncrement = generateIncreament(lastUserId)

    const finalId = `${prefix}-${date}-${shortName + newIncrement}`;
    return finalId;

} 