// Enhanced Neural Network System State
let neuralState = {
    unlockedNodes: [],
    totalNodes: 5,
    currentCenteredNode: null,
    isAnimating: false
};

// Testimonial State
let testimonialState = {
    currentSlide: 0,
    totalSlides: 3,
    isTransitioning: false
};

// Advanced cursor system
const cursor = document.querySelector('.cursor');
const cursorTrail = document.querySelector('.cursor-trail');
const codeSymbols = ['{ }', '[ ]', '( )', '< >', '&& ', '|| ', '++', '--', '=>', '==', '!=', '+=', '/*', '*/', '//', '...'];
let symbolIndex = 0;

document.addEventListener('mousemove', (e) => {
    if (cursor) {
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
    }
    
    // Enhanced trail effect
    if (cursorTrail && Math.random() > 0.88) {
        cursorTrail.textContent = codeSymbols[symbolIndex % codeSymbols.length];
        cursorTrail.style.left = e.clientX + (Math.random() - 0.5) * 40 + 'px';
        cursorTrail.style.top = e.clientY + (Math.random() - 0.5) * 40 + 'px';
        cursorTrail.style.opacity = '1';
        
        setTimeout(() => {
            cursorTrail.style.opacity = '0';
        }, 600);
        
        symbolIndex++;
    }
});

// Enhanced Neural Network System with Lock/Unlock Animation
function setupEnhancedNeuralSystem() {
    const neuralNodes = document.querySelectorAll('.neural-node');
    const progressFill = document.querySelector('.progress-fill');
    const progressText = document.querySelector('.progress-text');

    // Generate matrix rain effect
    generateMatrixRain();

    neuralNodes.forEach((node) => {
        const step = parseInt(node.getAttribute('data-step'));
        
        // Click handler for unlock and center
        node.addEventListener('click', function() {
            if (neuralState.isAnimating) return;
            
            if (!neuralState.unlockedNodes.includes(step)) {
                unlockNeuralNode(step);
            } else if (neuralState.currentCenteredNode === step) {
                uncenterNeuralNode(step);
            } else {
                centerNeuralNode(step);
            }
        });
    });

    function unlockNeuralNode(step) {
        if (neuralState.unlockedNodes.includes(step) || neuralState.isAnimating) return;
        
        neuralState.isAnimating = true;
        neuralState.unlockedNodes.push(step);
        
        const node = document.querySelector(`.neural-node[data-step="${step}"]`);
        const nodeLock = node.querySelector('.node-lock');
        const nodeCircle = node.querySelector('.node-circle');
        const matrixOverlay = node.querySelector('.matrix-overlay');
        const lockIcon = node.querySelector('.lock-matrix i');
        
        // Start matrix decryption animation
        node.classList.add('unlocking');
        
        // Matrix decryption effect
        startMatrixDecryption(nodeLock, matrixOverlay, lockIcon);
        
        setTimeout(() => {
            // Hide lock and show circle
            nodeLock.style.display = 'none';
            nodeCircle.style.opacity = '1';
            node.classList.remove('locked', 'unlocking');
            node.classList.add('unlocked');
            
            // Create unlock particles
            createUnlockParticles(node);
            
            // Center for 3-4 seconds then compress back
            centerNeuralNode(step);
            
            setTimeout(() => {
                if (neuralState.currentCenteredNode === step) {
                    uncenterNeuralNode(step);
                }
                neuralState.isAnimating = false;
            }, 3500);
            
            // Update progress
            updateNeuralProgress();
            
        }, 1500);
    }

    function centerNeuralNode(step) {
        if (neuralState.currentCenteredNode && neuralState.currentCenteredNode !== step) {
            uncenterNeuralNode(neuralState.currentCenteredNode);
        }

        const node = document.querySelector(`.neural-node[data-step="${step}"]`);
        const otherNodes = document.querySelectorAll(`.neural-node:not([data-step="${step}"])`);
        const neuralHub = document.querySelector('.neural-hub');
        
        // Center the node with proper positioning
        node.classList.add('centered');
        neuralState.currentCenteredNode = step;
        
        // Ensure the centered node is properly positioned on screen
        setTimeout(() => {
            const container = document.querySelector('.neural-container');
            const containerRect = container.getBoundingClientRect();
            const nodeRect = node.getBoundingClientRect();
            
            // Check if node is properly centered and visible
            const isProperlyPositioned = 
                nodeRect.left >= containerRect.left && 
                nodeRect.right <= containerRect.right &&
                nodeRect.top >= containerRect.top && 
                nodeRect.bottom <= containerRect.bottom;
            
            if (!isProperlyPositioned) {
                // Scroll into view if needed
                node.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'center', 
                    inline: 'center' 
                });
            }
        }, 100);
        
        // Blur other elements
        otherNodes.forEach(otherNode => {
            otherNode.style.opacity = '0.3';
            otherNode.style.filter = 'blur(3px)';
        });
        
        if (neuralHub) {
            neuralHub.style.opacity = '0.3';
            neuralHub.style.filter = 'blur(3px)';
        }
    }

    function uncenterNeuralNode(step) {
        const node = document.querySelector(`.neural-node[data-step="${step}"]`);
        const otherNodes = document.querySelectorAll(`.neural-node:not([data-step="${step}"])`);
        const neuralHub = document.querySelector('.neural-hub');
        
        // Uncenter the node
        node.classList.remove('centered');
        neuralState.currentCenteredNode = null;
        
        // Restore other elements
        otherNodes.forEach(otherNode => {
            otherNode.style.opacity = '1';
            otherNode.style.filter = 'none';
        });
        
        if (neuralHub) {
            neuralHub.style.opacity = '1';
            neuralHub.style.filter = 'none';
        }
    }

    function startMatrixDecryption(lockElement, matrixOverlay, lockIcon) {
        // Create cascading matrix effect
        const matrixChars = ['0', '1', '0', '1', '0', '1'];
        let matrixInterval = setInterval(() => {
            const char = matrixChars[Math.floor(Math.random() * matrixChars.length)];
            const span = document.createElement('span');
            span.textContent = char;
            span.style.position = 'absolute';
            span.style.color = 'var(--matrix-green)';
            span.style.fontSize = '12px';
            span.style.left = Math.random() * 100 + '%';
            span.style.top = Math.random() * 100 + '%';
            span.style.animation = 'matrixFall 1s ease-out forwards';
            
            matrixOverlay.appendChild(span);
            
            setTimeout(() => {
                if (span.parentNode) span.remove();
            }, 1000);
        }, 100);
        
        setTimeout(() => {
            clearInterval(matrixInterval);
            // Lock breaking animation
            lockIcon.style.animation = 'lockShatter 0.5s ease-out forwards';
            matrixOverlay.style.animation = 'matrixDissolve 1.5s ease-out forwards';
        }, 1000);
    }

    function updateNeuralProgress() {
        const percentage = (neuralState.unlockedNodes.length / neuralState.totalNodes) * 100;
        if (progressFill) progressFill.style.width = percentage + '%';
        if (progressText) progressText.textContent = `${neuralState.unlockedNodes.length}/${neuralState.totalNodes} Neural Nodes Activated`;

        if (neuralState.unlockedNodes.length === neuralState.totalNodes) {
            if (progressText) {
                progressText.textContent = '🧠 NEURAL DOMINATION PROTOCOL COMPLETE!';
                progressText.style.color = 'var(--matrix-green)';
            }
            
            // Full brain activation effect
            const brainCore = document.querySelector('.brain-core');
            if (brainCore) {
                brainCore.style.animation = 'brainFullActivation 2s ease-in-out infinite';
            }
        }
    }

    function createUnlockParticles(node) {
        const rect = node.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        for (let i = 0; i < 12; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'fixed';
            particle.style.left = centerX + 'px';
            particle.style.top = centerY + 'px';
            particle.style.width = '4px';
            particle.style.height = '4px';
            particle.style.background = 'var(--matrix-green)';
            particle.style.borderRadius = '50%';
            particle.style.pointerEvents = 'none';
            particle.style.zIndex = '9999';
            particle.style.boxShadow = '0 0 10px var(--matrix-green)';
            
            document.body.appendChild(particle);
            
            const angle = (i / 12) * Math.PI * 2;
            const distance = 100;
            const endX = centerX + Math.cos(angle) * distance;
            const endY = centerY + Math.sin(angle) * distance;
            
            particle.animate([
                { 
                    transform: 'translate(0, 0) scale(1)', 
                    opacity: 1 
                },
                { 
                    transform: `translate(${endX - centerX}px, ${endY - centerY}px) scale(0)`, 
                    opacity: 0 
                }
            ], {
                duration: 1000,
                easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
            }).onfinish = () => {
                particle.remove();
            };
        }
    }
}

// Enhanced Weapon Cache System (Removed Lock/Unlock)
function setupEnhancedWeaponCache() {
    const weaponCards = document.querySelectorAll('.weapon-card');
    
    weaponCards.forEach((card, index) => {
        // Staggered entrance animation
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 200);
        
        // Enhanced hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            
            const weaponIcon = this.querySelector('.weapon-icon');
            if (weaponIcon) {
                weaponIcon.style.transform = 'scale(1.1) rotate(5deg)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            
            const weaponIcon = this.querySelector('.weapon-icon');
            if (weaponIcon) {
                weaponIcon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });
}

// Enhanced Testimonial System
function setupEnhancedTestimonials() {
    const slides = document.querySelectorAll('.testimonial-slide');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    // Initialize first slide
    updateTestimonialDisplay();
    
    // Navigation button handlers
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (!testimonialState.isTransitioning) {
                nextTestimonial();
            }
        });
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (!testimonialState.isTransitioning) {
                prevTestimonial();
            }
        });
    }
    
    // Indicator handlers
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            if (!testimonialState.isTransitioning && index !== testimonialState.currentSlide) {
                goToTestimonial(index);
            }
        });
    });
    
    // Auto-advance
    let autoAdvanceInterval = setInterval(() => {
        if (!testimonialState.isTransitioning) {
            nextTestimonial();
        }
    }, 6000);
    
    // Pause auto-advance on hover
    const testimonialContainer = document.querySelector('.testimonial-container');
    if (testimonialContainer) {
        testimonialContainer.addEventListener('mouseenter', () => {
            clearInterval(autoAdvanceInterval);
        });
        
        testimonialContainer.addEventListener('mouseleave', () => {
            autoAdvanceInterval = setInterval(() => {
                if (!testimonialState.isTransitioning) {
                    nextTestimonial();
                }
            }, 6000);
        });
    }
    
    function nextTestimonial() {
        const nextIndex = (testimonialState.currentSlide + 1) % testimonialState.totalSlides;
        goToTestimonial(nextIndex);
    }
    
    function prevTestimonial() {
        const prevIndex = (testimonialState.currentSlide - 1 + testimonialState.totalSlides) % testimonialState.totalSlides;
        goToTestimonial(prevIndex);
    }
    
    function goToTestimonial(index) {
        if (testimonialState.isTransitioning || index === testimonialState.currentSlide) return;
        
        testimonialState.isTransitioning = true;
        const currentSlide = slides[testimonialState.currentSlide];
        const nextSlide = slides[index];
        
        // Determine slide direction
        const direction = index > testimonialState.currentSlide ? 1 : -1;
        
        // Animate out current slide
        currentSlide.style.transform = `translateX(${-100 * direction}%)`;
        currentSlide.style.opacity = '0';
        
        // Prepare next slide
        nextSlide.style.transform = `translateX(${100 * direction}%)`;
        nextSlide.style.opacity = '0';
        nextSlide.classList.add('active');
        
        // Animate in next slide
        setTimeout(() => {
            nextSlide.style.transform = 'translateX(0)';
            nextSlide.style.opacity = '1';
        }, 50);
        
        // Cleanup
        setTimeout(() => {
            currentSlide.classList.remove('active');
            currentSlide.style.transform = '';
            currentSlide.style.opacity = '';
            
            testimonialState.currentSlide = index;
            testimonialState.isTransitioning = false;
            
            updateTestimonialDisplay();
        }, 800);
    }
    
    function updateTestimonialDisplay() {
        // Update indicators
        indicators.forEach((indicator, index) => {
            if (index === testimonialState.currentSlide) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    }
}

// Floating particles creation
function generateFloatingParticles() {
    const particlesContainer = document.querySelector('.floating-particles');
    if (!particlesContainer) return;
    
    const particleSymbols = [
        'const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'while',
        'class', 'import', 'export', 'async', 'await', '=>', '{}', '[]', '()', 
        'true', 'false', 'null', 'undefined', 'console.log', 'map', 'filter', 'reduce'
    ];

    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.textContent = particleSymbols[Math.floor(Math.random() * particleSymbols.length)];
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 12 + 's';
        particle.style.animationDuration = (8 + Math.random() * 8) + 's';
        particlesContainer.appendChild(particle);
    }
}

function generateMatrixRain() {
    const matrixRain = document.querySelector('.matrix-rain');
    if (!matrixRain) return;
    
    const matrixChars = ['0', '1', 'ア', 'イ', 'ウ', 'エ', 'オ', 'カ', 'キ', 'ク', 'ケ', 'コ'];
    
    for (let i = 0; i < 50; i++) {
        const drop = document.createElement('div');
        drop.style.position = 'absolute';
        drop.style.left = Math.random() * 100 + '%';
        drop.style.animationDelay = Math.random() * 20 + 's';
        drop.style.fontSize = '14px';
        drop.style.color = 'var(--matrix-green)';
        drop.style.opacity = '0.3';
        drop.textContent = matrixChars[Math.floor(Math.random() * matrixChars.length)];
        drop.style.animation = 'matrixDrop 10s linear infinite';
        matrixRain.appendChild(drop);
    }
}

// Battle timer functionality
function initializeBattleTimer() {
    const timer = document.querySelector('.battle-timer');
    if (!timer) return;
    
    let timeRemaining = 167; // 2:47 in seconds

    const updateTimer = () => {
        const minutes = Math.floor(timeRemaining / 60);
        const seconds = timeRemaining % 60;
        const timeString = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        
        timer.textContent = timeString;
        timeRemaining = timeRemaining > 0 ? timeRemaining - 1 : 167;
    };

    setInterval(updateTimer, 1000);
}

// Intersection Observer for scroll animations
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe all animated elements
    document.querySelectorAll('.neural-node, .weapon-card, .testimonial-card').forEach(el => {
        observer.observe(el);
    });
}

// Enhanced button interactions
function setupButtonEffects() {
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('mouseenter', function() {
            if (this.classList.contains('btn-primary')) {
                this.style.filter = 'hue-rotate(15deg) brightness(1.1)';
            }
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.filter = 'none';
        });
    });
}

// Panel hover effects
function setupPanelInteractions() {
    document.querySelectorAll('.code-panel').forEach(panel => {
        panel.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-12px) scale(1.02)';
            this.style.filter = 'brightness(1.05)';
        });
        
        panel.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.filter = 'brightness(1)';
        });
    });
}

// Smooth scrolling for navigation
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Keyboard navigation
function setupKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        // Neural nodes (1-5 keys)
        if (e.key >= '1' && e.key <= '5') {
            const step = parseInt(e.key);
            const node = document.querySelector(`.neural-node[data-step="${step}"]`);
            if (node) {
                node.click();
            }
        }
        
        // Testimonial navigation (arrow keys)
        if (e.key === 'ArrowLeft' && !testimonialState.isTransitioning) {
            const prevBtn = document.querySelector('.prev-btn');
            if (prevBtn) prevBtn.click();
        }
        
        if (e.key === 'ArrowRight' && !testimonialState.isTransitioning) {
            const nextBtn = document.querySelector('.next-btn');
            if (nextBtn) nextBtn.click();
        }
        
        // Escape key to uncenter neural nodes
        if (e.key === 'Escape' && neuralState.currentCenteredNode) {
            const centeredNode = document.querySelector('.neural-node.centered');
            if (centeredNode) {
                centeredNode.click();
            }
        }
    });
}

// Add dynamic CSS animations
function addDynamicAnimations() {
    const style = document.createElement('style');
    style.textContent = `
        .weapon-card {
            opacity: 0;
            transform: translateY(50px);
            transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .weapon-card.visible {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    generateFloatingParticles();
    initializeBattleTimer();
    setupScrollAnimations();
    setupButtonEffects();
    setupPanelInteractions();
    setupSmoothScrolling();
    setupKeyboardNavigation();
    setupEnhancedNeuralSystem();
    setupEnhancedWeaponCache();
    setupEnhancedTestimonials();
    addDynamicAnimations();
    
    console.log('🚀 CodeVersus Enhanced Platform Initialized!');
});

// Initialize after full page load
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Safety fallback for IntersectionObserver
if (!('IntersectionObserver' in window)) {
    document.querySelectorAll('.neural-node, .weapon-card, .testimonial-card')
            .forEach(el => el.classList.add('visible'));
}

// Export functions for external use
window.CodeVersus = {
    // Neural system controls
    unlockNeuralNode: (step) => {
        const node = document.querySelector(`.neural-node[data-step="${step}"]`);
        if (node) node.click();
    },
    
    resetNeuralNetwork: () => {
        neuralState.unlockedNodes = [];
        neuralState.currentCenteredNode = null;
        neuralState.isAnimating = false;
        
        document.querySelectorAll('.neural-node').forEach(node => {
            node.classList.remove('unlocked', 'centered', 'unlocking');
            node.classList.add('locked');
            node.style.opacity = '1';
            node.style.filter = 'none';
            
            const nodeLock = node.querySelector('.node-lock');
            const nodeCircle = node.querySelector('.node-circle');
            
            if (nodeLock) nodeLock.style.display = 'flex';
            if (nodeCircle) nodeCircle.style.opacity = '0';
        });
        
        const progressFill = document.querySelector('.progress-fill');
        const progressText = document.querySelector('.progress-text');
        
        if (progressFill) progressFill.style.width = '0%';
        if (progressText) progressText.textContent = '0/5 Neural Nodes Available';
    },
    
    // Testimonial controls
    goToTestimonial: (index) => {
        if (index >= 0 && index < testimonialState.totalSlides) {
            const indicators = document.querySelectorAll('.indicator');
            if (indicators[index]) indicators[index].click();
        }
    },
    
    // Utility functions
    getSystemState: () => ({
        neural: neuralState,
        testimonials: testimonialState
    })
};
