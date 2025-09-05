<template>
  <div
      class="grid-background"
      :style="{
      '--grid-size': `${gridSize}px`,
      '--line-width': `${lineWidth}px`,
      '--animation-speed': `${speed}s`,
      '--line-color': lineColor || 'var(--color-border)',
      '--line-opacity': lineOpacity
    }"
  >
    <!-- 竖线网格 -->
    <div class="vertical-grid"></div>

    <!-- 多层横线网格创建更明显的移动效果 -->
    <div class="horizontal-grid layer-1"></div>
    <div class="horizontal-grid layer-2"></div>
  </div>
</template>

<script setup lang="ts">
import {defineProps} from 'vue';

// 定义组件属性，支持自定义网格参数
defineProps({
  /** 网格大小（线条间距），默认30px */
  gridSize: {
    type: Number,
    default: 30,
    validator: (v: number) => v >= 10 && v <= 100
  },

  /** 线条宽度，默认1px */
  lineWidth: {
    type: Number,
    default: 1,
    validator: (v: number) => v >= 0.5 && v <= 3
  },

  /** 动画速度（秒），数值越小速度越快，默认8秒 */
  speed: {
    type: Number,
    default: 8,
    validator: (v: number) => v >= 2 && v <= 30
  },

  /** 线条颜色，默认使用主题的边框色 */
  lineColor: {
    type: String,
    default: ''
  },

  /** 线条不透明度，0-1之间，默认0.7 */
  lineOpacity: {
    type: Number,
    default: 0.7,
    validator: (v: number) => v >= 0 && v <= 1
  },

  /** 背景透明度，0-1之间，默认0.95 */
  bgOpacity: {
    type: Number,
    default: 0.95,
    validator: (v: number) => v >= 0 && v <= 1
  }
});
</script>

<style lang="scss" scoped>
.grid-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: var(--color-background);
  opacity: 0.95; /* 或者传入 CSS 变量 --bg-opacity */
  z-index: -1;
  overflow: hidden;

  @keyframes moveUp {
    0% {
      transform: translateY(0);
    }
    100% {
      transform: translateY(-30px);
    }
  }

  /* 竖线网格 */
  .vertical-grid {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(
            to right,
            transparent 0%,
            transparent calc(100% - 1px),
            var(--line-color) calc(100% - 1px),
            var(--line-color) 100%
    );
    background-size: var(--grid-size) 100%;
    opacity: var(--line-opacity);
  }

  /* 横线网格 */
  .horizontal-grid {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 200%; /* 延伸防止动画空白 */
    background-image: linear-gradient(
            to bottom,
            transparent 0%,
            transparent calc(100% - 1px),
            var(--line-color) calc(100% - 1px),
            var(--line-color) 100%
    );
    background-size: 100% var(--grid-size);
    opacity: var(--line-opacity);
    animation: moveUp var(--animation-speed) linear infinite;
  }

  /* 多层网格视差 */
  .layer-1 {
    animation-delay: 0s;
  }

  .layer-2 {
    background-position: 0 calc(var(--grid-size) / 2);
    animation-delay: calc(var(--animation-speed) / -2);
    opacity: calc(var(--line-opacity) * 0.6);
  }
}

</style>
