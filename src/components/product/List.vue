<script setup>
import { FilterMatchMode } from 'primevue/api'
import { ref, onMounted, onBeforeMount, watch, computed } from 'vue'
import { useToast } from 'primevue/usetoast'
import CONST, { AppConstant, DEFAULT } from '@/const'
import { useProductStore } from '@/stores/product'
import PAGE_ROUTE from '@/const/pageRoute'
import { useI18n } from 'vue-i18n'
import { useCartItemStore } from '@/stores/cart'

const storeCart = useCartItemStore()
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

const storeProduct = useProductStore()
const producImage = ref()

onBeforeMount(() => {
  initFilters()
})

onMounted(() => {
  products.value = storeProduct.getProducts
  storeProduct.getListProduct()
  storeCart.getListCart()
})

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

const deleteProduct = async (id) => {
  const res = await storeProduct.deleteProduct(id)
  deleteProductDialog.value = false
  product.value = {}
  toast.add({
    group: 'message',
    severity: 'success',
    summary: res.data,
    life: CONST.TIME_DELAY,
    closable: false
  })
  closeModal()
  router.push({ path: PAGE_ROUTE.USER_LIST })
}
const loading = ref(false)

const load = () => {
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 2000)
}
const selectedMethod = ref()
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

const confirmDeleteSelected = () => {
  deleteProductsDialog.value = true
}
const deleteSelectedProducts = (e) => {
  products.value = products.value.filter((val) => !selectedProducts.value.includes(val))

  deleteProductsDialog.value = false
  selectedProducts.value = null
  toast.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 })
}

const initFilters = () => {
  filters.value = {
    global: { value: null, matchMode: FilterMatchMode.CONTAINS }
  }
}
const totalAmount = computed(() => {
  return storeCart.getCart.reduce((total, product) => {
    return total + product.quantity * product.productPrice
  }, 0)
})
</script>

<template>
  <div class="grid">
    <div class="col-12">
      <div class="card order-card">
        <Toast />
        <DataTable
          ref="dt"
          :value="storeCart.getCart"
          dataKey="id"
          :rows="10"
          :filters="filters"
          :style="{ width: '1000px' }"
          responsiveLayout="scroll"
          size="small"
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
          <Column
            field="productName"
            :header="t('product.productName')"
            :sortable="true"
            headerStyle="width: 100px;  text-align: center"
          >
            <template #body="slotProps">
              <span class="p-column-title">{{ t('product.productName') }}</span>
              {{ slotProps.data.productName }}
            </template>
          </Column>
          <Column :header="t('product.image')" headerStyle="width: 80px">
            <template #body="slotProps">
              <span class="p-column-title">{{ t('product.image') }}</span>
              <img
                :src="'http://localhost:8085/api/product/images/' + slotProps.data.productImage"
                :alt="slotProps.data.productImage"
                class="shadow-2"
                width="100"
              />
            </template>
          </Column>
          <Column
            field="productPrice"
            :header="t('product.price')"
            :sortable="true"
            headerStyle="width: 100px"
          >
            <template #body="slotProps">
              <span class="p-column-title">{{ t('product.price') }}</span>
              {{ slotProps.data.productPrice }}
            </template>
          </Column>
          <Column
            field="quantity"
            :header="t('product.quantity')"
            :sortable="true"
            headerStyle="width: 100px"
          >
            <template #body="slotProps">
              <span class="p-column-title">{{ t('product.quantity') }}</span>
              {{ slotProps.data.quantity }}
            </template>
          </Column>
          <Column
            field="totalPrice"
            :header="t('product.totalPrice')"
            :sortable="true"
            headerStyle="width: 100px;"
          >
            <template #body="slotProps">
              <span class="p-column-title">{{ t('product.totalPrice') }}</span>
              {{ slotProps.data.quantity * slotProps.data.productPrice }}
            </template>
          </Column>

          <Column headerStyle="width:10px;">
            <template #body="slotProps">
              <Button
                icon="pi pi-trash"
                class="p-button-rounded mt-2"
                @click="confirmDeleteProduct(slotProps.data)"
              />
            </template>
          </Column>
        </DataTable>

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
              :label="t('product.no')"
              icon="pi pi-times"
              class="p-button-text"
              @click="deleteProductDialog = false"
            />
            <Button
              :label="t('product.yes')"
              icon="pi pi-check"
              class="p-button-text"
              @click="deleteProduct(product.id)"
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
              :label="t('product.no')"
              icon="pi pi-times"
              class="p-button-text"
              @click="deleteProductsDialog = false"
            />
            <Button
              :label="t('product.yes')"
              icon="pi pi-check"
              class="p-button-text"
              @click="deleteSelectedProducts(product.id)"
            />
          </template>
        </Dialog>
      </div>
    </div>
  </div>
</template>

<style scoped>
textarea#description {
  height: 120px !important;
}
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
span.block.mt-2.md\:mt-0.p-input-icon-left {
  visibility: hidden;
}
.card.order-card {
  display: flex;
  justify-content: center;
}
.p-card.p-component {
  width: 1000px;
  margin: auto;
  border: 1px solid #e5e7eb;
  border-width: 0 0 1px 0;
  padding-top: 20px;
  padding-left: 20px;
  padding-bottom: 20px;
}
.p-inputgroup {
  width: 80%;
  margin: auto;
}
.total-price[data-v-db72331a] {
  display: flex;
  gap: 100px;
  width: 1000px;
  justify-content: center;
  margin-top: 30px;
  font-weight: bold;
}
button.p-button.p-component.p-button-icon-only.p-button-rounded.mt-2 {
  background: #fff;
  color: black;
  border: 0.5px solid #c8b4b4;
}
.payment {
  display: flex;
  text-align: center;
  justify-content: center;
  margin: auto;
  margin-top: 40px;
}
img.momo-wallet {
  width: 50px;
  margin-left: 2px;
  margin-right: 16px;
}
img.cod-wallet {
  width: 50px;
  margin-left: 9px;
}
</style>
