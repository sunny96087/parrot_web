<script setup lang="ts">
import { APIStore } from '~/store/apiService'
const store = APIStore()
import { showToast, openDialog, showLoading, hideLoading } from '~/store/eventBus'
</script>
<template>
  <div class="w-full">food</div>
</template>
<style scoped></style>
