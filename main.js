document.addEventListener('DOMContentLoaded', () => {
    // Start the animation sequence
    const startAnimation = () => {
        document.body.classList.remove('not-loaded');
        
        // Get all flowers
        const flowers = document.querySelectorAll('.flower');
        
        // Add growing animations with delays
        flowers.forEach((flower, index) => {
            const delay = index * 0.3;
            flower.style.animationDelay = `${delay}s`;
            
            // Get flower parts
            const leafs = flower.querySelectorAll('.flower__leaf');
            const lights = flower.querySelectorAll('.flower__light');
            const line = flower.querySelector('.flower__line');
            
            // Animate flower parts
            leafs.forEach((leaf, leafIndex) => {
                leaf.style.animationDelay = `${delay + 1 + (leafIndex * 0.1)}s`;
                leaf.style.opacity = '0';
                leaf.style.animation = `blooming 1.5s ease-out forwards ${delay + 1 + (leafIndex * 0.1)}s`;
            });
            
            // Add random delays to lights
            lights.forEach(light => {
                const randomDelay = Math.random() * 2 + delay;
                light.style.animationDelay = `${randomDelay}s`;
            });
            
            // Stem growth
            if (line) {
                line.style.animationDelay = `${delay}s`;
            }
        });
        
        // Start continuous animations
        setTimeout(addContinuousAnimations, 3000);
    };
    
    // Add continuous animations and movement
    const addContinuousAnimations = () => {
        const flowers = document.querySelectorAll('.flower');
        
        flowers.forEach((flower, index) => {
            // Add subtle swaying
            flower.style.transition = 'transform 2s ease-in-out';
            
            setInterval(() => {
                const randomAngle = Math.sin(Date.now() * 0.001 + index) * 2;
                flower.style.transform = `rotate(${randomAngle}deg)`;
            }, 50);
            
            // Add light particle effects
            const lights = flower.querySelectorAll('.flower__light');
            lights.forEach(light => {
                setInterval(() => {
                    const currentDelay = parseFloat(light.style.animationDelay) || 0;
                    const newDelay = (currentDelay + Math.random() * 2) % 4;
                    light.style.animationDelay = `${newDelay}s`;
                }, 4000);
            });
        });
    };
    
    // Handle window resize
    const handleResize = () => {
        const scale = window.innerWidth < 768 ? 
            (window.innerWidth < 480 ? 0.5 : 0.7) : 1;
            
        document.querySelectorAll('.flower').forEach(flower => {
            const baseScale = flower.classList.contains('flower--2') ? 0.9 :
                            flower.classList.contains('flower--3') ? 0.8 : 1;
            flower.style.transform = `scale(${baseScale * scale})`;
        });
    };
    
    // Add interaction effects
    const addInteraction = () => {
        const flowers = document.querySelectorAll('.flower');
        
        flowers.forEach(flower => {
            flower.addEventListener('mouseover', () => {
                const lights = flower.querySelectorAll('.flower__light');
                lights.forEach(light => {
                    light.style.animationDuration = '2s';
                    setTimeout(() => {
                        light.style.animationDuration = '4s';
                    }, 2000);
                });
            });
        });
    };
    
    // Initialize everything
    const init = () => {
        handleResize();
        window.addEventListener('resize', handleResize);
        startAnimation();
        addInteraction();
    };
    
    // Start with a small delay to ensure everything is loaded
    setTimeout(init, 100);
});
