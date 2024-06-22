<script setup lang="ts">
import { APIStore } from '~/store/apiService'
const store = APIStore()
import { showToast, openDialog, showLoading, hideLoading } from '~/store/eventBus'

const contactPerson = ref('')
const phone = ref('')
const email = ref('')
const feedback = ref('')
const source = ref('') // "網路搜尋", "社群媒體", "親友介紹", "其他"

const sourceOption = ['網路搜尋', '社群媒體', '親友介紹', '其他']

interface Data {
  contactPerson: string
  phone: string
  email: string
  feedback: string
  source?: string // 使 source 屬性成為可選的
}

// 送出聯絡我們
async function sendContact() {
  try {
    showLoading()

    let data: Data = {
      contactPerson: contactPerson.value,
      phone: phone.value,
      email: email.value,
      feedback: feedback.value
    }
    // source 有值才加入
    if (source.value) {
      data = { ...data, source: source.value }
    }
    const res = await store.apiAddFeedback(data as any)
    // console.log(res)

    const result = res.data
    if (result && result.status === 'success') {
      showToast('感謝您的回饋，我們會盡快處理！')
      contactPerson.value = ''
      phone.value = ''
      email.value = ''
      feedback.value = ''
      source.value = ''
    } else {
      showToast('發生錯誤，請稍後再試！')
    }
  } catch (error) {
    showToast('發生錯誤，請稍後再試！')
  } finally {
    hideLoading()
  }
}

// 檢查 email 格式 (blur 事件觸發)
function checkEmail() {
  if (email.value) {
    const emailReg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (!emailReg.test(email.value)) {
      showToast('請輸入正確的 email 格式！')
      email.value = ''
    }
  }
}
</script>
<template>
  <div class="w-full">
    <!-- * content -->
    <div class="cus-border">
      <!-- * introduction -->
      <div class="cus-intro lg:hidden">
        使用上遇到困難？<br />希望有更好用的功能？<br />覺得網站很實用？<br />
        把想法都告訴我們吧，<br />我們可以把你的想法化為現實。<br />
        非常歡迎擁有專業知識的夥伴加入我們的 side project ✨
      </div>
      <div class="cus-intro hidden lg:block">
        使用上遇到困難？希望有更好用的功能？覺得網站很實用？<br />
        把想法都告訴我們吧，我們可以把你的想法化為現實。<br />
        非常歡迎擁有專業知識的夥伴加入我們的 side project ✨
      </div>

      <hr class="cus-line-row" />

      <!-- * feedback info -->
      <div class="cus-block-padding">
        <h2 class="cus-page-title">填寫表單幫助我們變得更好</h2>

        <div class="cus-col-3">
          <div class="cus-col-1">
            <label for="contactPerson" class="cus-label"
              >名稱 <span class="text-red2">*</span></label
            >
            <input
              type="text"
              class="cus-input"
              id="contactPerson"
              v-model="contactPerson"
              placeholder="請輸入名稱"
            />
          </div>

          <div class="cus-col-1">
            <label for="phone" class="cus-label">電話 <span class="text-red2">*</span></label>
            <input
              type="tel"
              class="cus-input"
              id="phone"
              v-model="phone"
              placeholder="請輸入電話"
            />
          </div>

          <div class="cus-col-1">
            <label for="email" class="cus-label">信箱 <span class="text-red2">*</span></label>
            <input
              type="email"
              class="cus-input"
              id="email"
              v-model="email"
              placeholder="請輸入信箱"
              @blur="checkEmail"
            />
          </div>

          <div class="cus-col-1">
            <label for="feedback" class="cus-label">內容 <span class="text-red2">*</span></label>
            <input
              type="text"
              class="cus-input"
              id="feedback"
              v-model="feedback"
              placeholder="請輸入內容"
            />
          </div>

          <div class="cus-col-1">
            <label for="source" class="cus-label">從哪裡得知此網站</label>
            <div class="cus-radio-row">
              <label class="cus-label-radio" for="網路搜尋">
                <input
                  type="radio"
                  name="source"
                  class=""
                  id="網路搜尋"
                  v-model="source"
                  value="網路搜尋"
                />
                <span></span>
                網路搜尋
              </label>

              <label class="cus-label-radio" for="社群媒體">
                <input
                  type="radio"
                  name="source"
                  class=""
                  id="社群媒體"
                  v-model="source"
                  value="社群媒體"
                />
                <span></span>
                社群媒體
              </label>

              <label for="親友介紹" class="cus-label-radio">
                <input
                  type="radio"
                  name="source"
                  class=""
                  id="親友介紹"
                  v-model="source"
                  value="親友介紹"
                />
                <span></span>親友介紹
              </label>

              <label for="其他" class="cus-label-radio">
                <input
                  type="radio"
                  name="source"
                  class=""
                  id="其他"
                  v-model="source"
                  value="其他"
                />
                <span></span>其他
              </label>
            </div>
          </div>
        </div>

        <button
          class="cus-btn-primary mt-5"
          :disabled="!contactPerson || !phone || !email || !feedback"
          @click="sendContact"
        >
          送出表單
        </button>
      </div>

      <hr class="cus-line-row" />

      <!-- * contact -->
      <div class="cus-block-padding">
        <h2 class="cus-page-title">或是你也可以用其他方式聯繫我們</h2>
        <a
          href="https://profile.2fishs.com/"
          target="_blank"
          class="mb-2 flex transform items-end gap-2 text-blue4 duration-300 hover:text-blue3"
        >
          <Icon name="ph:link" size="20" />
          <p>profile_web</p>
        </a>

        <a
          href="mailto:yu13142013@gmail.com"
          target="_blank"
          class="flex transform items-end gap-2 text-blue4 duration-300 hover:text-blue3"
        >
          <Icon name="ph:envelope-simple-light" size="20" />
          <p>yu13142013@gmail.com</p>
        </a>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
