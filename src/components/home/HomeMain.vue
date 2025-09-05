<template>
  <div class="content">
    <div class="avatar-container">
      <img :src="avatarUrl" alt="Avatar" class="avatar" />
    </div>

    <div class="info-container">
      <h1 class="name">{{ briefly }}</h1>
      <Typewriter ref="typewriterRef" :speed="100" prefix="“" suffix="”"/>
    </div>

    <SocialLinks />

    <!-- 桌面端路由卡片 -->
    <RouteCards :cards="routeCards" desktop />

    <!-- 移动端菜单按钮 -->
    <button class="mobile-menu-btn" @click="$emit('show-cards')">
      <i class="fas fa-bars"></i>
    </button>
  </div>
</template>

<script setup lang="ts">
import Typewriter from "@/components/Typewriter.vue";
import SocialLinks from "./SocialLinks.vue";
import RouteCards from "./RouteCards.vue";

defineProps<{
  avatarUrl: string;
  briefly: string;
  routeCards: any[];
}>();
</script>
