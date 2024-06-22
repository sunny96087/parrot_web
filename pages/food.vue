<script setup lang="ts">
import { APIStore } from '~/store/apiService'
const store = APIStore()
import { showToast, openDialog, showLoading, hideLoading } from '~/store/eventBus'

const mode = ref(0)
const freshFoodInfo: any = ref('')
const poisonousFoodInfo: any = ref('')
const currentFreshFood: any = ref('')

const foodKeyword = ref('')
const unfoodKeyword = ref('')
/**
 * 選擇模式
 * 0 可食用
 * 1 不可食用
 */

onMounted(() => {
  getFoodInfo()
  getUnfoodInfo()
})

// 取得可食用食物資料
async function getFoodInfo() {
  try {
    showLoading()

    let data = {
      keyword: foodKeyword.value
    }
    const res = await store.apiGetAllFreshFoodsInfo(data)
    // console.log(res)

    const result = res.data
    if (result && result.status === 'success') {
      freshFoodInfo.value = result.data
    } else {
      showToast('發生錯誤，請稍後再試')
    }
  } catch (e) {
    console.log(e)
  } finally {
    hideLoading()
  }
}

// 取得不可食用食物資料
async function getUnfoodInfo() {
  try {
    showLoading()

    let data = {
      keyword: unfoodKeyword.value
    }
    const res = await store.apiGetAllPoisonousFoodInfo(data)
    // console.log(res)

    const result = res.data
    if (result && result.status === 'success') {
      poisonousFoodInfo.value = result.data
    } else {
      showToast('發生錯誤，請稍後再試')
    }
  } catch (e) {
    console.log(e)
  } finally {
    hideLoading()
  }
}

function searchFood() {
  if (mode.value === 0) {
    getFoodInfo()
  } else {
    getUnfoodInfo()
  }
}
</script>
<template>
  <div class="w-full">
    <!-- * tab -->
    <div class="flex-wrapper">
      <div class="flex overflow-x-auto">
        <div
          class="calculator-tab"
          :class="{ 'calculator-tab-active': mode === 0 }"
          @click="mode = 0"
        >
          可食用
        </div>
        <div
          class="calculator-tab"
          :class="{ 'calculator-tab-active': mode === 1 }"
          @click="mode = 1"
        >
          不可食用
        </div>
      </div>
    </div>

    <!-- * content -->
    <div class="cus-border">
      <!-- * introduction -->
      <div class="cus-intro" v-if="mode == 0">
        這些建議量是基於一般鸚鵡的飲食需求和安全考量。<br />
        如果有特定品種或個體需求，建議諮詢鳥類專家或獸醫，以確保飲食健康和安全。
      </div>
      <div class="cus-intro" v-else>
        為了確保鸚鵡的健康，我們列出了一些對鸚鵡有害食物及其禁食原因。<br />
        請避免讓鸚鵡接觸到這些食物，讓牠可以快快樂樂的長大，陪伴我們長長久久！
      </div>
      <hr class="cus-line-row" />

      <!-- * search input -->
      <div class="cus-block-padding">
        <div class="relative w-full">
          <input
            v-if="mode === 0"
            v-model="foodKeyword"
            @keyup.enter="searchFood"
            type="text"
            class="cus-input-blue4 w-full"
            placeholder="輸入關鍵字查詢 (名稱/備註/說明)"
          />
          <input
            v-else
            v-model="unfoodKeyword"
            @keyup.enter="searchFood"
            type="text"
            class="cus-input-blue4 w-full"
            placeholder="輸入關鍵字查詢 (名稱/備註/說明)"
          />

          <button @click="searchFood" class="absolute right-3 top-1/2 -translate-y-1/2 text-blue4">
            <Icon name="ph:magnifying-glass" size="24" class="" />
          </button>
        </div>
      </div>

      <hr class="cus-line-row" />

      <!-- * page > mode -->
      <div class="cus-block-padding">
        <div
          class="mb-5 text-blue4 lg:hidden"
          v-if="mode === 0 && freshFoodInfo && freshFoodInfo.length"
        >
          點擊資料欄可以查看各食物詳細資料。
        </div>

        <!-- ? 0 鮮食隨機配 -->
        <section v-if="mode === 0 && freshFoodInfo && freshFoodInfo.length" class="">
          <!-- ? food table > pc -->
          <div class="cus-table lg:hidden">
            <div class="cus-table-row grid grid-cols-3">
              <div class="cus-table-th">食物名稱</div>
              <div class="cus-table-th">熱量 (kcal/100g)</div>
              <div class="cus-table-th">食物備註</div>
            </div>
            <div
              class="cus-table-rows grid cursor-pointer grid-cols-3"
              v-for="item in freshFoodInfo"
              :key="item._id"
              @click="currentFreshFood = item"
            >
              <div class="cus-table-td">{{ item.name }}</div>
              <div class="cus-table-td">{{ item.calories }}</div>
              <div class="cus-table-td">{{ item.note }}</div>
            </div>
          </div>

          <!-- ? food table > pc -->
          <div class="cus-table hidden lg:block">
            <div class="cus-table-row grid grid-cols-8">
              <div class="cus-table-th">食物名稱</div>
              <div class="cus-table-th">熱量 (kcal/100g)</div>
              <div class="cus-table-th">蛋白質量 (g/100g)</div>
              <div class="cus-table-th">脂肪量 (g/100g)</div>
              <div class="cus-table-th">碳水化合物量 (g/100g)</div>
              <div class="cus-table-th">最大攝取量 (g/day)</div>
              <div class="cus-table-th">食物備註</div>
              <div class="cus-table-th">說明</div>
            </div>
            <div
              class="cus-table-rows grid grid-cols-8"
              v-for="item in freshFoodInfo"
              :key="item._id"
            >
              <div class="cus-table-td">{{ item.name }}</div>
              <div class="cus-table-td">{{ item.calories }}</div>
              <div class="cus-table-td">{{ item.protein }}</div>
              <div class="cus-table-td">{{ item.fat }}</div>
              <div class="cus-table-td">{{ item.carbs }}</div>
              <div class="cus-table-td">{{ item.maxIntake }}</div>
              <div class="cus-table-td">{{ item.note }}</div>
              <div class="cus-table-td">{{ item.nutrition }}</div>
            </div>
          </div>
        </section>

        <!-- ? 1 指定鮮食算攝取量 -->
        <section
          v-else-if="mode === 1 && poisonousFoodInfo && poisonousFoodInfo.length"
          class="text-sm sm:text-base"
        >
          <!-- ? food table > pc -->
          <div class="cus-table lg:hidden">
            <div class="cus-table-row grid grid-cols-3">
              <div class="cus-table-th">食物名稱</div>
              <div class="cus-table-th col-span-2">禁食說明</div>
            </div>
            <div
              class="cus-table-rows grid grid-cols-3"
              v-for="item in poisonousFoodInfo"
              :key="item._id"
            >
              <div class="cus-table-td">{{ item.name }}</div>
              <div class="cus-table-td col-span-2">{{ item.note }}</div>
            </div>
          </div>

          <!-- ? food table > pc -->
          <div class="cus-table hidden lg:block">
            <div class="cus-table-row grid grid-cols-8">
              <div class="cus-table-th">食物名稱</div>
              <div class="cus-table-th">禁食說明</div>
            </div>
            <div
              class="cus-table-rows grid grid-cols-8"
              v-for="item in poisonousFoodInfo"
              :key="item._id"
            >
              <div class="cus-table-td">{{ item.name }}</div>
              <div class="cus-table-td">{{ item.note }}</div>
            </div>
          </div>
        </section>

        <!-- ? 沒有資料 -->
        <div v-else class="text-center text-[14px] text-gray-400">沒有資料，請換個關鍵字查詢 ~</div>
      </div>

      <!-- * modal > currentFreshFood -->
      <div class="modal-bg" v-if="currentFreshFood">
        <div class="modal-box-bg">
          <div class="flex justify-end">
            <button @click="currentFreshFood = ''" class="mb-2">
              <Icon name="ph:x-square" size="40" class="text-blue4" />
            </button>
          </div>
          <div class="cus-table">
            <div class="cus-table-row grid grid-cols-2">
              <div class="cus-table-th">食物名稱</div>
              <div class="cus-table-td">{{ currentFreshFood.name }}</div>
            </div>
            <div class="cus-table-row grid grid-cols-2">
              <div class="cus-table-th">熱量 (kcal/100g)</div>
              <div class="cus-table-td">{{ currentFreshFood.calories }}</div>
            </div>
            <div class="cus-table-row grid grid-cols-2">
              <div class="cus-table-th">蛋白質量 (g/100g)</div>
              <div class="cus-table-td">{{ currentFreshFood.protein }}</div>
            </div>
            <div class="cus-table-row grid grid-cols-2">
              <div class="cus-table-th">脂肪量 (g/100g)</div>
              <div class="cus-table-td">{{ currentFreshFood.fat }}</div>
            </div>
            <div class="cus-table-row grid grid-cols-2">
              <div class="cus-table-th">碳水化合物量 (g/100g)</div>
              <div class="cus-table-td">{{ currentFreshFood.carbs }}</div>
            </div>
            <div class="cus-table-row grid grid-cols-2">
              <div class="cus-table-th">最大攝取量 (g/day)</div>
              <div class="cus-table-td">{{ currentFreshFood.maxIntake }}</div>
            </div>
            <div class="cus-table-row grid grid-cols-2">
              <div class="cus-table-th">食物備註</div>
              <div class="cus-table-td">{{ currentFreshFood.note }}</div>
            </div>
            <div class="grid grid-cols-2">
              <div class="cus-table-th">說明</div>
              <div class="cus-table-td">{{ currentFreshFood.nutrition }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
/* calculator-tab */
.calculator-tab {
  @apply w-[140px] min-w-[140px] py-[10px] text-center text-[14px] text-blue4 opacity-80;
  border-left: 1px solid transparent;
  border-top: 1px solid transparent;
  border-right: 1px solid transparent;
  border-radius: 6px 6px 0 0;
}

.calculator-tab-active {
  @apply font-bold opacity-100;
  border-left: 1px solid var(--color-blue4);
  border-top: 1px solid var(--color-blue4);
  border-right: 1px solid var(--color-blue4);
}

.overflow-x-auto {
  /* 隱藏滾動條的通用方法 */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* Internet Explorer 10+ */

  /* 對於 Webkit (Chrome, Safari, etc.) */
  &::-webkit-scrollbar {
    display: none;
  }
}
</style>
