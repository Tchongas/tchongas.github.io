let aboutBtn = document.getElementById('aboutBtn');
let projectsBtn = document.getElementById('projectsBtn');
let blogBtn = document.getElementById('blogBtn');
let contactBtn = document.getElementById('contactBtn');

let main = document.getElementById('main');

let windowBody = document.getElementById("window-body");

let aboutLi = document.getElementById("aboutLi");
let projectsLi = document.getElementById("projectsLi");
let blogLi = document.getElementById("blogLi");
let contactLi = document.getElementById("contactLi");

/*aboutBtn.addEventListener('click', () => {
    main.textContent = '';
    aboutBtn.classList.add('selected');
    projectsBtn.classList.remove('selected');
    blogBtn.classList.remove('selected');
    contactBtn.classList.remove('selected');
    window.location.href = 'index.html';
});

projectsBtn.addEventListener('click', () => {
    main.textContent = '';
    aboutBtn.classList.remove('selected');
    projectsBtn.classList.add('selected');
    blogBtn.classList.remove('selected');    
    contactBtn.classList.remove('selected');
    loadContent('projects.html');
});

blogBtn.addEventListener('click', () => {
    main.textContent = '';
    aboutBtn.classList.remove('selected');
    projectsBtn.classList.remove('selected');
    blogBtn.classList.add('selected');
    contactBtn.classList.remove('selected');
    loadContent('blog.html');
});

contactBtn.addEventListener('click', () => {
    main.textContent = '';
    aboutBtn.classList.remove('selected');
    projectsBtn.classList.remove('selected');
    blogBtn.classList.remove('selected');
    contactBtn.classList.add('selected');
    loadContent('contact.html');
});*/



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
        windowBody.style.overflowY = 'auto';
        aboutLi.ariaSelected = true;
        projectsLi.ariaSelected = false;
        blogLi.ariaSelected = false;
        contactLi.ariaSelected = false;
        window.location.href = 'index.html';
    });

    projectsBtn.addEventListener('click', () => {
        windowBody.style.overflowY = 'auto';
        projectsLi.ariaSelected = true;
        blogLi.ariaSelected = false;
        contactLi.ariaSelected = false;
        aboutLi.ariaSelected = false;
        removeCatElements();
        loadMarkdownSection('section', '../notes/PT/projects.md');
    });

    document.getElementById('blogBtn').addEventListener('click', () => {
        windowBody.style.overflowY = 'auto';
        blogLi.ariaSelected = true;
        projectsLi.ariaSelected = false;
        contactLi.ariaSelected = false;
        aboutLi.ariaSelected = false;
        removeCatElements();
        loadMarkdownSection('section', '../notes/PT/blog.md');
    });

    document.getElementById('contactBtn').addEventListener('click', () => {
        windowBody.style.overflowY = 'auto';
        contactLi.ariaSelected = true;
        projectsLi.ariaSelected = false;
        blogLi.ariaSelected = false;
        aboutLi.ariaSelected = false;
        removeCatElements();
        loadMarkdownSection('section', '../notes/PT/contact.md');
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