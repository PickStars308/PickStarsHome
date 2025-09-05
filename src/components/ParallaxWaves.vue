<template>
  <div ref="root" class="parallax-waves" :style="{ height: height + 'px' }">
    <svg :width="width" :height="height" :viewBox="`0 0 ${width} ${height}`" preserveAspectRatio="none">
      <path :d="pathBack" fill="var(--color-background-soft)" style="opacity:0.8;" />
      <path :d="pathFront" fill="var(--color-background-mute)" style="opacity:1;" />
    </svg>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';

interface Props {
  speed?: number;           // 基础速度（像素/秒的相位单位）
  amplitude?: number;       // 基本振幅（像素）
  frequency?: number;       // 波段数量（越大波越密）
  height?: number;          // 组件高度（像素）
  points?: number;          // 采样点数量（用于生成路径）
}

const props = withDefaults(defineProps<Props>(), {
  speed: 0.8,
  amplitude: 30,
  frequency: 1.2,
  height: 160,
  points: 8
});

const root = ref<HTMLElement | null>(null);
const width = ref(1000);
const height = ref(props.height);
let currentAmplitude = props.amplitude!;

const resizeObserver = ref<ResizeObserver | null>(null);

// 动画状态
let rafId: number | null = null;
const t = ref(0); // 相位（秒）

// 两层路径
const pathBack = ref('');
const pathFront = ref('');

// Helpers
function nowSeconds() {
  return performance.now() / 1000;
}

// 生成一组基于正弦的采样点
function generatePoints(w: number, h: number, amplitude: number, frequency: number, phase: number, samples: number, baselineFactor = 0.5) {
  const points: Array<[number, number]> = [];
  for (let i = 0; i <= samples; i++) {
    const x = (i / samples) * w;
    const nx = (i / samples) * Math.PI * 2 * frequency;
    const y = h * baselineFactor + Math.sin(nx + phase) * amplitude;
    points.push([x, y]);
  }
  return points;
}

// Catmull-Rom -> cubic bezier
function catmullRom2bezier(points: Array<[number, number]>) {
  if (points.length < 2) return '';
  let d = `M ${points[0][0].toFixed(2)} ${points[0][1].toFixed(2)}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = i === 0 ? points[0] : points[i - 1];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = i + 2 < points.length ? points[i + 2] : p2;
    const tension = 0.5;

    const cp1x = p1[0] + (p2[0] - p0[0]) * tension / 6;
    const cp1y = p1[1] + (p2[1] - p0[1]) * tension / 6;
    const cp2x = p2[0] - (p3[0] - p1[0]) * tension / 6;
    const cp2y = p2[1] - (p3[1] - p1[1]) * tension / 6;

    d += ` C ${cp1x.toFixed(2)} ${cp1y.toFixed(2)}, ${cp2x.toFixed(2)} ${cp2y.toFixed(2)}, ${p2[0].toFixed(2)} ${p2[1].toFixed(2)}`;
  }
  return d;
}

function makeFillPath(points: Array<[number, number]>, w: number, h: number) {
  if (!points.length) return '';
  const curve = catmullRom2bezier(points);
  // const last = points[points.length - 1];
  // const first = points[0];
  return `${curve} L ${w} ${h} L 0 ${h} Z`;
}

function updatePaths(now: number) {
  const phaseBase = now * props.speed;

  // 后层
  const backPhase = phaseBase * 0.6;
  const backAmp = currentAmplitude * 0.6;
  const backFreq = props.frequency! * 0.9;
  const backPoints = generatePoints(width.value, height.value, backAmp, backFreq, backPhase, props.points!, width.value < 600 ? 0.6 : 0.58);
  pathBack.value = makeFillPath(backPoints, width.value, height.value);

  // 前层
  const frontPhase = phaseBase * 1.3 + 1.2;
  const frontAmp = currentAmplitude;
  const frontFreq = props.frequency! * 1.1;
  const frontPoints = generatePoints(width.value, height.value, frontAmp, frontFreq, frontPhase, props.points! * 2, width.value < 600 ? 0.55 : 0.5);
  pathFront.value = makeFillPath(frontPoints, width.value, height.value);
}

// 动画循环
let lastTime = nowSeconds();
function loop() {
  const now = nowSeconds();
  const dt = now - lastTime;
  lastTime = now;
  t.value += dt;
  updatePaths(t.value);
  rafId = requestAnimationFrame(loop);
}

// 响应式宽度/高度
function updateSize() {
  if (!root.value) return;
  const rect = root.value.getBoundingClientRect();
  width.value = Math.max(100, Math.floor(rect.width));

  if (width.value < 600) {
    height.value = props.height! * 0.6;
    currentAmplitude = props.amplitude! * 0.6;
  } else if (width.value < 1024) {
    height.value = props.height! * 0.8;
    currentAmplitude = props.amplitude! * 0.8;
  } else {
    height.value = props.height!;
    currentAmplitude = props.amplitude!;
  }

  updatePaths(t.value);
}

onMounted(() => {
  updateSize();

  if (root.value && 'ResizeObserver' in window) {
    resizeObserver.value = new ResizeObserver(() => updateSize());
    resizeObserver.value.observe(root.value);
  } else {
    window.addEventListener('resize', updateSize);
  }

  lastTime = nowSeconds();
  rafId = requestAnimationFrame(loop);
});

onBeforeUnmount(() => {
  if (rafId !== null) cancelAnimationFrame(rafId);
  if (resizeObserver.value && root.value) {
    resizeObserver.value.unobserve(root.value);
  } else {
    window.removeEventListener('resize', updateSize);
  }
});

watch(() => props.height, (v) => {
  height.value = v!;
  updateSize();
});
</script>

<style scoped>
.parallax-waves {
  width: 100%;
  position: relative;
  display: block;
}

svg {
  display: block;
  width: 100%;
  height: 100%;
}
</style>
