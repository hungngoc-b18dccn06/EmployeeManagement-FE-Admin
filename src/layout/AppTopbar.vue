<template>
  <div class="layout-topbar">
    <div class="layout-content">
      <div class="flex justify-content-start align-items-center flex-1">
        <div>
          <Button
            @click="toggleSidebar"
            class="p-button-text p-button-rounded shadow-none ml-3"
            icon="pi pi-bars"
          />
        </div>
      </div>
      <div class="flex justify-content-end align-items-center flex-1 pr-4">
        <div class="relative">
          
          <div class="card flex justify-content-center header-profile">
              <div>
                <div @click="showDropdown = !showDropdown" class="img-language-container">
                  <img :src="selectedLanguage.imgSrc" alt="" class="img-language" style="height: 35px; width: 40px;">
                </div>
                <Dropdown v-if="languageStore.showLanguageDropdown" v-model="selectedLanguage" :options="DEFAULT.OPTION_LANGUAGE" option-label="label" @change="changeLanguage(selectedLanguage.value)">
                  <template #option="{ option }">
                    <img :src="option.imgSrc" alt="" class="img-language" style="height: 35px; width: 40px;">
                    {{ option.label }}
                  </template>
                </Dropdown>
              </div>
              <Button
            type="button"
            icon="pi pi-user mr-2"
            :label="userStore.getProfile.employeename ?? ''"
            @click="toggle"
            class="p-button-text shadow-none"
            aria-haspopup="true"
            aria-controls="overlay_menu"
          />
          </div>
          <Menu
            id="overlay_menu"
            class="topbar-user-menu"
            ref="menu"
            :model="items"
            :popup="true"
            appendTo="self"
          />
        </div>
      </div>
    </div>
    <Popup
      ref="modal"
      :labelCancel="t('common.no')"
      :labelOk="t('common.yes')"
      :content="t('user.confirmLogout')"
      :ok="logout"
      :cancel="closeModal"
      :header="t('user.headerConfirmLogout')">
    </Popup>
  </div>
</template>

<script setup lang="ts">
import { useLanguageStore } from '@/stores/language';
import { ref,onMounted } from "vue";
import { useI18n } from "vue-i18n";
import Popup from "@/components/PopupConfirm.vue";
import api from "@/api";
import { useToast } from "primevue/usetoast";
import { ApiConstant } from "@/const";
import PAGE_ROUTE from "@/const/pageRoute";
import router from "@/router";
import { useUserStore } from "@/stores/employee";
import CONST, { AppConstant, DEFAULT } from "@/const";
import i18n  from '@/i18n/index';

const languageStore = useLanguageStore();
const openSidebar = ref(true);
const emit = defineEmits(["toggleSidebar"]);
const toast = useToast();
const menu = ref(); 
const selectedLanguage = ref({ label: '한국어', imgSrc: 'src/assets/img/kor8.jpg', value: 'kor' });
const { t  } = useI18n();
const userStore = useUserStore();

const showDropdown = ref(false);
const toggle = (event: any) => {
  menu.value.toggle(event);
};
const changeLanguage = (e: any) =>{
  i18n.global.locale.value = e;
  console.log(e)
}

const toggleSidebar = () => {
  openSidebar.value = !openSidebar.value;
}

const toggleLanguageDropdown = () => {
  languageStore.toggleLanguageDropdown();
}

const modal = ref<InstanceType<typeof Popup> | null>(null);
const openModal = () => {
  modal.value?.open();
};
const editProfile = () =>{
  console.log(userStore.getProfile)
  router.push(`/profile`);
}
const items = ref([
  {
    items: [
      {
        label: t("menu.editProfile"),
        icon: "pi pi-user-edit mr-2",
        command: editProfile,
      },
      {
        label: t("menu.logout"),
        icon: "pi pi-sign-out mr-2",
        command: openModal,
      },
    ],
  },
]);
const logout = async () => {
  try {
    toast.add({ severity: 'error', summary: 'Error Message', detail: 'Message Content', life: 10000 });
    await api.post(ApiConstant.LOGOUT);
    localStorage.clear();
    sessionStorage.clear();
    userStore.$reset();
    modal.value?.close();
    router.replace(PAGE_ROUTE.LOGIN);
  } catch (e) {
    console.log(e);
  }
};
const back = () => {
  router.back();
};
onMounted(
  () => {
    const token = localStorage.getItem("access_token");
    if(token != ''){
      userStore.getProfileDetail();
    }
      
  }
)
</script>
<style lang="scss" scoped>
.header-profile{
  gap: 10px;
}
.img-language {
  vertical-align: middle;
  margin-right: 5px;
  cursor: pointer;
}

.img-language-container {
  display: inline-block;
}
.p-dropdown-panel .p-dropdown-items .p-dropdown-item.p-highlight{
    display: flex !important;
    justify-content: center  !important;
    align-items: center  !important;
    gap: 10px
}
img.img-language {
    width: 30px;
    height: 30px;
    border-radius: 50%;
}
.p-selectbutton.p-buttonset.p-component{
  border: 1px solid #2B9DCA;
  border-radius: 7px;
}
.layout-topbar {
  position: fixed;
  height: var(--topbar-height);
  z-index: 997;
  top: 0;
  left: var(--sidebar-width);
  width: calc(100% - var(--sidebar-width));
  padding: 0;
  background-color: var(--surface-card);
  transition: left 0.2s;
  display: flex;
  align-items: center;
  box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.02), 0px 0px 2px rgba(0, 0, 0, 0.05),
    0px 1px 4px rgba(0, 0, 0, 0.08);

  :deep(.layout-content) {
    width: 100%;
    height: 5rem;
    display: flex;

    .p-button-label {
      font-weight: 400;
    }
    .p-button.p-component.p-highlight {
    background: #fff;
    color: black;
}

  }
}


.flex.justify-content-start.flex-1 {
  flex: 1 1 0% !important;
}

.flex.justify-content-end.align-items-center.flex-1.pr-4 {
  flex: 1 1 0% !important;
  padding-right: 1.5rem !important;
  align-items: center !important;
  justify-content: flex-end !important;
  display: flex;
}
button.p-button.p-component.p-button-icon-only.p-button-text.shadow-none {
    background: #fff;
}


.p-selectbutton.p-buttonset.p-component .p-button{
  background: #fff !important;
  color: #fff;
}
button.p-button.p-component.p-button-icon-only.p-button-text.p-button-rounded.shadow-none.ml-3 {
    color: black;
}
button.p-button.p-component.p-button-text.shadow-none {
    color: #fff;
}
</style>