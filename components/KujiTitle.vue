<script lang="ts">
export default defineComponent({
  name: 'KujiTitle',
  props: {
    title: {
      type: String,
      required: true
    }
  }
})
</script>

<template>
  <div class="flex w-full items-center justify-center">
    <div class="h-[2px] grow bg-[#D9D9D9] lg:h-1"></div>
    <h2 class="mx-[40px] text-[32px] lg:mx-[120px] lg:text-[48px]">{{ title }}</h2>
    <div class="h-[2px] grow bg-[#D9D9D9] lg:h-1"></div>
  </div>
</template>
