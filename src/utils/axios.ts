// src/utils/axios.ts
import axios from "axios"

const service = axios.create({
    baseURL: "/",
    timeout: 5000
})

// 请求拦截器：给每个请求后加上时间戳参数
service.interceptors.request.use(
    (config) => {
        if (config.url) {
            const timestamp = new Date().getTime()
            // 判断 url 是否已经带有参数
            if (config.url.includes("?")) {
                config.url += `&t=${timestamp}`
            } else {
                config.url += `?t=${timestamp}`
            }
        }
        return config
    },
    (error) => Promise.reject(error)
)

export default service
