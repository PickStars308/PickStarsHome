<template>
  <div class="custom-mouse-container">
    <!-- 自定义鼠标指针 -->
    <div
        ref="mousePointer"
        class="mouse-pointer"
        :class="{ 'is-active': isClicking }"
        :style="{
        left: `${mouseX}px`,
        top: `${mouseY}px`
      }"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

// 鼠标位置状态
const mouseX = ref(0);
const mouseY = ref(0);
const isClicking = ref(false);

// DOM引用
const mousePointer = ref<HTMLDivElement | null>(null);

// 更新鼠标位置
const updateMousePosition = (e: MouseEvent) => {
  mouseX.value = e.clientX;
  mouseY.value = e.clientY;
};

// 鼠标按下时 - 缩小
const handleMouseDown = (e: MouseEvent) => {
  // 只处理左键(0)和右键(2)
  if (e.button === 0 || e.button === 2) {
    // 阻止右键默认菜单
    if (e.button === 2) {
      e.preventDefault();
    }
    isClicking.value = true;
  }
};

// 鼠标松开时 - 放大恢复
const handleMouseUp = (e: MouseEvent) => {
  // 只处理左键(0)和右键(2)
  if (e.button === 0 || e.button === 2) {
    isClicking.value = false;
  }
};

// 监听鼠标事件
onMounted(() => {
  // 隐藏默认鼠标指针
  document.body.style.cursor = 'none';

  // 监听鼠标移动
  window.addEventListener('mousemove', updateMousePosition);

  // 监听鼠标按下（左键和右键）
  window.addEventListener('mousedown', handleMouseDown);

  // 监听鼠标松开
  window.addEventListener('mouseup', handleMouseUp);
});

// 清理事件监听
onUnmounted(() => {
  // 恢复默认鼠标指针
  document.body.style.cursor = '';

  window.removeEventListener('mousemove', updateMousePosition);
  window.removeEventListener('mousedown', handleMouseDown);
  window.removeEventListener('mouseup', handleMouseUp);
});
</script>

<style scoped>
.custom-mouse-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none; /* 确保鼠标元素不会干扰页面交互 */
  z-index: 9999; /* 确保在最上层显示 */
}

.mouse-pointer {
  position: absolute;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.5); /* 50%透明的黑色 */
  transform: translate(-50%, -50%) scale(1); /* 居中并设置初始大小 */
  transition: transform 0.2s ease; /* 平滑过渡效果 */
  will-change: left, top, transform; /* 优化动画性能 */
}

/* 点击时缩小的样式 */
.mouse-pointer.is-active {
  transform: translate(-50%, -50%) scale(0.6); /* 缩小到60% */
}
</style>
