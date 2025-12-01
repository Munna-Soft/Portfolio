// Preloader and boot sequence animation
document.addEventListener("DOMContentLoaded", () => {
    const preloader = document.getElementById("preloader");
    const bootLinesContainer = document.getElementById("boot-lines");
    const bootCursor = document.getElementById("boot-cursor");
    document.body.classList.add("preloader-active");

    const bootLines = [
        "MasterMind OS v3.0 initializing...",
        "Verifying license status... <span class='ok-status'>[VALID]</span>",
        "Loading core libraries... <span class='ok-status'>[LOADED]</span>",
        "Mounting development environment... <span class='ok-status'>[COMPLETED]</span>",
        "Checking available updates... <span class='ok-status'>[UP-TO-DATE]</span>",
        "Checking system integrity... <span class='ok-status'>[PASSED]</span>",
        "Starting security protocols... <span class='ok-status'>[ACTIVE]</span>",

        "Initializing portfolio engine... <span class='ok-status'>[CONNECTED]</span>",
        "Loading project database... <span class='ok-status'>[READY]</span>",
        "Establishing secure connection... <span class='ok-status'>[SECURED]</span>",
        "Final system check... <span class='ok-status'>[ALL SYSTEMS GO]</span>",
        "Welcome to the world of <span class='highlight'>Munna MasterMind</span> ⚡",
        "Feel free to explore and interact with the projects.",
        "Launching interactive portfolio..."
    ];

    let lineIndex = 0;
    let charIndex = 0;

    function typeLine() {
        if (lineIndex >= bootLines.length) {
            bootCursor.style.display = "none";
            setTimeout(startGUI, 300);
            return;
        }

        let currentLine = bootLines[lineIndex];
        let currentLineElement = document.querySelector(`#line-${lineIndex}`);
        
        if (!currentLineElement) {
            currentLineElement = document.createElement("p");
            currentLineElement.id = `line-${lineIndex}`;
            bootLinesContainer.appendChild(currentLineElement);
        }

        if (charIndex < currentLine.length) {
            currentLineElement.innerHTML = currentLine.substring(0, charIndex + 1);
            charIndex++;
            setTimeout(typeLine, 15);
        } else {
            lineIndex++;
            charIndex = 0;
            setTimeout(typeLine, 100);
        }
    }

    function startGUI() {
        preloader.style.opacity = "0";
        setTimeout(() => {
            preloader.style.display = "none";
            document.body.classList.remove("preloader-active");
            document.dispatchEvent(new Event('preloaderFinished'));
        }, 800);
    }

    // Start boot sequence
    setTimeout(typeLine, 500);
});