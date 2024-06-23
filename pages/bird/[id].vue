<script setup lang="ts">
import { APIStore } from '~/store/apiService'
const store = APIStore()
import { showToast, openDialog, showLoading, hideLoading } from '~/store/eventBus'
import { useGtag } from 'vue-gtag-next'

const route = useRoute()
const router = useRouter()

const birdInfo: any = ref('')
const currentId: any = ref('')

onMounted(() => {
  currentId.value = route.params.id
  console.log(currentId.value)

  getBirdInfo()

  // gtag
  const gtag = useGtag()
  gtag.event('page_view', { value: 'birdInfo' })
})

// 取得鸚鵡資訊
async function getBirdInfo() {
  try {
    showLoading()

    let data = {
      id: currentId.value
    }
    const res = await store.apiGetParrotInfo(data)
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
</script>
<template>
  <div class="w-full" v-if="birdInfo">
    <!-- * content -->
    <div class="cus-border">
      <h1 class="cus-block-padding text-[18px] font-semibold text-blue4 lg:text-[24px]">
        {{ birdInfo.chineseName }} {{ birdInfo.englishName }} ({{ birdInfo.chineseNickname }})
      </h1>

      <hr class="cus-line-row" />

      <div class="lg:flex lg:flex-row-reverse lg:items-start lg:gap-x-5">
        <!-- * pic -->
        <div class="border-b border-blue4 lg:shrink-0 lg:rounded-bl-md lg:border-l">
          <div class="mx-auto w-[70%] py-5 lg:w-[406px] lg:p-0">
            <img :src="birdInfo?.imgUrl" :alt="birdInfo.chineseName" class="pic-auto" />
          </div>
        </div>

        <!-- * info -->
        <div class="cus-block-padding flex flex-col gap-5 text-[16px] text-blue4 lg:grow">
          <!-- ? 體型 -->
          <div>
            <h3 class="cus-title-border-left">體型</h3>
            <p>{{ birdInfo.size }}</p>
          </div>

          <!-- ? 體重範圍(g) -->
          <div>
            <h3 class="cus-title-border-left">體重範圍(g)</h3>
            <p>{{ birdInfo.weightRange }}</p>
          </div>

          <!-- ? 預期壽命(年) -->
          <div>
            <h3 class="cus-title-border-left">預期壽命(年)</h3>
            <p>{{ birdInfo.lifespan }}</p>
          </div>

          <!-- ? 原生長地 -->
          <div>
            <h3 class="cus-title-border-left">原生長地</h3>
            <p>{{ birdInfo.nativeHabitat }}</p>
          </div>

          <!-- ? 飼養優點 -->
          <div>
            <h3 class="cus-title-border-left">飼養優點</h3>
            <p>{{ birdInfo.advantages }}</p>
          </div>

          <!-- ? 飼養缺點 -->
          <div>
            <h3 class="cus-title-border-left">飼養缺點</h3>
            <p>{{ birdInfo.disadvantages }}</p>
          </div>

          <!-- ? 簡述 -->
          <div>
            <h3 class="cus-title-border-left">簡述</h3>
            <p>{{ birdInfo.description }}</p>
          </div>

          <!-- ? btn -->
          <div class="mt-3 flex justify-start">
            <nuxt-link to="/bird" class="cus-btn-primary-outline">返回上一頁</nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
