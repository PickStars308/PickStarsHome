import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path' // 引入path模块
import {VitePWA} from 'vite-plugin-pwa'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        AutoImport({
            resolvers: [ElementPlusResolver()],
        }),
        // 自动导入 Element Plus 组件
        Components({
            resolvers: [ElementPlusResolver()],
        }),
        // 配置PWA插件
        VitePWA({
            // 开发环境是否启用（默认false，避免开发时缓存问题）
            devOptions: {
                enabled: false
            },
            // 生成service worker
            registerType: 'autoUpdate', // 自动更新service worker
            workbox: {
                // 缓存策略配置
                globPatterns: ['**/*.{js,css,html,png,jpg,jpeg,svg,gif,webp}'], // 需要缓存的文件类型
                maximumFileSizeToCacheInBytes: 5 * 1024 * 1024, // 最大缓存文件大小（5MB）
            },
            // 应用清单配置（PWA的核心配置）
            manifest: {
                name: '摘星辰的小窝', // 应用名称
                short_name: '星辰小窝', // 短名称（桌面图标显示）
                description: '摘星辰的个人小站', // 应用描述
                theme_color: '#1e3a8a', // 主题色（浏览器地址栏等）
                background_color: '#f9fafb', // 背景色（启动屏）
                display: 'standalone', // 显示模式（独立应用模式，类似原生App）
                scope: '/', // 作用域
                start_url: '/', // 启动地址
                // 应用图标（不同尺寸适配不同设备）
                icons: [
                    {
                        src: 'icons/icon-192x192.png',
                        sizes: '192x192',
                        type: 'image/png'
                    },
                    {
                        src: 'icons/icon-512x512.png',
                        sizes: '512x512',
                        type: 'image/png'
                    },
                    {
                        src: 'icons/icon-512x512.png',
                        sizes: '512x512',
                        type: 'image/png',
                        purpose: 'any maskable' // 适配安卓面具图标
                    }
                ]
            }
        })
    ],
    resolve: {
        alias: {
            // 配置@指向src目录
            '@': path.resolve(__dirname, './src')
        }
    },
    css: {
        preprocessorOptions: {
            scss: {
                // 引入全局变量文件（支持多个）
                additionalData: `@use "@/styles/variables.scss";`
            }
        }
    }
})
