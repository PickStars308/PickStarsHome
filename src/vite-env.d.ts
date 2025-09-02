/// <reference types="vite/client" />

declare module '*.vue' {
    import type { DefineComponent } from 'vue'
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
    const component: DefineComponent<{}, {}, any>
    export default component
}

// 添加 PWA 虚拟模块声明
declare module 'virtual:pwa-register' {
    import type { RegisterSWOptions } from 'vite-plugin-pwa/types'

    export function registerSW(options?: RegisterSWOptions): (reloadPage?: boolean) => Promise<void>
}

// 扩展环境变量类型（与.env配置同步）
interface ImportMetaEnv {
    // 默认配置
    readonly VITE_PICKSTARS_VERSION: string;

    // 网站配置
    readonly VITE_SITE_Briefly: string;
    readonly VITE_SITE_TITLE: string;
    readonly VITE_SITE_KEYWORDS: string;
    readonly VITE_SITE_DES: string;
    readonly VITE_SITE_AUTHOR: string;

    // ICP配置
    readonly VITE_SITE_ICP: string;
    readonly VITE_SITE_ICP_URL: string;

    // 版权配置
    readonly VITE_SITE_COPYRIGHT: string;
    readonly VITE_SITE_COPYRIGHT_URL: string;

    // 头像配置
    readonly VITE_SITE_AVATAR: string;
    readonly VITE_AVATAR_SIZE: string;

    // 维护配置
    readonly VITE_SITE_MAINTAIN: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
