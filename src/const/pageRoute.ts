const enum PAGE_ROUTE {
  HOME = "/",
  LOGIN = "/auth/signin",
  REGISTER = "/register",

  // USER
  EMPLOYEE_LIST = "/employees",
  EMPLOYEE_ORDER = "/ecommerce_order",
  MANAGE_PRODUCT = "/products_manage",
  MANAGE_ORDER = "/orders_manage",
  USER_UPDATE = "/user/:userId/update",

}

export const publicPath = [
  "/auth/signin",
  "/register",
  "/UsrRegInput",
  "/auth/forgot-password",
  "/reset-password",
];
export default PAGE_ROUTE;
