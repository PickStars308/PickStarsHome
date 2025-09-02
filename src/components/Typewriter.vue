<template>
  <span class="typed-text">
    <span class="prefix">{{ prefix }}</span>
    <span class="typing-text">{{ typedText }}</span>
    <span class="suffix">{{ suffix }}</span>
  </span>
</template>

<script setup lang="ts">
import {defineExpose, ref} from 'vue'

const props = defineProps({
  // 移除了text prop，因为我们将动态设置
  prefix: { type: String, default: '“' },
  suffix: { type: String, default: '”' },
  speed: { type: Number, default: 100 },
})

const typedText = ref('')
const currentText = ref('') // 用内部状态存储当前文本
let currentIndex = 0
let typingTimer: number | null = null

// 清除定时器的工具函数
const clearTypingTimer = () => {
  if (typingTimer) {
    clearTimeout(typingTimer)
    typingTimer = null
  }
}

// 打字逻辑
function typeText() {
  if (currentIndex < currentText.value.length) {
    typedText.value += currentText.value[currentIndex]
    currentIndex++
    typingTimer = window.setTimeout(typeText, props.speed)
  }
}

// 暴露给父组件的方法
defineExpose({
  startTyping: (text: string) => {
    // 清除可能存在的定时器
    clearTypingTimer()

    // 重置状态
    typedText.value = ''
    currentIndex = 0
    currentText.value = text

    // 开始打字
    typeText()
  }
})
</script>

<style scoped>
.typed-text { display: inline-block }
.prefix, .suffix {
  font-size: 1.5em;
  margin: 0 0.3em;
  color: var(--color-text);
  opacity: 0.8;
}
.prefix { font-weight: bold }
.suffix { font-style: italic }
.typing-text {
  white-space: nowrap;
  overflow: hidden;
  display: inline-block;
  color: var(--color-text);
  min-height: 1.2em; /* 防止文本变化时高度跳动 */
}
</style>
