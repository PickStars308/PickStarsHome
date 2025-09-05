/**
 * 页面全局平滑滚动控制器
 * 使整个页面的所有滚动行为（鼠标滚轮、触摸、键盘）都具有平滑效果
 */
export class SmoothScroll {
    // 滚动动画的持续时间（毫秒）
    private duration: number;

    // 缓动函数
    private easingFunction: (t: number) => number;

    // 用于跟踪滚动动画状态
    private isAnimating: boolean = false;

    // 滚动动画的请求ID
    private animationId: number | null = null;

    // 滚动速度因子（控制滚动灵敏度）
    private scrollSpeed: number;

    constructor(duration: number = 400, scrollSpeed: number = 1.2) {
        this.duration = duration;
        this.scrollSpeed = scrollSpeed;
        this.easingFunction = this.easeOutQuad;

        // 绑定事件处理函数的上下文
        this.handleWheel = this.handleWheel.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleTouch = this.handleTouch.bind(this);

        // 初始化事件监听
        this.initEventListeners();
    }

    /**
     * 缓动函数 - 使滚动更自然
     */
    private easeOutQuad(t: number): number {
        return t * (2 - t);
    }

    /**
     * 平滑滚动到指定位置
     */
    private scrollTo(targetY: number): void {
        // 如果正在动画中，先取消上一个动画
        if (this.isAnimating && this.animationId) {
            cancelAnimationFrame(this.animationId);
        }

        const startY = window.pageYOffset;
        const distance = targetY - startY;
        const startTime = performance.now();
        this.isAnimating = true;

        const scrollAnimation = (currentTime: number) => {
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / this.duration, 1);
            const easedProgress = this.easingFunction(progress);
            const currentY = startY + distance * easedProgress;

            window.scrollTo(0, currentY);

            // 检查动画是否完成
            if (progress < 1) {
                this.animationId = requestAnimationFrame(scrollAnimation);
            } else {
                this.isAnimating = false;
                this.animationId = null;
            }
        };

        this.animationId = requestAnimationFrame(scrollAnimation);
    }

    /**
     * 处理鼠标滚轮事件
     */
    private handleWheel(e: WheelEvent): void {
        // 阻止默认滚动行为
        e.preventDefault();

        // 计算滚动距离（考虑滚轮方向和速度）
        const delta = e.deltaY * this.scrollSpeed;
        const targetY = window.pageYOffset + delta;

        // 确保滚动位置在有效范围内
        const maxY = document.documentElement.scrollHeight - window.innerHeight;
        const clampedY = Math.max(0, Math.min(targetY, maxY));

        this.scrollTo(clampedY);
    }

    /**
     * 处理键盘事件（方向键、PageUp/PageDown等）
     */
    private handleKeyDown(e: KeyboardEvent): void {
        const viewportHeight = window.innerHeight;
        let targetY: number | null = null;

        // 根据按下的键计算目标位置
        switch(e.key) {
            case 'ArrowUp':
                targetY = window.pageYOffset - 50; // 向上滚动50px
                break;
            case 'ArrowDown':
                targetY = window.pageYOffset + 50; // 向下滚动50px
                break;
            case 'PageUp':
                targetY = window.pageYOffset - viewportHeight * 0.8; // 向上滚动80%视口高度
                break;
            case 'PageDown':
                targetY = window.pageYOffset + viewportHeight * 0.8; // 向下滚动80%视口高度
                break;
            case 'Home':
                targetY = 0; // 滚动到顶部
                break;
            case 'End':
                targetY = document.documentElement.scrollHeight - viewportHeight; // 滚动到底部
                break;
            default:
                return; // 不处理其他键
        }

        // 如果计算了目标位置，则阻止默认行为并执行平滑滚动
        if (targetY !== null) {
            e.preventDefault();
            const maxY = document.documentElement.scrollHeight - window.innerHeight;
            const clampedY = Math.max(0, Math.min(targetY, maxY));
            this.scrollTo(clampedY);
        }
    }

    /**
     * 处理触摸滑动事件（移动设备）
     */
    private handleTouch(e: TouchEvent): void {
        // 简单的触摸滑动处理
        let startY: number;
        let startScrollY: number;

        const handleTouchStart = (e: TouchEvent) => {
            startY = e.touches[0].clientY;
            startScrollY = window.pageYOffset;
        };

        const handleTouchMove = (e: TouchEvent) => {
            if (!startY) return;

            e.preventDefault();
            const currentY = e.touches[0].clientY;
            const diff = startY - currentY;

            // 计算目标滚动位置
            const targetY = startScrollY + diff * this.scrollSpeed;
            const maxY = document.documentElement.scrollHeight - window.innerHeight;
            const clampedY = Math.max(0, Math.min(targetY, maxY));

            // 直接设置位置而不使用动画，因为触摸滑动应该是实时的
            window.scrollTo(0, clampedY);
        };

        const handleTouchEnd = () => {
            startY = 0;
        };

        // 根据事件类型绑定相应的处理函数
        if (e.type === 'touchstart') {
            handleTouchStart(e);
        } else if (e.type === 'touchmove') {
            handleTouchMove(e);
        } else if (e.type === 'touchend') {
            handleTouchEnd();
        }
    }

    /**
     * 初始化事件监听器
     */
    private initEventListeners(): void {
        // 监听鼠标滚轮事件
        window.addEventListener('wheel', this.handleWheel, { passive: false });

        // 监听键盘事件
        window.addEventListener('keydown', this.handleKeyDown);

        // 监听触摸事件
        window.addEventListener('touchstart', this.handleTouch, { passive: false });
        window.addEventListener('touchmove', this.handleTouch, { passive: false });
        window.addEventListener('touchend', this.handleTouch);

        // 处理锚点链接
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = anchor.getAttribute('href')?.substring(1);

                if (targetId) {
                    const element = document.getElementById(targetId);
                    if (element) {
                        const targetY = element.getBoundingClientRect().top + window.pageYOffset;
                        this.scrollTo(targetY);
                    }
                } else {
                    this.scrollTo(0); // 如果是#，滚动到顶部
                }
            });
        });
    }

    /**
     * 销毁实例，移除事件监听
     */
    destroy(): void {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }

        window.removeEventListener('wheel', this.handleWheel);
        window.removeEventListener('keydown', this.handleKeyDown);
        window.removeEventListener('touchstart', this.handleTouch);
        window.removeEventListener('touchmove', this.handleTouch);
        window.removeEventListener('touchend', this.handleTouch);
    }
}
