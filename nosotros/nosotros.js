// Nosotros Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for internal links
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Elements to animate
    const animatedElements = document.querySelectorAll(
        '.value-card, .team-member, .mv-card, .story-text, .story-image'
    );

    // Set initial styles and observe elements
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });

    // Staggered animation for values grid
    const valueCards = document.querySelectorAll('.value-card');
    valueCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });

    // Parallax effect for hero section (if supported)
    const heroSection = document.querySelector('.about-hero');
    
    if (heroSection && window.innerWidth > 768) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const parallaxSpeed = 0.5;
            heroSection.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        });
    }

    // Add loading animation to images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        if (!img.complete) {
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.3s ease';
            
            img.addEventListener('load', function() {
                this.style.opacity = '1';
            });
        }
    });

    // Hover effect for team member images
    const teamMembers = document.querySelectorAll('.team-member');
    teamMembers.forEach(member => {
        const memberImage = member.querySelector('.member-image');
        
        member.addEventListener('mouseenter', function() {
            if (memberImage) {
                memberImage.style.transform = 'scale(1.05)';
            }
        });
        
        member.addEventListener('mouseleave', function() {
            if (memberImage) {
                memberImage.style.transform = 'scale(1)';
            }
        });
    });

    // Add subtle animation to section titles
    const sectionTitles = document.querySelectorAll('.section-title');
    
    const titleObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const title = entry.target;
                title.style.opacity = '1';
                title.style.transform = 'translateX(0)';
                
                // Animate the underline
                const afterElement = title.querySelector('::after');
                setTimeout(() => {
                    title.classList.add('animated');
                }, 300);
                
                titleObserver.unobserve(title);
            }
        });
    }, observerOptions);

    sectionTitles.forEach(title => {
        title.style.opacity = '0';
        title.style.transform = 'translateX(-30px)';
        title.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        titleObserver.observe(title);
    });
});

// Add CSS animation class
const style = document.createElement('style');
style.textContent = `
    .section-title.animated::after {
        animation: expandLine 0.8s ease-out forwards;
    }
    
    @keyframes expandLine {
        from {
            width: 0;
        }
        to {
            width: 80px;
        }
    }
    
    .value-card:hover .value-icon {
        animation: pulse 0.6s ease-in-out;
    }
    
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
    }
    
    .team-member .member-image {
        transition: transform 0.3s ease;
    }
    
    @media (prefers-reduced-motion: reduce) {
        * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }
    }
`;
document.head.appendChild(style);
