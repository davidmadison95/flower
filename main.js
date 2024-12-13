document.addEventListener('DOMContentLoaded', () => {
    const timer = setTimeout(() => {
        document.body.classList.remove("not-loaded");
        clearTimeout(timer);
    }, 1000);
});
