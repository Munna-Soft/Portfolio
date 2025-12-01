// Custom cursor animation with enhanced speed
document.addEventListener("DOMContentLoaded", () => {
    if (window.matchMedia("(pointer: fine)").matches) {
        const cursorDot = document.querySelector(".cursor-dot");
        const cursorOutline = document.querySelector(".cursor-outline");

        let mouseX = 0, mouseY = 0;
        let dotX = 0, dotY = 0;
        let outlineX = 0, outlineY = 0;
        
        // Enhanced cursor speed for better responsiveness
        const dotSpeed = 0.5;
        const outlineSpeed = 0.3;

        const animateCursor = () => {
            dotX += (mouseX - dotX) * dotSpeed;
            dotY += (mouseY - dotY) * dotSpeed;
            cursorDot.style.transform = `translate(${dotX}px, ${dotY}px) translate(-50%, -50%)`;

            outlineX += (mouseX - outlineX) * outlineSpeed;
            outlineY += (mouseY - outlineY) * outlineSpeed;
            cursorOutline.style.transform = `translate(${outlineX}px, ${outlineY}px) translate(-50%, -50%)`;

            requestAnimationFrame(animateCursor);
        };

        window.addEventListener("mousemove", (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        // Click animation
        window.addEventListener("mousedown", () => {
            cursorOutline.classList.add("clicked");
        });
        window.addEventListener("mouseup", () => {
            cursorOutline.classList.remove("clicked");
        });

        // Hover effects for interactive elements
        const addHoverEffect = () => {
            cursorOutline.classList.add("hovered");
        };
        const removeHoverEffect = () => {
            cursorOutline.classList.remove("hovered");
        };

        // Apply hover effects to interactive elements
        document.querySelectorAll("a, button, .skill-item, .swiper-slide, .social-icon, .theme-switch, .project-card, .cta-btn").forEach(el => {
            el.addEventListener("mouseenter", addHoverEffect);
            el.addEventListener("mouseleave", removeHoverEffect);
        });
        
        // Text hover effect
        const addTextHover = () => cursorOutline.classList.add("text-hover");
        const removeTextHover = () => cursorOutline.classList.remove("text-hover");
        
        document.querySelectorAll("p, h1, h2, h3, h4, blockquote, .terminal-body pre").forEach(el => {
            el.addEventListener("mouseenter", addTextHover);
            el.addEventListener("mouseleave", removeTextHover);
        });

        // Start cursor animation
        requestAnimationFrame(animateCursor);
    }
});