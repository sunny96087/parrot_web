<script setup lang="ts">
useHead({
  title: '鸚鸚食堂 Parrot Bistro',
  htmlAttrs: {
    lang: 'zh-TW'
  },
  link: [
    {
      rel: 'icon',
      href: '/icon.png'
    }
  ],
  meta: [
    {
      name: 'google-site-verification',
      content: 'ezYJ7T0oDpkV9XX_IDz-OqV3T187C5qDx_QGGu4igJo'
    }
  ]
})

import { useGtag } from 'vue-gtag-next'

if (import.meta.client) {
  const gtag = useGtag() // 使用 useGtag 鉤子初始化 gtag
  let startTime = ref(0) // 使用 ref 定義一個響應式的 startTime 變量

  // 定義一個處理點擊事件的函數
  const clickHandler = (e: MouseEvent) => {
    // 首先確保 e.target 是一個 HTMLElement
    if (!(e.target instanceof HTMLElement)) {
      return // 如果不是，則提早返回
    }

    let el_tag = e.target.tagName // 獲取事件目標的標籤名
    let el_id = (e.target as HTMLElement).id || 'unset' // 獲取事件目標的 ID，如果沒有則設為 'unset'
    let el_class = (e.target as HTMLElement).getAttribute('class') || 'unset' // 獲取事件目標的 class，如果沒有則設為 'unset'
    console.log(el_tag, el_id, el_class) // 在控制台輸出這些信息
    // 使用 gtag 發送一個事件
    gtag.event('click_action', {
      tag: el_tag,
      id: el_id,
      class: el_class
    })
  }

  // 在組件掛載時設置事件監聽器
  onMounted(() => {
    startTime.value = Date.now() // 設置 startTime 為當前時間
    document.addEventListener('click', clickHandler) // 為 document 添加點擊事件監聽器
    window.addEventListener('beforeunload', sendTimeSpentEvent) // 在窗口卸載前發送時間花費事件
  })

  // 在組件卸載時移除事件監聽器
  onUnmounted(() => {
    window.removeEventListener('beforeunload', sendTimeSpentEvent) // 移除窗口的 beforeunload 事件監聽器
    document.removeEventListener('click', clickHandler) // 移除 document 的點擊事件監聽器
  })

  // 定義一個函數來發送用戶在頁面上花費的時間
  function sendTimeSpentEvent() {
    const endTime = Date.now() // 獲取結束時間
    const timeSpent = endTime - startTime.value // 計算花費的時間
    const timeSpentInSeconds = timeSpent / 1000 // 將時間轉換為秒

    // 使用 gtag 發送自定義時間花費事件
    gtag.event('custom_time_spent', {
      event_category: 'user_metrics',
      start_time: new Date(startTime.value).toLocaleString('zh-TW', { timeZone: 'Asia/Taipei' }), // 設置開始時間
      end_time: new Date(endTime).toLocaleString('zh-TW', { timeZone: 'Asia/Taipei' }), // 設置結束時間
      all_time: timeSpentInSeconds // 設置總花費時間
    })
  }
}
</script>
<template>
  <NuxtLayout>
    <NuxtPage />

    <CustomDialog />
    <ToastTool />
    <LoadingTool />
  </NuxtLayout>
</template>
