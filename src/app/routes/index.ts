import { Router } from 'express'
import { CustomerRoutes } from '../modules/Customers/customers.routes'
import { UserRoutes } from '../modules/Users/users.routes'
import { AuthRoutes } from '../modules/Auth/auth.routes'
import { SupplierRoutes } from '../modules/Suppliers/supplier.route'
import { CategoryRoutes } from '../modules/Categories/categories.routes'
import { subCategoryRoutes } from '../modules/SubCategories/subCategory.routes'
import { ProductRoutes } from '../modules/Products/products.routes'
import { OrderRoutes } from '../modules/Orders/orders.routes'

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
  {
    path: '/products',
    route: ProductRoutes,
  },
  {
    path: '/category',
    route: CategoryRoutes,
  },
  {
    path: '/subCategories',
    route: subCategoryRoutes,
  },
  {
    path: '/order',
    route: OrderRoutes,
  },
]

moduleRoutes.forEach(route => {
  router.use(route.path, route.route)
})

export default router
