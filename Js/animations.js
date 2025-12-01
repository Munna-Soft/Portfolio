// GSAP animations and scroll-triggered effects
document.addEventListener('preloaderFinished', () => {
    
    gsap.registerPlugin(ScrollTrigger);

    // Left reveal animations
    const revealLeft = document.querySelectorAll(".gsap-reveal-left");
    revealLeft.forEach((elem) => {
        gsap.from(elem, {
            opacity: 0,
            x: -100,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: { 
                trigger: elem, 
                start: "top 85%", 
                toggleActions: "play none none none",
                markers: false
            }
        });
    });

    // Right reveal animations
    const revealRight = document.querySelectorAll(".gsap-reveal-right");
    revealRight.forEach((elem) => {
        gsap.from(elem, {
            opacity: 0,
            x: 100,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: { 
                trigger: elem, 
                start: "top 85%", 
                toggleActions: "play none none none" 
            }
        });
    });

    // Up reveal animations
    const revealUp = document.querySelectorAll(".gsap-reveal-up");
    revealUp.forEach((elem) => {
        gsap.from(elem, {
            opacity: 0,
            y: 80,
            duration: 1,
            delay: parseFloat(elem.dataset.delay) || 0,
            ease: "power3.out",
            scrollTrigger: { 
                trigger: elem, 
                start: "top 85%", 
                toggleActions: "play none none none" 
            }
        });
    });

    // Hero section parallax effect
    const heroBg = document.querySelector('.hero-bg-image');
    if (heroBg) {
        gsap.to(heroBg, {
            yPercent: 30,
            ease: "none",
            scrollTrigger: {
                trigger: ".hero-section",
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });
    }

    // Skill items stagger animation
    const skillItems = document.querySelectorAll('.skill-item');
    gsap.from(skillItems, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.1,
        ease: "back.out(1.7)",
        scrollTrigger: {
            trigger: '.skills-categories',
            start: "top 80%",
            toggleActions: "play none none none"
        }
    });

    // Timeline animations
    const timelineItems = document.querySelectorAll('.timeline-item');
    gsap.from(timelineItems, {
        opacity: 0,
        x: -100,
        duration: 1,
        stagger: 0.3,
        ease: "power2.out",
        scrollTrigger: {
            trigger: '.timeline',
            start: "top 80%",
            toggleActions: "play none none none"
        }
    });

    // Initialize Swiper for gallery
    const swiper = new Swiper(".mySwiper", {
        effect: "coverflow",
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: "auto",
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        coverflowEffect: {
            rotate: 20,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
    });

    // Header background on scroll
    const header = document.querySelector('.main-header');
    gsap.to(header, {
        backgroundColor: "rgba(244, 249, 244, 0.95)",
        backdropFilter: "blur(10px)",
        duration: 0.3,
        scrollTrigger: {
            start: "50px",
            end: "max",
            toggleActions: "play reverse play reverse"
        }
    });

    // Floating elements animation
    const floatingElements = document.querySelectorAll('.profile-img, .skill-item');
    floatingElements.forEach(el => {
        gsap.to(el, {
            y: -10,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });
    });
});