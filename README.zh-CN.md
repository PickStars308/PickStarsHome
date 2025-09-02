# 摘星辰的小窝 🌟

## Language
[English](README.md) | 简体中文

## 简介

摘星辰的小窝 是一个基于 Vue 3、TypeScript 和 Pinia 的个人主页模板，拥有现代化的响应式设计和炫酷动画效果。

## 预览

![Mobile](/Preview/Screenshot_20250902_174909.jpeg "Mobile" )
![PC](/Preview/Screenshot_20250902_180526.png "PC")


### 功能特性
- 动态打字效果：支持自定义文本和 Hitokoto 随机语录
- 社交链接：GitHub、QQ、邮箱等
- 卡片布局：桌面端横向卡片显示，移动端面包菜单切换卡片页面，每行两张
- 主题切换：系统 / 暗色 / 亮色模式循环切换
- 响应式设计：桌面端和移动端自适应
- 动画效果：WOW.js + Animate.css 支持卡片渐入动画

### 技术栈
- Vue 3 + TypeScript
- Pinia（状态管理）
- Animate.css + WOW.js（动画效果）
- Vite（构建工具）
- Element Plus（可选 UI 组件）
- Axios（网络请求）
- FontAwesome（图标）

### 安装与使用

```bash
# 克隆仓库
git clone https://github.com/PickStars308/pickstarshome.git
cd pickstarshome

# 安装依赖
npm install

# 开发模式
npm run dev

# 构建生产版本
npm run build

# 预览生产版本
npm run preview
````

### 项目结构

```
src/
├─ assets/          # 图片、JSON 数据等资源
├─ components/      # Vue 组件
├─ stores/          # Pinia 状态管理
├─ views/           # 页面视图
├─ App.vue          # 根组件
└─ main.ts          # 入口文件
```

### 自定义配置

* 站点信息：`VITE_SITE_NAME`、`VITE_SITE_Briefly`、`VITE_SITE_AVATAR`

### 贡献

欢迎提交 PR 或 issues，一起完善项目！

### License

[MIT](LICENSE)
