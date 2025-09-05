<template>
  <div class="about-me">
    <div class="text-content">
      <h1 class="greeting">Hi 👋</h1>
      <h2 class="name">我是 <span>摘星辰</span></h2>
      <p class="location">这里是摘星辰的小窝</p>
      <p class="slogan">Reaching for the stars and exploring the galaxy is all-encompassing</p>
    </div>

    <!-- 右侧头像区域 -->
    <div class="avatar-container">
      <div class="avatar-decoration"></div>
      <div class="avatar-frame">
        <img
            :src="AvatarUrl"
            :alt="Briefly"
            class="avatar"
        >
      </div>
    </div>
  </div>
</template>

<script setup>
const AvatarUrl = `http://q.qlogo.cn/headimg_dl?dst_uin=${import.meta.env.VITE_SITE_AVATAR}&spec=${import.meta.env.VITE_AVATAR_SIZE}&img_type=jpg`
const Briefly = import.meta.env.VITE_SITE_Briefly
</script>

<style lang="scss" scoped>
.about-me {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  flex-wrap: wrap;
  margin: 10rem auto 4rem;
  width: 70%;
  padding: 2rem;
  min-height: 400px;

  // 装饰色块
  .decorative-block {
    position: absolute;
    border-radius: 16px;
    z-index: -1;
    filter: blur(30px);
    opacity: 0.5;
    transition: all 0.5s ease;
  }


  .text-content {
    flex: 1;
    line-height: 55px;
    position: relative;
    padding: 2rem 0;

    .greeting {
      color: var(--color-heading);
      font-size: 3rem;
      font-weight: 800;
      margin-bottom: 0.5rem;
      position: relative;
      display: inline-block;

      &::after {
        content: '';
        position: absolute;
        width: 100%;
        height: 15px;
        background-color: rgba(23, 110, 186, 0.1);
        bottom: 8px;
        left: 0;
        z-index: -1;
        transform: skew(-12deg);
      }
    }

    .name {
      font-size: 2rem;
      font-weight: 700;
      color: var(--color-heading);
      margin: 0.5rem 0;

      span {
        color: #176EBA; // 主题色高亮
        position: relative;

        &::before {
          content: '';
          position: absolute;
          width: 100%;
          height: 8px;
          background-color: rgba(139, 92, 246, 0.2);
          bottom: -2px;
          left: 0;
          z-index: -1;
          border-radius: 4px;
        }
      }
    }

    .location {
      font-size: 2rem;
      color: var(--color-heading);
      opacity: 0.85;
      margin: 0.5rem 0;
    }

    .slogan {
      font-size: 1.5rem;
      color: var(--color-heading);
      opacity: 0.85;
    }

  }

  .avatar-container {
    flex: 0 0 auto;
    position: relative;
    padding: 1rem;

    .avatar-decoration {
      position: absolute;
      width: 120px;
      height: 120px;
      background: linear-gradient(135deg, #176EBA, #8B5CF6);
      border-radius: 50%;
      top: -20px;
      right: -20px;
      z-index: -1;
      opacity: 0.7;
    }

    .avatar-frame {
      position: relative;
      width: 200px;
      height: 200px;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      border: 4px solid white;

      &::before {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(139, 92, 246, 0.1));
        z-index: 1;
      }

      &:hover {
        transform: translateY(-5px) scale(1.02);
        box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
      }

      @media (max-width: 768px) {
        width: 180px;
        height: 180px;
      }
    }

    .avatar {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      transition: transform 0.5s ease;

      &:hover {
        transform: scale(1.05);
      }
    }
  }

}

@media (max-width: 768px) {
  .about-me {
    flex-direction: column;
    align-items: center;
    text-align: center;
    margin: 5rem auto 2rem;
    padding: 1rem;
    width: 90%;
    min-height: auto;

    .text-content {
      padding: 1rem 0;
      line-height: 1.6;

      .greeting {
        font-size: 2.2rem;
      }

      .name {
        font-size: 1.5rem;
        margin: 0.5rem 0;
      }

      .location {
        font-size: 1.2rem;
        margin: 0.3rem 0;
      }

      .slogan {
        font-size: 1rem;
        margin-top: 0.5rem;
      }
    }

    .avatar-container {
      margin-top: 1.5rem;
      padding: 0.5rem;

      .avatar-decoration {
        width: 80px;
        height: 80px;
        top: -10px;
        right: -10px;
      }

      .avatar-frame {
        width: 150px;
        height: 150px;
        border-radius: 12px;
      }
    }
  }
}

</style>
