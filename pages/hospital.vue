<script setup lang="ts">
import { APIStore } from '~/store/apiService'
const store = APIStore()
import { showToast, openDialog, showLoading, hideLoading } from '~/store/eventBus'
import { useGtag } from 'vue-gtag-next'

const hospitalInfo: any = ref('')
const keyword: any = ref('')
const region: any = ref('') // 醫院地區, (基隆市, 台北市, 新北市, 桃園市, 新竹市, 新竹縣, 苗栗縣, 台中市, 彰化縣, 南投縣, 雲林縣, 嘉義市, 嘉義縣, 台南市, 高雄市, 屏東縣, 宜蘭縣, 花蓮縣, 台東縣, 澎湖縣, 金門縣, 連江縣)

const currentHospital: any = ref('')

const regionOption = [
  '基隆市',
  '台北市',
  '新北市',
  '桃園市',
  '新竹市',
  '新竹縣',
  '苗栗縣',
  '台中市',
  '彰化縣',
  '南投縣',
  '雲林縣',
  '嘉義市',
  '嘉義縣',
  '台南市',
  '高雄市',
  '屏東縣',
  '宜蘭縣',
  '花蓮縣',
  '台東縣',
  '澎湖縣',
  '金門縣',
  '連江縣'
]

onMounted(() => {
  getHospitalInfo()

  // gtag
  const gtag = useGtag()
  gtag.event('page_view', { value: 'hospital' })
})

watch(region, () => {
  getHospitalInfo()
})

// 取得醫療資訊
async function getHospitalInfo() {
  try {
    showLoading()

    let data = {
      keyword: keyword.value,
      region: region.value
    }
    const res = await store.apiGetAllHospitalInfo(data)
    // console.log(res)

    const result = res.data
    if (result && result.status === 'success') {
      hospitalInfo.value = result.data
    } else {
      showToast('發生錯誤，請稍後再試')
    }
  } catch (e) {
    console.log(e)
  } finally {
    hideLoading()
  }
}

function searchHospital() {
  getHospitalInfo()
}
</script>
<template>
  <div class="w-full">
    <!-- * content -->
    <div class="cus-border">
      <!-- * introduction -->
      <div class="cus-intro">
        醫療資訊主要是請 AI 搜集以及參考各網站，<br />
        最新資訊可以前往
        <a
          href="https://sites.google.com/view/sparrowworld-tw/%E7%96%BE%E7%97%85%E6%B2%BB%E7%99%82%E9%86%AB%E9%99%A2/%E5%90%84%E5%9C%B0%E9%B3%A5%E9%86%AB%E9%99%A2"
          class="border-b border-blue4"
          target="_blank"
          >麻雀天地</a
        >
        查看。
      </div>

      <hr class="cus-line-row" />

      <!-- * search input -->
      <div class="cus-block-padding flex flex-col gap-3 md:flex-row">
        <select class="cus-input-blue4 md:w-[200px]" v-model="region">
          <option value="">全部地區</option>
          <option v-for="item in regionOption" :key="item" :value="item">{{ item }}</option>
        </select>
        <div class="relative w-full">
          <input
            v-model="keyword"
            @keyup.enter="searchHospital"
            type="text"
            class="cus-input-blue4 w-full"
            placeholder="輸入關鍵字查詢 (醫院/醫生名稱/備註)"
          />

          <button
            @click="searchHospital"
            class="absolute right-3 top-1/2 -translate-y-1/2 text-blue4"
          >
            <Icon name="ph:magnifying-glass" size="24" class="" />
          </button>
        </div>
      </div>

      <hr class="cus-line-row" />

      <!-- * page -->
      <div class="cus-block-padding">
        <div class="mb-5 text-blue4 lg:hidden" v-if="hospitalInfo && hospitalInfo.length">
          點擊資料欄可以查看各食物詳細資料。
        </div>

        <section v-if="hospitalInfo && hospitalInfo.length" class="">
          <!-- ? hospital table > mb -->
          <div class="cus-table lg:hidden">
            <div class="cus-table-row grid grid-cols-3">
              <div class="cus-table-th">醫院名稱</div>
              <div class="cus-table-th">地址</div>
              <div class="cus-table-th">營業時間</div>
            </div>
            <div
              class="cus-table-rows grid cursor-pointer grid-cols-3"
              v-for="item in hospitalInfo"
              :key="item._id"
              @click="currentHospital = item"
            >
              <div class="cus-table-td">{{ item.hospitalName }}</div>
              <div class="cus-table-td">{{ item.address }}</div>
              <div class="cus-table-td">{{ item.openingHours }}</div>
            </div>
          </div>

          <!-- ? hospital table > pc -->
          <div class="cus-table hidden lg:block">
            <div class="cus-table-row grid grid-cols-7">
              <div class="cus-table-th">地區</div>
              <div class="cus-table-th">醫院名稱</div>
              <div class="cus-table-th">醫生姓名</div>
              <div class="cus-table-th">電話</div>
              <div class="cus-table-th">地址</div>
              <div class="cus-table-th">營業時間</div>
              <div class="cus-table-th">備註</div>
            </div>
            <div
              class="cus-table-rows grid grid-cols-7"
              v-for="item in hospitalInfo"
              :key="item._id"
            >
              <div class="cus-table-td">{{ item.region }}</div>
              <div class="cus-table-td">{{ item.hospitalName }}</div>
              <div class="cus-table-td">{{ item.doctorName }}</div>
              <div class="cus-table-td">{{ item.phone }}</div>
              <div class="cus-table-td">{{ item.address }}</div>
              <div class="cus-table-td">{{ item.openingHours }}</div>
              <div class="cus-table-td">{{ item.note }}</div>
            </div>
          </div>
        </section>

        <!-- ? 沒有資料 -->
        <div v-else class="text-center text-[14px] text-gray-400">沒有資料，請換個關鍵字查詢 ~</div>
      </div>

      <!-- * modal > currentHospital -->
      <div class="modal-bg" v-if="currentHospital">
        <div class="modal-box-bg">
          <div class="flex justify-end">
            <button @click="currentHospital = ''" class="mb-2">
              <Icon name="ph:x-square" size="40" class="text-blue4" />
            </button>
          </div>
          <div class="cus-table">
            <div class="cus-table-row grid grid-cols-2">
              <div class="cus-table-th">地區</div>
              <div class="cus-table-td">{{ currentHospital.region }}</div>
            </div>
            <div class="cus-table-row grid grid-cols-2">
              <div class="cus-table-th">醫院名稱</div>
              <div class="cus-table-td">{{ currentHospital.hospitalName }}</div>
            </div>
            <div class="cus-table-row grid grid-cols-2">
              <div class="cus-table-th">醫生姓名</div>
              <div class="cus-table-td">{{ currentHospital.doctorName }}</div>
            </div>
            <div class="cus-table-row grid grid-cols-2">
              <div class="cus-table-th">電話</div>
              <div class="cus-table-td">{{ currentHospital.phone }}</div>
            </div>
            <div class="cus-table-row grid grid-cols-2">
              <div class="cus-table-th">地址</div>
              <div class="cus-table-td">{{ currentHospital.address }}</div>
            </div>
            <div class="cus-table-row grid grid-cols-2">
              <div class="cus-table-th">營業時間</div>
              <div class="cus-table-td">{{ currentHospital.openingHours }}</div>
            </div>
            <div class="grid grid-cols-2">
              <div class="cus-table-th">備註</div>
              <div class="cus-table-td">{{ currentHospital.note }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
