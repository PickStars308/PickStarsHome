<template>
  <section class="my-projects">
    <h2 class="title">🚀 My Projects</h2>
    <div class="projects-grid">
      <a
          v-for="(project, index) in projects"
          :key="index"
          :href="project.link"
          target="_blank"
          rel="noopener noreferrer"
          class="project-card"
      >
        <h3 class="project-title">{{ project.title }}</h3>
        <p class="project-description">{{ project.description }}</p>
      </a>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"
import axios from "@/utils/axios.ts"

interface Project {
  title: string
  description: string
  link: string
}

const projects = ref<Project[]>([])

onMounted(async () => {
  try {
    const { data } = await axios.get<Project[]>("/assets/json/projects.json")
    projects.value = data
  } catch (error) {
    console.error("加载项目失败:", error)
  }
})
</script>

<style lang="scss" scoped>
.my-projects {
  margin: 5rem auto;
  width: 90%;
  max-width: 1200px;

  .title {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 2rem;
    color: var(--color-heading);
  }

  .projects-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;

    @media (max-width: 1024px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 600px) {
      grid-template-columns: 1fr;
    }
  }

  .project-card {
    padding: 1.5rem;
    border-radius: 16px;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(12px) saturate(180%);
    -webkit-backdrop-filter: blur(12px) saturate(180%);
    border: 1px solid rgba(255, 255, 255, 0.3);
    box-shadow: 0 8px 24px rgba(0,0,0,0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    text-decoration: none;
    display: block;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 12px 32px rgba(0,0,0,0.15);
    }

    .project-title {
      font-size: 1.3rem;
      font-weight: 600;
      margin-bottom: 0.8rem;
      color: var(--color-heading);
    }

    .project-description {
      font-size: 0.95rem;
      color: var(--color-text);
      opacity: 0.9;
      margin-bottom: 0;
      line-height: 1.5;
    }
  }
}
</style>
