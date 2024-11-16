// Initialize Locomotive Scroll with updated options
document.addEventListener('DOMContentLoaded', () => {
    const scroll = new LocomotiveScroll({
        el: document.querySelector('[data-scroll-container]'),
        smooth: true,
        lerp: 0.05,
        multiplier: 0.5,
        smartphone: {
            smooth: true,
            multiplier: 0.5
        },
        tablet: {
            smooth: true,
            multiplier: 0.5
        }
    });

    // Update scroll on window resize
    window.addEventListener('resize', () => {
        scroll.update();
    });

    // Refresh scroll after all content is loaded
    window.addEventListener('load', () => {
        scroll.update();
    });

    // Handle anchor links with smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                scroll.scrollTo(target);
            }
        });
    });
});

// Menu Category Filtering
const menuCategories = document.querySelectorAll('.menu-category');
const menuItems = document.querySelectorAll('.menu-item');

menuCategories.forEach(category => {
    category.addEventListener('click', () => {
        // Remove active class from all categories
        menuCategories.forEach(cat => cat.classList.remove('active'));
        // Add active class to clicked category
        category.classList.add('active');
        
        const selectedCategory = category.dataset.category;
        
        // Filter menu items
        menuItems.forEach(item => {
            if (selectedCategory === 'all' || selectedCategory === item.dataset.category) {
                item.style.display = 'block';
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            } else {
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Enhanced Contact Form Handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: contactForm.querySelector('input[type="text"]').value,
            email: contactForm.querySelector('input[type="email"]').value,
            message: contactForm.querySelector('textarea').value
        };

        // Show loading state
        const submitButton = contactForm.querySelector('.submit-button');
        const originalButtonText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;

        try {
            // Here you would typically send the data to your server
            // For now, we'll simulate a server delay
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Show success message
            Swal.fire({
                title: 'Message Sent!',
                text: 'Thank you for contacting us. We will get back to you soon!',
                icon: 'success',
                confirmButtonColor: '#971108'
            });

            // Reset form
            contactForm.reset();

        } catch (error) {
            // Show error message
            Swal.fire({
                title: 'Error!',
                text: 'There was a problem sending your message. Please try again.',
                icon: 'error',
                confirmButtonColor: '#971108'
            });
        } finally {
            // Reset button state
            submitButton.textContent = originalButtonText;
            submitButton.disabled = false;
        }
    });
}

// Navbar Background Change on Scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(0, 0, 0, 0.9)';
    } else {
        navbar.style.background = 'rgba(0, 0, 0, 0.8)';
    }
}); 