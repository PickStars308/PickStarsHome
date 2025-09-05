<template>
  <div class="cards-page">
    <button class="back-btn" @click="$emit('close')">
      <i class="fas fa-arrow-left"></i> 返回
    </button>

    <!-- 移动端卡片 -->
    <RouteCards :cards="routeCards" mobile />
  </div>
</template>

<script setup lang="ts">
import RouteCards from "./RouteCards.vue";

defineProps<{ routeCards: any[] }>();
</script>
