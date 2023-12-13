const enum PAGE_ROUTE {
  HOME = "/",
  LOGIN = "/auth/signin",
  REGISTER = "/register",

  // USER
  EMPLOYEE_LIST = "/employees",
  ORDER_COFFEE = "/ecommerce_manage",
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
