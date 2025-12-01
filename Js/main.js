// Main functionality - navigation, theme, music, and core interactions
document.addEventListener("DOMContentLoaded", () => {
    
    const body = document.body;
    const menuToggle = document.getElementById("menu-toggle");
    const navLinks = document.querySelectorAll(".nav-link");
    const themeToggle = document.getElementById("theme-toggle-checkbox");
    const musicToggle = document.getElementById("music-toggle");
    const musicIcon = document.getElementById("music-icon");
    const audio = document.getElementById("bgm");
    const backToTopBtn = document.getElementById("back-to-top");
    const contactForm = document.getElementById("contact-form");
    const jsonContainer = document.getElementById("json-data");

    // Menu functionality
    const toggleMenu = () => {
        body.classList.toggle("menu-open");
    };
    menuToggle.addEventListener("click", toggleMenu);

    // Smooth scrolling
    const smoothScrollTo = (targetId) => {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerHeight = document.querySelector('.main-header').offsetHeight;
            let elementPosition = targetElement.getBoundingClientRect().top;
            let offsetPosition = elementPosition + window.pageYOffset - headerHeight;

            if (targetId === '#home') {
                offsetPosition = 0;
            }

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    };

    // Navigation links
    navLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const targetId = link.getAttribute("href");
            smoothScrollTo(targetId);
            toggleMenu();
        });
    });
    
    // Logo click to home
    document.querySelector('.header-logo').addEventListener('click', (e) => {
        e.preventDefault();
        smoothScrollTo('#home');
    });

    // Back to top button
    backToTopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        smoothScrollTo('#home');
    });

    // Theme management
    const applyTheme = (theme) => {
        if (theme === 'dark') {
            body.classList.add("dark-mode");
            body.classList.remove("light-mode");
            themeToggle.checked = false;
        } else {
            body.classList.add("light-mode");
            body.classList.remove("dark-mode");
            themeToggle.checked = true;
        }
    };

    // Load saved theme or default to dark
    const currentTheme = localStorage.getItem("theme") || 'dark';
    applyTheme(currentTheme);

    themeToggle.addEventListener("change", () => {
        let theme = themeToggle.checked ? "light" : "dark";
        applyTheme(theme);
        localStorage.setItem("theme", theme);
    });

    // Music player functionality
    const musicState = localStorage.getItem("music") === "on";
    if (musicState) {
        audio.play().catch(e => console.log("Auto-play prevented"));
    }
    
    musicToggle.addEventListener("click", () => {
        if (audio.paused) {
            audio.play().catch(e => console.log("Audio play failed."));
            musicToggle.classList.add("playing");
            musicIcon.classList.replace("fa-music", "fa-pause");
            localStorage.setItem("music", "on");
        } else {
            audio.pause();
            musicToggle.classList.remove("playing");
            musicIcon.classList.replace("fa-pause", "fa-music");
            localStorage.setItem("music", "off");
        }
    });

    // Back to top button visibility
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('active');
        } else {
            backToTopBtn.classList.remove('active');
        }
    });

    // Contact form handling with EmailJS
    if (contactForm) {
        // Initialize EmailJS with your public key
        emailjs.init("hFtPDAl89KN89TUg6"); // Replace with your actual EmailJS public key
        
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            try {
                // Disable button and show loading state
                submitBtn.disabled = true;
                submitBtn.textContent = 'Sending...';
                
                // Prepare email data
                const templateParams = {
                    from_name: contactForm.name.value,
                    from_email: contactForm.email.value,
                    to_email: 'acc.recovery2munna@outlook.com', // Your email address
                    subject: contactForm.subject.value,
                    message: contactForm.message.value,
                    reply_to: contactForm.email.value
                };
                
                // Send email using EmailJS
                const response = await emailjs.send(
                    'service_ukx9c8d',    // Replace with your EmailJS service ID
                    'template_mwqunem',   // Replace with your EmailJS template ID
                    templateParams
                );
                
                // Success message
                alert('Thank you for your message! I will get back to you soon.');
                contactForm.reset();
                
            } catch (error) {
                console.error('Error sending email:', error);
                alert('Sorry, there was an error sending your message. Please try again or contact me directly at manikmunna10@gmail.com');
            } finally {
                // Re-enable button
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            }
        });
    }

    // Statistics counter animation
    const animateCounters = () => {
        const counters = document.querySelectorAll('.stat-number');
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-count');
            const increment = target / 100;
            let current = 0;
            
            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    counter.textContent = Math.ceil(current);
                    setTimeout(updateCounter, 20);
                } else {
                    counter.textContent = target;
                }
            };
            
            updateCounter();
        });
    };

    // Intersection Observer for counter animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.unobserve(entry.target);
            }
        });
    });

    const statsSection = document.querySelector('.about-stats');
    if (statsSection) {
        observer.observe(statsSection);
    }
});