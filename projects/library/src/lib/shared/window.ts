export class Window {
    windowHeight = 0;
    windowWidth = 0;

    get windowWidthSmall(): boolean {
        return this.windowWidth < 1200;
    }

    get windowWidthMedium(): boolean {
        return !this.windowWidthSmall && this.windowWidth < 1300;
    }

    get windowWidthLarge(): boolean {
        return this.windowWidth >= 1300;
    }
}

export class WindowResize {
    windowHeight = 0;
    windowWidth = 0;
}
