<script setup lang="ts">
useHead({
  title: '鸚鸚食堂 Parrot Bistro',
  htmlAttrs: {
    lang: 'zh-TW'
  }
  // link: [
  //   {
  //     rel: 'icon',
  //     href: '/favicon.ico'
  //   }
  // ]
})
</script>
<template>
  <NuxtLayout>
    <NuxtPage />

    <CustomDialog />
    <ToastTool />
  </NuxtLayout>
</template>
