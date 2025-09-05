<template>
  <section class="my-friends">
    <h2 class="title">🤝 My Friends</h2>
    <div class="friends-grid">
      <a
          v-for="(friend, index) in friends"
          :key="index"
          :href="friend.Url"
          target="_blank"
          rel="noopener noreferrer"
          class="friend-card"
      >
        <div class="avatar">
          <img :src="friend.Avatar" :alt="friend.Name" />
        </div>
        <div class="info">
          <h3 class="name">{{ friend.Name }}</h3>
          <p class="description">{{ friend.Description }}</p>
        </div>
      </a>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"
import axios from "@/utils/axios.ts"

interface Friend {
  Name: string
  Url: string
  Avatar: string
  Description: string
}

const friends = ref<Friend[]>([])

onMounted(async () => {
  try {
    const { data } = await axios.get<Friend[]>("/assets/json/friends.json")
    friends.value = data
  } catch (error) {
    console.error("加载友链失败:", error)
  }
})
</script>

<style lang="scss" scoped>
.my-friends {
  margin: 5rem auto;
  width: 90%;
  max-width: 1200px;

  .title {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 2rem;
    color: var(--color-heading);
  }

  .friends-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1.5rem;

    @media (max-width: 1024px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 600px) {
      grid-template-columns: 1fr;
    }
  }

  .friend-card {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    border-radius: 16px;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(12px) saturate(180%);
    -webkit-backdrop-filter: blur(12px) saturate(180%);
    border: 1px solid rgba(255, 255, 255, 0.3);
    box-shadow: 0 8px 24px rgba(0,0,0,0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    text-decoration: none;
    color: var(--color-heading);

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 12px 32px rgba(0,0,0,0.15);
    }

    .avatar {
      flex-shrink: 0;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .info {
      flex: 1;

      .name {
        font-size: 1rem;
        font-weight: 600;
        margin-bottom: 0.3rem;
      }

      .description {
        font-size: 0.85rem;
        color: var(--color-text);
        opacity: 0.85;
      }
    }
  }
}
</style>
