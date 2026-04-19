// Combined functionality: Header, Cursor, Mobile Nav, GSAP, Projects, Contact
document.addEventListener("DOMContentLoaded", () => {
    // Mobile nav toggle
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('nav-open');
            hamburger.classList.toggle('active');
        });
    }
    // Smooth scroll for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId && targetId !== '#') {
                e.preventDefault();
                const target = document.querySelector(targetId);
                if (target) {
                    const offset = 80;
                    const pos = target.getBoundingClientRect().top + window.pageYOffset - offset;
                    window.scrollTo({ top: pos, behavior: 'smooth' });
                    if (navLinks.classList.contains('nav-open')) {
                        navLinks.classList.remove('nav-open');
                        hamburger.classList.remove('active');
                    }
                }
            }
        });
    });

    // Custom cursor logic (desktop only)
    const cursor = document.getElementById('customCursor');
    const cursorDot = document.getElementById('customCursorDot');
    let mouseX = 0, mouseY = 0, cursorX = 0, cursorY = 0, dotX = 0, dotY = 0;
    let isDesktop = window.innerWidth > 768;
    function updateCursorVisibility() {
        isDesktop = window.innerWidth > 768;
        if (isDesktop) {
            cursor.style.display = 'block';
            cursorDot.style.display = 'block';
            document.body.style.cursor = 'none';
        } else {
            cursor.style.display = 'none';
            cursorDot.style.display = 'none';
            document.body.style.cursor = 'auto';
        }
    }
    updateCursorVisibility();
    window.addEventListener('resize', updateCursorVisibility);
    document.addEventListener('mousemove', (e) => { if (isDesktop) { mouseX = e.clientX; mouseY = e.clientY; } });
    function animateCursor() {
        if (isDesktop) {
            cursorX += (mouseX - cursorX) * 0.1;
            cursorY += (mouseY - cursorY) * 0.1;
            cursor.style.left = cursorX + 'px';
            cursor.style.top = cursorY + 'px';
            dotX += (mouseX - dotX) * 0.3;
            dotY += (mouseY - dotY) * 0.3;
            cursorDot.style.left = dotX + 'px';
            cursorDot.style.top = dotY + 'px';
        }
        requestAnimationFrame(animateCursor);
    }
    animateCursor();
    const hoverEls = document.querySelectorAll('a, button, .btn, .skill-item, .project-card');
    hoverEls.forEach(el => {
        el.addEventListener('mouseenter', () => { if (isDesktop) cursor.classList.add('hover'); });
        el.addEventListener('mouseleave', () => { if (isDesktop) cursor.classList.remove('hover'); });
    });
    document.addEventListener('mousedown', () => { if (isDesktop) cursor.classList.add('click'); });
    document.addEventListener('mouseup', () => { if (isDesktop) cursor.classList.remove('click'); });

    // GSAP reveal animations
    gsap.registerPlugin(ScrollTrigger);
    gsap.utils.toArray('.gsap-reveal-left').forEach(el => {
        gsap.from(el, { opacity: 0, x: -80, duration: 1, scrollTrigger: { trigger: el, start: "top 85%" } });
    });
    gsap.utils.toArray('.gsap-reveal-right').forEach(el => {
        gsap.from(el, { opacity: 0, x: 80, duration: 1, scrollTrigger: { trigger: el, start: "top 85%" } });
    });
    gsap.utils.toArray('.gsap-reveal-up').forEach(el => {
        gsap.from(el, { opacity: 0, y: 60, duration: 0.8, scrollTrigger: { trigger: el, start: "top 85%" } });
    });

    // Projects Data & Dynamic Loading
    const projectsData = [
        { id:1, title:"Automate your SMM business", description:"The best platform to create a panel for reselling or providing SMM services, manage users, track payments, monitoring orders.", technologies:["Own domain Support","Multiple Payment Gateways","Unlimited API Support"], image:"assets/Rental-Dashboard.png", liveUrl:"https://activepanel.net", featured:true },
        { id:2, title:"Mail Management System Tools", description:"Bulk gmail auto login with security management system, ensuring highly efficient and secure gmail handling.", technologies:["Bulk Mail Auto Login","Bulk Password Change","2FA Enable/Disable"], image:"assets/Mail-Management.png", liveUrl:"https://facebook.com/The.Munna", featured:true },
        { id:3, title:"FB Auto Share Tools", description:"Facebook Auto Share Tools is a desktop application that automates the process of sharing posts on web platforms.", technologies:["Post/Photo/Reels Sharing","Multiple Account Cookies Support"], image:"assets/FB-Share-Tools.png", liveUrl:"https://facebook.com/The.Munna", featured:true },
        { id:4, title:"FB Page Creator Tools", description:"Facebook Page Creator Tools simplifies creating and managing Facebook pages.", technologies:["Bulk Page Creation","Automated Profile Picture Upload"], image:"assets/Page-Creator.png", liveUrl:"https://facebook.com/The.Munna", featured:true }
    ];
    let showAll = false;
    const container = document.getElementById('projects-container');
    const seeMoreBtn = document.getElementById('see-more-btn');
    function renderProjects() {
        const toShow = showAll ? projectsData : projectsData.slice(0,4);
        container.innerHTML = toShow.map(p => `<div class="project-card ${p.featured ? 'featured' : ''}"><div class="project-image"><img src="${p.image}" alt="${p.title}"><div class="project-overlay"><div class="project-links"><a href="${p.liveUrl}" target="_blank" class="project-link"><i class="fas fa-external-link-alt"></i></a></div></div></div><div class="project-content"><h3 class="project-title">${p.title}</h3><p class="project-description">${p.description}</p><div class="project-technologies">${p.technologies.map(t => `<span class="tech-tag">${t}</span>`).join('')}</div></div></div>`).join('');
    }
    renderProjects();
    if(seeMoreBtn) seeMoreBtn.addEventListener('click', () => { showAll = !showAll; renderProjects(); seeMoreBtn.textContent = showAll ? 'Show Less' : 'See More Projects'; });

    // Counter animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting){
                document.querySelectorAll('.stat-number').forEach(c => { const target = +c.dataset.count; let curr=0; const inc = target/100; const upd = setInterval(()=>{ curr+=inc; if(curr>=target){ c.innerText=target; clearInterval(upd); } else c.innerText=Math.ceil(curr); },20); });
                observer.unobserve(entry.target);
            }
        });
    });
    const statsSec = document.querySelector('.about-stats');
    if(statsSec) observer.observe(statsSec);

    // EmailJS Contact
    emailjs.init("hFtPDAl89KN89TUg6");
    const contactForm = document.getElementById('contact-form');
    if(contactForm){
        contactForm.addEventListener('submit', async(e)=>{
            e.preventDefault();
            const btn = contactForm.querySelector('button');
            const original = btn.textContent;
            btn.disabled=true; btn.textContent='Sending...';
            try{
                await emailjs.send('service_ukx9c8d','template_mwqunem',{
                    from_name: contactForm.name.value,
                    from_email: contactForm.email.value,
                    subject: contactForm.subject.value,
                    message: contactForm.message.value
                });
                alert('Thank you! I will get back soon.');
                contactForm.reset();
            } catch(err){ alert('Error sending. Please try again.'); }
            finally{ btn.disabled=false; btn.textContent=original; }
        });
    }
});