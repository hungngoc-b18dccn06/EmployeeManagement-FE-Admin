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
          <Button
            type="button"
            icon="pi pi-user mr-2"
            :label="'Profile'"
            @click="toggle"
            class="p-button-text shadow-none"
            aria-haspopup="true"
            aria-controls="overlay_menu"
          />
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
      :labelCancel="'No'"
      :labelOk="'Confirm'"
      :content="'Confirm Logout'"
      :ok="logout"
      :cancel="closeModal"
      :header="'Logout'"
    ></Popup>
  </div>
</template>

<script setup lang="ts">
import { ref,onMounted } from "vue";

import Popup from "@/components/PopupConfirm.vue";
import api from "@/api";
import { ApiConstant, AppConstant } from "@/const";
import PAGE_ROUTE from "@/const/pageRoute";
import router from "@/router";

const emit = defineEmits(["toggleSidebar"]);
const menu = ref(); 


const toggleSidebar = () => {
  emit("toggleSidebar");
};
const toggle = (event: any) => {
  menu.value.toggle(event);
};
const modal = ref<InstanceType<typeof Popup> | null>(null);
const openModal = () => {
  modal.value?.open();
};
const items = ref([
  {
    items: [
      {
        label: 'Edit',
        icon: "pi pi-user-edit",
      },
      {
        label: 'Logout',
        icon: "pi pi-sign-out",
        command: openModal,
      },
    ],
  },
]);

</script>
<style lang="scss" scoped>
.p-button {
  background-color: #fff;
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
</style>