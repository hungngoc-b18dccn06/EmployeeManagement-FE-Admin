import { defineStore } from "pinia";
import api from "@/api";
import CONST, { ApiConstant, DEFAULT } from "@/const";

export interface Order {
  id?: number;
  employeeid: string;
  employeename: string;
  cartItemId: number;
  orderDate: string;
  totalPrice: string;
  methodPayment: string;
  address: String;
  orderStatus: number;
}

export interface ParamsSearch {
  search_text?: string;
}

export interface Pagination {
  currentPage: number;
  total: number;
  perPage: number;
}

interface OrderStore {
  orders: Order[];
  paramSearch: ParamsSearch;
  pagination: Pagination;
}

export const useOrderStore = defineStore({
  id: "orders",
  state: (): OrderStore => ({
    orders: [
      {
        id: 0,
        employeeid: '',
        employeename: '',
        cartItemId: 1,
        orderDate: '',
        totalPrice: '',
        methodPayment: '',
        address: '',
        orderStatus: DEFAULT.INVENTORY_STATUS[1].value,
      },
    ],

    paramSearch: {},
    pagination: {
      currentPage: 1,
      total: 0,
      perPage: 0,
    },
  }),
  getters: {
    getOrders: (state) => state.orders,
    getPagination: (state) => state.pagination,
    getParamSearch: (state) => state.paramSearch,
  },
  actions: {
    async getListOrder() {
      const listOrder = await api.get(ApiConstant.GET_ORDER_LIST);
     
      const updatedProductList = listOrder.data.map(orders => ({
        ...orders,
        cartItemId: orders.cartItem.id,
        employeeId: orders.employee.employeeid ,
        orderDate:  new Date(orders.orderDate).toISOString().split('T')[0],
      }));
    
      this.orders = updatedProductList;
      console.log(this.orders)
    },
    async updateStatus(orderId: number, newStatus: number) {
      const res = await api.put(ApiConstant.UPDATE_STATUS_ORDER(orderId, newStatus));
      this.getListOrder();
      return res;
    },
  },
});
