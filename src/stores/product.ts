import { defineStore } from "pinia";
import api from "@/api";
import { format } from "date-fns";
import CONST, { ApiConstant, DEFAULT } from "@/const";
import { da } from "date-fns/locale";

export interface Product {
  id?: number;
  product_name: string;
  code: string;
  description: string;
  image: string;
  price: string;
  category: string;
  quantity: number;
  rating: number;
  inventoryStatus: string;
}

export interface ParamsSearch {
  search_text?: string;
}

export interface Pagination {
  currentPage: number;
  total: number;
  perPage: number;
}

interface ProductStore {
  product: Product[];
  paramSearch: ParamsSearch;
  pagination: Pagination;
}

export const useProductStore = defineStore({
  id: "product",
  state: (): ProductStore => ({
    product: [
      {
        id: 0,
        product_name: "",
        code: "",
        description: "",
        image: "",
        price: "",
        category: "",
        quantity: 1,
        rating: 5,
        inventoryStatus: DEFAULT.INVENTORY_STATUS[1].label,
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
    getProducts: (state) => state.product,
    getPagination: (state) => state.pagination,
    getParamSearch: (state) => state.paramSearch,
  },
  actions: {
    async getListProduct(page?: number) {
      this.product = [
        {
          id: 11,
          code: "plb34234v",
          product_name: "Gold Phone Case",
          description: "Product Description",
          image: "../../src/assets/default.png",
          price: "222",
          category: "Accessories",
          quantity: 0,
          inventoryStatus: "OUTOFSTOCK",
          rating: 4,
        },
        {
          id: 22,
          code: "4920nnc2d",
          product_name: "Green Earbuds",
          description: "Product Description",
          image: "../../src/assets/default.png",
          price: "89",
          category: "Electronics",
          quantity: 23,
          inventoryStatus: "INSTOCK",
          rating: 4,
        },
        {
          id: 32,
          code: "4920nnc2d",
          product_name: "Green Earbuds",
          description: "Product Description",
          image: "../../src/assets/default.png",
          price: "89",
          category: "Electronics",
          quantity: 23,
          inventoryStatus: "INSTOCK",
          rating: 4,
        },
        {
          id: 52,
          code: "4920nnc2d",
          product_name: "Green Earbuds",
          description: "Product Description",
          image: "../../src/assets/default.png",
          price: "89",
          category: "Electronics",
          quantity: 23,
          inventoryStatus: "LOWSTOCK",
          rating: 4,
        },
      ];
    },
  },
});
