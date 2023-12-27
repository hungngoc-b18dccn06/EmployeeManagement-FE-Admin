<script setup>
import { onMounted, ref, watch } from 'vue'
import { useProductStore } from '@/stores/product'
import { useI18n } from 'vue-i18n'
import Swiper from 'swiper/bundle';
import Tag from 'primevue/tag';

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
  var swiper = new Swiper(".swiper", {
  effect: "cube",
  grabCursor: true,
  loop: true,
  speed: 1000,
  cubeEffect: {
    shadow: false,
    slideShadows: true,
    shadowOffset: 10,
    shadowScale: 0.94,
  },
  autoplay: {
    delay: 2500,
    pauseOnMouseEnter: true,
  },
});
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
      <div class="content">
        <h1>Let's Travel The World Together!</h1>
        <p>
          Our tours are designed to transport you to the heart of the world's
          most captivating destinations, creating memories that will last a
          lifetime. You can uncover the hidden gems, iconic landmarks, and
          unique cultural treasures that make each destination special.
        </p>
        <button>Explore Tours</button>
      </div>

      <div class="swiper">
        <div class="swiper-wrapper">
          <div class="swiper-slide">
            <img src="https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/49db1b5f-09f6-4433-be57-51687585600c" />
            <div class="cost">from $230 per group</div>
            <div class="overlay">
              <h1>Walking Tour in Florence</h1>
              <p>
                Discover the fascinating beauty of this historic city by
                strolling through the rich cultural tapestry that makes Florence
                a timeless destination.
              </p>
              <div class="ratings">
                <div class="stars">
                  <ion-icon class="star" name="star"></ion-icon>
                  <ion-icon class="star" name="star"></ion-icon>
                  <ion-icon class="star" name="star"></ion-icon>
                  <ion-icon class="star" name="star"></ion-icon>
                  <ion-icon class="star" name="star-half-outline"></ion-icon>
                </div>
                <span>138 reviews</span>
              </div>
            </div>
          </div>
          <div class="swiper-slide">
            <img src="https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/2d165721-fe2e-4cf0-a63e-20bc5bc3f847" />
            <div class="cost">from $380 per group</div>
            <div class="overlay">
              <h1>Edinburgh Guided Tour</h1>
              <p>
                Explore the city's majestic castles and fascinating history by
                joining our guided tour for an unforgettable journey through
                Scotland's capital.
              </p>
              <div class="ratings">
                <div class="stars">
                  <ion-icon class="star" name="star"></ion-icon>
                  <ion-icon class="star" name="star"></ion-icon>
                  <ion-icon class="star" name="star"></ion-icon>
                  <ion-icon class="star" name="star"></ion-icon>
                  <ion-icon class="star" name="star"></ion-icon>
                </div>
                <span>307 reviews</span>
              </div>
            </div>
          </div>
          <div class="swiper-slide">
            <img src="https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/d311d1de-7382-4c03-b083-5f7e88458158" />
            <div class="cost dark-text">from $99 per adult</div>
            <div class="overlay">
              <h1>New York Sightseeing Tour</h1>
              <p>
                Experience the energy and excitement of New York City from Times
                Square's dazzling lights to the serene beauty of Central Park.
              </p>
              <div class="ratings">
                <div class="stars">
                  <ion-icon class="star" name="star"></ion-icon>
                  <ion-icon class="star" name="star"></ion-icon>
                  <ion-icon class="star" name="star"></ion-icon>
                  <ion-icon class="star" name="star"></ion-icon>
                  <ion-icon class="star" name="star-half-outline"></ion-icon>
                </div>
                <span>1152 reviews</span>
              </div>
            </div>
          </div>
          <div class="swiper-slide">
            <img src="https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/be223a30-52d1-4a0b-8d57-2e52f02e2245" />
            <div class="cost dark-text">from $117 per adult</div>
            <div class="overlay">
              <h1>Japan Panoramic Tours</h1>
              <p>
                Embark on a magical journey through Tokyo by discovering the
                beauty of the city as cherry blossom trees paint the streets in
                hues of pink.
              </p>
              <div class="ratings">
                <div class="stars">
                  <ion-icon class="star" name="star"></ion-icon>
                  <ion-icon class="star" name="star"></ion-icon>
                  <ion-icon class="star" name="star"></ion-icon>
                  <ion-icon class="star" name="star"></ion-icon>
                  <ion-icon class="star" name="star-outline"></ion-icon>
                </div>
                <span>619 reviews</span>
              </div>
            </div>
          </div>
        </div>
      </div>
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
      <div class="card">
        <div class="flex justify-content-between align-items-center mb-5">
          <h5>Best Selling Products</h5>
          <div>
            <Button
              icon="pi pi-ellipsis-v"
              class="p-button-text p-button-plain p-button-rounded"
              @click="$refs.menu2.toggle($event)"
            ></Button>
            <Menu ref="menu2" :popup="true" :model="items"></Menu>
          </div>
        </div>
        <ul class="list-none p-0 m-0">
          <li
            class="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4"
          >
            <div>
              <span class="text-900 font-medium mr-2 mb-1 md:mb-0">Space T-Shirt</span>
              <div class="mt-1 text-600">Clothing</div>
            </div>
            <div class="mt-2 md:mt-0 flex align-items-center">
              <div
                class="surface-300 border-round overflow-hidden w-10rem lg:w-6rem"
                style="height: 8px"
              >
                <div class="bg-orange-500 h-full" style="width: 50%"></div>
              </div>
              <span class="text-orange-500 ml-3 font-medium">%50</span>
            </div>
          </li>
          <li
            class="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4"
          >
            <div>
              <span class="text-900 font-medium mr-2 mb-1 md:mb-0">Portal Sticker</span>
              <div class="mt-1 text-600">Accessories</div>
            </div>
            <div class="mt-2 md:mt-0 ml-0 md:ml-8 flex align-items-center">
              <div
                class="surface-300 border-round overflow-hidden w-10rem lg:w-6rem"
                style="height: 8px"
              >
                <div class="bg-cyan-500 h-full" style="width: 16%"></div>
              </div>
              <span class="text-cyan-500 ml-3 font-medium">%16</span>
            </div>
          </li>
          <li
            class="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4"
          >
            <div>
              <span class="text-900 font-medium mr-2 mb-1 md:mb-0">Supernova Sticker</span>
              <div class="mt-1 text-600">Accessories</div>
            </div>
            <div class="mt-2 md:mt-0 ml-0 md:ml-8 flex align-items-center">
              <div
                class="surface-300 border-round overflow-hidden w-10rem lg:w-6rem"
                style="height: 8px"
              >
                <div class="bg-pink-500 h-full" style="width: 67%"></div>
              </div>
              <span class="text-pink-500 ml-3 font-medium">%67</span>
            </div>
          </li>
          <li
            class="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4"
          >
            <div>
              <span class="text-900 font-medium mr-2 mb-1 md:mb-0">Wonders Notebook</span>
              <div class="mt-1 text-600">Office</div>
            </div>
            <div class="mt-2 md:mt-0 ml-0 md:ml-8 flex align-items-center">
              <div
                class="surface-300 border-round overflow-hidden w-10rem lg:w-6rem"
                style="height: 8px"
              >
                <div class="bg-green-500 h-full" style="width: 35%"></div>
              </div>
              <span class="text-green-500 ml-3 font-medium">%35</span>
            </div>
          </li>
          <li
            class="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4"
          >
            <div>
              <span class="text-900 font-medium mr-2 mb-1 md:mb-0">Mat Black Case</span>
              <div class="mt-1 text-600">Accessories</div>
            </div>
            <div class="mt-2 md:mt-0 ml-0 md:ml-8 flex align-items-center">
              <div
                class="surface-300 border-round overflow-hidden w-10rem lg:w-6rem"
                style="height: 8px"
              >
                <div class="bg-purple-500 h-full" style="width: 75%"></div>
              </div>
              <span class="text-purple-500 ml-3 font-medium">%75</span>
            </div>
          </li>
          <li
            class="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4"
          >
            <div>
              <span class="text-900 font-medium mr-2 mb-1 md:mb-0">Robots T-Shirt</span>
              <div class="mt-1 text-600">Clothing</div>
            </div>
            <div class="mt-2 md:mt-0 ml-0 md:ml-8 flex align-items-center">
              <div
                class="surface-300 border-round overflow-hidden w-10rem lg:w-6rem"
                style="height: 8px"
              >
                <div class="bg-teal-500 h-full" style="width: 40%"></div>
              </div>
              <span class="text-teal-500 ml-3 font-medium">%40</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="col-12 xl:col-6">
      <div class="card">
        <h5>Sales Overview</h5>
        <Chart type="line" :data="lineData" :options="lineOptions" />
      </div>
      <div class="card">
        <div class="flex align-items-center justify-content-between mb-4">
          <h5>Notifications</h5>
          <div>
            <Button
              icon="pi pi-ellipsis-v"
              class="p-button-text p-button-plain p-button-rounded"
              @click="$refs.menu1.toggle($event)"
            ></Button>
            <Menu ref="menu1" :popup="true" :model="items"></Menu>
          </div>
        </div>

        <span class="block text-600 font-medium mb-3">TODAY</span>
        <ul class="p-0 mx-0 mt-0 mb-4 list-none">
          <li class="flex align-items-center py-2 border-bottom-1 surface-border">
            <div
              class="w-3rem h-3rem flex align-items-center justify-content-center bg-blue-100 border-circle mr-3 flex-shrink-0"
            >
              <i class="pi pi-dollar text-xl text-blue-500"></i>
            </div>
            <span class="text-900 line-height-3"
              >Richard Jones
              <span class="text-700"
                >has purchased a blue t-shirt for <span class="text-blue-500">79$</span></span
              >
            </span>
          </li>
          <li class="flex align-items-center py-2">
            <div
              class="w-3rem h-3rem flex align-items-center justify-content-center bg-orange-100 border-circle mr-3 flex-shrink-0"
            >
              <i class="pi pi-download text-xl text-orange-500"></i>
            </div>
            <span class="text-700 line-height-3"
              >Your request for withdrawal of
              <span class="text-blue-500 font-medium">2500$</span> has been initiated.</span
            >
          </li>
        </ul>

        <span class="block text-600 font-medium mb-3">YESTERDAY</span>
        <ul class="p-0 m-0 list-none">
          <li class="flex align-items-center py-2 border-bottom-1 surface-border">
            <div
              class="w-3rem h-3rem flex align-items-center justify-content-center bg-blue-100 border-circle mr-3 flex-shrink-0"
            >
              <i class="pi pi-dollar text-xl text-blue-500"></i>
            </div>
            <span class="text-900 line-height-3"
              >Keyser Wick
              <span class="text-700"
                >has purchased a black jacket for <span class="text-blue-500">59$</span></span
              >
            </span>
          </li>
          <li class="flex align-items-center py-2 border-bottom-1 surface-border">
            <div
              class="w-3rem h-3rem flex align-items-center justify-content-center bg-pink-100 border-circle mr-3 flex-shrink-0"
            >
              <i class="pi pi-question text-xl text-pink-500"></i>
            </div>
            <span class="text-900 line-height-3"
              >Jane Davis
              <span class="text-700">has posted a new questions about your product.</span>
            </span>
          </li>
        </ul>
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
@import url("https://fonts.googleapis.com/css2?family=Comfortaa:wght@700&family=Nunito:wght@300;600&display=swap");

*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Nunito", sans-serif;
}

.abc {
  max-height: 8000px !important;
  background-image: radial-gradient(
      circle at 20% 100%,
      rgba(184, 184, 184, 0.1) 0%,
      rgba(184, 184, 184, 0.1) 33%,
      rgba(96, 96, 96, 0.1) 33%,
      rgba(96, 96, 96, 0.1) 66%,
      rgba(7, 7, 7, 0.1) 66%,
      rgba(7, 7, 7, 0.1) 99%
    ),
    linear-gradient(40deg, #040a22, #162561, #202e64, #6f7aa6);
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

/* CONTENT */

.content {
  max-width: 500px;
}

.content h1 {
  font-family: "Comfortaa", sans-serif;
  font-size: clamp(2rem, 4vw, 3.5rem);
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: 1px;
  margin-bottom: 36px;
  color: #fff;
}

.content p {
  font-size: clamp(1rem, 4vw, 1.1rem);
  font-weight: 300;
  line-height: 1.5;
  margin-bottom: 30px;
  color: #fff;
}

.content button {
  background: #eaeaea;
  color: #202134;
  font-size: clamp(0.9rem, 4vw, 1rem);
  font-weight: 600;
  border: 0;
  outline: 0;
  padding: 8px 14px;
  border-radius: 7px;
  transform: scale(1);
  transition: all 0.4s ease-in;
  cursor: pointer;
}

.content button:is(:hover, :focus) {
  transform: scale(0.98);
  background-color: #6f7aa6;
  color: #eaeaea;
}

/* SLIDER */

.swiper {
  position: relative;
  width: 400px;
  height: 490px;
}

.swiper-slide {
  position: relative;
  background-position: center;
  background-size: cover;
  border: 1px solid rgba(255, 255, 255, 0.3);
  user-select: none;
  border-radius: 20px;
}

.cost {
  position: absolute;
  top: 8px;
  right: 6px;
  background: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.2);
  border-radius: 30px;
  padding: 6px 10px;
  color: #fff;
  font-size: clamp(0.8rem, 4vw, 0.9rem);
  font-weight: 600;
}

.dark-text {
  color: #202134;
}

.swiper-slide img {
  width: 100%;
  height: 100%;
  border-radius: 20px;
}

.overlay {
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 150px;
  padding: 10px 20px;
  background: rgba(93, 95, 145, 0.2);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-top: 1px solid rgba(255, 255, 255, 0.3);
  color: #fff;
  border-radius: 0 0 20px 20px;
}

.overlay h1 {
  font-size: clamp(1.2rem, 4vw, 1.5rem);
  font-weight: 600;
}

.overlay p {
  font-size: clamp(0.8rem, 4vw, 0.9rem);
  font-weight: 300;
  line-height: 1.3;
}

.ratings {
  display: flex;
  column-gap: 10px;
  margin-top: -6px;
}

.ratings span {
  font-size: clamp(0.8rem, 4vw, 0.9rem);
  font-weight: 300;
}

.star {
  color: #afe312;
}

@media (max-width: 1050px) {
  .swiper {
    width: 350px;
    height: 450px;
  }
}

@media (max-width: 930px) {
  section {
    grid-template-columns: 100%;
    grid-template-rows: 55% 40%;
    grid-template-areas:
      "slider"
      "content";
    place-items: center;
    gap: 64px;
    padding: 60px;
  }

  .swiper {
    grid-area: slider;
  }

  .content {
    grid-area: content;
    text-align: center;
  }

  .content h1 {
    margin-bottom: 20px;
  }
}

@media (max-width: 470px) {
  section {
    padding: 40px 40px 60px;
  }

  .swiper {
    width: 300px;
    height: 400px;
  }
}

.section-layout{
  display: flex;
    justify-content: space-around;
}
</style>
