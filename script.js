document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');

    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close mobile menu if open
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
            }
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Fade-in animation for sections
    const fadeElements = document.querySelectorAll('.fade-in');
    
    function checkScroll() {
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight * 0.9) {
                element.style.opacity = 1;
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Initial check on page load
    checkScroll();
    
    // Check on scroll
    window.addEventListener('scroll', checkScroll);

    // Image Modal Functionality
    function expandImage(src, alt) {
        const modal = document.getElementById('imageModal');
        const modalImg = document.getElementById('expandedImage');
        const captionText = document.getElementById('imageCaption');
        
        modal.classList.add('show');
        modalImg.src = src;
        captionText.innerHTML = alt || '';
    }
    
    // Attach click event to all thumbnail images
    const thumbnailImages = document.querySelectorAll('.project-thumbnail');
    thumbnailImages.forEach(img => {
        img.addEventListener('click', function() {
            expandImage(this.src, this.alt);
        });
    });
    
    // Close modal when clicking the X
    const closeBtn = document.querySelector('.modal-close');
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            document.getElementById('imageModal').classList.remove('show');
        });
    }
    
    // Close modal when clicking outside the image
    const modal = document.getElementById('imageModal');
    if (modal) {
        modal.addEventListener('click', function(event) {
            if (event.target === modal) {
                modal.classList.remove('show');
            }
        });
    }
    
    // Project Filters Functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projects = document.querySelectorAll('.project-expanded');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            const filter = button.getAttribute('data-filter');
            
            // Filter projects
            projects.forEach(project => {
                const categories = project.getAttribute('data-categories');
                
                if (filter === 'all' || categories.includes(filter)) {
                    project.style.display = 'block';
                } else {
                    project.style.display = 'none';
                }
            });
        });
    });

    // Make expandImage function globally available
    window.expandImage = function(src, alt) {
        expandImage(src, alt);
    };

    // Handle header profile image click (optional feature)
    const profileImage = document.getElementById('profileImage');
    if (profileImage) {
        profileImage.addEventListener('click', function() {
            this.classList.toggle('rotate');
        });

        // Add the CSS for rotation if not already in styles.css
        if (!document.querySelector('style#rotate-style')) {
            const style = document.createElement('style');
            style.id = 'rotate-style';
            style.textContent = `
                .rotate {
                    transform: rotate(360deg) scale(1.1) !important;
                    transition: transform 0.8s ease !important;
                }
            `;
            document.head.appendChild(style);
        }
    }

    // Intersection Observer for revealing elements on scroll
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Add CSS for the animation if not already in styles.css
    if (!document.querySelector('style#reveal-style')) {
        const style = document.createElement('style');
        style.id = 'reveal-style';
        style.textContent = `
            .reveal {
                opacity: 0;
                transform: translateY(30px);
                transition: opacity 0.8s ease, transform 0.8s ease;
            }
            .reveal.visible {
                opacity: 1;
                transform: translateY(0);
            }
        `;
        document.head.appendChild(style);
    }

    // Apply reveal class to specific elements and observe them
    const revealElements = document.querySelectorAll('section > h2, .education-item, .experience-item, .project-expanded, .publication-item, .award-item, .reference-card');
    
    revealElements.forEach(element => {
        element.classList.add('reveal');
        observer.observe(element);
    });

    // Initialize the skill progress bars
    const skillBars = document.querySelectorAll('.skill-progress-bar');
    skillBars.forEach(bar => {
        const value = bar.getAttribute('data-value');
        bar.style.width = value + '%';
    });

    // Lazy loading for images
    if ('loading' in HTMLImageElement.prototype) {
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            img.src = img.dataset.src;
        });
    } else {
        // Fallback for browsers that don't support lazy loading
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
        document.body.appendChild(script);
    }

    // Handle form submissions (if any contact form exists)
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple validation
            let valid = true;
            const requiredFields = contactForm.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    valid = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
            });
            
            if (valid) {
                // You would normally submit the form to a server here
                // For demo purposes, just show a success message
                const formMessage = document.createElement('div');
                formMessage.className = 'form-message success';
                formMessage.textContent = 'Thank you for your message! I will get back to you soon.';
                
                // Replace form with success message
                contactForm.style.display = 'none';
                contactForm.parentNode.appendChild(formMessage);
            }
        });
    }

    // Add year to copyright in footer
    const yearElement = document.querySelector('.copyright-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // Highlight current section in navigation
    function highlightNavigation() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('nav a');
        
        let currentSectionId = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                currentSectionId = sectionId;
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + currentSectionId) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavigation);
    
    // Initial call to highlight the navigation
    highlightNavigation();

    // Toggle for expandable sections (like publication abstracts)
    const toggleButtons = document.querySelectorAll('.toggle-btn');
    
    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.classList.toggle('expanded');
                this.innerHTML = targetElement.classList.contains('expanded') 
                    ? '<i class="fas fa-minus"></i> Show Less' 
                    : '<i class="fas fa-plus"></i> Show More';
            }
        });
    });

    // Back to top button
    const backToTopButton = document.createElement('button');
    backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopButton.className = 'back-to-top';
    backToTopButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background-color: var(--secondary-color);
        color: white;
        border: none;
        cursor: pointer;
        display: none;
        align-items: center;
        justify-content: center;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        z-index: 99;
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(backToTopButton);
    
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Show/hide back to top button
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.style.display = 'flex';
        } else {
            backToTopButton.style.display = 'none';
        }
    });
    
    // Add hover effect to back to top button
    backToTopButton.addEventListener('mouseenter', function() {
        this.style.backgroundColor = 'var(--primary-color)';
        this.style.transform = 'translateY(-3px)';
    });
    
    backToTopButton.addEventListener('mouseleave', function() {
        this.style.backgroundColor = 'var(--secondary-color)';
        this.style.transform = 'translateY(0)';
    });
});

// Function to expand image (used in HTML onclick)
// hi
function expandImage(src) {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('expandedImage');
    const captionText = document.getElementById('imageCaption');
    
    modal.classList.add('show');
    modalImg.src = src;
    
    // Try to get the alt text from the clicked image
    const clickedImage = Array.from(document.querySelectorAll('img')).find(img => img.src === src);
    if (clickedImage && clickedImage.alt) {
        captionText.innerHTML = clickedImage.alt;
    } else {
        captionText.innerHTML = '';
    }
}