<script setup lang="ts">
const isScrolled = ref(false)

const checkScroll = () => {
  isScrolled.value = window.pageYOffset > 80
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

onMounted(() => {
  window.addEventListener('scroll', checkScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', checkScroll)
})
</script>

<template>
  <div class="app relative flex min-h-screen w-full flex-col">
    <header class="z-20">
      <Header />
    </header>
    <main class="page-wrapper grow">
      <div class="w-full">
        <slot />
      </div>
    </main>
    <!--
    <footer>
      <Footer /> 
    </footer>-->
    <!-- 右下角的 回頂端 -->
    <!-- <div
      :class="{ 'is-scrolled': isScrolled }"
      class="fixed bottom-[92px] right-5 hidden flex-col gap-3 lg:flex"
    >
      <div
        @click="scrollToTop"
        class="hover-auto flex h-[64px] w-[64px] cursor-pointer flex-col items-center justify-center rounded-full border border-black text-center text-[14px] leading-[13px] hover:bg-[#00000017]"
      >
        <Icon name="material-symbols:arrow-upward-rounded" size="24" class="font-bold"></Icon>
        PAGE<br />
        TOP
      </div>
    </div> -->
  </div>
</template>

<style scoped>
.app {
  /* background: #ccc; */
  /* font-family: 'Noto Sans'; */
  font-family: 'Noto Sans TC', sans-serif;
}

.page-wrapper {
  @apply mx-auto w-full max-w-[1200px] px-3 pb-5 pt-[52px] lg:px-5 lg:pt-[64px];
  /* max-width: 1200px; */
  width: 100%;
  /* margin: 0 auto; */
  display: flex;
  /* gap: 28px; */
  /* padding: 40px 24px; */
  /* padding-bottom: 60px; */
  align-items: start;
}

.fixed {
  transform: translateX(140%);
  transition: transform 0.5s;
}

.fixed.is-scrolled {
  transform: translateX(0);
}
</style>
