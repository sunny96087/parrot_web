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
</script>
<template>
  <NuxtLayout>
    <NuxtPage />

    <CustomDialog />
    <ToastTool />
    <LoadingTool />
  </NuxtLayout>
</template>
