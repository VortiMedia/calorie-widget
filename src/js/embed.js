/**
 * Embeddable Widget Script
 * This script allows the calorie calculator to be embedded on any website
 */
(function() {
    // Configuration
    const config = {
        scriptID: 'calorie-calculator-script',
        containerId: 'calorie-calculator-container',
        cssPath: 'https://your-domain.com/path/to/styles.css',
        htmlPath: 'https://your-domain.com/path/to/widget-template.html',
        jsPath: {
            calculator: 'https://your-domain.com/path/to/calculator.js',
            ui: 'https://your-domain.com/path/to/ui.js'
        }
    };
    
    /**
     * Create and load a CSS file
     * @param {string} path - Path to the CSS file
     * @returns {Element} The created link element
     */
    function loadCSS(path) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = path;
        document.head.appendChild(link);
        return link;
    }
    
    /**
     * Load an external JavaScript file
     * @param {string} path - Path to the JavaScript file
     * @returns {Promise} Promise that resolves when the script is loaded
     */
    function loadScript(path) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = path;
            script.onload = resolve;
            script.onerror = reject;
            document.body.appendChild(script);
        });
    }
    
    /**
     * Fetch HTML template and inject it into container
     * @param {string} path - Path to the HTML template
     * @param {string} containerId - ID of the container to inject into
     * @returns {Promise} Promise that resolves when the HTML is loaded
     */
    function loadHTML(path, containerId) {
        return fetch(path)
            .then(response => response.text())
            .then(html => {
                const container = document.getElementById(containerId);
                if (container) {
                    container.innerHTML = html;
                } else {
                    console.error(`Container with ID '${containerId}' not found.`);
                }
            });
    }
    
    /**
     * Initialize the widget
     */
    function init() {
        // Create container if it doesn't exist
        if (!document.getElementById(config.containerId)) {
            const container = document.createElement('div');
            container.id = config.containerId;
            document.currentScript.parentNode.insertBefore(container, document.currentScript);
        }
        
        // Load CSS
        loadCSS(config.cssPath);
        
        // Load HTML template
        loadHTML(config.htmlPath, config.containerId)
            .then(() => {
                // Load JavaScript files
                return Promise.all([
                    loadScript(config.jsPath.calculator),
                    loadScript(config.jsPath.ui)
                ]);
            })
            .then(() => {
                console.log('Calorie Calculator Widget loaded successfully.');
            })
            .catch(error => {
                console.error('Error loading Calorie Calculator Widget:', error);
            });
    }
    
    // Initialize the widget
    init();
})();