/**
 * Embeddable Widget Script
 * This script allows the calorie calculator to be embedded on any website
 */
(function() {
    // Get the current script element
    const currentScript = document.currentScript;
    
    // Extract data attributes from script tag for one-line embedding
    function getDataAttributes() {
        if (!currentScript) return {};
        
        const dataAttributes = {};
        for (const attr of currentScript.attributes) {
            if (attr.name.startsWith('data-')) {
                // Convert kebab-case to camelCase for attribute names
                const key = attr.name.slice(5).replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
                dataAttributes[key] = attr.value;
            }
        }
        
        return dataAttributes;
    }
    
    /**
     * Initialize the widget with configuration
     * @param {string} containerId - ID of the container element
     * @param {Object} options - Configuration options
     */
    function initWidget(containerId, options = {}) {
        // The container where we'll render the widget
        const container = document.getElementById(containerId);
        if (!container) {
            console.error(`Container element with ID '${containerId}' not found.`);
            return;
        }
        
        // If React and ReactDOM are not loaded, then load them
        const loadDependencies = Promise.resolve();
        
        loadDependencies.then(() => {
            // Initialize your React widget with the config
            if (window.CalorieWidget && window.CalorieWidget.init) {
                window.CalorieWidget.init(containerId, options);
                console.log('Calorie Calculator Widget initialized successfully.');
            } else {
                console.error('Calorie Widget could not be initialized. Make sure the script is loaded correctly.');
            }
        }).catch(error => {
            console.error('Error initializing Calorie Calculator Widget:', error);
        });
    }
    
    // Create API for manual initialization
    window.CalorieWidgetAPI = {
        init: initWidget
    };
    
    // Auto-initialize if data-container attribute is provided
    const dataAttrs = getDataAttributes();
    if (dataAttrs.container) {
        // Create container if it doesn't exist yet
        let container = document.getElementById(dataAttrs.container);
        if (!container) {
            container = document.createElement('div');
            container.id = dataAttrs.container;
            currentScript.parentNode.insertBefore(container, currentScript.nextSibling);
        }
        
        // Wait for DOM to be fully loaded
        document.addEventListener('DOMContentLoaded', function() {
            initWidget(dataAttrs.container, dataAttrs);
        });
    }
})();