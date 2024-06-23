<script setup lang="ts">
import { APIStore } from '~/store/apiService'
const store = APIStore()
import { showToast, openDialog, showLoading, hideLoading } from '~/store/eventBus'
import { useGtag } from 'vue-gtag-next'

const route = useRoute()
const router = useRouter()

const birdInfo: any = ref('')
const keyword: any = ref('')
const size: any = ref('') // 體型, (小型, 中型, 大型)

const sizeOption = ['小型', '中型', '大型']

onMounted(() => {
  getBirdInfo()

  // gtag
  const gtag = useGtag()
  gtag.event('page_view', { value: 'bird' })
})

watch(size, () => {
  getBirdInfo()
})

// 取得鸚鵡資訊
async function getBirdInfo() {
  try {
    showLoading()

    let data = {
      keyword: keyword.value,
      size: size.value
    }
    const res = await store.apiGetAllParrotInfo(data)
    // console.log(res)

    const result = res.data
    if (result && result.status === 'success') {
      birdInfo.value = result.data
    } else {
      showToast('取得鸚鵡資訊失敗')
    }
  } catch (error) {
    showToast('取得鸚鵡資訊失敗')
  } finally {
    hideLoading()
  }
}

function searchBird() {
  getBirdInfo()
}
</script>
<template>
  <div class="w-full">
    <!-- * content -->
    <div class="cus-border">
      <!-- * introduction -->
      <div class="cus-intro">
        不太齊全的鸚鵡百科全書， <br />
        透過 AI 搜集網路資料彙整而成，僅供參考。
      </div>

      <hr class="cus-line-row" />

      <!-- * search input -->
      <div class="cus-block-padding flex flex-col gap-3 md:flex-row">
        <select class="cus-input-blue4 md:w-[200px]" v-model="size">
          <option value="">全部體型</option>
          <option v-for="item in sizeOption" :key="item" :value="item">{{ item }}</option>
        </select>
        <div class="relative w-full">
          <input
            v-model="keyword"
            @keyup.enter="searchBird"
            type="text"
            class="cus-input-blue4 w-full"
            placeholder="輸入關鍵字查詢 (名稱/暱稱)"
          />

          <button @click="searchBird" class="absolute right-3 top-1/2 -translate-y-1/2 text-blue4">
            <Icon name="ph:magnifying-glass" size="24" class="" />
          </button>
        </div>
      </div>

      <hr class="cus-line-row" />

      <!-- * bird list -->
      <div class="cus-block-padding">
        <div
          class="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5 xl:grid-cols-4"
          v-if="birdInfo && birdInfo.length"
        >
          <nuxt-link
            :to="`/bird/${item._id}`"
            v-for="item in birdInfo"
            :key="item._id"
            class="rounded-md border border-blue4 p-[6px] shadow"
          >
            <div class="relative overflow-hidden rounded-md border border-blue4">
              <div class="p-6">
                <img :src="item?.imgUrl" :alt="item.chineseName" class="pic-auto" />
              </div>

              <!-- ? name -->
              <div
                class="absolute bottom-0 left-0 right-0 border-t border-blue4 bg-bg bg-opacity-80 py-1 text-center font-semibold text-blue4 backdrop-blur-sm md:left-[24%] md:rounded-ss-md md:border-l md:py-4 md:text-[24px]"
              >
                {{ item.chineseName }}
              </div>
            </div>
          </nuxt-link>
        </div>

        <div v-else class="text-center text-[14px] text-gray-400">沒有資料，請換個關鍵字查詢 ~</div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
