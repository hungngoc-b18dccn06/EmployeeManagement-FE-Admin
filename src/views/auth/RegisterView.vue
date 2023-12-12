<template>
    <div>
    <Sidebar />
    <div class="login-screen">
          <div class="flex flex-column align-items-center">
              <form @submit.prevent="handleSubmitForm" autocomplete="off">
              <div class="login-form">
                  <div class="mt-2 group-regist">
                      <div class="flex w-full my-2 justify-content-center font-bold text-2xl">
                       Register Page
                      </div>
                      <div class="field field-input my-5">
                          <Field name="email" v-slot="{meta: metaField, field, errorMessage}">
                              <div class="p-inputgroup common-group">
                              <span class ="w-span">ID: </span>
                              <InputText
                                  v-bind="field"
                                  type="text"
                                  :class="{'p-invalid': errorMessage && !metaField.valid && metaField.touched}"
                                  :placeholder="'Email'"
                                  autocomplete="off"
                              />
                              </div>
                              <div class="absolute line-height-1 pt-2">
                                <small v-if="errorMessage && !metaField.valid && metaField.touched" class="p-error">{{ errorMessage }}</small>
                              </div>
                          </Field>
                      </div>
                      <div class="field-input custom-password my-5 pb-1">
                          <Field name="password" v-slot="{meta: metaField, field, errorMessage}">
                            <div class="p-inputgroup common-group">
                              <span class = "w-span">
                                  Password
                              </span>
                              <span class="p-input-icon-right w-full">
                                  <InputText
                                  v-bind="field"
                                  class="w-full"
                                  aria-describedby="password-help"
                                  autocomplete="current-password"
                                  :type="showPass ? 'text' : 'password'"
                                  />
                                  <i class="pi"
                                  :class="{'pi-eye': showPass, 'pi-eye-slash': !showPass}"
                                  @click="showPass = !showPass"></i>  
                              </span>
                              </div>
                              <div class="absolute line-height-1 pt-2">
                              <small v-if="errorMessage && !metaField.valid && metaField.touched" class="p-error">{{ errorMessage }}</small>
                              </div>
                          </Field>
                      </div>
                      <div class="field-input custom-password my-5 pb-1">
                          <Field name="password" v-slot="{meta: metaField, field, errorMessage}">
                            <div class="p-inputgroup common-group">
                              <span class = "w-span">
                                  Password Confirm
                              </span>
                              <span class="p-input-icon-right w-full">
                                  <InputText
                                  v-bind="field"
                                  class="w-full"
                                  aria-describedby="password-help"
                                  autocomplete="current-password"
                                  :type="showPass ? 'text' : 'password'"
                                  />
                                  <i class="pi"
                                  :class="{'pi-eye': showPass, 'pi-eye-slash': !showPass}"
                                  @click="showPass = !showPass"></i>  
                              </span>
                              </div>
                              <div class="absolute line-height-1 pt-2">
                              <small v-if="errorMessage && !metaField.valid && metaField.touched" class="p-error">{{ errorMessage }}</small>
                              </div>
                          </Field>
                      </div>
                      <div class="field field-input my-5">
                          <Field name="email" v-slot="{meta: metaField, field, errorMessage}">
                              <div class="p-inputgroup common-group">
                              <span class ="w-span">Name: </span>
                              <InputText
                                  v-bind="field"
                                  type="text"
                                  :class="{'p-invalid': errorMessage && !metaField.valid && metaField.touched}"
                                  :placeholder="'Name'"
                                  autocomplete="off"
                              />
                              </div>
                              <div class="absolute line-height-1 pt-2">
                                <small v-if="errorMessage && !metaField.valid && metaField.touched" class="p-error">{{ errorMessage }}</small>
                              </div>
                          </Field>
                      </div>

                      <div class="field field-input my-5">
                          <Field name="email" v-slot="{meta: metaField, field, errorMessage}">
                              <div class="p-inputgroup common-group">
                              <span class ="w-span">Phone: </span>
                              <InputText
                                  v-bind="field"
                                  type="text"
                                  :class="{'p-invalid': errorMessage && !metaField.valid && metaField.touched}"
                                  :placeholder="'Phone'"
                                  autocomplete="off"
                              />
                              </div>
                              <div class="absolute line-height-1 pt-2">
                                <small v-if="errorMessage && !metaField.valid && metaField.touched" class="p-error">{{ errorMessage }}</small>
                              </div>
                          </Field>
                      </div>

                      <div class="field field-input my-5">
                          <Field name="email" v-slot="{meta: metaField, field, errorMessage}">
                              <div class="p-inputgroup common-group">
                              <span class ="w-span">Email: </span>
                              <InputText
                                  v-bind="field"
                                  type="text"
                                  :class="{'p-invalid': errorMessage && !metaField.valid && metaField.touched}"
                                  :placeholder="'Email'"
                                  autocomplete="off"
                              />
                              </div>
                              <div class="absolute line-height-1 pt-2">
                                <small v-if="errorMessage && !metaField.valid && metaField.touched" class="p-error">{{ errorMessage }}</small>
                              </div>
                          </Field>
                      </div>
                  </div>
                  <div class="flex flex-column align-items-center gap-2 footer mt-2 pb-1">
              <Button
                :disabled="state.loading"
                :label="('Regist')"
                class="btn-submit w-full mb-2 p-0"
                type="submit"
              />
              <router-link
                :to="PAGE_ROUTE.LOGIN"
                class="text-color underline font-semibold mt-4"
                >{{ "Back to Login" }}</router-link
              >
            </div>
              </div>
              </form>
          </div>
    </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import api from "@/api";
  import Popup from "@/components/PopupConfirm.vue";
  import Sidebar from "@/layout/AuthSidebar.vue";
  import CONST, { ACCESS_TOKEN, AppConstant, ApiConstant, REMIND } from "@/const";
  
  import type { ResponseLogin } from "@/const/api.const";
  import PAGE_ROUTE from "@/const/pageRoute";
  import type { AxiosResponse } from "axios";
  import { useToast } from "primevue/usetoast";
  import { onMounted, reactive, ref } from "vue";
  import { useRouter } from "vue-router";
  import { Field, useForm } from "vee-validate";
  import * as yup from "yup";
  const router = useRouter();
  const state = reactive({
    loading:false,
  });
  const modal = ref<InstanceType<typeof Popup> | null>(null);
  const submitted = ref(false);
  const showPass = ref(false);
  const toast = useToast();
  onMounted(() => {
    localStorage.removeItem(ACCESS_TOKEN);
    const info = localStorage.getItem(REMIND);
    if (info?.length) {
      // state.email = "";
      // state.password = "";
    }
  });
  
  const openModal = () => {
    modal.value?.open();
  };
  
  // const schema = yup.object({
  //   email: yup
  //     .string()
  //     .trim()
  //     .email(t('message.emailInvalid'))
  //     .required(t('message.required'))
  //     .max(100, t('message.maxLength100')),
  //   password: yup
  //     .string()
  //     .matches(CONST.REGEX_PASSWORD, t('message.passwordInvalid'))
  //     .required(t('message.required'))
  // });
  
  // const {resetForm, values, errors, handleSubmit} = useForm({
  //   validationSchema: schema,
  //   initialValues: {
  //     email: "",
  //     password: "",
  //   },
  // });
  
  // const handleSubmitForm = handleSubmit(async (data) => {
  //   submitted.value = true;
  //   const user = {
  //     ...data
  //     // role: "user",
  //   };
  //   state.loading = true;
  //   try {
  //     const reponse: AxiosResponse<ResponseLogin> = await api.post(
  //       ApiConstant.LOGIN,
  //       user
  //     );
  //     await loginSuccessCallback(reponse.data.data.access_token);
  //   } catch (e:any) {
  //     console.log(e);
  //   } finally {
  //     state.loading = false;
  //   }
  // });
  
  async function loginSuccessCallback(accessToken: string) {
    localStorage.setItem(ACCESS_TOKEN, accessToken);
    router.push(PAGE_ROUTE.USER_LIST);
  }
  </script>
  
  <style lang="scss" scoped>
  .w-span{
    width: 100px
  }
  .field-input{
    margin: auto;
  }
  .group-regist{
    width: 1000px;
  
  }
  .common-group{
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    width: 120%
  }
  .p-inputtext {
    width: 100% !important;
    border-top-left-radius: 0 !important;
    border-bottom-left-radius: 0 !important;
  }
  .pi-eye-slash, i.pi.pi-eye {
    position: absolute !important;
    top: 13px!important;
  }
  .login-screen {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    min-height: 700px;
  }
  
  .login-form {
    min-width: 1000px;
    border-radius: 8px;
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 40px 100px;
    box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.102);
    border-radius: 10px;
  }
  
  .register {
    font-size: 16px;
  
    a {
      color: var(--vt-c-dark-red);
      text-decoration: none;
      font-weight: 400;
      line-height: 22px;
      margin-bottom: 10px;
    }
  }
  
  .field-input {
    min-width: 240px;
    width: 375px;
  }
  :deep( .p-inputtext ) {
    width: var(--width-input);
    height: var(--height-input);
  }
  .footer {
    width: 375px;
    font-size: 16px;
    font-weight: 700;
  }
  :deep( .p-button .p-button-label ) {
    font-size: 16px;
    font-weight: 700;
  }
  .footer a {
    text-decoration: none;
    color: var(--vt-c-dark-red);
  }
  :deep( .p-divider .p-divider-content ) {
    font-size: 14px;
    color: #a3bac8;
    font-weight: 400;
    line-height: 22px;
  }
  :deep( .p-inputgroup #password:focus ) {
    z-index: 0;
  }
  
  .custom-password :deep( .p-inputgroup > .p-inputwrapper > .p-inputtext:focus ) {
    z-index: unset;
  }
  .btn-submit,
  .btn-submit:focus {
    width: 200px;
    border: none;
    border-radius: 10px;
    box-shadow: none;
    font-size: 18px;
    font-weight: 700;
    background-color: #2b9dca !important;
  }

  :deep(.btn-submit) {
    background-color: #2b9dca;
    p {
      font-size: 16px;
      font-weight: 700;
    }
  }
  .text-color {
    color: #2b9dca !important;
  }
  .p-invalid-icon {
    color: red;
  }
  :deep(.login-screen){
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
      min-height: 700px;
  }
  </style>
  