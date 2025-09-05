<template>
  <header class="app-header">
    <div class="header-content">
      <!-- 左侧站点名称 -->
      <div class="site-title">
        <a href="/">{{ SiteName }}</a>
      </div>

      <!-- 右侧功能按钮组 -->
      <div class="header-actions">
        <!-- 设置按钮 -->
        <button class="action-btn" @click="handleSettingsClick" aria-label="设置">
          <i class="fas fa-cog"></i>
        </button>

        <!-- 语言按钮 -->
        <button class="action-btn" @click="handleLanguageClick" aria-label="语言选择">
          <i class="fas fa-globe"></i>
        </button>

        <button class="action-btn" @click="cycleTheme($event)"
                :title="`当前主题：${themeStore.theme}（实际：${appliedTheme}），点击切换`">
          <i v-if="themeStore.theme === 'system'" class="fas fa-desktop" title="跟随系统模式"></i>
          <i v-else-if="themeStore.theme === 'dark'" class="fas fa-moon" title="暗色模式"></i>
          <i v-else class="fas fa-sun" title="亮色模式"></i>
        </button>

      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import {computed} from 'vue';
import {useThemeStore} from '@/stores/theme';

const SiteName = import.meta.env.VITE_SITE_Briefly || 'PickStars';

const themeStore = useThemeStore();

// 实际应用主题
const appliedTheme = computed(() => {
  return themeStore.theme === 'system'
      ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
      : themeStore.theme;
});

const cycleTheme = (event: MouseEvent) => {
  const nextTheme = themeStore.theme === 'system' ? 'dark'
      : themeStore.theme === 'dark' ? 'light'
          : 'system';

  rippleBackground({
    event: event, targetTheme: nextTheme, callback: () => {
      themeStore.setTheme(nextTheme);
    }
  });
};


const rippleBackground = ({targetTheme, callback}: {
  event: MouseEvent,
  targetTheme: "light" | "dark" | "system",
  callback: () => void
}) => {
  const ripple = document.createElement('div');
  const body = document.body;

  // 目标主题颜色
  let color: string;
  if (targetTheme === 'system') {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    color = isDark ? '#222' : '#fff';
  } else {
    color = targetTheme === 'dark' ? '#222' : '#fff';
  }

  Object.assign(ripple.style, {
    position: 'fixed',
    left: `50%`,
    top: `50%`,
    width: '20px',
    height: '20px',
    background: color,
    borderRadius: '50%',
    transform: 'translate(-50%, -50%) scale(0)',
    transition: 'transform 1s ease-out',
    zIndex: '2',
    pointerEvents: 'none',
  });

  body.appendChild(ripple);

  // 扩散到全屏
  requestAnimationFrame(() => {
    const d = Math.sqrt(window.innerWidth ** 2 + window.innerHeight ** 2) * 2;
    ripple.style.width = ripple.style.height = `${d}px`;
    ripple.style.transform = `translate(-50%, -50%) scale(1)`;
  });

  // 动画结束后切换主题并移除
  setTimeout(() => {
    body.removeChild(ripple);
    callback();
  }, 500);
};


import {useSettingsStore} from '@/stores/settings';

const settingsStore = useSettingsStore();

const handleSettingsClick = () => {
  settingsStore.showSettingsDialog();
};

const handleLanguageClick = () => {
  console.log('Language clicked');
};

</script>


<style scoped lang="scss">
.app-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  z-index: 3;
  transition: background-color 0.3s ease, border-color 0.3s ease;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  padding: 0 1.5rem;
  max-width: 1400px;
  margin: 0 auto;
  box-sizing: border-box;
}

.site-title {
  font-size: 1.25rem;
  font-weight: 600;

  a {
    color: var(--color-heading);
    text-decoration: none;
    transition: color 0.3s ease;

    &:hover {
      color: var(--loader-color);
    }
  }
}

.header-actions {
  display: flex;
  gap: 0.75rem;
  align-items: center;
}

.action-btn {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: transparent;
  border: none;
  color: var(--color-text);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: var(--color-background-soft);
    color: var(--loader-color);
    transform: translateY(-2px);
  }

  i {
    font-size: 1rem;
  }
}

/* 移动端适配 */
@media (max-width: 768px) {
  .header-content {
    padding: 0 1rem;
  }

  .site-title {
    font-size: 1.1rem;
  }

  .action-btn {
    width: 32px;
    height: 32px;

    i {
      font-size: 0.9rem;
    }
  }
}
</style>
