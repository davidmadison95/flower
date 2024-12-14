document.addEventListener('DOMContentLoaded', () => {
    // Add a small delay for initial load
    setTimeout(() => {
        document.body.classList.remove('not-loaded');
    }, 1000);

    // Get all flowers
    const flowers = document.querySelectorAll('.flower');

    // Add staggered animation delays to flowers
    flowers.forEach((flower, index) => {
        flower.style.animationDelay = `${index * 0.3}s`;
    });

    // Add random light twinkle effect
    const lights = document.querySelectorAll('.flower__light');
    lights.forEach(light => {
        // Random delay for each light
        const randomDelay = Math.random() * 3; // Random delay up to 3 seconds
        light.style.animationDelay = `${randomDelay}s`;
    });
});

// Optional: Add resize handler for responsiveness
window.addEventListener('resize', () => {
    const flowers = document.querySelectorAll('.flower');
    flowers.forEach(flower => {
        flower.style.transform = flower.style.transform.replace(/scale\([^)]*\)/, `scale(${window.innerWidth > 768 ? 1 : 0.7})`);
    });
});
