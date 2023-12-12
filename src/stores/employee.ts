import {defineStore} from "pinia";
import api from "@/api";
import {format} from "date-fns";
import CONST, {ApiConstant, DEFAULT} from "@/const";
import axios from "axios";
import { da } from "date-fns/locale";
export interface Employee {
    id?: number,
    employeeid: string;
    email: string;
    role:string;
    phone:string;
    name?: string; 
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
    first_name: string;
    last_name: string;
    employeeid: string;
    phone: string;
    email: string;
    role: string;
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
                name: "",
                role: DEFAULT.USER_ROLE[0].value,
            },
            users: [{
                id: 0,
                employeeid: "",
                email: "",
                name: "",
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
                first_name: '',
                last_name: '',
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
            this.pagination = {
                currentPage: 1,
                total: listUser.data.totalElements,
                perPage: listUser.data.totalPages,
            };
            console.log(listUser.data)
            console.log(this.pagination)
        },

       
        // async getUserDetail(id: number) {
        //     const response = await api.get<any>(ApiConstant.GET_DETAIL_USER(id));
        //     this.formUser = response.data.data;
        // },

        // async getProfileDetail() {
        //     try {
        //         const response = await api.get<any>(ApiConstant.GET_PROFILE);
        //         const profileInfo = response.data.data.user;
        //         this.profile = {
        //             ...profileInfo,
        //             name: profileInfo.first_name + " " + profileInfo.last_name,
        //         };
        //     } catch (err) {
        //         console.log(err);
        //     }
        // },
    }
})