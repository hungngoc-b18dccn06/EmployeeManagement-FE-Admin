import {defineStore} from "pinia";
import api from "@/api";
import {format} from "date-fns";
import CONST, {ApiConstant, DEFAULT} from "@/const";
import axios, { type AxiosRequestConfig } from "axios";
import { da } from "date-fns/locale";
export interface Employee {
    id?: number,
    employeeid: string;
    email: string;
    role:number;
    phone:string;
    employeename?: string; 
}
export interface ParamsSearch {
    search_text?: string;
}
export interface Pagination {
    currentPage: number,
    total: number,
    perPage: number
}
export interface ParamsSearch {
    search_text?: string;
    status?: string;
    start_date?: any;
    end_date?: any;
    recruit_ids?: string;
    order_by?: string;
    start_number?:any;
    role_type?:any;
    end_number?:any;
    numberic_type?:string;
    date_type?:string;
    flag_type?:any;
    flag_value?:any;
    type?: string;
    page?:number;
}
interface FormEmployee {
    employeename: string;
    employeeid: string;
    phone: string;
    email: string;
    role: number;
    password?: string;
}
interface UserStore {
    profile: Employee,
    users: Employee[],
    paramSearch: ParamsSearch,
    pagination: Pagination,
    formUser: FormEmployee
    
}
export const useUserStore = defineStore({
    id: "user",
    state: (): UserStore =>{
        return {
            profile: {
                id: 0,
                employeeid: "",
                email: "",
                phone: "",
                employeename: "",
                role: DEFAULT.USER_ROLE[0].value,
            },
            users: [{
                id: 0,
                employeeid: "",
                email: "",
                employeename: "",
                phone: "",
                role: DEFAULT.USER_ROLE[0].value,
            }],
            paramSearch: {},
            pagination: {
                currentPage: 1,
                total: 0,
                perPage: 0,
            },
            formUser:{
                employeename:'',
                employeeid: '',
                email: '',
                phone: '',
                role: DEFAULT.USER_ROLE[0].value,
            }   
        }
    },
    getters:{
        getProfile: (state => state.profile),
        getPagination: (state => state.pagination),
        getParamSearch: (state => state.paramSearch),
        getUsers: (state => state.users.map(e => ({
            ...e,
            role: (DEFAULT.USER_ROLE.find(el => el.value == e.role) ?? DEFAULT.USER_ROLE[0]).label,
        }))),
        getFormUser: (state => state.formUser)
    },
    actions:{
        async getListUser(page?: number) {
            const listUser = await api.get(ApiConstant.GET_EMPLOYEE_LIST, {
                params: {
                  page: page ?? 1,
                  ...this.paramSearch
                }
              });
            this.users = listUser.data.content;
            
            this.users = listUser.data.content.map(e => ({
                ...e,
                status: e.status === 1 ? "active" : e.status === 0 ? "inactive" : e.status
            }));
            this.pagination = {
                currentPage: 1,
                total: listUser.data.totalElements,
                perPage: listUser.data.totalPages,
            };
        },

        async getProfileDetail() {
            try {
                const access_token = localStorage.getItem('access_token');
                if (!access_token) {
                  return false;
                }
                const headers = {
                  'Authorization' : `Bearer ${access_token}`,
                };
                    const response = await api.get(ApiConstant.GET_PROFILE, {headers});
                    this.profile = response.data;
              } catch (err) {
                console.log(err);
              }
        },

        async getUserDetail(id: number) {
            const response = await api.get<any>(ApiConstant.GET_EMPLOYEE_DETAIL(id));
            this.formUser = response.data;
            console.log(response);
        },
    }
})