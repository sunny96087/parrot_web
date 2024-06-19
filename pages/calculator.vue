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

const weight = ref('')
const activity = ref('low') // low, medium, high

// result
const recommendFoodsInfo: any = ref('')

function resetInput() {
  weight.value = ''
  activity.value = 'low'
}

watch(
  () => mode.value,
  () => {
    resetInput()
  }
)

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
</script>
<template>
  <div class="w-full">
    <!-- * tab -->
    <div class=""></div>

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
        <!-- >> info -->
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
          </div>

          <button class="cus-btn-primary mt-5" :disabled="!weight" @click="submitRecommendFoods">
            開始計算
          </button>
        </div>
        <!-- >> result -->
        <div v-if="recommendFoodsInfo" class="">
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
      <section v-else-if="mode === 1" class=""></section>
      <!-- ? 2 指定熱量算鮮食 -->
      <section v-else-if="mode === 2" class=""></section>
      <!-- ? 3 指定飼料算攝取量 -->
      <section v-else-if="mode === 3" class=""></section>
      <!-- ? 4 指定熱量算飼料 -->
      <section v-else-if="mode === 4" class=""></section>

      <!-- * bottom introduction -->
      <hr class="cus-line-row" />
      <div class="cus-intro">
        推薦食物及計算方式皆由 AI 協助蒐集和整理，僅供參考。<br />
        若有特殊飲食需求建議尋求專業幫助！
      </div>
    </div>
  </div>
</template>
<style scoped></style>
