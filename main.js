document.addEventListener('DOMContentLoaded', () => {
    // Add a small delay to ensure all elements are loaded
    window.setTimeout(() => {
        document.body.classList.remove('not-loaded');
        console.log('Animation started'); // This will help us debug
    }, 1000);
});
