
<template>
    <TitleCommon :title="t('page.orderManage')" />
    <div class="lighten-4 rounded">
    <div class="p-4 border-search pb-3">
                <div class="key_search">
                    <span class="text-field-search">{{ t('employee.keywordSearch') }}</span>
                    <div class="p-inputgroup flex-1">
                        <InputText class="w-full" v-model="storeUser.getFilterValue.search_text" :placeholder="t('employee.keywordSearch')" />
                        <ButtonClearCommon v-if="storeUser.getFilterValue.search_text" :clearInput="() => clearInput('storeUser.getFilterValue.search_text') " />
                    </div>
                </div>
            
                <div class="mt-2">
                    <span class="text-field-search">{{ t('employee.dateItemSelection') }}</span>
                    <div class="grid align-items-center">
                        <div class="col-3">
                            <div class="p-inputgroup">
                                <div class="p-inputgroup flex-1">
                                    <Dropdown v-model="selectedDate" :options="DATE_ITEM" :placeholder="t('employee.dateItemSelection')"
                                        optionLabel="label" class="w-full md:w-14rem" @change="handelSearchType" />
                                    <ButtonClearCommon v-if="selectedDate" :clearInput="() => clearInput('selectedDate')" />
                                </div>
                            </div>
                        </div>
                        <div class="col-3">
                            <div class="p-inputgroup">
                                <Calendar v-model="startMonth" view="date" dateFormat="yy/mm/dd" class="calendar_search"
                                    showIcon :manualInput="false" :max-date="endMonth" @date-select="handleChangeToStart"
                                    :disabled="!selectedDate" @update:model-value="startMonth = $event" />
                            </div>
                        </div>
                        <span class="mx-1">~</span>
                        <div class="col-3">
                            <div class="p-inputgroup">
                                <Calendar v-model="endMonth" view="date" dateFormat="yy/mm/dd" class="calendar_search"
                                    showIcon :manualInput="false" :min-date="startMonth" @date-select="handleChangeToEnd"
                                    :disabled="!selectedDate" @update:model-value="endMonth = $event" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="reset_search flex justify-content-center align-items-center mt-2">
                    <Button class="p-button-sm white-space-nowrap refresh" icon="pi pi-refresh mr-2" @click="reloadSearch()"
                        :label=" t('employee.reload') ">
                    </Button>   
                </div>
            </div>
            </div>
    <div class="card p-fluid">
        <DataTable v-model:editingRows="editingRows" :value="storeOrder.getOrders" editMode="row" dataKey="id" @row-edit-save="onRowEditSave" paginator :rows="10"
        :globalFilterFields="['employeeId', 'cartItemId', 'orderStatus', 'methodPayment', 'orderDate']"
            :pt="{
                table: { style: 'min-width: 50rem' },
                column: {
                    bodycell: ({ state }) => ({
                        style:  state['d_editing']&&'padding-top: 0.6rem; padding-bottom: 0.6rem'
                    })
                }
            }"
            
        >
            <Column field="employeeId" :header="t('employee.employeeId')" style="width: 10%">
                <template #editor="{ data, field }">
                    <InputText v-model="data[field]" />
                </template>
            </Column>
            <Column field="cartItemId" :header="t('employee.cartItemId')" style="width: 15%">
                <template #editor="{ data, field }">
                    <InputText v-model="data[field]" />
                </template>
            </Column>
            <Column field="methodPayment" :header="t('employee.methodPayment')" style="width: 20%">
                <template #editor="{ data, field }">
                    <InputText v-model="data[field]" />
                </template>
            </Column>
            
            <Column field="orderStatus" :header="t('employee.orderStatus')" style="width: 20%">
                <template #editor="{ data, field }">
                    <Dropdown v-model="data[field]" :options="statuses" optionLabel="label" optionValue="value" placeholder="Select a Status">
                        <template #option="slotProps">
                            <Tag :value="slotProps.option.label" :severity="getStatusLabel(slotProps.option.label) ?? ''" />
                        </template>
                    </Dropdown>
                </template>
                <template #body="slotProps">
                    <Tag :value="getStatus(slotProps.data.orderStatus)" :severity="getStatusLabel(getStatus(slotProps.data.orderStatus)) ?? ''"/>
                </template>
            </Column>
            <Column field="totalPrice" :header="t('employee.totalPrice')" style="width: 20%">
                <template #body="{ data, field }">
                    {{ formatCurrency(data[field]) }}
                </template>
                <template #editor="{ data, field }">
                    <InputNumber v-model="data[field]" mode="currency" currency="USD" locale="en-US" />
                </template>
            </Column>
            <Column field="orderDate" :header="t('employee.orderDate')"  style="width: 20%">
                <template #editor="{ data, field }">
                    <InputText v-model="data[field]" />
                </template>
            </Column>

            <Column :rowEditor="true" style="width: 10%; min-width: 8rem" bodyStyle="text-align:center"></Column>
        </DataTable>
    </div>
</template>
<script setup lang="ts">
import TitleCommon from "@/components/common/TitleCommon.vue"
import ButtonClearCommon from "@/components/common/ButtonClearCommon.vue";
import { useUserStore } from "@/stores/employee";
import { useOrderStore } from "@/stores/order";
import { ref, onMounted, computed } from "vue";
import { useI18n } from "vue-i18n";
import Dropdown from 'primevue/dropdown';

import Tag from 'primevue/tag';
const editingRows = ref([]);

const storeUser = useUserStore();
const storeOrder = useOrderStore();
const { t } = useI18n();
const selectedNumbericType = ref();
const selectedDate = ref();
const startMonth = ref();
const endMonth = ref();
const selectedFlag = ref();

const flagValue = ref();


const DATE_ITEM = computed(() => {
  return [
    {
      label: t('employee.created_at'),
      value: t('employee.created_at'),
    },
    {
      label:  t('employee.date_of_birth'),
      value: t('employee.date_of_birth'),
    },
];
});

const onRowEditSave = (event :any) => {
    storeOrder.updateStatus(event.newData.id, event.newData.orderStatus);
};
const formatCurrency = (value : any) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
}
const getStatusLabel = (status : any) => {
    switch (status) {
        case 'Unpaid':
            return 'success';
        case 'To ship':
            return 'info';
        case 'Shipped':
            return 'help';
        case 'To review':
            return 'danger';
        default:
            return null;
    }
};

const statuses = ref([
    { label: 'Unpaid', value:1 },
    { label: 'To ship', value: 2 },
    { label: 'Shipped', value: 3 },
    { label: 'To review', value: 4 }
]);
const getStatus = (value: any) => {
  const statusObject = statuses.value.find(status => status.value === value);
  return statusObject ? statusObject.label : '';
};

const reloadSearch = () => {
  const { getFilterValue }: any = storeUser;
  Object.keys(getFilterValue).forEach(
    (key) => (getFilterValue[key] = undefined)
  );
  [
    startMonth,
    endMonth,
    selectedDate,
    selectedNumbericType,
    selectedFlag,
    flagValue,
  ].forEach((input) => (input.value = null));
  storeOrder.getListOrder();
};

onMounted(
    () => {
        storeUser.getProfileDetail();
        storeOrder.getListOrder()
    }
)
</script>
<style scoped>
.table-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.product-image {
    width: 50px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}

span.text-field-search {
    font-weight: bold;
}

h5.m-0 {
    font-size: 26px;
    font-weight: 600;
}

.dowload-file-admin {
    display: flex;
    justify-content: end;
}
.p-button-danger, .p-button-danger:hover {
    background-color: red;
    --button-bg-hover: red;
}
.lighten-4.rounded{
    border: grey;
    border-radius: 0.5rem;
    box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.02), 0px 0px 2px rgba(0, 0, 0, 0.05), 0px 1px 4px rgba(0, 0, 0, 0.08);
    margin-bottom: 30px;
}
span.p-input-icon-left.w-5{
    visibility: hidden
}
</style>
