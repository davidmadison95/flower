// Wait for DOM Content to be loaded
document.addEventListener('DOMContentLoaded', () => {
    // Start the animation after a short delay
    const startAnimation = () => {
        const timer = setTimeout(() => {
            document.body.classList.remove("not-loaded");
            clearTimeout(timer);
        }, 1000);
    };

    // Check if the page is visible
    if (!document.hidden) {
        startAnimation();
    } else {
        // If page is not visible, wait for it to become visible
        document.addEventListener('visibilitychange', () => {
            if (!document.hidden) {
                startAnimation();
            }
        });
    }

    // Cleanup animation on page unload
    window.addEventListener('beforeunload', () => {
        document.body.classList.add("not-loaded");
    });
});
