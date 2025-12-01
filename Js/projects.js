// Projects data and dynamic loading
document.addEventListener("DOMContentLoaded", () => {
    const projectsContainer = document.getElementById("projects-container");
    const seeMoreBtn = document.getElementById("see-more-btn");
    
    const projectsData = [
        {
            id: 1,
            title: "Automate your SMM business",
            description: "The best platform to create a panel for reselling or providing SMM services, manage users, track payments, monitoring orders and streamline operations with ease. Boost efficiency and grow your business effortlessly.",
            technologies: ["Own domain Support", "Multiple Payment Gateways", "Unlimited API Support", "Bulk Service Management", "Order Tracking", "User Management", "DDoS Protection", "Maximum Customer Support", "Analytics & Reports"],
            image: "Assets/Rental-Dashboard.png",
            liveUrl: "https://activepanel.net",
            featured: true
        },
        {
            id: 2,
            title: "Mail Management System Tools",
            description: "Bulk gmail auto login with security management system, ensuring highly efficient and secure gmail handling for users. 1 Click Automation System in our tools with hassle-free operation. Speedy and Reliable project.",
            technologies: ["Bulk Mail Auto Login", "Bulk Password Change", "Recovery Mail Add/Change", "2FA Enable/Disable", "Google Authenticator", "App Password Creation", "User Name Change", "Profile Picture Update", "Portable Chrome Browser Based"],
            image: "Assets/Mail-Management.png",
            liveUrl: "https://facebook.com/The.Munna",
            featured: true
        },
        {
            id: 3,
            title: "FB Auto Share Tools",
            description: "Facebook Auto Share Tools is a desktop application that automates the process of sharing posts on web platforms. It allows users to schedule and manage their shares efficiently.",
            technologies: ["Post/Photo/Reels/Video Sharing", "Pause/Resume/Cancel Order", "Speed Control Settings", "Multiple Account Cookies Support", "Detailed Logs", "Minimum Cookies, Maximum Efficiency", "User-Friendly Interface"],
            image: "Assets/FB-Share-Tools.png",
            liveUrl: "https://facebook.com/The.Munna",
            featured: true
        },
        {
            id: 4,
            title: "FB Page Creator Tools",
            description: "Facebook Page Creator Tools is a desktop application that simplifies the process of creating and managing Facebook pages. It offers various features to streamline page creation.",
            technologies: ["Bulk Page Creation", "Automated Profile Picture & Cover Photo Upload", "Custom Name", "Page Info Auto-Fill", "Multiple Account Cookies Support", "Windows Desktop Application", "User-Friendly Interface"],
            image: "Assets/Page-Creator.png",
            liveUrl: "https://facebook.com/The.Munna",
            featured: true
        }
    ];

    let showAllProjects = false;
    const initialProjectsCount = 4;

    // Create image zoom modal
    function createImageZoomModal() {
        const modal = document.createElement('div');
        modal.className = 'image-zoom-modal';
        modal.innerHTML = `
            <div class="zoom-modal-content">
                <span class="zoom-close-btn">&times;</span>
                <img src="" alt="Zoomed Project Image" class="zoomed-image">
                <div class="zoom-controls">
                    <button class="zoom-btn zoom-in-btn" aria-label="Zoom In">
                        <i class="fas fa-search-plus"></i>
                    </button>
                    <button class="zoom-btn zoom-out-btn" aria-label="Zoom Out">
                        <i class="fas fa-search-minus"></i>
                    </button>
                    <button class="zoom-btn zoom-reset-btn" aria-label="Reset Zoom">
                        <i class="fas fa-sync-alt"></i>
                    </button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        return modal;
    }

    // Initialize image zoom functionality
    function initImageZoom() {
        const modal = createImageZoomModal();
        const zoomedImage = modal.querySelector('.zoomed-image');
        const closeBtn = modal.querySelector('.zoom-close-btn');
        const zoomInBtn = modal.querySelector('.zoom-in-btn');
        const zoomOutBtn = modal.querySelector('.zoom-out-btn');
        const zoomResetBtn = modal.querySelector('.zoom-reset-btn');

        let currentScale = 1;
        const scaleStep = 0.2;
        const maxScale = 3;
        const minScale = 0.5;

        function openZoomModal(imageSrc) {
            zoomedImage.src = imageSrc;
            currentScale = 1;
            zoomedImage.style.transform = `scale(${currentScale})`;
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }

        function closeZoomModal() {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
            currentScale = 1;
            zoomedImage.style.transform = `scale(${currentScale})`;
        }

        function zoomIn() {
            if (currentScale < maxScale) {
                currentScale += scaleStep;
                zoomedImage.style.transform = `scale(${currentScale})`;
            }
        }

        function zoomOut() {
            if (currentScale > minScale) {
                currentScale -= scaleStep;
                zoomedImage.style.transform = `scale(${currentScale})`;
            }
        }

        function resetZoom() {
            currentScale = 1;
            zoomedImage.style.transform = `scale(${currentScale})`;
        }

        // Event listeners
        closeBtn.addEventListener('click', closeZoomModal);
        zoomInBtn.addEventListener('click', zoomIn);
        zoomOutBtn.addEventListener('click', zoomOut);
        zoomResetBtn.addEventListener('click', resetZoom);

        // Close modal when clicking outside the image
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeZoomModal();
            }
        });

        // Keyboard controls
        document.addEventListener('keydown', (e) => {
            if (modal.style.display === 'flex') {
                switch(e.key) {
                    case 'Escape':
                        closeZoomModal();
                        break;
                    case '+':
                    case '=':
                        e.preventDefault();
                        zoomIn();
                        break;
                    case '-':
                        e.preventDefault();
                        zoomOut();
                        break;
                    case '0':
                        e.preventDefault();
                        resetZoom();
                        break;
                }
            }
        });

        return { openZoomModal };
    }

    // Initialize zoom functionality
    const { openZoomModal } = initImageZoom();

    function renderProjects() {
        if (!projectsContainer) return;

        const projectsToShow = showAllProjects ? projectsData : projectsData.slice(0, initialProjectsCount);

        projectsContainer.innerHTML = projectsToShow.map(project => `
            <div class="project-card ${project.featured ? 'featured' : ''}">
                <div class="project-image">
                    <img src="${project.image}" alt="${project.title}" loading="lazy">
                    <div class="project-overlay">
                        <div class="project-links">
                        <button class="project-link zoom-image-btn" aria-label="Zoom Image" data-image="${project.image}">
                            <i class="fas fa-search-plus"></i>
                        </button>
                            <a href="${project.liveUrl}" target="_blank" class="project-link" aria-label="View Live Demo">
                                <i class="fas fa-external-link-alt"></i>
                            </a>
                        </div>
                    </div>
                </div>
                <div class="project-content">
                    <h3 class="project-title">${project.title}</h3>
                    <p class="project-description">${project.description}</p>
                    <div class="project-technologies">
                        ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                    </div>
                </div>
            </div>
        `).join('');

        // Add event listeners to zoom buttons
        const zoomButtons = projectsContainer.querySelectorAll('.zoom-image-btn');
        zoomButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const imageSrc = button.getAttribute('data-image');
                openZoomModal(imageSrc);
            });
        });

        // Update button text
        if (seeMoreBtn) {
            seeMoreBtn.textContent = showAllProjects ? 'Show Less' : 'See More Projects';
        }
    }

    // Toggle between showing all projects and limited projects
    function toggleProjectsView() {
        showAllProjects = !showAllProjects;
        renderProjects();
        
        // Smooth scroll to projects section if showing more
        if (showAllProjects) {
            document.getElementById('projects').scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
    }

    // Initialize projects
    renderProjects();

    // Add event listener to See More button
    if (seeMoreBtn) {
        seeMoreBtn.addEventListener('click', toggleProjectsView);
    }

    // Filter projects by category
    function filterProjects(category) {
        // Implementation for project filtering
        console.log(`Filtering projects by: ${category}`);
    }

    // Add project filtering functionality
    const filterButtons = document.querySelectorAll('.project-filter');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            filterProjects(filter);
            
            // Update active state
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        });
    });
});