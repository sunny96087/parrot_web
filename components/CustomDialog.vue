<script setup lang="ts">
import {
  dialogTitle,
  dialogMessage,
  showDialog,
  onlyConfirm,
  confirmDialog,
  cancelDialog
} from '~/store/eventBus'
</script>

<template>
  <div v-if="showDialog" class="custom-dialog-overlay">
    <div class="custom-dialog">
      <div v-if="dialogTitle !== ''" class="custom-dialog-header">
        <h4>{{ dialogTitle }}</h4>
      </div>
      <div class="custom-dialog-body">
        <p>{{ dialogMessage }}</p>
      </div>
      <div class="custom-dialog-footer">
        <button v-if="!onlyConfirm" @click="cancelDialog" class="btn-cancle hover-auto">
          取消
        </button>
        <button @click="confirmDialog" class="btn-check hover-opacity">確認</button>
      </div>

      <!-- 驚嘆號裝飾 -->
      <div class="bg-yellow absolute -top-10 left-1/2 -translate-x-1/2 rounded-full p-4">
        <Icon name="humbleicons:exclamation" size="47" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.custom-dialog-overlay {
  position: fixed;
  inset: 0;
  background-color: #000000bf;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
  z-index: 1021;
}

.custom-dialog {
  @apply border-yellow border-[5px];
  position: relative;
  background-color: #fff;
  /* backdrop-filter: blur(4px); */
  max-width: 500px;
  width: 100%;
  padding: 30px;
  /* border-radius: 10px; */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.custom-dialog-header h3 {
  margin: 0;
}

.custom-dialog-body {
  @apply text-center text-[20px] lg:text-[24px];
  margin-top: 20px;
}

.custom-dialog-footer {
  @apply mt-5 flex justify-center gap-6 text-[20px] lg:mt-10 lg:text-[24px];
}

.btn-cancle {
  @apply max-w-[208px] grow border border-black py-4 hover:bg-[#00000017];
}

.btn-check {
  @apply max-w-[208px] grow bg-black py-4 text-white;
}
</style>
