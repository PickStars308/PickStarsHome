<template>
  <div>
    <p>站点已运行：{{ years }} 年 {{ months }} 月 {{ days }} 天</p>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';

// 定义起始日期和当前日期
const startDate = ref(new Date('2025-04-13T00:00:00'));
const now = ref(new Date());

// 计算时间差
const diff = computed(() => {
  const start = startDate.value;
  const end = now.value;

  let years = end.getFullYear() - start.getFullYear();
  let months = end.getMonth() - start.getMonth();
  let days = end.getDate() - start.getDate();

  // 处理日期不足的情况
  if (days < 0) {
    months--;
    const lastMonthDate = new Date(end.getFullYear(), end.getMonth(), 0);
    days += lastMonthDate.getDate();
  }

  // 处理月份不足的情况
  if (months < 0) {
    years--;
    months += 12;
  }

  return { years, months, days };
});

// 提取计算属性
const years = computed(() => diff.value.years);
const months = computed(() => diff.value.months);
const days = computed(() => diff.value.days);

// 定时器相关
let timer = null;

onMounted(() => {
  // 每秒更新当前时间
  timer = setInterval(() => {
    now.value = new Date();
  }, 1000);
});

onBeforeUnmount(() => {
  // 清理定时器
  if (timer) {
    clearInterval(timer);
  }
});
</script>

<style scoped>

</style>
