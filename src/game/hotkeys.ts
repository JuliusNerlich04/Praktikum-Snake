export type HotkeysOptions = {
    isModalOpen: () => boolean;
    isRunning: () => boolean;
    isPaused: () => boolean;
    isGameOver: () => boolean;

    onTogglePause: () => void;
    onStartOrRestart: () => void;
};

export function attachGameHotkeys(opts: HotkeysOptions) {
    const onKeyDown = (event: KeyboardEvent): void => {
        const target = event.target as HTMLElement | null;
        if(target?.closest?.('[data-modal="name"]')) return;
        console.log("keydown:", event.code, event.key);
        if (opts.isModalOpen()) return;

        if (event.code === "Space") {
            event.preventDefault();

            if (opts.isGameOver()) return;

            opts.onTogglePause();
            return;
        }

        if (event.key === "Enter") {
            if (opts.isRunning()) return;
            event.preventDefault();

            if (opts.isPaused() && !opts.isRunning()) {
                opts.onTogglePause()
                return;
            }
        opts.onStartOrRestart();
        }
    }
    window.addEventListener("keydown", onKeyDown, {passive: false});

    return () => {
        window.removeEventListener("keydown", onKeyDown);
    }
}