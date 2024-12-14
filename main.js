document.addEventListener('DOMContentLoaded', () => {
    // Start the growing animation
    setTimeout(() => {
        document.body.classList.remove('not-loaded');
        
        // Get flower elements
        const flower = document.querySelector('.flower');
        const blooms = document.querySelectorAll('.bloom');
        const lights = document.querySelectorAll('.light');
        
        // Add growing animation
        flower.style.opacity = '0';
        flower.style.animation = 'growFlower 2s ease-out forwards';
        
        // Add staggered bloom animations
        blooms.forEach((bloom, index) => {
            bloom.style.animation = `fadeIn 1s ease-out ${index * 0.3 + 1}s forwards`;
        });
        
        // Add random light animations
        lights.forEach((light, index) => {
            const randomDelay = Math.random() * 2;
            light.style.animationDelay = `${randomDelay}s`;
        });

        // Add subtle continuous movement
        addSubtleMovement();
    }, 500);

    // Function to add subtle continuous movement
    const addSubtleMovement = () => {
        const flower = document.querySelector('.flower');
        let angle = 0;
        
        // Create smooth swaying motion
        setInterval(() => {
            angle += 0.05;
            const sway = Math.sin(angle) * 2;
            flower.style.transform = `rotate(${sway}deg)`;
        }, 50);
        
        // Add random light particle effects
        setInterval(createLightParticle, 2000);
    };

    // Function to create floating light particles
    const createLightParticle = () => {
        const bloom = document.querySelector('.bloom--top');
        const particle = document.createElement('div');
        particle.className = 'light';
        
        // Random position around the top bloom
        const randomX = (Math.random() - 0.5) * 20;
        particle.style.left = `${randomX}px`;
        particle.style.animation = 'floatLight 3s ease-out forwards';
        
        bloom.appendChild(particle);
        
        // Remove particle after animation
        setTimeout(() => {
            particle.remove();
        }, 3000);
    };

    // Handle window resize
    window.addEventListener('resize', () => {
        const scale = window.innerWidth < 768 ? 
            (window.innerWidth < 480 ? 0.6 : 0.8) : 1;
        document.querySelector('.flower').style.transform = `scale(${scale})`;
    });

    // Optional: Add interaction on hover/touch
    document.querySelector('.flower').addEventListener('mouseover', () => {
        const blooms = document.querySelectorAll('.bloom');
        blooms.forEach(bloom => {
            bloom.style.transform = `${bloom.style.transform} scale(1.1)`;
            setTimeout(() => {
                bloom.style.transform = bloom.style.transform.replace(' scale(1.1)', '');
            }, 500);
        });
    });

    // Initial scale check
    if (window.innerWidth < 768) {
        const scale = window.innerWidth < 480 ? 0.6 : 0.8;
        document.querySelector('.flower').style.transform = `scale(${scale})`;
    }
});
