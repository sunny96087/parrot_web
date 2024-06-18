<script setup lang="ts">
const router = useRouter()

const menu = ref(false)

const menuOpen = ref(false)

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
}
</script>

<template>
  <div class="nav-bg sticky top-0 z-20 py-3">
    <div class="m-auto flex max-w-[1200px] items-center justify-between px-6">
      <nuxtLink to="/" class="z-20 w-[48px] xl:w-[84px]">
        <!-- <img src="~/assets/images/logo.png" alt="logo" class="pic-auto" /> -->
      </nuxtLink>

      <div class="hidden items-center justify-center gap-10 xl:flex">
        <div class="flex items-center justify-center gap-10 text-[#231815]">
          <nuxtLink to="/ichibanKuji" class="nav-item-pc" exact-active-class="font-medium"
            >一番賞</nuxtLink
          >
          <!-- <nuxtLink to="/" class="nav-item-pc" exact-active-class="font-medium">盲盒</nuxtLink> -->
          <nuxtLink to="/treasure" class="nav-item-pc" exact-active-class="font-medium"
            >賞品盒</nuxtLink
          >
          <nuxtLink to="/winners" class="nav-item-pc" exact-active-class="font-medium"
            >即時榜單
          </nuxtLink>
          <nuxtLink to="/gift" class="nav-item-pc" exact-active-class="font-medium"
            >每日簽到</nuxtLink
          >
          <nuxtLink to="/news" class="nav-item-pc" exact-active-class="font-medium"
            >最新消息</nuxtLink
          >
        </div>
        <div class="flex items-center justify-center gap-3">
          <nuxtLink to="/profile" class="nav-item-btn-full-pc">儲值</nuxtLink>
          <nuxtLink to="/login" class="nav-item-btn-pc">登入</nuxtLink>
          <nuxtLink to="/register" class="nav-item-btn-pc">註冊</nuxtLink>
        </div>
        <div class="flex items-center justify-center gap-2">
          <a href="#"><Icon name="mdi:facebook-box" size="40"></Icon></a>
          <a href="#"><Icon name="mdi:instagram" size="40"></Icon></a>
          <a href="#"><Icon name="la:line" size="46"></Icon></a>
        </div>
      </div>
      <!-- * 手機版選單按鈕 -->
      <button @click="toggleMenu" class="z-20 xl:hidden">
        <div class="hamburger" :class="{ open: menuOpen }">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </button>
    </div>

    <!-- * 手機版選單 -->
    <transition name="slide">
      <div
        v-show="menuOpen"
        class="fixed inset-0 z-10 h-screen w-full overflow-hidden bg-black bg-opacity-20"
      >
        <div
          class="menu absolute left-0 top-0 flex w-full flex-col items-center bg-white py-6 pt-[70px] shadow-lg"
        >
          <div class="mb-2 flex flex-col items-center justify-center gap-3">
            <nuxtLink to="/profile" class="nav-item-btn-full-pc w-[160px] text-center"
              >儲值</nuxtLink
            >
            <div class="flex items-center justify-center gap-3">
              <nuxtLink to="/login" class="nav-item-btn-pc">登入</nuxtLink>
              <nuxtLink to="/register" class="nav-item-btn-pc">註冊</nuxtLink>
            </div>
          </div>
          <nuxtLink to="/ichibanKuji" class="nav-item-mb" exact-active-class="bg-slate-100"
            >一番賞</nuxtLink
          >
          <!-- <nuxtLink to="/kuji" class="nav-item-mb" exact-active-class="bg-slate-100">盲盒</nuxtLink> -->
          <nuxtLink to="/treasure" class="nav-item-mb" exact-active-class="bg-slate-100"
            >賞品盒</nuxtLink
          >
          <nuxtLink to="/winners" class="nav-item-mb" exact-active-class="bg-slate-100"
            >即時榜單</nuxtLink
          >
          <nuxtLink to="/gift" class="nav-item-mb" exact-active-class="bg-slate-100"
            >每日簽到</nuxtLink
          >
          <nuxtLink to="/news" class="nav-item-mb" exact-active-class="bg-slate-100"
            >最新消息</nuxtLink
          >
          <div class="mt-2 flex items-center justify-center gap-2">
            <a href="#"><Icon name="mdi:facebook-box" size="40"></Icon></a>
            <a href="#"><Icon name="mdi:instagram" size="40"></Icon></a>
            <a href="#"><Icon name="la:line" size="46"></Icon></a>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.nav-bg {
  background-color: #ffffffac;
  backdrop-filter: blur(5px);
}

.hamburger {
  width: 30px;
  height: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
}

.hamburger div {
  width: 100%;
  height: 2px;
  background-color: #231815;
  transition: all 0.3s linear;
  border-radius: 2px;
}

.hamburger.open div:nth-child(1) {
  transform: rotate(45deg) translate(3px, 7px);
}

.hamburger.open div:nth-child(2) {
  opacity: 0;
}

.hamburger.open div:nth-child(3) {
  transform: rotate(-45deg) translate(5px, -10px);
}

.menu {
  /* max-height: 0; */
  overflow: hidden;
  transition: all 0.3s ease-out;
}

.menu.open {
  /* max-height: 500px; */
  transition: all 0.3s ease-out;
}

/* 确保过渡 "进入" 状态设置为不可见，然后过渡到可见 */
.slide-enter-active,
.slide-leave-active {
  transition: opacity 0.5s ease;
}
.slide-enter-from,
.slide-leave-to {
  opacity: 0;
}
.slide-enter-to {
  opacity: 1;
}

.nav-item-pc {
  @apply transform leading-[28px] duration-200 hover:font-medium;
}

.nav-item-mb {
  @apply block w-full transform py-4 text-center text-[20px] duration-200 hover:bg-slate-100;
}

.nav-item-btn-full-pc {
  @apply rounded-[20px] border border-black bg-black px-10 py-[5px] text-white;
}

.nav-item-btn-pc {
  @apply rounded-[20px] border border-black bg-white px-5 py-[5px] text-black;
}
</style>
