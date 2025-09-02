<template>
  <transition name="fade-footer">
    <footer class="app-footer">
      <footer class="footer">
        <div class="footer-content">
          <p>© {{ new Date().getFullYear() }} {{ SiteAuthor }}. All rights reserved.</p>
          <p class="beian-row">
            <span>
              <img src="/ic_gongan.png" alt="公安备案图标"/>
              <a href="https://beian.mps.gov.cn/#/query/webSearch?code=33021202003484" target="_blank" rel="noreferrer">浙公网安备33021202003484号</a>
            </span>
            ·
            <span><a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener">{{ SiteRecordNumber }}</a></span>
            ·
            <span><a href="https://icp.gov.moe/?keyword=20250194" target="_blank">萌ICP备20250194号</a></span>
          </p>
          <p>
            <SiteRuntime/>
          </p>
        </div>
      </footer>
    </footer>
  </transition>
</template>

<script setup lang="ts">
import SiteRuntime from "@/components/SiteRuntime.vue";

const SiteAuthor = import.meta.env.VITE_SITE_COPYRIGHT || 'PickStars'
const SiteRecordNumber = import.meta.env.VITE_SITE_ICP || ''
</script>

<style scoped lang="scss">
.app-footer {
  box-sizing: border-box;
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
  padding: 1rem 0.5rem;
  color: var(--color-text); // 使用主题文本色

  .footer-content {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;

    p {
      margin: 0;
      display: flex;
      align-items: center;
      flex: 1;
      justify-content: center;
      color: inherit; // 继承父元素颜色
    }

    a {
      color: var(--color-text); // 使用主题文本色
      text-decoration: none;
      transition: color 0.3s ease; // 添加过渡效果

      &:hover {
        color: var(--loader-color); // 使用主题强调色作为hover效果
      }
    }

    .beian-row {
      min-width: fit-content;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      gap: 0.5rem;

      img {
        width: 1rem;
        height: 1rem;
        margin-right: 0.25rem;
        filter: var(--image-filter); // 适配主题的图片滤镜
      }
    }
  }
}

/* 仅移动端调整 */
@media (max-width: 768px) {
  .app-footer {
    padding: 0.5rem;

    .footer-content {
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 0.25rem;
      font-size: 0.5rem;

      p {
        flex: unset;
        width: auto;
        justify-content: center;
        text-align: center;
        white-space: nowrap;
      }

      .beian-row {
        flex-direction: row;
        flex-wrap: nowrap;
        gap: 0.5rem;
        justify-content: center;
        width: auto;

        span {
          display: flex;
          align-items: center;
        }

        img {
          width: 0.5rem;
          height: 0.5rem;
        }
      }
    }
  }
}

/* 动画样式保持不变 */
.fade-footer-enter-active,
.fade-footer-leave-active {
  transition: opacity 0.4s ease, transform 0.4s ease;
}

.fade-footer-enter-from,
.fade-footer-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>
