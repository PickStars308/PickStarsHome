declare module 'wow.js' {
    interface WOWOptions {
        boxClass?: string;
        animateClass?: string;
        offset?: number;
        mobile?: boolean;
        live?: boolean;
        callback?: () => void;
        scrollContainer?: HTMLElement | string | null;
    }

    class WOW {
        constructor(options?: WOWOptions);
        init(): void;
    }

    export default WOW;
}
