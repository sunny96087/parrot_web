<script setup lang="ts">
const copyToClipboard = () => {
  navigator.clipboard
    .writeText('@kujiflip')
    .then(() => {
      console.log('Text copied to clipboard')
    })
    .catch((err) => {
      console.error('Could not copy text: ', err)
    })
}
</script>

<template>
  <div class="border border-[#E8E8E8]">
    <!-- top -->
    <div
      class="flex w-full flex-col items-center justify-center gap-5 px-6 py-[28px] xl:flex-row xl:justify-between"
    >
      <!-- 公司資料 -->
      <div class="xxl:flex-row xxl:gap-[52px] flex flex-col gap-[6px]">
        <div class="flex flex-col gap-[6px]">
          <div class="flex items-center">
            服務LINE：&nbsp;@kujiflip&nbsp;
            <span @click="copyToClipboard" class="text-gray-400 cursor-pointer"
              ><Icon name="material-symbols:content-copy-outline" size="20"></Icon
            ></span>
          </div>
          <div class="">服務信箱：&nbsp;service@rcdesign.io</div>
          <div class="">客服時間：&nbsp;週一至週日 09:00-18:00</div>
        </div>
        <div class="flex flex-col gap-[6px]">
          <div class="">公司名稱：&nbsp;酷傑資訊股份有限公司</div>
          <div class="">統一編號：&nbsp;93666000</div>
        </div>
      </div>
      <!-- 社群 -->
      <div class="flex items-center justify-center gap-2">
        <a href="#"><Icon name="mdi:facebook-box" size="40"></Icon></a>
        <a href="#"><Icon name="mdi:instagram" size="40"></Icon></a>
        <a href="#"><Icon name="la:line" size="46"></Icon></a>
      </div>
      <!-- 頁面連結 -->
      <div class="flex flex-wrap items-center justify-center gap-1">
        <nuxt-link to="/about">關於我們</nuxt-link> | <nuxt-link to="/faq">常見問題</nuxt-link> |
        <nuxt-link to="/promo">優惠說明</nuxt-link> |
        <nuxt-link to="/transaction">交易說明</nuxt-link> |
        <nuxt-link to="/teamwork">合作諮詢</nuxt-link> |
        <nuxt-link to="/policy">服務條款</nuxt-link> |
        <nuxt-link to="/privacy">隱私權政策</nuxt-link>
      </div>
    </div>
    <!-- bottom -->
    <div class="bg-black py-5 text-center text-[14px] text-white">© 2024 太和選賞 版權所有</div>
  </div>
</template>
