import { Router } from 'express'
import { CustomerRoutes } from '../modules/Customers/customers.routes'
import { UserRoutes } from '../modules/Users/users.routes'
import { AuthRoutes } from '../modules/Auth/auth.routes'
import { SupplierRoutes } from '../modules/Suppliers/supplier.route'

const router = Router()

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/customers',
    route: CustomerRoutes,
  },
  {
    path: '/suppliers',
    route: SupplierRoutes,
  },
]

moduleRoutes.forEach(route => {
  router.use(route.path, route.route)
})

export default router
