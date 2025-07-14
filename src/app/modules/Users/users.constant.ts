export const USER_ROLE = {
  superAdmin: 'superAdmin',
  admin: 'admin',
  moderator: 'moderator',
  customer: 'customer',
  visitor: 'visitor',
} as const

export const USER_STATUS = {
  active: 'active',
  inactive: 'inactive',
  blocked: 'blocked',
} as const;


export const USER_ROLE_ARRAY = Object.values(USER_ROLE);
export const USER_STATUS_ARRAY = Object.values(USER_STATUS);
