<template>
  <transition name="fade">
    <div
        v-if="visible"
        class="back-to-top"
        @click="scrollToTop"
        aria-label="Back to top"
    >
      <i class="fas fa-arrow-up"></i>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted } from 'vue';

export default defineComponent({
  name: 'BackToTop',
  setup() {
    const visible = ref(false);

    const checkScroll = () => {
      visible.value = window.scrollY > 300;
    };

    // 平滑滚动函数
    const scrollToTop = () => {
      const start = window.scrollY;
      const duration = 600; // 动画时长，单位 ms
      let startTime: number | null = null;

      const easeInOutCubic = (t: number) =>
          t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeInOutCubic(progress);

        window.scrollTo(0, start * (1 - easedProgress));

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    };

    onMounted(() => {
      window.addEventListener('scroll', checkScroll);
    });

    onUnmounted(() => {
      window.removeEventListener('scroll', checkScroll);
    });

    return { visible, scrollToTop };
  },
});
</script>

<style lang="scss" scoped>
.back-to-top {
  position: fixed;
  bottom: 50px;
  right: 20px;
  border: none;
  color: var(--color-text);
  font-size: 24px;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 1000;

  &:hover {
    transform: translateY(-3px);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
