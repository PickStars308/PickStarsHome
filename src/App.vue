<template>

  <GridBackground
      :gridSize="100"
      :lineWidth="1"
      :speed="5"
      :opacity="0.6"
  />

  <section class="AppLayout">
    <AppHeader/>

    <section>
      <router-view v-slot="{ Component }">
        <!-- 渐显效果的过渡 -->
        <transition name="fade" mode="out-in">
          <component :is="Component"></component>
        </transition>
      </router-view>
    </section>

    <AppFooter/>
  </section>


  <MouseCursor :enabled="true"/>

  <Loading/>

</template>

<script setup lang="ts">

import {onMounted, onBeforeUnmount, watch} from 'vue'

import {ElNotification} from "element-plus";

const isMaintaining = import.meta.env.VITE_SITE_MAINTAIN === 'true'


import {ConsoleLogger} from '@/utils/ConsoleLogger';
import {checkDays, helloInit} from "@/utils/Home";
// 初始化
const icon = `

  ██████╗ ██╗ ██████╗██╗  ██╗    ███████╗████████╗ █████╗ ██████╗ ███████╗
  ██╔══██╗██║██╔════╝██║ ██╔╝    ██╔════╝╚══██╔══╝██╔══██╗██╔══██╗██╔════╝
  ██████╔╝██║██║     █████╔╝     ███████╗   ██║   ███████║██████╔╝███████╗
  ██╔═══╝ ██║██║     ██╔═██╗     ╚════██║   ██║   ██╔══██║██╔══██╗╚════██║
  ██║     ██║╚██████╗██║  ██╗    ███████║   ██║   ██║  ██║██║  ██║███████║
  ╚═╝     ╚═╝ ╚═════╝╚═╝  ╚═╝    ╚══════╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝

    `;
import {useAppStore} from '@/stores/index.ts'
import AppHeader from "@/components/home/AppHeader.vue";

import { useThemeStore } from './stores/theme.ts'
import GridBackground from "@/components/GridBackground.vue";
import AppFooter from "@/components/home/AppFooter.vue";

// 关键：在应用挂载前初始化主题
const themeStore = useThemeStore()
themeStore.initTheme()
if (!isMaintaining) {

  const appInfo = {
    Version: import.meta.env.VITE_PICKSTARS_VERSION,
    Author: "摘星辰",
    GitHub: "https://github.com/PickStars308",
    Website: "https://xinstudio.top/",
  };

  if (ConsoleLogger) {
    ConsoleLogger.logStructured(appInfo, icon, "font-size: 16px;color: #50b16e;");
  } else {
    ElNotification({
      title: "Error",
      message: "ConsoleLogger module not found. Please check the import path.",
      type: "error",
    });
  }

  // onMounted(() => {
  //   const appStore = useAppStore()
  //
  //   watch(
  //       () => appStore.isDataLoaded,
  //       (val) => {
  //         if (val) {
  //           checkDays()
  //           setTimeout(() => {
  //             helloInit()
  //             appStore.setLoading(false)
  //           }, 1000)
  //         }
  //       }
  //   )
  // })

  onMounted(() => {
    const appStore = useAppStore()

    watch(
        () => appStore.isDataLoaded,
        (val) => {
          if (val) {
            checkDays()
            setTimeout(() => {
              helloInit()
              appStore.setLoading(false)
            }, 1000)
          }
        },
        {immediate: true} // <- 立即触发一次，确保初始值为 true 时也会执行
    )
  })

} else {
  const appInfo = {
    Version: import.meta.env.VITE_PICKSTARS_VERSION,
    Author: "摘星辰 维护中...",
    GitHub: "https://github.com/PickStars308",
    Website: "https://xinstudio.top/",
  };

  if (ConsoleLogger) {
    ConsoleLogger.logStructured(appInfo, icon, "font-size: 16px;color: #50b16e;");
  } else {
    ElNotification({
      title: "Error",
      message: "ConsoleLogger module not found. Please check the import path.",
      type: "error",
    });
  }
}

function handleContextMenu(event: MouseEvent) {
  event.preventDefault()
  ElNotification({
    title: "嘿！没有右键菜单",
    message: "试试 Alt+F4 吧！！！",
    type: "warning",
  });
}

function handleCopy(event: ClipboardEvent) {
  ElNotification({
    title: "复制行为被监控 👀",
    message: "复制的内容已被记录（开个玩笑）",
    type: "info",
  });

  const text = window.getSelection()?.toString() || '';
  const watermark = `\n\n—— 复制自 xinstudio.top 网站`;
  event.clipboardData?.setData('text/plain', text + watermark);
  event.preventDefault();
}

function handleKeyDown(event: KeyboardEvent) {
  if (event.key === 'F12') {
    event.preventDefault(); // 阻止默认行为（部分浏览器有效）
    ElNotification({
      title: "嘿！别瞎按",
      message: "坏孩子！",
      type: "error",
    });
  }
}

onMounted(() => {
  document.addEventListener('contextmenu', handleContextMenu);
  document.addEventListener('copy', handleCopy);
  document.addEventListener('keydown', handleKeyDown);
});

onBeforeUnmount(() => {
  document.removeEventListener('contextmenu', handleContextMenu);
  document.removeEventListener('copy', handleCopy);
  document.removeEventListener('keydown', handleKeyDown);
});


</script>

<style lang="scss">
#app {
  height: 100vh; // 修正之前的wh为vh
  position: relative;
}

/* 渐显过渡动画样式 */
.fade-enter-from,
.fade-leave-to {
  /* 初始状态：完全透明 */
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  /* 动画过渡效果：0.5秒平滑过渡 */
  transition: opacity 0.5s ease;
}

.fade-enter-to,
.fade-leave-from {
  /* 结束状态：完全不透明 */
  opacity: 1;
}
</style>