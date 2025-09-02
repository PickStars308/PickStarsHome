<template>
  <div class="home-container">
    <transition name="slide-main">
      <div class="content" v-show="!showCardsPage">
        <div class="avatar-container">
          <img :src="AvatarUrl" alt="Avatar" class="avatar"/>
        </div>

        <div class="info-container">
          <h1 class="name">{{ Briefly }}</h1>
          <Typewriter ref="typewriterRef" :speed="100" prefix="“" suffix="”"/>
        </div>

        <div class="social-links">
          <a href="https://github.com/PickStars308/" target="_blank" class="social-link">
            <i class="fab fa-github"></i>
          </a>
          <a href="https://qm.qq.com/q/8Kg04tLXb2" target="_blank" class="social-link">
            <i class="fab fa-qq"></i>
          </a>
          <a href="mailto:pickstars2024@qq.com" target="_blank" class="social-link">
            <i class="fab fa-at"></i>
          </a>
        </div>

        <!-- 桌面端路由卡片 -->
        <div class="social-cards">
          <div
              v-for="(card, index) in routeCards"
              :key="index"
              class="card wow animate__animated animate__fadeInUp"
              :data-wow-delay="`${index * 0.2}s`"
              @click="navigateTo(card.path)"
              style="cursor: pointer"
          >
            <h3>{{ card.title }}</h3>
            <p>{{ card.description }}</p>
          </div>
        </div>

        <button class="mobile-menu-btn" @click="showCardsPage = true">
          <i class="fas fa-bars"></i> 更多
        </button>
      </div>
    </transition>

    <transition name="slide-cards">
      <div class="cards-page" v-show="showCardsPage">
        <button class="back-btn" @click="showCardsPage = false">
          <i class="fas fa-arrow-left"></i> 返回
        </button>

        <!-- 桌面端路由卡片 -->
        <div class="social-cards">
          <div
              v-for="(card, index) in routeCards"
              :key="index"
              class="card wow animate__animated animate__fadeInUp"
              :data-wow-delay="`${index * 0.2}s`"
              @click="navigateTo(card.path)"
              style="cursor: pointer"
          >
            <h3>{{ card.title }}</h3>
            <p>{{ card.description }}</p>
          </div>
        </div>

        <!-- 移动端路由卡片 -->
        <div class="cards-container">
          <div
              v-for="(card, index) in routeCards"
              :key="index"
              class="card wow animate__animated animate__fadeInUp"
              :data-wow-delay="`${index * 0.2}s`"
              @click="navigateTo(card.path)"
              style="cursor: pointer"
          >
            <h3>{{ card.title }}</h3>
            <p>{{ card.description }}</p>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>


<script setup lang="ts">
import {ref, watch, nextTick, onMounted} from "vue";
import {useAppStore} from "@/stores/index.ts";
import {useSettingsStore} from "@/stores/settings.ts";
import axios from '@/utils/axios.ts';
import Typewriter from '@/components/Typewriter.vue';
import {ElNotification} from "element-plus";
import { useRouter } from 'vue-router'; // 引入路由

const appStore = useAppStore();
const settingsStore = useSettingsStore();

const AvatarUrl = `http://q.qlogo.cn/headimg_dl?dst_uin=${import.meta.env.VITE_SITE_AVATAR}&spec=${import.meta.env.VITE_AVATAR_SIZE}&img_type=jpg`
const Briefly = import.meta.env.VITE_SITE_Briefly

const typewriterRef = ref<InstanceType<typeof Typewriter>>()
const customTexts = ref<string[]>([]);

const fetchCustomTexts = async () => {
  try {
    const response = await axios.get('/assets/json/hitokoto.json');
    customTexts.value = response.data || [];
    if (customTexts.value.length === 0) customTexts.value = ['欢迎访问我的网站'];
  } catch (error) {
    console.error('获取自定义文本失败:', error);
    customTexts.value = ['获取文本失败，请检查文件是否存在'];
  }
};

watch(
    () => appStore.isLoading,
    async (loading) => {
      if (!loading) {
        await nextTick();
        await fetchCustomTexts();
        if (typewriterRef.value) {
          if (settingsStore.typeSource === 'customer') {
            const randomText = customTexts.value[Math.floor(Math.random() * customTexts.value.length)];
            typewriterRef.value.startTyping(randomText);
          } else if (settingsStore.typeSource === 'hitokoto') {
            try {
              const res = await fetch('https://v1.hitokoto.cn/?c=f&encode=text');
              const text = await res.text();
              typewriterRef.value.startTyping(text);
            } catch (e) {
              typewriterRef.value.startTyping('获取 Hitokoto 失败');
            }
          }
        }
      }
    }
)

const showCardsPage = ref(false);

interface RouteCard {
  title: string;
  description: string;
  path: string; // 路由路径
  icon?: string; // 可选图标
}

const routeCards = ref<RouteCard[]>([]);
const router = useRouter(); // 路由实例

const GetRouteCards = async () => {
  try {
    const response = await axios.get('/assets/json/nav.json');

    if (Array.isArray(response.data)) {
      const validCards = response.data.filter(item =>
          item && typeof item.title === 'string' &&
          typeof item.description === 'string' &&
          typeof item.path === 'string'
      );

      routeCards.value = validCards as RouteCard[];

      if (routeCards.value.length === 0) {
        ElNotification.error({
          title: '错误',
          message: '配置文件为空或无效',
          duration: 3000
        });
      }
    } else {
      ElNotification.error({
        title: '错误',
        message: '配置文件格式错误',
        duration: 3000
      });
    }
  } catch (error) {
    ElNotification.error({
      title: '错误',
      message: '获取导航数据失败',
      duration: 3000
    });
  }
};

// 路由跳转处理函数
const navigateTo = (path: string) => {
  if (path && path.startsWith('/')) {
    router.push(path);
  } else {
    ElNotification.error({
      title: '错误',
      message: '无效的路由路径',
      duration: 3000
    });
  }
};

// 组件挂载时获取卡片数据
onMounted(() => {
  GetRouteCards();
});
</script>


<style lang="scss" scoped>
.home-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  height: 100vh;
  text-align: center;
  overflow: hidden;

  .content, .cards-page {
    position: absolute;
    width: 100%;
    height: 100%;
    padding: 20px;
    box-sizing: border-box;
    transition: all 0.3s ease;
  }

  .content {
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .avatar-container {
    margin-bottom: 20px;

    .avatar {
      width: 120px;
      height: 120px;
      border-radius: 10%;
      object-fit: cover;
      border: 3px solid var(--color-border);
      transition: border-color 0.3s ease;
    }
  }

  .info-container {
    margin-bottom: 30px;

    .name {
      font-size: 32px;
      font-weight: bold;
      color: var(--color-heading);
      margin-bottom: 10px;
    }
  }

  .social-links {
    display: flex;
    justify-content: center;
    gap: 20px;

    .social-link {
      font-size: 24px;
      color: var(--color-text);
      text-decoration: none;
      transition: color 0.3s ease;

      &:hover {
        color: var(--loader-color);
      }
    }
  }


  .social-cards {
    display: flex;
    justify-content: center;
    gap: 20px;
    flex-wrap: wrap;
    margin-top: 100px;

    .card {
      width: 200px;
      padding: 15px;
      background-color: var(--color-background-soft);
      border-radius: 12px;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
      text-align: center;
      transition: transform 0.3s ease, box-shadow 0.3s ease;

      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
      }

      h3 {
        font-size: 18px;
        margin-bottom: 8px;
        color: var(--color-heading);
      }

      p {
        font-size: 14px;
        color: var(--color-text);
      }
    }

    @media (max-width: 768px) {
      display: none;
    }
  }


  .mobile-menu-btn {
    display: none;
    margin: 20px auto 0 auto;
    padding: 8px 16px;
    font-size: 16px;
    border-radius: 6px;
    background-color: var(--loader-color);
    color: #fff;
    border: none;
    cursor: pointer;
    text-align: center;
    transition: all 0.3s ease;

    &:hover {
      opacity: 0.85;
    }

    @media (max-width: 768px) {
      display: block;
    }
  }


  .cards-page {
    display: none;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    background-color: var(--color-background);
    z-index: 4;

    .back-btn {
      align-self: flex-start;
      margin-bottom: 16px;
      padding: 6px 12px;
      font-size: 14px;
      border-radius: 6px;
      background-color: var(--loader-color);
      color: #fff;
      border: none;
      cursor: pointer;
      transition: all 0.3s ease;

      &:hover {
        opacity: 0.85;
      }
    }

    .cards-container {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 16px;
      width: 100%;

      .card {
        background-color: var(--color-background-soft);
        border-radius: 12px;
        padding: 16px;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        text-align: center;
        transition: transform 0.3s ease, box-shadow 0.3s ease;

        &:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
        }

        h3 {
          margin-bottom: 8px;
          color: var(--color-heading);
        }

        p {
          color: var(--color-text);
        }
      }
    }

    @media (max-width: 768px) {
      display: flex;
    }
  }


  .slide-main-enter-from,
  .slide-main-leave-to {
    transform: translateX(-100%);
    opacity: 0;
  }

  .slide-main-enter-active,
  .slide-main-leave-active {
    transition: transform 0.3s ease, opacity 0.3s ease;
  }


  .slide-cards-enter-from,
  .slide-cards-leave-to {
    transform: translateX(100%);
    opacity: 0;
  }

  .slide-cards-enter-active,
  .slide-cards-leave-active {
    transition: transform 0.3s ease, opacity 0.3s ease;
  }
}
</style>
