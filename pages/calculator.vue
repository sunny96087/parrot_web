<script setup lang="ts">
import { APIStore } from '~/store/apiService'
const store = APIStore()
import { showToast, openDialog, showLoading, hideLoading } from '~/store/eventBus'

const mode = ref(0)
/**
 * 選擇模式
 * 0 鮮食隨機配
 * 1 指定鮮食算攝取量
 * 2 指定熱量算鮮食
 * 3 指定飼料算攝取量
 * 4 指定熱量算飼料
 */

const weight = ref('') // 體重
const activity = ref('low') // low, medium, high
const foodId = ref('') // 食物 ID
const requiredCalories = ref('') // 需要熱量

// 飼料
const feedCalories = ref('') // 飼料熱量
const feedProtein = ref('') // 飼料蛋白質
const feedFat = ref('') // 飼料脂肪
const feedCarbs = ref('') // 飼料碳水化合物

// result
const recommendFoodsInfo: any = ref('') // 鮮食隨機配
const calculatefoodInfo: any = ref('') // 指定鮮食算攝取量
const calculateFoodIntakeInfo: any = ref('') // 指定熱量算鮮食
const calculatefeedInfo: any = ref('') // 指定飼料算攝取量
const calculateFeedIntakeInfo: any = ref('') // 指定熱量算飼料

function resetInput() {
  weight.value = ''
  activity.value = 'low'
  foodId.value = ''
  requiredCalories.value = ''
  feedCalories.value = ''
  feedProtein.value = ''
  feedFat.value = ''
  feedCarbs.value = ''
}

watch(
  () => mode.value,
  () => {
    resetInput()
  }
)

onMounted(() => {
  getFoods()
})

// NOTE 鮮食隨機配
async function submitRecommendFoods() {
  try {
    showLoading()

    let data = {
      weight: Number(weight.value),
      activity: activity.value
    }

    const res = await store.apiRecommendFoods(data)
    console.log(res)

    const result = res.data
    if (result && result.status === 'success') {
      recommendFoodsInfo.value = result.data
    } else {
      showToast('發生錯誤，請稍後再試')
    }
  } catch (e) {
    console.log(e)
  } finally {
    hideLoading()
  }
}

const recommendFoodMode = ref(false) // false 簡易, true 詳細

// 檢查體重是否大於 1300, 若大於 1300 則提示 && 設定為 1300
function checkWeight() {
  if (Number(weight.value) > 1300) {
    showToast('目前僅支援常見鸚鵡體重，不支援大於 1300 (g)')
    weight.value = '1300'
    return false
  }
  return true
}

// NOTE 指定鮮食算攝取量

// 取得所有食物
const foods: any = ref([])
async function getFoods() {
  let data = {
    keyword: ''
  }
  try {
    showLoading()
    const res = await store.apiGetAllFreshFoodsInfo(data)
    // console.log(res)

    const result = res.data
    if (result && result.status === 'success') {
      foods.value = result.data
      console.log(foods.value)
    } else {
      showToast('發生錯誤，請稍後再試')
    }
  } catch (e) {
    console.log(e)
  } finally {
    hideLoading()
  }
}

async function submitCalculatefood() {
  try {
    showLoading()

    let data = {
      weight: Number(weight.value),
      activity: activity.value,
      foodId: foodId.value
    }

    const res = await store.apiCalculatefood(data)
    console.log(res)

    const result = res.data
    if (result && result.status === 'success') {
      calculatefoodInfo.value = result.data
    } else {
      showToast('發生錯誤，請稍後再試')
    }
  } catch (e) {
    console.log(e)
  } finally {
    hideLoading()
  }
}

// NOTE 指定熱量算鮮食
async function submitCalculateFoodIntake() {
  try {
    showLoading()

    let data = {
      requiredCalories: Number(requiredCalories.value),
      foodId: foodId.value
    }

    const res = await store.apiCalculateParrotFoodIntake(data)
    console.log(res)

    const result = res.data
    if (result && result.status === 'success') {
      calculateFoodIntakeInfo.value = result.data
    } else {
      showToast('發生錯誤，請稍後再試')
    }
  } catch (e) {
    console.log(e)
  } finally {
    hideLoading()
  }
}

// NOTE 指定飼料算攝取量
async function submitCalculateFeed() {
  try {
    showLoading()

    let data = {
      weight: Number(weight.value),
      activity: activity.value,
      calories: Number(feedCalories.value),
      protein: Number(feedProtein.value),
      fat: Number(feedFat.value),
      carbs: Number(feedCarbs.value)
    }

    const res = await store.apiCalculatefeed(data)
    console.log(res)

    const result = res.data
    if (result && result.status === 'success') {
      calculatefeedInfo.value = result.data
    } else {
      showToast('發生錯誤，請稍後再試')
    }
  } catch (e) {
    console.log(e)
  } finally {
    hideLoading()
  }
}

// NOTE 指定熱量算飼料
async function submitCalculateFeedIntake() {
  try {
    showLoading()

    let data = {
      requiredCalories: Number(requiredCalories.value),
      calories: Number(feedCalories.value),
      protein: Number(feedProtein.value),
      fat: Number(feedFat.value),
      carbs: Number(feedCarbs.value)
    }

    const res = await store.apiCalculateParrotFeedIntake(data)
    console.log(res)

    const result = res.data
    if (result && result.status === 'success') {
      calculateFeedIntakeInfo.value = result.data
    } else {
      showToast('發生錯誤，請稍後再試')
    }
  } catch (e) {
    console.log(e)
  } finally {
    hideLoading()
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
          鮮食隨機配
        </div>
        <div
          class="calculator-tab"
          :class="{ 'calculator-tab-active': mode === 1 }"
          @click="mode = 1"
        >
          指定鮮食算攝取量
        </div>
        <div
          class="calculator-tab"
          :class="{ 'calculator-tab-active': mode === 2 }"
          @click="mode = 2"
        >
          指定熱量算鮮食
        </div>
        <div
          class="calculator-tab"
          :class="{ 'calculator-tab-active': mode === 3 }"
          @click="mode = 3"
        >
          指定飼料算攝取量
        </div>
        <div
          class="calculator-tab"
          :class="{ 'calculator-tab-active': mode === 4 }"
          @click="mode = 4"
        >
          指定熱量算飼料
        </div>
      </div>
    </div>

    <!-- * content -->
    <div class="cus-border">
      <!-- * introduction -->
      <div class="cus-intro">
        不知道該給鸚鵡吃什麼嗎？<br />
        輸入鸚鵡體重跟活動水平，我幫你推薦營養均衡的鮮食！
      </div>
      <hr class="cus-line-row" />

      <!-- * page > mode -->
      <!-- ? 0 鮮食隨機配 -->
      <section v-if="mode === 0" class="">
        <!-- >> 0 鮮食隨機配 info -->
        <div class="cus-block-padding">
          <div class="flex gap-2">
            <h2 class="cus-page-title shrink-0">輸入基本資料</h2>
            <span class="cus-input-note">*目前僅支援計算 <= 1300 (g)</span>
          </div>

          <div class="cus-col-3">
            <div class="cus-col-1">
              <label for="weight" class="cus-label"
                >1. 體重 (g) <span class="text-red2">*</span></label
              >
              <input
                type="number"
                class="cus-input"
                id="weight"
                v-model="weight"
                placeholder="請輸入鸚鵡體重 (g)"
                @blur="checkWeight"
              />
              <span class="cus-input-note">基礎代謝率(BMR) = 175 * (體重 / 1000) ^ 0.75</span>
            </div>

            <div class="cus-col-1">
              <label for="activity" class="cus-label"
                >2. 活動水平 <span class="text-red2">*</span></label
              >
              <div class="cus-radio-row">
                <label class="cus-label-radio" for="low">
                  <input
                    type="radio"
                    name="activity"
                    class=""
                    id="low"
                    v-model="activity"
                    value="low"
                  />
                  <span></span>
                  低 - 平常不太活動
                </label>

                <label class="cus-label-radio" for="medium">
                  <input
                    type="radio"
                    name="activity"
                    class=""
                    id="medium"
                    v-model="activity"
                    value="medium"
                  />
                  <span></span>
                  中 - 適度活動
                </label>

                <label for="high" class="cus-label-radio">
                  <input
                    type="radio"
                    name="activity"
                    class=""
                    id="high"
                    v-model="activity"
                    value="high"
                  />
                  <span></span>高 - 經常活動
                </label>
              </div>
              <span class="cus-input-note">活動水平用來調整 BMR，可以更符合需求</span>
            </div>
          </div>

          <button class="cus-btn-primary mt-5" :disabled="!weight" @click="submitRecommendFoods">
            開始計算
          </button>
        </div>

        <!-- >> 0 鮮食隨機配 result > md -->
        <div v-if="recommendFoodsInfo" class="lg:hidden">
          <hr class="cus-line-row" />
          <div class="cus-block-padding">
            <h2 class="cus-page-title">計算結果</h2>

            <!-- ? 每日基本營養需求 -->
            <h3 class="cus-title-border-left">每日基本營養需求</h3>
            <div class="cus-table mb-5">
              <div class="cus-table-row grid grid-cols-2">
                <div class="cus-table-th">熱量 (kcal/day)</div>
                <div class="cus-table-td">{{ recommendFoodsInfo.dailyNeeds.calories }}</div>
              </div>
              <div class="cus-table-row grid grid-cols-2">
                <div class="cus-table-th">蛋白質 (g/day)</div>
                <div class="cus-table-td">{{ recommendFoodsInfo.dailyNeeds.protein }}</div>
              </div>
              <div class="cus-table-row grid grid-cols-2">
                <div class="cus-table-th">脂肪 (g/day)</div>
                <div class="cus-table-td">{{ recommendFoodsInfo.dailyNeeds.fat }}</div>
              </div>
              <div class="grid grid-cols-2">
                <div class="cus-table-th">碳水化合物 (g/day)</div>
                <div class="cus-table-td">{{ recommendFoodsInfo.dailyNeeds.carbs }}</div>
              </div>
            </div>

            <!-- ? 推薦食物營養總和 -->
            <h3 class="cus-title-border-left">推薦食物營養總和</h3>
            <div class="cus-table mb-5">
              <div class="cus-table-row grid grid-cols-2">
                <div class="cus-table-th">熱量 (kcal/day)</div>
                <div class="cus-table-td">{{ recommendFoodsInfo.totalNutrition.calories }}</div>
              </div>

              <div class="cus-table-row grid grid-cols-2">
                <div class="cus-table-th">蛋白質 (g/day)</div>
                <div class="cus-table-td">{{ recommendFoodsInfo.totalNutrition.protein }}</div>
              </div>

              <div class="cus-table-row grid grid-cols-2">
                <div class="cus-table-th">脂肪 (g/day)</div>
                <div class="cus-table-td">{{ recommendFoodsInfo.totalNutrition.fat }}</div>
              </div>

              <div class="grid grid-cols-2">
                <div class="cus-table-th">碳水化合物 (g/day)</div>
                <div class="cus-table-td">{{ recommendFoodsInfo.totalNutrition.carbs }}</div>
              </div>
            </div>

            <!-- ? 營養百分比 -->
            <h3 class="cus-title-border-left">營養百分比</h3>
            <div class="cus-table mb-5">
              <div class="cus-table-row grid grid-cols-3">
                <div class="cus-table-th"></div>
                <div class="cus-table-th">建議比例</div>
                <div class="cus-table-th">實際比例</div>
              </div>

              <div class="cus-table-row grid grid-cols-3">
                <div class="cus-table-th">蛋白質 (%)</div>
                <div class="cus-table-td">20</div>
                <div class="cus-table-td">{{ recommendFoodsInfo.percentage.protein }}</div>
              </div>

              <div class="cus-table-row grid grid-cols-3">
                <div class="cus-table-th">脂肪 (%)</div>
                <div class="cus-table-td">20</div>
                <div class="cus-table-td">{{ recommendFoodsInfo.percentage.fat }}</div>
              </div>

              <div class="grid grid-cols-3">
                <div class="cus-table-th">碳水化合物 (%)</div>
                <div class="cus-table-td">60</div>
                <div class="cus-table-td">{{ recommendFoodsInfo.percentage.carbs }}</div>
              </div>
            </div>

            <!-- ? 推薦食物列表 -->
            <div class="mb-3 flex items-center justify-between">
              <h3 class="cus-title-border-left-no">推薦食物列表</h3>
              <div class="cus-toggle-tab">
                <div
                  class="cus-toggle-tab-item"
                  :class="{ 'cus-toggle-tab-item-active': !recommendFoodMode }"
                  @click="recommendFoodMode = false"
                >
                  簡易
                </div>
                <div
                  class="cus-toggle-tab-item"
                  :class="{ 'cus-toggle-tab-item-active': recommendFoodMode }"
                  @click="recommendFoodMode = true"
                >
                  詳細
                </div>
              </div>
            </div>

            <!-- ? 推薦食物 > 簡易版 -->
            <div v-if="!recommendFoodMode" class="flex flex-col gap-3">
              <div class="cus-table" v-for="item in recommendFoodsInfo.foods" :key="item._id">
                <div class="cus-table-row grid grid-cols-2">
                  <div class="cus-table-th">食物名稱</div>
                  <div class="cus-table-td">{{ item.name }}</div>
                </div>

                <div class="cus-table-row grid grid-cols-2">
                  <div class="cus-table-th">食物備註</div>
                  <div class="cus-table-td">{{ item.note }}</div>
                </div>

                <div class="cus-table-row grid grid-cols-2">
                  <div class="cus-table-th">建議攝取量 (g/day)</div>
                  <div class="cus-table-td">{{ item.intakeAmount }}</div>
                </div>

                <div class="grid grid-cols-2">
                  <div class="cus-table-th">熱量 (kcal/day)</div>
                  <div class="cus-table-td">{{ item.nutrientsProvided.calories }}</div>
                </div>
              </div>
            </div>

            <!-- ? 推薦食物 > 詳細版 -->
            <div v-else class="flex flex-col gap-3">
              <div class="cus-table" v-for="item in recommendFoodsInfo.foods" :key="item._id">
                <div class="cus-table-row grid grid-cols-2">
                  <div class="cus-table-th">食物名稱</div>
                  <div class="cus-table-td">{{ item.name }}</div>
                </div>

                <div class="cus-table-row grid grid-cols-2">
                  <div class="cus-table-th">食物備註</div>
                  <div class="cus-table-td">{{ item.note }}</div>
                </div>

                <div class="cus-table-row grid grid-cols-2">
                  <div class="cus-table-th">建議攝取量 (g/day)</div>
                  <div class="cus-table-td">{{ item.intakeAmount }}</div>
                </div>

                <div class="cus-table-row grid grid-cols-2">
                  <div class="cus-table-th">蛋白質量 (g/day)</div>
                  <div class="cus-table-td">{{ item.nutrientsProvided.protein }}</div>
                </div>

                <div class="cus-table-row grid grid-cols-2">
                  <div class="cus-table-th">脂肪量 (g/day)</div>
                  <div class="cus-table-td">{{ item.nutrientsProvided.fat }}</div>
                </div>

                <div class="cus-table-row grid grid-cols-2">
                  <div class="cus-table-th">碳水化合物量 (g/day)</div>
                  <div class="cus-table-td">{{ item.nutrientsProvided.carbs }}</div>
                </div>

                <div class="grid grid-cols-2">
                  <div class="cus-table-th">熱量 (kcal/day)</div>
                  <div class="cus-table-td">{{ item.nutrientsProvided.calories }}</div>
                </div>
              </div>
            </div>
          </div>
          <!-- <pre>
            {{ recommendFoodsInfo }}
          </pre> -->
        </div>

        <!-- >> 0 鮮食隨機配 result > pc -->
        <div v-if="recommendFoodsInfo" class="hidden lg:block">
          <hr class="cus-line-row" />
          <div class="cus-block-padding">
            <h2 class="cus-page-title">計算結果</h2>

            <!-- ? 每日基本營養需求 -->
            <h3 class="cus-title-border-left">每日基本營養需求</h3>
            <div class="cus-table mb-5">
              <div class="cus-table-row grid grid-cols-4">
                <div class="cus-table-th">熱量 (kcal/day)</div>
                <div class="cus-table-th">蛋白質 (g/day)</div>
                <div class="cus-table-th">脂肪 (g/day)</div>
                <div class="cus-table-th">碳水化合物 (g/day)</div>
              </div>
              <div class="grid grid-cols-4">
                <div class="cus-table-td">{{ recommendFoodsInfo.dailyNeeds.calories }}</div>
                <div class="cus-table-td">{{ recommendFoodsInfo.dailyNeeds.protein }}</div>
                <div class="cus-table-td">{{ recommendFoodsInfo.dailyNeeds.fat }}</div>
                <div class="cus-table-td">{{ recommendFoodsInfo.dailyNeeds.carbs }}</div>
              </div>
            </div>

            <!-- ? 推薦食物營養總和 -->
            <h3 class="cus-title-border-left">推薦食物營養總和</h3>
            <div class="cus-table mb-5">
              <div class="cus-table-row grid grid-cols-4">
                <div class="cus-table-th">熱量 (kcal/day)</div>
                <div class="cus-table-th">蛋白質 (g/day)</div>
                <div class="cus-table-th">脂肪 (g/day)</div>
                <div class="cus-table-th">碳水化合物 (g/day)</div>
              </div>
              <div class="grid grid-cols-4">
                <div class="cus-table-td">{{ recommendFoodsInfo.totalNutrition.calories }}</div>
                <div class="cus-table-td">{{ recommendFoodsInfo.totalNutrition.protein }}</div>
                <div class="cus-table-td">{{ recommendFoodsInfo.totalNutrition.fat }}</div>
                <div class="cus-table-td">{{ recommendFoodsInfo.totalNutrition.carbs }}</div>
              </div>
            </div>

            <!-- ? 營養百分比 -->
            <h3 class="cus-title-border-left">營養百分比</h3>
            <div class="cus-table mb-5">
              <div class="cus-table-row grid grid-cols-4">
                <div class="cus-table-th"></div>
                <div class="cus-table-th">蛋白質 (%)</div>
                <div class="cus-table-th">脂肪 (%)</div>
                <div class="cus-table-th">碳水化合物 (%)</div>
              </div>
              <div class="cus-table-row grid grid-cols-4">
                <div class="cus-table-th">建議分配比例</div>
                <div class="cus-table-td">20</div>
                <div class="cus-table-td">20</div>
                <div class="cus-table-td">60</div>
              </div>
              <div class="grid grid-cols-4">
                <div class="cus-table-th">推薦食物實際比例</div>
                <div class="cus-table-td">{{ recommendFoodsInfo.percentage.protein }}</div>
                <div class="cus-table-td">{{ recommendFoodsInfo.percentage.fat }}</div>
                <div class="cus-table-td">{{ recommendFoodsInfo.percentage.carbs }}</div>
              </div>
            </div>

            <!-- ? 推薦食物列表 -->
            <h3 class="cus-title-border-left">推薦食物列表</h3>
            <div class="cus-table">
              <div class="cus-table-row grid grid-cols-7">
                <div class="cus-table-th">食物名稱</div>
                <div class="cus-table-th">食物備註</div>
                <div class="cus-table-th">建議攝取量 (g/day)</div>
                <div class="cus-table-th">蛋白質量 (g/day)</div>
                <div class="cus-table-th">脂肪量 (g/day)</div>
                <div class="cus-table-th">碳水化合物量 (g/day)</div>
                <div class="cus-table-th">熱量 (kcal/day)</div>
              </div>
              <!-- <div class="cus-table-row grid grid-cols-7">
                <div class="cus-table-td">20</div>
                <div class="cus-table-td">20</div>
                <div class="cus-table-td">60</div>
                <div class="cus-table-td">60</div>
                <div class="cus-table-td">60</div>
                <div class="cus-table-td">60</div>
                <div class="cus-table-td">60</div>
              </div> -->
              <div
                class="cus-table-rows grid grid-cols-7"
                v-for="item in recommendFoodsInfo.foods"
                :key="item._id"
              >
                <div class="cus-table-td">{{ item.name }}</div>
                <div class="cus-table-td">{{ item.note }}</div>
                <div class="cus-table-td">{{ item.intakeAmount }}</div>
                <div class="cus-table-td">{{ item.nutrientsProvided.protein }}</div>
                <div class="cus-table-td">{{ item.nutrientsProvided.fat }}</div>
                <div class="cus-table-td">{{ item.nutrientsProvided.carbs }}</div>
                <div class="cus-table-td">{{ item.nutrientsProvided.calories }}</div>
              </div>
            </div>
          </div>
          <!-- <pre>
            {{ recommendFoodsInfo }}
          </pre> -->
        </div>
      </section>

      <!-- ? 1 指定鮮食算攝取量 -->
      <section v-else-if="mode === 1" class="text-sm sm:text-base">
        <!-- >> 1 指定鮮食算攝取量 info -->
        <div class="cus-block-padding">
          <h2 class="cus-page-title">輸入基本資料</h2>

          <div class="cus-col-3">
            <div class="cus-col-1">
              <label for="weight" class="cus-label"
                >1. 體重 (g) <span class="text-red2">*</span></label
              >
              <input
                type="number"
                class="cus-input"
                id="weight"
                v-model="weight"
                placeholder="請輸入鸚鵡體重 (g)"
              />
              <span class="cus-input-note">基礎代謝率(BMR) = 175 * (體重 / 1000) ^ 0.75</span>
            </div>

            <div class="cus-col-1">
              <label for="activity" class="cus-label"
                >2. 活動水平 <span class="text-red2">*</span></label
              >
              <div class="cus-radio-row">
                <label class="cus-label-radio" for="low">
                  <input
                    type="radio"
                    name="activity"
                    class=""
                    id="low"
                    v-model="activity"
                    value="low"
                  />
                  <span></span>
                  低 - 平常不太活動
                </label>

                <label class="cus-label-radio" for="medium">
                  <input
                    type="radio"
                    name="activity"
                    class=""
                    id="medium"
                    v-model="activity"
                    value="medium"
                  />
                  <span></span>
                  中 - 適度活動
                </label>

                <label for="high" class="cus-label-radio">
                  <input
                    type="radio"
                    name="activity"
                    class=""
                    id="high"
                    v-model="activity"
                    value="high"
                  />
                  <span></span>高 - 經常活動
                </label>
              </div>
              <span class="cus-input-note">活動水平用來調整 BMR，可以更符合需求</span>
            </div>

            <div class="cus-col-1" v-if="foods.length">
              <label for="foodId" class="cus-label"
                >3. 選擇想計算的食物 <span class="text-red2">*</span></label
              >
              <select type="number" class="cus-input" id="foodId" v-model="foodId">
                <option value="" disabled selected>請選擇食物</option>
                <option v-for="food in foods" :key="food._id" :value="food._id">
                  {{ food.name }}
                </option>
              </select>
              <span class="cus-input-note">目前僅提供計算資料庫內的食物</span>
            </div>
          </div>

          <button
            class="cus-btn-primary mt-5"
            :disabled="!weight || !foodId"
            @click="submitCalculatefood"
          >
            開始計算
          </button>
        </div>

        <!-- >> 1 result > md -->
        <div v-if="calculatefoodInfo" class="lg:hidden">
          <hr class="cus-line-row" />
          <div class="cus-block-padding">
            <h2 class="cus-page-title">計算結果</h2>

            <!-- ? 每日基本營養需求 -->
            <h3 class="cus-title-border-left">每日基本營養需求</h3>
            <div class="cus-table mb-5">
              <div class="cus-table-row grid grid-cols-2">
                <div class="cus-table-th">熱量 (kcal/day)</div>
                <div class="cus-table-td">{{ calculatefoodInfo.dailyCalories }}</div>
              </div>
              <div class="cus-table-row grid grid-cols-2">
                <div class="cus-table-th">蛋白質 (g/day)</div>
                <div class="cus-table-td">{{ calculatefoodInfo.dailyProteinNeed }}</div>
              </div>
              <div class="cus-table-row grid grid-cols-2">
                <div class="cus-table-th">脂肪 (g/day)</div>
                <div class="cus-table-td">{{ calculatefoodInfo.dailyFatNeed }}</div>
              </div>
              <div class="grid grid-cols-2">
                <div class="cus-table-th">碳水化合物 (g/day)</div>
                <div class="cus-table-td">{{ calculatefoodInfo.dailyCarbsNeed }}</div>
              </div>
            </div>

            <!-- ? 食物營養資訊 -->
            <h3 class="cus-title-border-left">食物營養資訊</h3>
            <div class="cus-table mb-5">
              <div class="cus-table-row grid grid-cols-2">
                <div class="cus-table-th">食物名稱</div>
                <div class="cus-table-td">{{ calculatefoodInfo.food?.name }}</div>
              </div>
              <div class="cus-table-row grid grid-cols-2">
                <div class="cus-table-th">熱量 (kcal/100g)</div>
                <div class="cus-table-td">{{ calculatefoodInfo.food?.calories }}</div>
              </div>
              <div class="cus-table-row grid grid-cols-2">
                <div class="cus-table-th">蛋白質 (g/100g)</div>
                <div class="cus-table-td">{{ calculatefoodInfo.food?.protein }}</div>
              </div>
              <div class="cus-table-row grid grid-cols-2">
                <div class="cus-table-th">脂肪 (g/100g)</div>
                <div class="cus-table-td">{{ calculatefoodInfo.food?.fat }}</div>
              </div>
              <div class="cus-table-row grid grid-cols-2">
                <div class="cus-table-th">碳水化合物 (g/100g)</div>
                <div class="cus-table-td">{{ calculatefoodInfo.food?.carbs }}</div>
              </div>
              <div class="cus-table-row grid grid-cols-2">
                <div class="cus-table-th">每日最大攝取量 (g/day)</div>
                <div class="cus-table-td">{{ calculatefoodInfo.food?.maxIntake }}</div>
              </div>
              <div class="cus-table-row grid grid-cols-2">
                <div class="cus-table-th">食物備註</div>
                <div class="cus-table-td">{{ calculatefoodInfo.food?.note }}</div>
              </div>
              <div class="grid grid-cols-2">
                <div class="cus-table-th">好處</div>
                <div class="cus-table-td">{{ calculatefoodInfo.food?.nutrition }}</div>
              </div>
            </div>

            <!-- ? 食物建議攝取量 & 營養資訊 -->
            <h3 class="cus-title-border-left">食物建議攝取量 & 營養資訊</h3>
            <div class="cus-table mb-5">
              <div class="cus-table-row grid grid-cols-2">
                <div class="cus-table-th">建議攝取量 (g/day)</div>
                <div class="cus-table-td">{{ calculatefoodInfo.foodIntake }}</div>
              </div>

              <div class="cus-table-row grid grid-cols-2">
                <div class="cus-table-th">蛋白質量 (g/day)</div>
                <div class="cus-table-td">{{ calculatefoodInfo.nutrientsProvided?.protein }}</div>
              </div>

              <div class="cus-table-row grid grid-cols-2">
                <div class="cus-table-th">脂肪量 (g/day)</div>
                <div class="cus-table-td">{{ calculatefoodInfo.nutrientsProvided?.fat }}</div>
              </div>

              <div class="grid grid-cols-2">
                <div class="cus-table-th">碳水化合物量 (g/day)</div>
                <div class="cus-table-td">{{ calculatefoodInfo.nutrientsProvided?.carbs }}</div>
              </div>

              <div class="cus-table-row grid grid-cols-2">
                <div class="cus-table-th">提供總熱量 (kcal/day)</div>
                <div class="cus-table-td">{{ calculatefoodInfo.foodProvidedCalories }}</div>
              </div>
            </div>

            <!-- ? 每日所需營養缺失量 -->
            <h3 class="cus-title-border-left-err" v-if="calculatefoodInfo.caloriesDifference > 0">
              每日所需營養缺失量： {{ calculatefoodInfo.caloriesDifference }} (kcal/day)
            </h3>
            <h3 v-else class="cus-title-border-left">補充小知識</h3>
            <div class="text-blue4">
              每日營養最佳分配比例為：<br />
              蛋白質 2：脂肪 2：碳水化合物 6，<br />
              單一種鮮食難以滿足鸚鵡每日所需營養，<br />
              建議可以使用鮮食隨機配！
            </div>
          </div>
          <!-- <pre>
            {{ calculatefoodInfo }}
          </pre> -->
        </div>

        <!-- >> 1 result > pc -->
        <div v-if="calculatefoodInfo" class="hidden lg:block">
          <hr class="cus-line-row" />
          <div class="cus-block-padding">
            <h2 class="cus-page-title">計算結果</h2>

            <!-- ? 每日基本營養需求 -->
            <h3 class="cus-title-border-left">每日基本營養需求</h3>
            <div class="cus-table mb-5">
              <div class="cus-table-row grid grid-cols-4">
                <div class="cus-table-th">熱量 (kcal/day)</div>
                <div class="cus-table-th">蛋白質 (g/day)</div>
                <div class="cus-table-th">脂肪 (g/day)</div>
                <div class="cus-table-th">碳水化合物 (g/day)</div>
              </div>
              <div class="grid grid-cols-4">
                <div class="cus-table-td">{{ calculatefoodInfo.dailyCalories }}</div>
                <div class="cus-table-td">{{ calculatefoodInfo.dailyProteinNeed }}</div>
                <div class="cus-table-td">{{ calculatefoodInfo.dailyFatNeed }}</div>
                <div class="cus-table-td">{{ calculatefoodInfo.dailyCarbsNeed }}</div>
              </div>
            </div>

            <!-- ? 食物營養資訊 -->
            <h3 class="cus-title-border-left">食物營養資訊</h3>
            <div class="cus-table mb-5">
              <div class="cus-table-row grid grid-cols-5">
                <div class="cus-table-th">食物名稱</div>
                <div class="cus-table-th">熱量 (kcal/100g)</div>
                <div class="cus-table-th">蛋白質 (g/100g)</div>
                <div class="cus-table-th">脂肪 (g/100g)</div>
                <div class="cus-table-th">碳水化合物 (g/100g)</div>
              </div>

              <div class="grid grid-cols-5">
                <div class="cus-table-td">{{ calculatefoodInfo.food?.name }}</div>
                <div class="cus-table-td">{{ calculatefoodInfo.food?.calories }}</div>
                <div class="cus-table-td">{{ calculatefoodInfo.food?.protein }}</div>
                <div class="cus-table-td">{{ calculatefoodInfo.food?.fat }}</div>
                <div class="cus-table-td">{{ calculatefoodInfo.food?.carbs }}</div>
              </div>
            </div>

            <div class="cus-table mb-5">
              <div class="cus-table-row grid grid-cols-5">
                <div class="cus-table-th">每日最大攝取量 (g/day)</div>
                <div class="cus-table-th">食物備註</div>
                <div class="cus-table-th col-span-3">好處</div>
              </div>
              <div class="grid grid-cols-5">
                <div class="cus-table-td">{{ calculatefoodInfo.food?.maxIntake }}</div>
                <div class="cus-table-td">{{ calculatefoodInfo.food?.note }}</div>
                <div class="cus-table-td col-span-3">{{ calculatefoodInfo.food?.nutrition }}</div>
              </div>
            </div>

            <!-- ? 食物建議攝取量 & 營養資訊 -->
            <h3 class="cus-title-border-left">食物建議攝取量 & 營養資訊</h3>
            <div class="cus-table mb-5">
              <div class="cus-table-row grid grid-cols-5">
                <div class="cus-table-th">建議攝取量 (g/day)</div>
                <div class="cus-table-th">蛋白質量 (g/day)</div>
                <div class="cus-table-th">脂肪量 (g/day)</div>
                <div class="cus-table-th">碳水化合物量 (g/day)</div>
                <div class="cus-table-th">提供總熱量 (kcal/day)</div>
              </div>

              <div class="grid grid-cols-5">
                <div class="cus-table-td">{{ calculatefoodInfo.foodIntake }}</div>
                <div class="cus-table-td">{{ calculatefoodInfo.nutrientsProvided?.protein }}</div>
                <div class="cus-table-td">{{ calculatefoodInfo.nutrientsProvided?.fat }}</div>
                <div class="cus-table-td">{{ calculatefoodInfo.nutrientsProvided?.carbs }}</div>
                <div class="cus-table-td">{{ calculatefoodInfo.foodProvidedCalories }}</div>
              </div>
            </div>

            <!-- ? 每日所需營養缺失量 -->
            <h3 class="cus-title-border-left-err" v-if="calculatefoodInfo.caloriesDifference > 0">
              每日所需營養缺失量： {{ calculatefoodInfo.caloriesDifference }} (kcal/day)
            </h3>
            <h3 v-else class="cus-title-border-left">補充小知識</h3>
            <div class="text-blue4">
              每日營養最佳分配比例為：<br />
              蛋白質 2：脂肪 2：碳水化合物 6，<br />
              單一種鮮食難以滿足鸚鵡每日所需營養，<br />
              建議可以使用鮮食隨機配！
            </div>
          </div>
          <!-- <pre>
            {{ calculatefoodInfo }}
          </pre> -->
        </div>
      </section>

      <!-- ? 2 指定熱量算鮮食 -->
      <section v-else-if="mode === 2" class="">
        <!-- >> 2 指定熱量算鮮食 info -->
        <div class="cus-block-padding">
          <h2 class="cus-page-title">輸入基本資料</h2>

          <div class="cus-col-3">
            <div class="cus-col-1">
              <label for="weight" class="cus-label"
                >1. 需求熱量 (kcal) <span class="text-red2">*</span></label
              >
              <input
                type="number"
                class="cus-input"
                id="weight"
                v-model="requiredCalories"
                placeholder="請輸入需求熱量 (kcal)"
              />
              <span class="cus-input-note">根據需求熱量及食物類別，計算出建議攝取量</span>
            </div>

            <div class="cus-col-1" v-if="foods.length">
              <label for="foodId" class="cus-label"
                >2. 選擇想計算的食物 <span class="text-red2">*</span></label
              >
              <select type="number" class="cus-input" id="foodId" v-model="foodId">
                <option value="" disabled selected>請選擇食物</option>
                <option v-for="food in foods" :key="food._id" :value="food._id">
                  {{ food.name }}
                </option>
              </select>
              <span class="cus-input-note">目前僅提供計算資料庫內的食物</span>
            </div>
          </div>

          <button
            class="cus-btn-primary mt-5"
            :disabled="!requiredCalories || !foodId"
            @click="submitCalculateFoodIntake"
          >
            開始計算
          </button>
        </div>

        <!-- >> 2 result > md -->
        <div v-if="calculateFoodIntakeInfo" class="lg:hidden">
          <hr class="cus-line-row" />
          <div class="cus-block-padding">
            <h2 class="cus-page-title">計算結果</h2>

            <!-- ? 營養需求 -->
            <h3 class="cus-title-border-left">營養需求</h3>
            <div class="cus-table mb-5">
              <div class="cus-table-row grid grid-cols-2">
                <div class="cus-table-th">需求熱量 (kcal/day)</div>
                <div class="cus-table-td">{{ calculateFoodIntakeInfo.requiredCalories }}</div>
              </div>
              <div class="cus-table-row grid grid-cols-2">
                <div class="cus-table-th">建議攝取量 (g/day)</div>
                <div class="cus-table-td">{{ calculateFoodIntakeInfo.requiredFoodIntake }}</div>
              </div>
              <div class="cus-table-row grid grid-cols-2">
                <div class="cus-table-th">建議食物總熱量 (kcal/day)</div>
                <div class="cus-table-td">{{ calculateFoodIntakeInfo.foodProvidedCalories }}</div>
              </div>
              <div class="grid grid-cols-2">
                <div class="cus-table-th">熱量差異</div>
                <div
                  v-if="calculateFoodIntakeInfo.caloriesDifference > 0"
                  class="cus-table-td text-red2"
                >
                  {{ calculateFoodIntakeInfo.caloriesDifference }}
                </div>
                <div v-else class="cus-table-td">
                  {{ calculateFoodIntakeInfo.caloriesDifference }}
                </div>
              </div>
            </div>

            <!-- ? 食物營養資訊 -->
            <h3 class="cus-title-border-left">食物營養資訊</h3>
            <div class="cus-table mb-5">
              <div class="cus-table-row grid grid-cols-2">
                <div class="cus-table-th">食物名稱</div>
                <div class="cus-table-td">{{ calculateFoodIntakeInfo.foodId?.name }}</div>
              </div>
              <div class="cus-table-row grid grid-cols-2">
                <div class="cus-table-th">熱量 (kcal/100g)</div>
                <div class="cus-table-td">{{ calculateFoodIntakeInfo.foodId?.calories }}</div>
              </div>
              <div class="cus-table-row grid grid-cols-2">
                <div class="cus-table-th">蛋白質 (g/100g)</div>
                <div class="cus-table-td">{{ calculateFoodIntakeInfo.foodId?.protein }}</div>
              </div>
              <div class="cus-table-row grid grid-cols-2">
                <div class="cus-table-th">脂肪 (g/100g)</div>
                <div class="cus-table-td">{{ calculateFoodIntakeInfo.foodId?.fat }}</div>
              </div>
              <div class="cus-table-row grid grid-cols-2">
                <div class="cus-table-th">碳水化合物 (g/100g)</div>
                <div class="cus-table-td">{{ calculateFoodIntakeInfo.foodId?.carbs }}</div>
              </div>
              <div class="cus-table-row grid grid-cols-2">
                <div class="cus-table-th">每日最大攝取量 (g/day)</div>
                <div class="cus-table-td">{{ calculateFoodIntakeInfo.foodId?.maxIntake }}</div>
              </div>
              <div class="cus-table-row grid grid-cols-2">
                <div class="cus-table-th">食物備註</div>
                <div class="cus-table-td">{{ calculateFoodIntakeInfo.foodId?.note }}</div>
              </div>
              <div class="grid grid-cols-2">
                <div class="cus-table-th">好處</div>
                <div class="cus-table-td">{{ calculateFoodIntakeInfo.foodId?.nutrition }}</div>
              </div>
            </div>

            <!-- ? 食物建議攝取量 & 營養資訊 -->
            <h3 class="cus-title-border-left">食物建議攝取量 & 營養資訊</h3>
            <div class="cus-table mb-5">
              <div class="cus-table-row grid grid-cols-2">
                <div class="cus-table-th">建議攝取量 (g/day)</div>
                <div class="cus-table-td">{{ calculateFoodIntakeInfo.requiredFoodIntake }}</div>
              </div>

              <div class="cus-table-row grid grid-cols-2">
                <div class="cus-table-th">蛋白質量 (g/day)</div>
                <div class="cus-table-td">
                  {{ calculateFoodIntakeInfo.nutrientsCalories?.protein }}
                </div>
              </div>

              <div class="cus-table-row grid grid-cols-2">
                <div class="cus-table-th">脂肪量 (g/day)</div>
                <div class="cus-table-td">{{ calculateFoodIntakeInfo.nutrientsCalories?.fat }}</div>
              </div>

              <div class="cus-table-row grid grid-cols-2">
                <div class="cus-table-th">碳水化合物量 (g/day)</div>
                <div class="cus-table-td">
                  {{ calculateFoodIntakeInfo.nutrientsCalories?.carbs }}
                </div>
              </div>

              <div class="grid grid-cols-2">
                <div class="cus-table-th">提供總熱量 (kcal/day)</div>
                <div class="cus-table-td">{{ calculateFoodIntakeInfo.foodProvidedCalories }}</div>
              </div>
            </div>

            <!-- ? 每日所需營養缺失量 -->
            <h3
              class="cus-title-border-left-err"
              v-if="calculateFoodIntakeInfo.caloriesDifference > 0"
            >
              每日所需營養缺失量： {{ calculateFoodIntakeInfo.caloriesDifference }} (kcal/day)
            </h3>
            <h3 v-else class="cus-title-border-left">補充小知識</h3>
            <div class="text-blue4">
              每日營養最佳分配比例為：<br />
              蛋白質 2：脂肪 2：碳水化合物 6，<br />
              單一種鮮食難以滿足鸚鵡每日所需營養，<br />
              建議可以使用鮮食隨機配！
            </div>
          </div>
          <!-- <pre>
            {{ calculateFoodIntakeInfo }}
          </pre> -->
        </div>

        <!-- >> 2 result > pc -->
        <div v-if="calculateFoodIntakeInfo" class="hidden lg:block">
          <hr class="cus-line-row" />
          <div class="cus-block-padding">
            <h2 class="cus-page-title">計算結果</h2>

            <!-- ? 營養需求 -->
            <h3 class="cus-title-border-left">營養需求</h3>
            <div class="cus-table mb-5">
              <div class="cus-table-row grid grid-cols-4">
                <div class="cus-table-th">需求熱量 (kcal/day)</div>
                <div class="cus-table-th">建議攝取量 (g/day)</div>
                <div class="cus-table-th">建議食物總熱量 (kcal/day)</div>
                <div class="cus-table-th">熱量差異</div>
              </div>
              <div class="grid grid-cols-4">
                <div class="cus-table-td">{{ calculateFoodIntakeInfo.requiredCalories }}</div>
                <div class="cus-table-td">{{ calculateFoodIntakeInfo.requiredFoodIntake }}</div>
                <div class="cus-table-td">{{ calculateFoodIntakeInfo.foodProvidedCalories }}</div>
                <div
                  v-if="calculateFoodIntakeInfo.caloriesDifference > 0"
                  class="cus-table-td text-red2"
                >
                  {{ calculateFoodIntakeInfo.caloriesDifference }}
                </div>
                <div v-else class="cus-table-td">
                  {{ calculateFoodIntakeInfo.caloriesDifference }}
                </div>
              </div>
            </div>

            <!-- ? 食物營養資訊 -->
            <h3 class="cus-title-border-left">食物營養資訊</h3>
            <div class="cus-table mb-5">
              <div class="cus-table-row grid grid-cols-5">
                <div class="cus-table-th">食物名稱</div>
                <div class="cus-table-th">熱量 (kcal/100g)</div>
                <div class="cus-table-th">蛋白質 (g/100g)</div>
                <div class="cus-table-th">脂肪 (g/100g)</div>
                <div class="cus-table-th">碳水化合物 (g/100g)</div>
              </div>

              <div class="grid grid-cols-5">
                <div class="cus-table-td">{{ calculateFoodIntakeInfo.foodId?.name }}</div>
                <div class="cus-table-td">{{ calculateFoodIntakeInfo.foodId?.calories }}</div>
                <div class="cus-table-td">{{ calculateFoodIntakeInfo.foodId?.protein }}</div>
                <div class="cus-table-td">{{ calculateFoodIntakeInfo.foodId?.fat }}</div>
                <div class="cus-table-td">{{ calculateFoodIntakeInfo.foodId?.carbs }}</div>
              </div>
            </div>

            <div class="cus-table mb-5">
              <div class="cus-table-row grid grid-cols-5">
                <div class="cus-table-th">每日最大攝取量 (g/day)</div>
                <div class="cus-table-th">食物備註</div>
                <div class="cus-table-th col-span-3">好處</div>
              </div>
              <div class="grid grid-cols-5">
                <div class="cus-table-td">{{ calculateFoodIntakeInfo.foodId?.maxIntake }}</div>
                <div class="cus-table-td">{{ calculateFoodIntakeInfo.foodId?.note }}</div>
                <div class="cus-table-td col-span-3">
                  {{ calculateFoodIntakeInfo.foodId?.nutrition }}
                </div>
              </div>
            </div>

            <!-- ? 食物建議攝取量 & 營養資訊 -->
            <h3 class="cus-title-border-left">食物建議攝取量 & 營養資訊</h3>
            <div class="cus-table mb-5">
              <div class="cus-table-row grid grid-cols-5">
                <div class="cus-table-th">建議攝取量 (g/day)</div>
                <div class="cus-table-th">蛋白質量 (g/day)</div>
                <div class="cus-table-th">脂肪量 (g/day)</div>
                <div class="cus-table-th">碳水化合物量 (g/day)</div>
                <div class="cus-table-th">提供總熱量 (kcal/day)</div>
              </div>

              <div class="grid grid-cols-5">
                <div class="cus-table-td">{{ calculateFoodIntakeInfo.requiredFoodIntake }}</div>
                <div class="cus-table-td">
                  {{ calculateFoodIntakeInfo.nutrientsCalories?.protein }}
                </div>
                <div class="cus-table-td">{{ calculateFoodIntakeInfo.nutrientsCalories?.fat }}</div>
                <div class="cus-table-td">
                  {{ calculateFoodIntakeInfo.nutrientsCalories?.carbs }}
                </div>
                <div class="cus-table-td">{{ calculateFoodIntakeInfo.foodProvidedCalories }}</div>
              </div>
            </div>

            <!-- ? 每日所需營養缺失量 -->
            <h3
              class="cus-title-border-left-err"
              v-if="calculateFoodIntakeInfo.caloriesDifference > 0"
            >
              每日所需營養缺失量： {{ calculateFoodIntakeInfo.caloriesDifference }} (kcal/day)
            </h3>
            <h3 v-else class="cus-title-border-left">補充小知識</h3>
            <div class="text-blue4">
              每日營養最佳分配比例為：<br />
              蛋白質 2：脂肪 2：碳水化合物 6，<br />
              單一種鮮食難以滿足鸚鵡每日所需營養，<br />
              建議可以使用鮮食隨機配！
            </div>
          </div>
          <!-- <pre>
            {{ calculateFoodIntakeInfo }}
          </pre> -->
        </div>
      </section>

      <!-- ? 3 指定飼料算攝取量 -->
      <section v-else-if="mode === 3" class="">
        <!-- >> 3 指定飼料算攝取量 info -->
        <div class="cus-block-padding">
          <h2 class="cus-page-title">輸入基本資料</h2>

          <div class="cus-col-3">
            <div class="cus-col-1">
              <label for="weight" class="cus-label"
                >1. 體重 (g) <span class="text-red2">*</span></label
              >
              <input
                type="number"
                class="cus-input"
                id="weight"
                v-model="weight"
                placeholder="請輸入鸚鵡體重 (g)"
              />
              <span class="cus-input-note">基礎代謝率(BMR) = 175 * (體重 / 1000) ^ 0.75</span>
            </div>

            <div class="cus-col-1">
              <label for="activity" class="cus-label"
                >2. 活動水平 <span class="text-red2">*</span></label
              >
              <div class="cus-radio-row">
                <label class="cus-label-radio" for="low">
                  <input
                    type="radio"
                    name="activity"
                    class=""
                    id="low"
                    v-model="activity"
                    value="low"
                  />
                  <span></span>
                  低 - 平常不太活動
                </label>

                <label class="cus-label-radio" for="medium">
                  <input
                    type="radio"
                    name="activity"
                    class=""
                    id="medium"
                    v-model="activity"
                    value="medium"
                  />
                  <span></span>
                  中 - 適度活動
                </label>

                <label for="high" class="cus-label-radio">
                  <input
                    type="radio"
                    name="activity"
                    class=""
                    id="high"
                    v-model="activity"
                    value="high"
                  />
                  <span></span>高 - 經常活動
                </label>
              </div>
              <span class="cus-input-note">活動水平用來調整 BMR，可以更符合需求</span>
            </div>

            <div class="cus-col-1">
              <label for="feedCalories" class="cus-label"
                >3. 飼料的營養資訊 <span class="text-red2">*</span></label
              >
              <div class="flex flex-col gap-[6px] lg:flex-row lg:gap-3">
                <input
                  type="number"
                  class="cus-input w-full"
                  id="feedCalories"
                  v-model="feedCalories"
                  placeholder="熱量 (kcal/100g)"
                />
                <input
                  type="number"
                  class="cus-input w-full"
                  id="feedProtein"
                  v-model="feedProtein"
                  placeholder="蛋白質 (g/100g)"
                />
                <input
                  type="number"
                  class="cus-input w-full"
                  id="feedFat"
                  v-model="feedFat"
                  placeholder="脂肪 (g/100g)"
                />
                <input
                  type="number"
                  class="cus-input w-full"
                  id="feedCarbs"
                  v-model="feedCarbs"
                  placeholder="碳水化合物 (g/100g)"
                />
              </div>
            </div>
          </div>

          <button
            class="cus-btn-primary mt-5"
            :disabled="
              !weight || !activity || !feedCalories || !feedProtein || !feedFat || !feedCarbs
            "
            @click="submitCalculateFeed"
          >
            開始計算
          </button>
        </div>

        <!-- >> 3 result > md -->
        <div v-if="calculatefeedInfo" class="lg:hidden">
          <hr class="cus-line-row" />
          <div class="cus-block-padding">
            <h2 class="cus-page-title">計算結果</h2>

            <!-- ? 每日基本營養需求 -->
            <h3 class="cus-title-border-left">每日基本營養需求</h3>
            <div class="cus-table mb-5">
              <div class="cus-table-row grid grid-cols-2">
                <div class="cus-table-th">熱量 (kcal/day)</div>
                <div class="cus-table-td">{{ calculatefeedInfo.dailyCalorieNeed }}</div>
              </div>
              <div class="cus-table-row grid grid-cols-2">
                <div class="cus-table-th">蛋白質 (g/day)</div>
                <div class="cus-table-td">{{ calculatefeedInfo.dailyProteinNeed }}</div>
              </div>
              <div class="cus-table-row grid grid-cols-2">
                <div class="cus-table-th">脂肪 (g/day)</div>
                <div class="cus-table-td">{{ calculatefeedInfo.dailyFatNeed }}</div>
              </div>
              <div class="grid grid-cols-2">
                <div class="cus-table-th">碳水化合物 (g/day)</div>
                <div class="cus-table-td">{{ calculatefeedInfo.dailyCarbsNeed }}</div>
              </div>
            </div>

            <!-- ? 飼料建議攝取量 -->
            <h3 class="cus-title-border-left">飼料建議攝取量</h3>
            <div class="cus-table mb-5">
              <div class="cus-table-row grid grid-cols-2">
                <div class="cus-table-th">建議攝取量 (g/day)</div>
                <div class="cus-table-td">{{ calculatefeedInfo.dailyFeedAmount }}</div>
              </div>
              <div class="cus-table-row grid grid-cols-2">
                <div class="cus-table-th">蛋白質 (g/day)</div>
                <div class="cus-table-td">{{ calculatefeedInfo.nutrientsProvided?.protein }}</div>
              </div>
              <div class="cus-table-row grid grid-cols-2">
                <div class="cus-table-th">脂肪 (g/day)</div>
                <div class="cus-table-td">{{ calculatefeedInfo.nutrientsProvided?.fat }}</div>
              </div>
              <div class="grid grid-cols-2">
                <div class="cus-table-th">碳水化合物 (g/day)</div>
                <div class="cus-table-td">{{ calculatefeedInfo.nutrientsProvided?.carbs }}</div>
              </div>
            </div>

            <!-- ? 飼料營養資訊 -->
            <h3 class="cus-title-border-left">飼料實際攝取營養資訊</h3>
            <div class="cus-table mb-5">
              <div class="cus-table-row grid grid-cols-2">
                <div class="cus-table-th">總熱量 (kcal/day)</div>
                <div class="cus-table-td">{{ calculatefeedInfo.caloriesProvided?.total }}</div>
              </div>
              <div class="cus-table-row grid grid-cols-2">
                <div class="cus-table-th">蛋白質熱量 (kcal/day)</div>
                <div class="cus-table-td">{{ calculatefeedInfo.caloriesProvided?.protein }}</div>
              </div>
              <div class="cus-table-row grid grid-cols-2">
                <div class="cus-table-th">脂肪熱量 (kcal/day)</div>
                <div class="cus-table-td">{{ calculatefeedInfo.caloriesProvided?.fat }}</div>
              </div>
              <div class="grid grid-cols-2">
                <div class="cus-table-th">碳水化合物熱量 (kcal/day)</div>
                <div class="cus-table-td">{{ calculatefeedInfo.caloriesProvided?.carbs }}</div>
              </div>
            </div>

            <!-- ? 補充小知識 -->
            <h3 class="cus-title-border-left">補充小知識</h3>
            <div class="text-blue4">
              每日營養最佳分配比例為：<br />
              蛋白質 2：脂肪 2：碳水化合物 6，<br />
              單一種鮮食難以滿足鸚鵡每日所需營養，<br />
              建議可以使用鮮食隨機配！
            </div>
          </div>
          <!-- <pre>
            {{ calculatefoodInfo }}
          </pre> -->
        </div>

        <!-- >> 3 result > pc -->
        <div v-if="calculatefeedInfo" class="hidden lg:block">
          <hr class="cus-line-row" />
          <div class="cus-block-padding">
            <h2 class="cus-page-title">計算結果</h2>

            <!-- ? 每日基本營養需求 -->
            <h3 class="cus-title-border-left">每日基本營養需求</h3>
            <div class="cus-table mb-5">
              <div class="cus-table-row grid grid-cols-4">
                <div class="cus-table-th">熱量 (kcal/day)</div>
                <div class="cus-table-th">蛋白質 (g/day)</div>
                <div class="cus-table-th">脂肪 (g/day)</div>
                <div class="cus-table-th">碳水化合物 (g/day)</div>
              </div>
              <div class="grid grid-cols-4">
                <div class="cus-table-td">{{ calculatefeedInfo.dailyCalorieNeed }}</div>
                <div class="cus-table-td">{{ calculatefeedInfo.dailyProteinNeed }}</div>
                <div class="cus-table-td">{{ calculatefeedInfo.dailyFatNeed }}</div>
                <div class="cus-table-td">{{ calculatefeedInfo.dailyCarbsNeed }}</div>
              </div>
            </div>

            <!-- ? 飼料建議攝取量 -->
            <h3 class="cus-title-border-left">飼料建議攝取量</h3>
            <div class="cus-table mb-5">
              <div class="cus-table-row grid grid-cols-4">
                <div class="cus-table-th">建議攝取量 (g/day)</div>
                <div class="cus-table-th">蛋白質 (g/day)</div>
                <div class="cus-table-th">脂肪 (g/day)</div>
                <div class="cus-table-th">碳水化合物 (g/day)</div>
              </div>
              <div class="grid grid-cols-4">
                <div class="cus-table-td">{{ calculatefeedInfo.dailyFeedAmount }}</div>
                <div class="cus-table-td">{{ calculatefeedInfo.nutrientsProvided?.protein }}</div>
                <div class="cus-table-td">{{ calculatefeedInfo.nutrientsProvided?.fat }}</div>
                <div class="cus-table-td">{{ calculatefeedInfo.nutrientsProvided?.carbs }}</div>
              </div>
            </div>

            <!-- ? 飼料營養資訊 -->
            <h3 class="cus-title-border-left">飼料實際攝取營養資訊</h3>
            <div class="cus-table mb-5">
              <div class="cus-table-row grid grid-cols-4">
                <div class="cus-table-th">總熱量 (kcal/day)</div>
                <div class="cus-table-th">蛋白質熱量 (kcal/day)</div>
                <div class="cus-table-th">脂肪熱量 (kcal/day)</div>
                <div class="cus-table-th">碳水化合物熱量 (kcal/day)</div>
              </div>
              <div class="grid grid-cols-4">
                <div class="cus-table-td">{{ calculatefeedInfo.caloriesProvided?.total }}</div>
                <div class="cus-table-td">{{ calculatefeedInfo.caloriesProvided?.protein }}</div>
                <div class="cus-table-td">{{ calculatefeedInfo.caloriesProvided?.fat }}</div>
                <div class="cus-table-td">{{ calculatefeedInfo.caloriesProvided?.carbs }}</div>
              </div>
            </div>

            <!-- ? 補充小知識 -->
            <h3 class="cus-title-border-left">補充小知識</h3>
            <div class="text-blue4">
              每日營養最佳分配比例為：<br />
              蛋白質 2：脂肪 2：碳水化合物 6， 單一種鮮食難以滿足鸚鵡每日所需營養，
              建議可以使用鮮食隨機配！
            </div>
          </div>
          <!-- <pre>
            {{ calculatefoodInfo }}
          </pre> -->
        </div>
      </section>

      <!-- ? 4 指定熱量算飼料 -->
      <section v-else-if="mode === 4" class="">
        <!-- >> 4 指定熱量算飼料 info -->
        <div class="cus-block-padding">
          <h2 class="cus-page-title">輸入基本資料</h2>

          <div class="cus-col-3">
            <div class="cus-col-1">
              <label for="weight" class="cus-label"
                >1. 需求熱量 (kcal) <span class="text-red2">*</span></label
              >
              <input
                type="number"
                class="cus-input"
                id="weight"
                v-model="requiredCalories"
                placeholder="請輸入需求熱量 (kcal)"
              />
              <span class="cus-input-note">根據需求熱量及食物類別，計算出建議攝取量</span>
            </div>

            <div class="cus-col-1">
              <label for="feedCalories" class="cus-label"
                >2. 飼料的營養資訊 <span class="text-red2">*</span></label
              >
              <div class="flex flex-col gap-[6px] lg:flex-row lg:gap-3">
                <input
                  type="number"
                  class="cus-input w-full"
                  id="feedCalories"
                  v-model="feedCalories"
                  placeholder="熱量 (kcal/100g)"
                />
                <input
                  type="number"
                  class="cus-input w-full"
                  id="feedProtein"
                  v-model="feedProtein"
                  placeholder="蛋白質 (g/100g)"
                />
                <input
                  type="number"
                  class="cus-input w-full"
                  id="feedFat"
                  v-model="feedFat"
                  placeholder="脂肪 (g/100g)"
                />
                <input
                  type="number"
                  class="cus-input w-full"
                  id="feedCarbs"
                  v-model="feedCarbs"
                  placeholder="碳水化合物 (g/100g)"
                />
              </div>
            </div>
          </div>

          <button
            class="cus-btn-primary mt-5"
            :disabled="!requiredCalories || !feedCalories || !feedProtein || !feedFat || !feedCarbs"
            @click="submitCalculateFeedIntake"
          >
            開始計算
          </button>
        </div>

        <!-- >> 4 result > md -->
        <div v-if="calculateFeedIntakeInfo" class="lg:hidden">
          <hr class="cus-line-row" />
          <div class="cus-block-padding">
            <h2 class="cus-page-title">計算結果</h2>

            <!-- ? 營養需求 -->
            <h3 class="cus-title-border-left">營養需求</h3>
            <div class="cus-table mb-5">
              <div class="cus-table-row grid grid-cols-2">
                <div class="cus-table-th">需求熱量 (kcal/day)</div>
                <div class="cus-table-td">{{ calculateFeedIntakeInfo.requiredCalories }}</div>
              </div>
              <div class="cus-table-row grid grid-cols-2">
                <div class="cus-table-th">建議攝取量 (g/day)</div>
                <div class="cus-table-td">{{ calculateFeedIntakeInfo.requiredFeedIntake }}</div>
              </div>
              <div class="cus-table-row grid grid-cols-2">
                <div class="cus-table-th">建議飼料總熱量 (kcal/day)</div>
                <div class="cus-table-td">{{ calculateFeedIntakeInfo.feedProvidedCalories }}</div>
              </div>
              <div class="grid grid-cols-2">
                <div class="cus-table-th">熱量差異 (kcal/day)</div>
                <div
                  v-if="calculateFeedIntakeInfo.caloriesDifference > 0"
                  class="cus-table-td text-red2"
                >
                  {{ calculateFeedIntakeInfo.caloriesDifference }}
                </div>
                <div v-else class="cus-table-td">
                  {{ calculateFeedIntakeInfo.caloriesDifference }}
                </div>
              </div>
            </div>

            <!-- ? 實際攝取的各營養成分份量 -->
            <h3 class="cus-title-border-left">實際攝取的各營養成分份量</h3>
            <div class="cus-table mb-5">
              <div class="cus-table-row grid grid-cols-2">
                <div class="cus-table-th">建議攝取量 (g/day)</div>
                <div class="cus-table-td">{{ calculateFeedIntakeInfo.requiredFeedIntake }}</div>
              </div>

              <div class="cus-table-row grid grid-cols-2">
                <div class="cus-table-th">蛋白質量 (g/day)</div>
                <div class="cus-table-td">
                  {{ calculateFeedIntakeInfo.nutrientsProvided.protein }}
                </div>
              </div>

              <div class="cus-table-row grid grid-cols-2">
                <div class="cus-table-th">脂肪量 (g/day)</div>
                <div class="cus-table-td">{{ calculateFeedIntakeInfo.nutrientsProvided.fat }}</div>
              </div>

              <div class="grid grid-cols-2">
                <div class="cus-table-th">碳水化合物量 (g/day)</div>
                <div class="cus-table-td">
                  {{ calculateFeedIntakeInfo.nutrientsProvided.carbs }}
                </div>
              </div>
            </div>

            <!-- ? 實際攝取的各營養成分熱量 -->
            <h3 class="cus-title-border-left">實際攝取的各營養成分熱量</h3>

            <div class="cus-table mb-5">
              <div class="cus-table-row grid grid-cols-2">
                <div class="cus-table-th">蛋白質熱量 (kcal/day)</div>
                <div class="cus-table-td">
                  {{ calculateFeedIntakeInfo.nutrientsCalories?.protein }}
                </div>
              </div>

              <div class="cus-table-row grid grid-cols-2">
                <div class="cus-table-th">脂肪熱量 (kcal/day)</div>
                <div class="cus-table-td">{{ calculateFeedIntakeInfo.nutrientsCalories?.fat }}</div>
              </div>

              <div class="cus-table-row grid grid-cols-2">
                <div class="cus-table-th">碳水化合物熱量 (kcal/day)</div>
                <div class="cus-table-td">
                  {{ calculateFeedIntakeInfo.nutrientsCalories?.carbs }}
                </div>
              </div>

              <div class="grid grid-cols-2">
                <div class="cus-table-th">總熱量 (kcal/day)</div>
                <div class="cus-table-td">{{ calculateFeedIntakeInfo.feedProvidedCalories }}</div>
              </div>
            </div>

            <!-- ? 營養百分比 -->
            <h3 class="cus-title-border-left">營養百分比</h3>
            <div class="cus-table mb-5">
              <div class="cus-table-row grid grid-cols-3">
                <div class="cus-table-th"></div>
                <div class="cus-table-th">建議比例</div>
                <div class="cus-table-th">實際比例</div>
              </div>

              <div class="cus-table-row grid grid-cols-3">
                <div class="cus-table-th">蛋白質 (%)</div>
                <div class="cus-table-td">20</div>
                <div class="cus-table-td">
                  {{ calculateFeedIntakeInfo.nutrientsPercentage?.protein }}
                </div>
              </div>

              <div class="cus-table-row grid grid-cols-3">
                <div class="cus-table-th">脂肪 (%)</div>
                <div class="cus-table-td">20</div>
                <div class="cus-table-td">
                  {{ calculateFeedIntakeInfo.nutrientsPercentage?.fat }}
                </div>
              </div>

              <div class="grid grid-cols-3">
                <div class="cus-table-th">碳水化合物 (%)</div>
                <div class="cus-table-td">60</div>
                <div class="cus-table-td">
                  {{ calculateFeedIntakeInfo.nutrientsPercentage?.carbs }}
                </div>
              </div>
            </div>

            <!-- ? 每日所需營養缺失量 -->
            <h3
              class="cus-title-border-left-err"
              v-if="calculateFeedIntakeInfo.caloriesDifference > 0"
            >
              每日所需營養缺失量： {{ calculateFeedIntakeInfo.caloriesDifference }} (kcal/day)
            </h3>
            <h3 v-else class="cus-title-border-left">補充小知識</h3>
            <div class="text-blue4">
              每日營養最佳分配比例為：<br />
              蛋白質 2：脂肪 2：碳水化合物 6，<br />
              單一種鮮食難以滿足鸚鵡每日所需營養，<br />
              建議可以使用鮮食隨機配！
            </div>
          </div>
          <!-- <pre>
            {{ recommendFoodsInfo }}
          </pre> -->
        </div>

        <!-- >> 4 result > pc -->
        <div v-if="calculateFeedIntakeInfo" class="hidden lg:block">
          <hr class="cus-line-row" />
          <div class="cus-block-padding">
            <h2 class="cus-page-title">計算結果</h2>

            <!-- ? 營養需求 -->
            <h3 class="cus-title-border-left">營養需求</h3>
            <div class="cus-table mb-5">
              <div class="cus-table-row grid grid-cols-4">
                <div class="cus-table-th">需求熱量 (kcal/day)</div>
                <div class="cus-table-th">建議攝取量 (g/day)</div>
                <div class="cus-table-th">建議飼料總熱量 (kcal/day)</div>
                <div class="cus-table-th">熱量差異 (kcal/day)</div>
              </div>
              <div class="grid grid-cols-4">
                <div class="cus-table-td">{{ calculateFeedIntakeInfo.requiredCalories }}</div>
                <div class="cus-table-td">{{ calculateFeedIntakeInfo.requiredFeedIntake }}</div>
                <div class="cus-table-td">{{ calculateFeedIntakeInfo.feedProvidedCalories }}</div>
                <div
                  v-if="calculateFeedIntakeInfo.caloriesDifference > 0"
                  class="cus-table-td text-red2"
                >
                  {{ calculateFeedIntakeInfo.caloriesDifference }}
                </div>
                <div v-else class="cus-table-td">
                  {{ calculateFeedIntakeInfo.caloriesDifference }}
                </div>
              </div>
            </div>

            <!-- ? 實際攝取的各營養成分份量 -->
            <h3 class="cus-title-border-left">實際攝取的各營養成分份量</h3>
            <div class="cus-table mb-5">
              <div class="cus-table-row grid grid-cols-4">
                <div class="cus-table-th">建議攝取量 (g/day)</div>
                <div class="cus-table-th">蛋白質量 (g/day)</div>
                <div class="cus-table-th">脂肪量 (g/day)</div>
                <div class="cus-table-th">碳水化合物量 (g/day)</div>
              </div>

              <div class="grid grid-cols-4">
                <div class="cus-table-td">{{ calculateFeedIntakeInfo.requiredFeedIntake }}</div>
                <div class="cus-table-td">
                  {{ calculateFeedIntakeInfo.nutrientsProvided.protein }}
                </div>
                <div class="cus-table-td">{{ calculateFeedIntakeInfo.nutrientsProvided.fat }}</div>
                <div class="cus-table-td">
                  {{ calculateFeedIntakeInfo.nutrientsProvided.carbs }}
                </div>
              </div>
            </div>

            <!-- ? 實際攝取的各營養成分熱量 -->
            <h3 class="cus-title-border-left">實際攝取的各營養成分熱量</h3>
            <div class="cus-table mb-5">
              <div class="cus-table-row grid grid-cols-4">
                <div class="cus-table-th">蛋白質熱量 (kcal/day)</div>
                <div class="cus-table-th">脂肪熱量 (kcal/day)</div>
                <div class="cus-table-th">碳水化合物熱量 (kcal/day)</div>
                <div class="cus-table-th">總熱量 (kcal/day)</div>
              </div>

              <div class="grid grid-cols-4">
                <div class="cus-table-td">
                  {{ calculateFeedIntakeInfo.nutrientsCalories?.protein }}
                </div>
                <div class="cus-table-td">
                  {{ calculateFeedIntakeInfo.nutrientsCalories?.fat }}
                </div>
                <div class="cus-table-td">
                  {{ calculateFeedIntakeInfo.nutrientsCalories?.carbs }}
                </div>
                <div class="cus-table-td">
                  {{ calculateFeedIntakeInfo.feedProvidedCalories }}
                </div>
              </div>
            </div>

            <!-- ? 營養百分比 -->
            <h3 class="cus-title-border-left">營養百分比</h3>
            <div class="cus-table mb-5">
              <div class="cus-table-row grid grid-cols-4">
                <div class="cus-table-th"></div>
                <div class="cus-table-th">蛋白質 (%)</div>
                <div class="cus-table-th">脂肪 (%)</div>
                <div class="cus-table-th">碳水化合物 (%)</div>
              </div>

              <div class="cus-table-row grid grid-cols-4">
                <div class="cus-table-th">建議分配比例</div>
                <div class="cus-table-td">20</div>
                <div class="cus-table-td">20</div>
                <div class="cus-table-td">60</div>
              </div>

              <div class="cus-table-row grid grid-cols-4">
                <div class="cus-table-th">飼料實際比例</div>
                <div class="cus-table-td">
                  {{ calculateFeedIntakeInfo.nutrientsPercentage?.protein }}
                </div>
                <div class="cus-table-td">
                  {{ calculateFeedIntakeInfo.nutrientsPercentage?.fat }}
                </div>
                <div class="cus-table-td">
                  {{ calculateFeedIntakeInfo.nutrientsPercentage?.carbs }}
                </div>
              </div>

              <div class="grid grid-cols-3"></div>
            </div>

            <!-- ? 每日所需營養缺失量 -->
            <h3
              class="cus-title-border-left-err"
              v-if="calculateFeedIntakeInfo.caloriesDifference > 0"
            >
              每日所需營養缺失量： {{ calculateFeedIntakeInfo.caloriesDifference }} (kcal/day)
            </h3>
            <h3 v-else class="cus-title-border-left">補充小知識</h3>
            <div class="text-blue4">
              每日營養最佳分配比例為：<br />蛋白質 2：脂肪 2：碳水化合物
              6，若飼料不符合建議營養比例，建議可以使用鮮食隨機配！
            </div>
          </div>
          <!-- <pre>
            {{ recommendFoodsInfo }}
          </pre> -->
        </div>
      </section>

      <!-- * bottom introduction -->
      <hr class="cus-line-row" />
      <div class="cus-intro">
        推薦食物及計算方式皆由 AI 協助蒐集和整理，僅供參考。<br />
        若有特殊飲食需求建議尋求專業幫助！
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

/* toggle */
.cus-toggle-tab {
  @apply flex gap-2 rounded-md border border-blue4 p-1 text-[14px];
}

.cus-toggle-tab-item {
  @apply rounded px-3 py-[6px] text-blue4;
}

.cus-toggle-tab-item-active {
  @apply bg-blue4 text-blue1;
}
</style>
