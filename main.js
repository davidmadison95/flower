document.addEventListener('DOMContentLoaded', () => {
    // Control growing sequence
    const startGrowingSequence = () => {
        document.body.classList.remove('not-loaded');
        
        const layers = document.querySelectorAll('.flower-layer');
        
        // Enhanced growing sequence
        layers.forEach((layer, layerIndex) => {
            const flowers = layer.querySelectorAll('.flower');
            
            flowers.forEach((flower, flowerIndex) => {
                // Natural growth timing
                const baseDelay = layerIndex * 0.8 + flowerIndex * 0.5;
                flower.style.setProperty('--delay', `${baseDelay}s`);
                
                // Staggered leaf growth
                const leaves = flower.querySelectorAll('.flower__leaf');
                leaves.forEach((leaf, leafIndex) => {
                    // More organic timing for leaves
                    const leafDelay = 0.2 + (leafIndex * 0.2) + (Math.random() * 0.3);
                    leaf.style.setProperty('--leaf-delay', `${leafDelay}s`);
                });

                // Randomized light timing
                const lights = flower.querySelectorAll('.flower__light');
                lights.forEach((light, lightIndex) => {
                    const lightDelay = baseDelay + 2 + (lightIndex * 0.3) + (Math.random() * 0.5);
                    light.style.animationDelay = `${lightDelay}s`;
                });

                // Add wind effect after initial growth
                setTimeout(() => {
                    const stem = flower.querySelector('.flower__line');
                    if (stem) {
                        stem.style.animation += ', wind-effect 4s ease-in-out infinite';
                    }
                }, (baseDelay + 2) * 1000);
            });
        });

        // Start additional animations after initial growth
        setTimeout(addDynamicMovement, 3000);
        setTimeout(startWindSimulation, 4000);
    };

    // Dynamic movement function
    const addDynamicMovement = () => {
        const flowers = document.querySelectorAll('.flower');
        let timeOffset = 0;

        flowers.forEach((flower) => {
            // Create unique movement pattern for each flower
            const moveFlower = () => {
                const randomX = (Math.random() - 0.5) * 2;
                const randomY = (Math.random() - 0.5) * 2;
                const randomRotate = (Math.random() - 0.5) * 3;
                const duration = 2000 + (Math.random() * 1000);

                flower.style.transition = `transform ${duration}ms ease-in-out`;
                const currentTransform = flower.style.transform.replace(/translate\([^)]*\)|rotate\([^)]*\)/g, '').trim();
                flower.style.transform = `${currentTransform} translate(${randomX}px, ${randomY}px) rotate(${randomRotate}deg)`;

                // Reset position gradually
                setTimeout(() => {
                    flower.style.transform = currentTransform;
                }, duration / 2);
            };

            // Start movement with offset
            setTimeout(() => {
                moveFlower();
                // Continue movement every 4 seconds
                setInterval(moveFlower, 4000);
            }, timeOffset);

            timeOffset += 500; // Stagger the movement of each flower
        });
    };

    // Wind simulation
    const startWindSimulation = () => {
        const simulateWind = () => {
            const windStrength = Math.random() * 3;
            const windDuration = 2000 + (Math.random() * 3000);
            
            document.querySelectorAll('.flower__line').forEach((stem, index) => {
                // Add slight delay for each stem
                setTimeout(() => {
                    stem.style.transition = `transform ${windDuration}ms ease-in-out`;
                    stem.style.transform = `rotate(${windStrength}deg)`;
                    
                    // Return to original position
                    setTimeout(() => {
                        stem.style.transform = 'rotate(0deg)';
                    }, windDuration);
                }, index * 100);
            });

            // Affect petals as well
            document.querySelectorAll('.flower__leafs').forEach((petals, index) => {
                setTimeout(() => {
                    petals.style.transition = `transform ${windDuration}ms ease-in-out`;
                    petals.style.transform = `rotate(${windStrength * 0.5}deg)`;
                    
                    setTimeout(() => {
                        petals.style.transform = 'rotate(0deg)';
                    }, windDuration);
                }, index * 100);
            });
        };

        // Initial wind effect
        simulateWind();
        // Continue wind simulation
        setInterval(simulateWind, 5000);
    };

    // Handle window resize
    const handleResize = () => {
        const scale = window.innerWidth < 768 ? 0.7 : 1;
        document.querySelector('.flowers').style.transform = `scale(${scale})`;
    };

    // Add event listeners
    window.addEventListener('resize', handleResize);

    // Initialize
    handleResize(); // Initial size check
    setTimeout(startGrowingSequence, 500); // Start the animation sequence

    // Optional: Add cleanup on page unload
    window.addEventListener('beforeunload', () => {
        document.body.classList.add('not-loaded');
    });

    // Add touch interaction (optional)
    document.addEventListener('touchstart', (e) => {
        const touch = e.touches[0];
        const flowers = document.querySelectorAll('.flower');
        flowers.forEach(flower => {
            const rect = flower.getBoundingClientRect();
            const distance = Math.hypot(
                touch.clientX - (rect.x + rect.width/2),
                touch.clientY - (rect.y + rect.height/2)
            );
            if (distance < 100) {
                flower.style.transform = flower.style.transform + ' scale(1.1)';
                setTimeout(() => {
                    flower.style.transform = flower.style.transform.replace(' scale(1.1)', '');
                }, 500);
            }
        });
    });
});
