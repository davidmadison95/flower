document.addEventListener('DOMContentLoaded', () => {
    // Start the growing sequence
    const startGrowingSequence = () => {
        document.body.classList.remove('not-loaded');
        
        // Get all layers
        const layers = document.querySelectorAll('.flower-layer');
        
        // Add growing sequence to each layer
        layers.forEach((layer, layerIndex) => {
            const flowers = layer.querySelectorAll('.flower');
            
            flowers.forEach((flower, flowerIndex) => {
                // Calculate base delay for more natural timing
                const baseDelay = layerIndex * 0.7 + flowerIndex * 0.4;
                flower.style.setProperty('--delay', `${baseDelay}s`);
                
                // Add delays to individual leaves
                const leaves = flower.querySelectorAll('.flower__leaf');
                leaves.forEach((leaf, leafIndex) => {
                    const leafDelay = 0.1 + (leafIndex * 0.15);
                    leaf.style.setProperty('--leaf-delay', `${leafDelay}s`);
                });
                
                // Add delays to lights
                const lights = flower.querySelectorAll('.flower__light');
                lights.forEach((light, lightIndex) => {
                    const lightDelay = baseDelay + 2 + (lightIndex * 0.2) + (Math.random() * 0.5);
                    light.style.animationDelay = `${lightDelay}s`;
                });

                // Add wind effect after growth
                setTimeout(() => {
                    const stem = flower.querySelector('.flower__line');
                    stem.style.animation = `${stem.style.animation}, wind-effect 4s ease-in-out infinite`;
                }, (baseDelay + 2) * 1000);
            });
        });
    };

    // Start the sequence with initial delay
    setTimeout(startGrowingSequence, 500);

    // Add continuous subtle movement
    setInterval(() => {
        const flowers = document.querySelectorAll('.flower');
        flowers.forEach(flower => {
            const currentRotation = parseFloat(flower.dataset.rotation || 0);
            const newRotation = currentRotation + (Math.random() * 2 - 1);
            flower.style.transform = `${flower.style.transform.split('rotate')[0]} rotate(${newRotation}deg)`;
            flower.dataset.rotation = newRotation;
        });
    }, 3000);

    // Handle window resize
    window.addEventListener('resize', () => {
        const scale = window.innerWidth < 768 ? 0.7 : 1;
        document.querySelector('.flowers').style.transform = `scale(${scale})`;
    });

    // Initial scale check
    if (window.innerWidth < 768) {
        document.querySelector('.flowers').style.transform = 'scale(0.7)';
    }
});
