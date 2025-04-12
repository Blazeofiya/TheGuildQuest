// Main JavaScript file for APS Delray website

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
            
            // Toggle hamburger animation
            const bars = hamburger.querySelectorAll('.bar');
            if (hamburger.classList.contains('active')) {
                bars[0].style.transform = 'translateY(8px) rotate(45deg)';
                bars[1].style.opacity = '0';
                bars[2].style.transform = 'translateY(-8px) rotate(-45deg)';
            } else {
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            }
        });
        
        // Close mobile menu when clicking on a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                
                // Reset hamburger
                const bars = hamburger.querySelectorAll('.bar');
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            });
        });
    }
    
    // One Piece Easter Egg
    const hiddenTreasure = document.querySelector('.hidden-treasure');
    if (hiddenTreasure) {
        hiddenTreasure.addEventListener('click', function() {
            this.classList.add('treasure-found');
            
            // Create and show the treasure message
            const treasureMessage = document.createElement('div');
            treasureMessage.className = 'treasure-message';
            treasureMessage.innerHTML = `
                <div class="treasure-content">
                    <h3>You found the hidden treasure!</h3>
                    <p>"The real treasure was the friends we made along the way."</p>
                    <button class="close-treasure">Close</button>
                </div>
            `;
            treasureMessage.style.position = 'fixed';
            treasureMessage.style.top = '0';
            treasureMessage.style.left = '0';
            treasureMessage.style.width = '100%';
            treasureMessage.style.height = '100%';
            treasureMessage.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
            treasureMessage.style.display = 'flex';
            treasureMessage.style.justifyContent = 'center';
            treasureMessage.style.alignItems = 'center';
            treasureMessage.style.zIndex = '1000';
            
            const treasureContent = treasureMessage.querySelector('.treasure-content');
            treasureContent.style.backgroundColor = '#fff';
            treasureContent.style.padding = '2rem';
            treasureContent.style.borderRadius = '8px';
            treasureContent.style.textAlign = 'center';
            treasureContent.style.maxWidth = '400px';
            
            const closeButton = treasureMessage.querySelector('.close-treasure');
            closeButton.style.marginTop = '1rem';
            closeButton.style.padding = '0.5rem 1rem';
            closeButton.style.backgroundColor = '#e09e50';
            closeButton.style.color = '#fff';
            closeButton.style.border = 'none';
            closeButton.style.borderRadius = '4px';
            closeButton.style.cursor = 'pointer';
            
            document.body.appendChild(treasureMessage);
            
            // Remove animation class after animation completes
            setTimeout(() => {
                this.classList.remove('treasure-found');
            }, 1000);
            
            // Close button functionality
            closeButton.addEventListener('click', function() {
                document.body.removeChild(treasureMessage);
            });
        });
    }
    
    // Animate elements on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.pillar-card, .featured-content, .value-card, .event-card, .post-card, .guild-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenHeight = window.innerHeight;
            
            if (elementPosition < screenHeight * 0.8) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial state for animated elements
    const elementsToAnimate = document.querySelectorAll('.pillar-card, .featured-content, .value-card, .event-card, .post-card, .guild-card');
    elementsToAnimate.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Run animation on load and scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
    
    // Form validation for contact form
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            const formInputs = contactForm.querySelectorAll('input, textarea');
            
            formInputs.forEach(input => {
                if (input.hasAttribute('required') && !input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = 'var(--color-accent)';
                    
                    // Add error message if doesn't exist
                    let errorMsg = input.parentElement.querySelector('.error-message');
                    if (!errorMsg) {
                        errorMsg = document.createElement('div');
                        errorMsg.className = 'error-message';
                        errorMsg.textContent = 'This field is required';
                        errorMsg.style.color = 'var(--color-accent)';
                        errorMsg.style.fontSize = '1.2rem';
                        errorMsg.style.marginTop = '0.5rem';
                        input.parentElement.appendChild(errorMsg);
                    }
                } else {
                    input.style.borderColor = '';
                    const errorMsg = input.parentElement.querySelector('.error-message');
                    if (errorMsg) {
                        input.parentElement.removeChild(errorMsg);
                    }
                }
            });
            
            if (isValid) {
                // Show success message
                const successMsg = document.createElement('div');
                successMsg.className = 'success-message';
                successMsg.textContent = 'Your message has been sent successfully!';
                successMsg.style.color = 'var(--color-secondary)';
                successMsg.style.backgroundColor = 'rgba(106, 141, 115, 0.1)';
                successMsg.style.padding = '1rem';
                successMsg.style.borderRadius = '4px';
                successMsg.style.marginTop = '1rem';
                
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                submitBtn.parentElement.insertBefore(successMsg, submitBtn);
                
                // Clear form
                contactForm.reset();
                
                // Remove success message after 5 seconds
                setTimeout(() => {
                    submitBtn.parentElement.removeChild(successMsg);
                }, 5000);
            }
        });
    }
});