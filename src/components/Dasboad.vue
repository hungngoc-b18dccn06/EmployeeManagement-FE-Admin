<script setup>
import { onMounted, ref, watch } from 'vue'
import { useProductStore } from '@/stores/product'
import { useI18n } from 'vue-i18n'
import Swiper from 'swiper/bundle'
import Tag from 'primevue/tag'

const { t } = useI18n()
const products = ref(null)

const lineData = ref({
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'First Dataset',
      data: [65, 59, 80, 81, 56, 55, 40],
      fill: false,
      backgroundColor: '#2f4860',
      borderColor: '#2f4860',
      tension: 0.4
    },
    {
      label: 'Second Dataset',
      data: [28, 48, 40, 19, 86, 27, 90],
      fill: false,
      backgroundColor: '#00bb7e',
      borderColor: '#00bb7e',
      tension: 0.4
    }
  ]
})
const storeProduct = useProductStore()
const items = ref([
  { label: 'Add New', icon: 'pi pi-fw pi-plus' },
  { label: 'Remove', icon: 'pi pi-fw pi-minus' }
])

const lineOptions = ref(null)

const formatCurrency = (value) => {
  return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
}

onMounted(() => {
  storeProduct.getListProduct()
})
const productService = {
  async getProductsSmall() {
    try {
      const data = [
        {
          id: '1007',
          code: 'mbvjkgip5',
          name: 'Galaxy Earrings',
          description: 'Product Description',
          image: '',
          price: 34,
          category: 'Accessories',
          quantity: 23,
          inventoryStatus: 'INSTOCK',
          rating: 5
        },
        {
          id: '1008',
          code: 'vbb124btr',
          name: 'Game Controller',
          description: 'Product Description',
          image: '',
          price: 99,
          category: 'Electronics',
          quantity: 2,
          inventoryStatus: 'LOWSTOCK',
          rating: 4
        },
        {
          id: '1009',
          code: 'cm230f032',
          name: 'Gaming Set',
          description: 'Product Description',
          image: '',
          price: 299,
          category: 'Electronics',
          quantity: 63,
          inventoryStatus: 'INSTOCK',
          rating: 3
        }
      ]

      products.value = data
    } catch (error) {
      console.error('Error fetching products:', error)
    }
  }
}

const getSeverity = (product) => {
  switch (product.status) {
    case 'INSTOCK':
      return 'success'

    case 'LOWSTOCK':
      return 'warning'

    case 'OUTOFSTOCK':
      return 'danger'

    default:
      return null
  }
}

onMounted(() => {
  productService.getProductsSmall()
})
</script>

<template>
  <div class="abc">
    <section class="section-layout">
    
    </section>
  </div>
  <div class="grid">
    <div class="col-12 lg:col-6 xl:col-3">
      <div class="card mb-0">
        <div class="flex justify-content-between mb-3">
          <div>
            <span class="block text-500 font-medium mb-3">Orders</span>
            <div class="text-900 font-medium text-xl">152</div>
          </div>
          <div
            class="flex align-items-center justify-content-center bg-blue-100 border-round"
            style="width: 2.5rem; height: 2.5rem"
          >
            <i class="pi pi-shopping-cart text-blue-500 text-xl"></i>
          </div>
        </div>
        <span class="text-green-500 font-medium">24 new </span>
        <span class="text-500">since last visit</span>
      </div>
    </div>
    <div class="col-12 lg:col-6 xl:col-3">
      <div class="card mb-0">
        <div class="flex justify-content-between mb-3">
          <div>
            <span class="block text-500 font-medium mb-3">Revenue</span>
            <div class="text-900 font-medium text-xl">$2.100</div>
          </div>
          <div
            class="flex align-items-center justify-content-center bg-orange-100 border-round"
            style="width: 2.5rem; height: 2.5rem"
          >
            <i class="pi pi-map-marker text-orange-500 text-xl"></i>
          </div>
        </div>
        <span class="text-green-500 font-medium">%52+ </span>
        <span class="text-500">since last week</span>
      </div>
    </div>
    <div class="col-12 lg:col-6 xl:col-3">
      <div class="card mb-0">
        <div class="flex justify-content-between mb-3">
          <div>
            <span class="block text-500 font-medium mb-3">Customers</span>
            <div class="text-900 font-medium text-xl">28441</div>
          </div>
          <div
            class="flex align-items-center justify-content-center bg-cyan-100 border-round"
            style="width: 2.5rem; height: 2.5rem"
          >
            <i class="pi pi-inbox text-cyan-500 text-xl"></i>
          </div>
        </div>
        <span class="text-green-500 font-medium">520 </span>
        <span class="text-500">newly registered</span>
      </div>
    </div>
    <div class="col-12 lg:col-6 xl:col-3">
      <div class="card mb-0">
        <div class="flex justify-content-between mb-3">
          <div>
            <span class="block text-500 font-medium mb-3">Comments</span>
            <div class="text-900 font-medium text-xl">152 Unread</div>
          </div>
          <div
            class="flex align-items-center justify-content-center bg-purple-100 border-round"
            style="width: 2.5rem; height: 2.5rem"
          >
            <i class="pi pi-comment text-purple-500 text-xl"></i>
          </div>
        </div>
        <span class="text-green-500 font-medium">85 </span>
        <span class="text-500">responded</span>
      </div>
    </div>

    <div class="col-12 xl:col-6">
      <div class="card">
        <h5>Recent Sales</h5>
        <DataTable
          :value="storeProduct.getProducts"
          :rows="5"
          :paginator="true"
          responsiveLayout="scroll"
        >
          <Column style="width: 20%">
            <template #header> Image </template>
            <template #body="slotProps">
              <img
                :src="slotProps.data.productImage"
                :alt="slotProps.data.image"
                width="50"
                class="shadow-2"
              />
            </template>
          </Column>
          <Column field="productName" header="Name" :sortable="true" style="width: 35%"></Column>
          <Column field="price" header="Price" :sortable="true" style="width: 35%">
            <template #body="slotProps"> {{ formatCurrency(slotProps.data.price) }} $ </template>
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
        </DataTable>
      </div>
    </div>
    <div class="col-12 xl:col-6">
      <div class="card">
        <h5>Sales Overview</h5>
        <Chart type="line" :data="lineData" :options="lineOptions" />
      </div>
    </div>
  </div>
  
</template>

<style scoped>
.card {
  background: var(--surface-card);
  border: 1px solid var(--surface-border);
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: var(--card-shadow);
  border-radius: 12px;
}

*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Nunito', sans-serif;
}

.abc {
  margin-bottom: 50px;
  max-height: 700px;
  /* background-image: radial-gradient(
      circle at 20% 100%,
      rgba(184, 184, 184, 0.1) 0%,
      rgba(184, 184, 184, 0.1) 33%,
      rgba(96, 96, 96, 0.1) 33%,
      rgba(96, 96, 96, 0.1) 66%,
      rgba(7, 7, 7, 0.1) 66%,
      rgba(7, 7, 7, 0.1) 99%
    ),
    linear-gradient(40deg, #2444c2, #485eb7, #1a3ab7, #8c96c1); */
    background-image: url('../assets/img/digital.png');

  background-repeat: no-repeat;
  background-size: cover;
}

section {
  display: grid;
  place-items: center;
  gap: 60px;
  min-height: 80vh;
  padding: 20px 60px;
}


.section-layout {
  display: flex;
  justify-content: space-around;
  margin-top: -50px;
}
</style>
