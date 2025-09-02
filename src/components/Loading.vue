<template>
  <transition name="fade" @after-leave="onAfterLeave">
    <div v-if="showLoader" class="loader-overlay">
      <!-- 新增门元素 -->
      <div class="door door-left" :class="{ 'door-opened': isDoorOpening }"></div>
      <div class="door door-right" :class="{ 'door-opened': isDoorOpening }"></div>

      <!-- 原有加载动画 - 新增显示控制 -->
      <div
          class="loader"
          :class="{ 'loader-hidden': !isAnimationVisible }"
      >
        <div class="shape"></div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useAppStore } from '@/stores/index.ts';

const loadingStore = useAppStore();
const showLoader = ref(loadingStore.isLoading);
const isAnimationVisible = ref(true); // 控制加载动画显示
const isDoorOpening = ref(false); // 控制门打开状态

// 监听 Pinia 状态变化
watch(
    () => loadingStore.isLoading,
    (newVal) => {
      if (newVal) {
        // 加载开始时重置状态
        isDoorOpening.value = false;
        isAnimationVisible.value = true;
        showLoader.value = true;
      } else {
        // 先隐藏加载动画
        isAnimationVisible.value = false;

        // 等待动画隐藏后再开门
        setTimeout(() => {
          isDoorOpening.value = true;

          // 等待门完全打开后再隐藏整个加载层
          setTimeout(() => {
            showLoader.value = false;
          }, 600); // 与门动画时间匹配
        }, 300); // 与动画隐藏时间匹配
      }
    }
);

const onAfterLeave = () => {
  // leave 动画结束后彻底重置状态
  if (!loadingStore.isLoading) {
    isDoorOpening.value = false;
    console.log('Animation complete, hiding loader');
  }
};
</script>

<style lang="scss" scoped>
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
.fade-enter-to, .fade-leave-from {
  opacity: 1;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}

.loader-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  overflow: hidden;
}

/* 门的样式 */
.door {
  position: absolute;
  top: 0;
  height: 100vh;
  width: 50%;
  background: var(--overlay-background);
  transition: transform 0.6s cubic-bezier(0.645, 0.045, 0.355, 1);
  z-index: 1;
}

.door-left {
  left: 0;
  transform: translateX(0);
}

.door-right {
  right: 0;
  transform: translateX(0);
}

.door-opened.door-left {
  transform: translateX(-100%);
}

.door-opened.door-right {
  transform: translateX(100%);
}

/* 原有加载动画样式 - 新增隐藏过渡 */
.loader {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
  animation: loader_513 2s linear infinite;
  z-index: 2;
  opacity: 1;
  transition: opacity 0.3s ease, transform 0.3s ease; /* 新增隐藏动画 */
}

/* 加载动画隐藏状态 */
.loader-hidden {
  opacity: 0;
  transform: scale(0.8); /* 缩小并淡出 */
}

.shape {
  position: absolute;
  top: 0;
  left: 0;
  width: 80px;
  height: 80px;
  border-radius: 15px;
  background-color: var(--loader-color);
  animation: rectangle_513 4s linear infinite;
  animation-delay: 2s;
}

@keyframes loader_513 {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes rectangle_513 {
  0% { transform: scale(1,1); border-radius: 15px; }
  25% { border-radius: 30px; box-shadow: 0 0 5px rgba(133,133,133,0.523); background-color: var(--loader-color); transform: scale(0.9); }
  50% { border-radius: 20px; transform: scale(1.4); box-shadow: 2px 5px 50px rgba(90,90,90,0.206); }
}
</style>
