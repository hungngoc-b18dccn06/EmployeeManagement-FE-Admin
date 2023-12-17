<script setup>
import { FilterMatchMode } from 'primevue/api'
import { ref, onMounted, onBeforeMount, watch } from 'vue'
import FileUpload from 'primevue/fileupload'
import Toolbar from 'primevue/toolbar'
import { useToast } from 'primevue/usetoast'
import Rating from 'primevue/rating'
import Tag from 'primevue/tag'
import CONST, { AppConstant, DEFAULT } from '@/const'
import { useProductStore } from '@/stores/product'
import PAGE_ROUTE from '@/const/pageRoute'
import { useI18n } from 'vue-i18n'
const toast = useToast()
const { t } = useI18n()
const products = ref(null)
const productDialog = ref(false)
const deleteProductDialog = ref(false)
const deleteProductsDialog = ref(false)
const product = ref({})
const selectedProducts = ref(null)
const dt = ref(null)
const filters = ref({})
const submitted = ref(false)
const statuses = ref([
  { label: 'INSTOCK', value: 1 },
  { label: 'LOWSTOCK', value: 2 },
  { label: 'OUTOFSTOCK', value: 3 }
])
const storeProduct = useProductStore()
const producImage = ref()

onBeforeMount(() => {
  initFilters()
})

onMounted(() => {
  products.value = storeProduct.getProducts
  storeProduct.getListProduct()
})

const formatCurrency = (value) => {
  return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
}

const openNew = () => {
  product.value = {}
  submitted.value = false
  productDialog.value = true
}

const hideDialog = () => {
  productDialog.value = false
  submitted.value = false
}

const getSeverity = (product) => {
  switch (product.inventoryStatus) {
    case 'INSTOCK':
      return 1
    case 'LOWSTOCK':
      return 2
    case 'OUTOFSTOCK':
      return 3
    default:
      return null
  }
}

const saveProduct = async () => {
  const formData = new FormData()
  formData.append('productName', product.value.productName)
  formData.append('price', product.value.price)
  formData.append('status', product.value.status.value)
  formData.append('category', product.value.category)
  formData.append('description', product.value.description)
  formData.append('quantity', product.value.quantity)
  formData.append('average_rating', 5)
  formData.append('file', producImage.value[0])
  formData.append('code', 111)
  const res = await storeProduct.apiCreateProduct(formData)
  toast.add({
    group: 'message',
    severity: 'success',
    summary: t('notifile.addProductSuccess'),
    life: CONST.TIME_DELAY,
    closable: false
  })
  productDialog.value = false
}
const onUpload = (event) => {
  producImage.value = event.files
}
const editProduct = (editProduct) => {
  product.value = { ...editProduct }
  productDialog.value = true
}

const confirmDeleteProduct = (editProduct) => {
  product.value = editProduct
  deleteProductDialog.value = true
}

const deleteProduct = () => {
  products.value = products.value.filter((val) => val.id !== product.value.id)
  deleteProductDialog.value = false
  product.value = {}
  toast.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 })
}

const findIndexById = (id) => {
  let index = -1
  for (let i = 0; i < products.value.length; i++) {
    if (products.value[i].id === id) {
      index = i
      break
    }
  }
  return index
}

const createId = () => {
  let id = ''
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (let i = 0; i < 5; i++) {
    id += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return id
}

const exportCSV = () => {
  dt.value.exportCSV()
}

const confirmDeleteSelected = () => {
  deleteProductsDialog.value = true
}
const deleteSelectedProducts = () => {
  products.value = products.value.filter((val) => !selectedProducts.value.includes(val))
  deleteProductsDialog.value = false
  selectedProducts.value = null
  toast.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 })
}

const initFilters = () => {
  filters.value = {
    global: { value: null, matchMode: FilterMatchMode.CONTAINS }
  }
  console.log(filters.value)
}
</script>

<template>
  <div class="grid">
    <div class="col-12">
      <div class="card">
        <Toast />
        <Toolbar class="mb-4">
          <template v-slot:start>
            <div class="my-2">
              <Button
                :label="t('product.new')"
                icon="pi pi-plus"
                class="p-button-success mr-2"
                @click="openNew"
              />
            </div>
          </template>

          <template v-slot:end>
            <Button
            :label="t('product.export')"
              icon="pi pi-download mr-2"
              class="p-button-help"
              @click="exportCSV($event)"
            />
          </template>
        </Toolbar>

        <DataTable
          ref="dt"
          :value="storeProduct.getProducts"
          v-model:selection="selectedProducts"
          dataKey="id"
          :paginator="true"
          :rows="10"
          :filters="filters"
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          :rowsPerPageOptions="[5, 10, 25]"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
          responsiveLayout="scroll"
        >
          <template #header>
            <div
              class="flex flex-column md:flex-row md:justify-content-between md:align-items-center"
            >
              <h2 class="m-0">{{ t('product.manageProduct') }}</h2>
              <span class="block mt-2 md:mt-0 p-input-icon-left">
                <i class="pi pi-search" />
                <InputText v-model="filters['global'].value" :placeholder="t('product.search')" />
              </span>
            </div>
          </template>

          <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
          <Column
            field="productCode"
            :header="t('product.code')"
            :sortable="true"
            headerStyle="width:14%; min-width:10rem;"
            :filter="true"
          >
            <template #body="slotProps">
              <span class="p-column-title">{{ t('product.code') }}</span>
              {{ slotProps.data.productCode }}
            </template>
          </Column>
          <Column
            field="productName"
            :header="t('product.productName')"
            :sortable="true"
            headerStyle="width:14%; min-width:10rem;"
          >
            <template #body="slotProps">
              <span class="p-column-title">{{ t('product.productName') }}</span>
              {{ slotProps.data.productName }}
            </template>
          </Column>
          <Column :header="t('product.image')" headerStyle="width:14%; min-width:10rem;">
            <template #body="slotProps">
              <span class="p-column-title">{{ t('product.image') }}</span>
              <img
                :src="slotProps.data.productImage"
                :alt="slotProps.data.productImage"
                class="shadow-2"
                width="100"
              />
            </template>
          </Column>
          <Column
            field="price"
            :header="t('product.price')"
            :sortable="true"
            headerStyle="width:14%; min-width:8rem;"
          >
            <template #body="slotProps">
              <span class="p-column-title">{{ t('product.price') }}</span>
              {{ formatCurrency(slotProps.data.price) }}
            </template>
          </Column>
          <Column
            field="category"
            :header="t('product.category')"
            :sortable="true"
            headerStyle="width:14%; min-width:10rem;"
          >
            <template #body="slotProps">
              <span class="p-column-title">{{ t('product.category') }}</span>
              {{ slotProps.data.category }}
            </template>
          </Column>
          <Column
            field="rating"
            :header="t('product.rating')"
            :sortable="true"
            headerStyle="width:14%; min-width:10rem;"
          >
            <template #body="slotProps">
              <span class="p-column-title">{{ t('product.rating') }}</span>
              <Rating
                :modelValue="slotProps.data.average_rating"
                :readonly="true"
                :cancel="false"
              />
            </template>
          </Column>
          <Column
            field="status"
            :header="t('product.status')"
            :sortable="true"
            headerStyle="width:14%; min-width:10rem;"
          >
            <template #body="slotProps">
              <span class="p-column-title">{{ t('product.status') }}</span>
              <Tag
                :value="slotProps.data.status ? slotProps.data.status.toLowerCase() : ''"
                :severity="getSeverity(slotProps.data)"
              />
            </template>
          </Column>
          <Column headerStyle="min-width:10rem;">
            <template #body="slotProps">
              <Button
                icon="pi pi-pencil"
                class="p-button-rounded p-button-success mr-2"
                @click="editProduct(slotProps.data)"
              />
              <Button
                icon="pi pi-trash"
                class="p-button-rounded p-button-warning mt-2"
                @click="confirmDeleteProduct(slotProps.data)"
              />
            </template>
          </Column>
        </DataTable>

        <Dialog
          v-model:visible="productDialog"
          :style="{ width: '450px' }"
          :header="t('product.productDetails')"
          :modal="true"
          class="p-fluid"
        >
          <div>
            <img
              v-if="product.productImage"
              :src="product.productImage"
              :alt="product.productImage"
              width="150"
              class="mt-0 mx-auto mb-5 block shadow-2"
            />
            <FileUpload
              v-else
              name="demo[]"
              @uploader="onUpload($event)"
              :multiple="true"
              accept="image/*"
              :maxFileSize="1000000"
              customUpload
            />
          </div>
          <div class="field">
            <label for="name">{{ t('product.productName') }}</label>
            <InputText
              id="name"
              v-model.trim="product.productName"
              required="true"
              autofocus
              :class="{ 'p-invalid': submitted && !product.productName }"
            />
            <small class="p-invalid" v-if="submitted && !product.productName">{{
              t('product.nameRequired')
            }}</small>
          </div>
          <div class="field">
            <label for="description">{{ t('product.description') }}</label>
            <Textarea
              id="description"
              v-model="product.description"
              required="true"
              rows="3"
              cols="20"
            />
          </div>

          <div class="field">
            <label for="inventoryStatus" class="mb-3">{{ t('product.inventoryStatus') }}</label>
            <Dropdown
              id="inventoryStatus"
              v-model="product.status"
              :options="statuses"
              optionLabel="label"
              :placeholder="t('product.selectStatus')"
            >
              <template #value="slotProps">
                <div v-if="slotProps.value && slotProps.value.value">
                  <span :class="'product-badge status-' + slotProps.value.value">{{
                    slotProps.value.label
                  }}</span>
                </div>
                <div v-else-if="slotProps.value && !slotProps.value.value">
                  <span :class="'product-badge status-' + slotProps.value.toLowerCase()">{{
                    slotProps.value
                  }}</span>
                </div>
                <span v-else>
                  {{ slotProps.placeholder }}
                </span>
              </template>
            </Dropdown>
          </div>

          <div class="field">
            <label class="mb-3">{{ t('product.category') }}</label>
            <div class="formgrid grid">
              <div
                class="field-radiobutton col-6"
                v-for="option in DEFAULT.CATEGORY_OPTION"
                :key="option.value"
              >
                <RadioButton
                  :id="'category' + option.value"
                  name="category"
                  :value="option.value"
                  v-model="product.category"
                />
                <label :for="'category' + option.value">{{ option.label }}</label>
              </div>
            </div>
          </div>

          <div class="formgrid grid">
            <div class="field col">
              <label for="price">{{ t('product.price') }}</label>
              <InputNumber
                id="price"
                v-model="product.price"
                mode="currency"
                currency="USD"
                locale="en-US"
                :class="{ 'p-invalid': submitted && !product.price }"
                :required="true"
              />
              <small class="p-invalid" v-if="submitted && !product.price">{{
                t('product.priceRequired')
              }}</small>
            </div>
            <div class="field col">
              <label for="quantity">{{ t('product.quantity') }}</label>
              <InputNumber id="quantity" v-model="product.quantity" integeronly />
            </div>
          </div>
          <template #footer>
            <Button
              :label="t('product.cancel')"
              icon="pi pi-times mr-2"
              class="p-button-text"
              @click="hideDialog"
            />
            <Button
              :label="t('product.save')"
              icon="pi pi-check mr-2"
              class="p-button-text"
              @click="saveProduct"
            />
          </template>
        </Dialog>

        <Dialog
          v-model:visible="deleteProductDialog"
          :style="{ width: '450px' }"
          :header="t('product.confirm')"
          :modal="true"
        >
          <div class="flex align-items-center justify-content-center">
            <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
            <span v-if="product">{{
              t('product.confirmDelete', { productName: product.name })
            }}</span>
          </div>
          <template #footer>
            <Button
              label="{{ t('product.no') }}"
              icon="pi pi-times"
              class="p-button-text"
              @click="deleteProductDialog = false"
            />
            <Button
              label="{{ t('product.yes') }}"
              icon="pi pi-check"
              class="p-button-text"
              @click="deleteProduct"
            />
          </template>
        </Dialog>

        <Dialog
          v-model:visible="deleteProductsDialog"
          :style="{ width: '450px' }"
          :header="t('product.confirm')"
          :modal="true"
        >
          <div class="flex align-items-center justify-content-center">
            <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
            <span v-if="product">{{ t('product.confirmDeleteSelected') }}</span>
          </div>
          <template #footer>
            <Button
              label="{{ t('product.no') }}"
              icon="pi pi-times"
              class="p-button-text"
              @click="deleteProductsDialog = false"
            />
            <Button
              label="{{ t('product.yes') }}"
              icon="pi pi-check"
              class="p-button-text"
              @click="deleteSelectedProducts"
            />
          </template>
        </Dialog>
      </div>
    </div>
  </div>
</template>

<style scoped>
button.p-button.p-component.p-button-icon-only.p-button-danger.p-button-rounded.p-button-text.p-fileupload-file-remove {
  background: #fff;
  border-radius: 50%;
  border: 1px solid;
  width: 25px;
  height: 25px;
}
i.pi.pi-search {
  position: absolute;
  top: 14px;
}
button.p-button.p-component.p-button-icon-only.p-button-rounded.p-button-success.mr-2 {
  background: forestgreen;
}
button.p-button.p-component.p-button-icon-only.p-button-rounded.p-button-warning.mt-2 {
  background: red;
}

.p-dialog-footer {
  display: flex !important;
  justify-content: center;
  gap: 10px;
  color: #fff;
}
button.p-button.p-component.p-button-text {
  color: #fff;
  margin-right: 15px;
}
.p-fileupload-file-thumbnail {
  width: 50% !important;
}
</style>
