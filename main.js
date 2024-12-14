document.addEventListener('DOMContentLoaded', () => {
    // Initial delay before starting animations
    setTimeout(() => {
        document.body.classList.remove('not-loaded');
    }, 1000);

    // Get all layers
    const layers = document.querySelectorAll('.flower-layer');
    
    // Add staggered animations to each layer
    layers.forEach((layer, layerIndex) => {
        const flowers = layer.querySelectorAll('.flower');
        
        // Add animation delays to flowers within each layer
        flowers.forEach((flower, flowerIndex) => {
            // Stagger the animations
            flower.style.animationDelay = `${(layerIndex * 0.3) + (flowerIndex * 0.2)}s`;
            
            // Add random delays to lights
            const lights = flower.querySelectorAll('.flower__light');
            lights.forEach(light => {
                light.style.animationDelay = `${Math.random() * 3}s`;
            });
        });
    });

    // Optional: Add resize handler for responsiveness
    window.addEventListener('resize', () => {
        // Adjust scale based on window width
        const scale = window.innerWidth < 768 ? 0.7 : 1;
        document.querySelector('.flowers').style.transform = `scale(${scale})`;
    });

    // Initial scale check
    if (window.innerWidth < 768) {
        document.querySelector('.flowers').style.transform = 'scale(0.7)';
    }
});
