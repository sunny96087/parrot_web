<script lang="ts">
export default defineComponent({
  name: 'PageTitle',
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
    <h2 class="mx-[40px] text-[32px] font-bold lg:mx-[120px] lg:text-[40px]">{{ title }}</h2>
    <div class="h-[2px] grow bg-[#D9D9D9] lg:h-1"></div>
  </div>
</template>
