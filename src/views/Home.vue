<template>

  <div class="parallax-container">
    <div class="home-container">
      <div class="content">
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
      </div>
    </div>
    <ParallaxWaves class="ParallaxWaves"/>
  </div>

  <div class="MainContent">

    <AboutMe class="wow fadeInLeft"/>

    <MySkills class="wow fadeInLeft"/>

    <MyProjects class="wow fadeInLeft"/>

    <FriendLinks class="wow fadeInLeft"/>

  </div>

</template>


<script setup lang="ts">
import {ref, watch, nextTick} from "vue";
import {useAppStore} from "@/stores/index.ts";
import {useSettingsStore} from "@/stores/settings.ts";
import axios from '@/utils/axios.ts';
import Typewriter from '@/components/Typewriter.vue';
import AboutMe from "@/views/home/AboutMe.vue";
import MyProjects from "@/views/home/MyProjects.vue";
import FriendLinks from "@/views/home/FriendLinks.vue";
import MySkills from "@/views/home/MySkills.vue";
import ParallaxWaves from "@/components/ParallaxWaves.vue";

const appStore = useAppStore();
const settingsStore = useSettingsStore();

const AvatarUrl = `http://q.qlogo.cn/headimg_dl?dst_uin=${import.meta.env.VITE_SITE_AVATAR}&spec=${import.meta.env.VITE_AVATAR_SIZE}&img_type=jpg`
const Briefly = import.meta.env.VITE_SITE_Briefly

const typewriterRef = ref<InstanceType<typeof Typewriter>>()
const customTexts = ref<string[]>([]);

// 提取文本加载逻辑为独立函数
const loadTextBySource = async () => {
  if (!typewriterRef.value) return;

  if (settingsStore.typeSource === 'customer') {
    // 确保自定义文本已加载
    if (customTexts.value.length === 0) {
      await fetchCustomTexts();
    }
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
};

// 初始加载自定义文本
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

// 监听加载状态和类型切换
watch(
    [() => appStore.isLoading, () => settingsStore.typeSource],
    async ([newLoading]) => {
      if (!newLoading) {
        await nextTick();
        await loadTextBySource();
      }
    },
    { immediate: true } // 初始时立即执行一次
);


</script>


<style lang="scss" scoped>
.parallax-container {

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

  }

  .ParallaxWaves {
    position: absolute;
    width: 100%;
    bottom: 0;
  }
}

.MainContent {
  display: flex;
  background: var(--color-background-mute);
  flex-direction: column;
}

</style>
