let aboutBtn = document.getElementById('aboutBtn');
let projectsBtn = document.getElementById('projectsBtn');
let blogBtn = document.getElementById('blogBtn');
let contactBtn = document.getElementById('contactBtn');

let main = document.getElementById('main');



function loadContent(file) {
    main.textContent = '';
    main.innerHTML = '<div class="loading">Loading...</div>';
    
    fetch(file)
        .then(response => response.text())
        .then(html => {
            main.innerHTML = html;
        })
        .catch(error => {
            console.error(`Error loading ${file}:`, error);
            main.innerHTML = `<section><h2>Error</h2><p>Could not load content from ${file}.</p></section>`;
        });
}

// Function to set up event listeners for navigation
async function setupNavigation() {
    document.getElementById('aboutBtn').addEventListener('click', () => {
        console.log("about");
        window.location.href = 'index.html';
    });

    projectsBtn.addEventListener('click', () => {
        body.style.overflowY = 'auto';
        removeCatElements();
        loadMarkdownSection('section', '../notes/EN/Projects.md');
    });

    document.getElementById('blogBtn').addEventListener('click', () => {
        body.style.overflowY = 'auto';
        removeCatElements();
        loadMarkdownSection('section', '../notes/EN/blog.md');
    });

    document.getElementById('contactBtn').addEventListener('click', () => {
        body.style.overflowY = 'auto';
        removeCatElements();
        loadMarkdownSection('section', '../notes/EN/contact.md');
    });   
}


function setupToggles() {
    document.querySelectorAll(".toggle-title").forEach(title => {
        title.addEventListener("click", () => {
            console.log("Clicked:", title.textContent); // Debugging
    
            const section = title.nextElementSibling; // Get the section below the title
            section.classList.toggle("hidden"); // Toggle the visibility of the section
    
        });
    });
}


function removeCatElements() {
    document.getElementById("pillow").style.visibility = "hidden";
}


document.addEventListener('DOMContentLoaded', () => {
    setupNavigation();
});