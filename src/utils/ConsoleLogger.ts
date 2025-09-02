/**
 * 自定义控制台日志工具类
 * 提供结构化、带样式、彩色、分级等多种日志输出方式
 */
export class ConsoleLogger {
    // 日志开关（可在生产环境关闭日志）
    private static enabled = true;

    // 默认样式
    private static DEFAULT_STYLE = "font-size: 12px; color: #50b16e;";

    /**
     * 全局开关：启用/禁用日志输出
     */
    static setEnabled(status: boolean) {
        this.enabled = status;
    }

    /**
     * 输出基础日志
     */
    static log(
        title: string,
        content: string,
        titleStyle = this.DEFAULT_STYLE,
        contentStyle = this.DEFAULT_STYLE
    ): void {
        if (!this.enabled) return;
        console.log(`%c${title}\n%c${content}`, titleStyle, contentStyle);
    }

    /**
     * 输出带图标的日志
     */
    static logWithIcon(
        icon: string,
        title: string,
        content: string,
        iconStyle = this.DEFAULT_STYLE,
        titleStyle = this.DEFAULT_STYLE,
        contentStyle = this.DEFAULT_STYLE
    ): void {
        if (!this.enabled) return;
        console.log(`%c${icon}\n%c${title}\n%c${content}`, iconStyle, titleStyle, contentStyle);
    }

    /**
     * 结构化数据输出（支持嵌套对象）
     */
    static logStructured(
        data: Record<string, any>,
        label = "Structured Log",
        labelStyle = this.DEFAULT_STYLE
    ): void {
        if (!this.enabled) return;
        console.groupCollapsed(`%c${label}`, labelStyle);
        for (const [key, value] of Object.entries(data)) {
            if (typeof value === "object" && value !== null) {
                console.group(`${key}`);
                console.table(value);
                console.groupEnd();
            } else {
                console.log(`%c${key}:`, "font-weight: bold;", value);
            }
        }
        console.groupEnd();
    }

    /**
     * 彩色输出（多段）
     */
    static logColored(messages: string[], styles: string[]): void {
        if (!this.enabled) return;
        const formattedMessages = messages.map((msg) => `%c${msg}`).join("");
        console.log(formattedMessages, ...styles);
    }

    /**
     * 日志级别输出
     */
    static info(message: string): void {
        if (!this.enabled) return;
        console.info(`%c[INFO] ${message}`, "color: #2196f3; font-weight: bold;");
    }

    static warn(message: string): void {
        if (!this.enabled) return;
        console.warn(`%c[WARN] ${message}`, "color: #ff9800; font-weight: bold;");
    }

    static error(message: string): void {
        if (!this.enabled) return;
        console.error(`%c[ERROR] ${message}`, "color: #f44336; font-weight: bold;");
    }

    /**
     * 智能判断数据类型自动输出
     */
    static smart(label: string, data: any, style = this.DEFAULT_STYLE): void {
        if (!this.enabled) return;
        console.groupCollapsed(`%c${label}`, style);
        if (typeof data === "object" && data !== null) {
            console.table(data);
        } else {
            console.log(data);
        }
        console.groupEnd();
    }
}
