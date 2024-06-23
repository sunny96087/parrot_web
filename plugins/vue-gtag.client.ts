// plugins/vue-gtag.client.ts

// 引入 defineNuxtPlugin 函數，這是 Nuxt 3 中用於定義插件的方法。
import { defineNuxtPlugin } from '#app'

// 引入 vue-gtag-next，這是一個為 Vue.js 應用提供 Google Analytics 整合的插件。
import VueGtag from 'vue-gtag-next'

// 使用 defineNuxtPlugin 定義一個 Nuxt 插件。
export default defineNuxtPlugin((nuxtApp) => {
  // 從 localStorage 中獲取 GDPR 同意狀態。
  const getGDPR = localStorage.getItem('GDPR:accepted')

  // 在 Nuxt 應用的 Vue 實例上使用 vue-gtag 插件。
  nuxtApp.vueApp.use(
    VueGtag,
    {
      // 配置 vue-gtag 插件的選項。
      property: {
        id: 'G-B3RLVN6NNB' // 你的 Google Analytics 追蹤 ID。
      },
      appName: '鸚鸚食堂', // 應用名稱 parrot.2fishs.com
      enabled: getGDPR === 'true', // 根據 GDPR 同意狀態啟用或禁用追蹤。
      pageTrackerScreenviewEnabled: true // 啟用頁面追蹤。
    },
    nuxtApp.vueApp.router // 將 Nuxt 應用的路由器傳遞給 vue-gtag，以自動追蹤頁面瀏覽。
  )
})
