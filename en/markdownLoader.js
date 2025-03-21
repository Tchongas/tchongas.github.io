const config = {
    titleClass: 'toggle-title',
    divClass: 'hidden',
    paragraphClass: 'text-1',
    anchorClass: 'link-1'
};

async function loadMarkdownSection(sectionId, markdownPath) {
    try {
        const response = await fetch(markdownPath);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const markdownText = await response.text();

        // marko.parse(markdownText) returns HTML
        const htmlContent = marko.parse(markdownText, config);
        
        
    
        const sectionElement = document.getElementById(sectionId);
        if (sectionElement) {
            sectionElement.innerHTML = htmlContent;
            setupToggles();
        }
    } catch (error) {
        console.error('Error loading Markdown:', error);
        const sectionElement = document.getElementById(sectionId);
        if (sectionElement) {
            sectionElement.innerHTML = `<p>Unable to load content. ${error.message}</p>`;
        }
    }
}


