<template>
  <section class="my-skills">
    <h2 class="title">💡 My Skills</h2>
    <div class="skills-grid">
      <div
          v-for="(skill, index) in skills"
          :key="index"
          class="skill-card"
      >
        <h3 class="skill-name">{{ skill.name }}</h3>
        <div class="progress-bar">
          <div
              class="progress"
              :style="{ width: skill.progress + '%' }"
          ></div>
        </div>
        <p class="description">{{ skill.description }}</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"
import axios from "@/utils/axios.ts"

interface Skill {
  name: string
  progress: number
  description: string
}

const skills = ref<Skill[]>([])

onMounted(async () => {
  try {
    const { data } = await axios.get<Skill[]>("/assets/json/skills.json")
    skills.value = data
  } catch (error) {
    console.error("加载技能失败:", error)
  }
})
</script>

<style lang="scss" scoped>
.my-skills {
  margin: 5rem auto;
  width: 90%;
  max-width: 1200px;

  .title {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 2rem;
    color: var(--color-heading);
  }

  .skills-grid {
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

  .skill-card {
    padding: 1.5rem;
    border-radius: 16px;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(12px) saturate(180%);
    -webkit-backdrop-filter: blur(12px) saturate(180%);
    border: 1px solid rgba(255, 255, 255, 0.3);
    box-shadow: 0 8px 24px rgba(0,0,0,0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 12px 32px rgba(0,0,0,0.15);
    }

    .skill-name {
      font-size: 1.3rem;
      font-weight: 600;
      margin-bottom: 0.8rem;
      color: var(--color-heading);
    }

    .progress-bar {
      position: relative;
      height: 10px;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 5px;
      overflow: hidden;
      margin-bottom: 0.8rem;

      .progress {
        height: 100%;
        background: linear-gradient(90deg, #176EBA, #8B5CF6);
        border-radius: 5px;
        transition: width 0.6s ease;
      }
    }

    .description {
      font-size: 0.95rem;
      color: var(--color-text);
      opacity: 0.85;
    }
  }
}
</style>
