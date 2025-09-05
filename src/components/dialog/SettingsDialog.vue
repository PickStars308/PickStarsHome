<template>
  <transition name="fade">
    <div
        v-if="settings.settingDialogShow"
        class="settings-overlay"
        @click.self="hideSettingsDialog"
    >
      <div class="settings-card">
        <div class="settings-header">
          <h2>⚙️ 设置</h2>
          <button class="close-btn" @click="hideSettingsDialog" aria-label="关闭设置">✕</button>
        </div>

        <div class="settings-content">
          <!-- 右侧设置 -->
          <div class="settings-section">
            <h3 class="section-title">🔤 一言类型</h3>
            <div class="radio-group">
              <label class="radio-label">
                <input
                    type="radio"
                    value="customer"
                    v-model="settings.typeSource"
                    @change="updateTypeSource"
                    class="radio-input"
                />
                <span class="radio-custom"></span>
                <span class="radio-text">自定义文本</span>
              </label>
              <label class="radio-label">
                <input
                    type="radio"
                    value="hitokoto"
                    v-model="settings.typeSource"
                    @change="updateTypeSource"
                    class="radio-input"
                />
                <span class="radio-custom"></span>
                <span class="radio-text">一言API</span>
              </label>
            </div>

            <div class="additional-settings">
              <h3 class="section-title">🎨 外观设置</h3>
              <p class="setting-description">更多个性化选项即将推出</p>
            </div>
          </div>

          <div class="settings-section">
            <h3 class="section-title">📝 更新日志</h3>
            <div class="changelog-container">
              <ul class="changelog-list" v-if="changelog.length">
                <li class="changelog-item" v-for="(log, index) in changelog" :key="index">
                  <span class="version">{{ log.version }}</span>
                  <div class="changes">
                    <span v-for="(change, i) in log.changes" :key="i">
                      {{ change }}
                      <br v-if="i < log.changes.length - 1">
                    </span>
                  </div>
                </li>
              </ul>
              <p class="loading-message" v-else-if="isLoading">加载更新日志中...</p>
              <p class="error-message" v-else>无法加载更新日志</p>
            </div>
          </div>
        </div>

        <div class="settings-footer">
          <button class="confirm-btn" @click="hideSettingsDialog">确认</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts" setup>
import {useSettingsStore} from '@/stores/settings'
import {ref, onMounted} from 'vue'
import axios from 'axios'

const settings = useSettingsStore()
const changelog = ref<any[]>([])
const isLoading = ref(true)

// 加载更新日志
const loadChangelog = async () => {
  try {
    isLoading.value = true
    const response = await axios.get('/assets/json/changelog.json')
    changelog.value = response.data || []
  } catch (error) {
    console.error('加载更新日志失败:', error)
    changelog.value = []
  } finally {
    isLoading.value = false
  }
}

// 组件挂载时加载日志
onMounted(() => {
  loadChangelog()
})

// const showSettingsDialog = () => settings.showSettingsDialog()
const hideSettingsDialog = () => settings.hideSettingsDialog()
const updateTypeSource = () => settings.setTypeSource(settings.typeSource)
</script>

<style lang="scss" scoped>
.settings-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 20px;
}

.loading-message {
  color: #666;
  text-align: center;
  padding: 16px;
  margin: 0;
}

.error-message {
  color: #e74c3c;
  text-align: center;
  padding: 16px;
  margin: 0;
}

.changes {
  color: #555;
  line-height: 1.6;
}

.settings-card {
  width: 100%;
  max-width: 900px; /* 增大最大宽度 */
  max-height: 85vh; /* 限制最大高度为视口的85% */
  background-color: #fff;
  border-radius: 20px;
  padding: 28px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.25);
  animation: fadeIn 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px) scale(0.99);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.settings-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid #f0f0f0;

  h2 {
    font-size: 22px;
    font-weight: 600;
    color: #1a1a1a;
    margin: 0;
  }

  .close-btn {
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    color: #666;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;

    &:hover {
      background-color: #f5f5f5;
      color: #333;
    }
  }
}

.settings-content {
  display: flex;
  gap: 32px;
  flex: 1;
  overflow-y: auto; /* 内容过多时可滚动 */
  padding-right: 8px;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: #f5f5f5;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: #ddd;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #bbb;
  }
}

.settings-section {
  flex: 1;
  min-width: 0; /* 防止内容溢出 */
}

.section-title {
  font-size: 18px;
  font-weight: 500;
  color: #333;
  margin: 0 0 20px 0;
  display: flex;
  align-items: center;
  gap: 8px;
}

/* 更新日志样式 */
.changelog-container {
  background-color: #f9f9f9;
  border-radius: 12px;
  padding: 16px;
}

.changelog-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.changelog-item {
  padding: 12px 0;
  border-bottom: 1px solid #eee;
  display: flex;
  align-items: flex-start;
  flex-direction: column;

  &:last-child {
    border-bottom: none;
  }
}

.version {
  font-weight: 600;
  color: #2c3e50;
  min-width: 60px;
  margin-bottom: 10px;
}

.changes {
  color: #555;
  line-height: 1.5;
}

/* 单选按钮样式 */
.radio-group {
  background-color: #f9f9f9;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 24px;
}

.radio-label {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  border-radius: 8px;
  margin-bottom: 10px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:last-child {
    margin-bottom: 0;
  }

  &:hover {
    background-color: rgba(0, 0, 0, 0.03);
  }
}

.radio-input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.radio-custom {
  position: relative;
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 2px solid #ccc;
  border-radius: 50%;
  margin-right: 12px;
  transition: all 0.2s ease;

  &::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #42b983;
    transform: translate(-50%, -50%) scale(0);
    transition: transform 0.2s ease;
  }
}

.radio-input:checked + .radio-custom {
  border-color: #42b983;

  &::after {
    transform: translate(-50%, -50%) scale(1);
  }
}

.radio-text {
  color: #333;
  font-size: 16px;
}

.additional-settings {
  background-color: #f9f9f9;
  border-radius: 12px;
  padding: 16px;
}

.setting-description {
  color: #777;
  margin: 0;
  padding: 8px 0;
  line-height: 1.5;
}

.settings-footer {
  margin-top: 24px;
  padding-top: 16px;
  border-top: 1px solid #f0f0f0;
  display: flex;
  justify-content: flex-end;
}

.confirm-btn {
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #359e6d;
  }

  &:active {
    background-color: #2d8b5d;
  }
}

/* 响应式调整 */
@media (max-width: 768px) {
  .settings-content {
    flex-direction: column;
    gap: 24px;
  }

  .settings-card {
    padding: 20px;
    max-height: 90vh;
  }

  .section-title {
    font-size: 16px;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
