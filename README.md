# PickStarsHome 🌟

## Language

English | [简体中文](README.zh-CN.md)

## Overview

PickStarsHome is a modern personal homepage template built with Vue 3, TypeScript, and Pinia. It features responsive
layouts and cool animation effects.

## Preview

![Mobile](/Preview/Screenshot_20250902_174909.jpeg "Mobile" )
![PC](/Preview/Screenshot_20250902_180526.png "PC")

### Features

* Typewriter effect: supports custom text or Hitokoto random quotes
* Social links: GitHub, QQ, Email, etc.
* Card layout: horizontal cards on desktop; mobile menu toggle for cards (2 per row)
* Theme switch: cycle through system/dark/light modes
* Responsive design: adapts to desktop and mobile
* Animation: WOW\.js + Animate.css fade-in effect for cards

### Tech Stack

* Vue 3 + TypeScript
* Pinia (state management)
* Animate.css + WOW\.js (animations)
* Vite (build tool)
* Element Plus (optional UI components)
* Axios (HTTP requests)
* FontAwesome (icons)

### Installation & Usage

```bash
# Clone repository
git clone https://github.com/PickStars308/pickstarshome.git
cd pickstarshome

# Install dependencies
npm install

# Development mode
npm run dev

# Build production version
npm run build

# Preview production version
npm run preview
```

### Project Structure

```
src/
├─ assets/          # Images, JSON data, etc.
├─ components/      # Vue components
├─ stores/          # Pinia stores
├─ views/           # Page views
├─ App.vue          # Root component
└─ main.ts          # Entry file
```

### Customization

* Site info: `VITE_SITE_NAME`, `VITE_SITE_Briefly`, `VITE_SITE_AVATAR`

### Contributing

PRs and issues are welcome to improve the project!

### License

[MIT](LICENSE)
