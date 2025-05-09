import React from 'react';
import { createRoot } from 'react-dom/client';
import CalorieCalculator from './components/CalorieCalculator';
import '../css/styles.css';

// Widget embedding function
const CalorieWidget = {
  init: function(containerId, options = {}) {
    const container = document.getElementById(containerId);
    
    if (!container) {
      console.error(`Container element with ID "${containerId}" not found.`);
      return;
    }
    
    // Process lead capture functionality
    let leadCaptureHandler = null;
    
    if (options.onLeadCapture && typeof options.onLeadCapture === 'function') {
      leadCaptureHandler = options.onLeadCapture;
      // Remove the function from options to avoid React warning
      delete options.onLeadCapture;
    }
    
    // Create widget instance
    const root = createRoot(container);
    root.render(
      <CalorieCalculator 
        {...options} 
        onLeadCapture={(leadData) => {
          // Store leads in localStorage for demo purposes
          try {
            const existingLeads = JSON.parse(localStorage.getItem('calorieWidgetLeads') || '[]');
            existingLeads.push({
              ...leadData,
              timestamp: new Date().toISOString(),
              widgetId: containerId
            });
            localStorage.setItem('calorieWidgetLeads', JSON.stringify(existingLeads));
          } catch (e) {
            console.error('Error storing lead:', e);
          }
          
          // Call custom handler if provided
          if (leadCaptureHandler) {
            leadCaptureHandler(leadData);
          }
        }}
      />
    );
    
    // Return API
    return {
      update: (newOptions) => {
        root.render(<CalorieCalculator {...options} {...newOptions} />);
      },
      unmount: () => {
        root.unmount();
      },
      getLeads: () => {
        // For demo purposes, retrieve leads from localStorage
        try {
          return JSON.parse(localStorage.getItem('calorieWidgetLeads') || '[]')
            .filter(lead => lead.widgetId === containerId);
        } catch (e) {
          console.error('Error retrieving leads:', e);
          return [];
        }
      }
    };
  }
};

// Auto-initialize if the script is loaded with a data-container attribute
document.addEventListener('DOMContentLoaded', () => {
  const script = document.querySelector('script[data-container]');
  if (script) {
    const containerId = script.getAttribute('data-container');
    const options = {};
    
    // Parse data attributes for configuration
    Object.keys(script.dataset).forEach(key => {
      if (key !== 'container') {
        try {
          // Handle boolean values
          if (script.dataset[key] === 'true') {
            options[key] = true;
          } else if (script.dataset[key] === 'false') {
            options[key] = false;
          } else {
            // Try to parse as JSON, fall back to string value
            options[key] = JSON.parse(script.dataset[key]);
          }
        } catch (e) {
          options[key] = script.dataset[key];
        }
      }
    });
    
    // Special handling for lead capture requirement
    if (options.requireLeadCapture === undefined && script.hasAttribute('data-require-lead-capture')) {
      options.requireLeadCapture = script.getAttribute('data-require-lead-capture') !== 'false';
    }
    
    // Initialize widget
    window.calorieWidgetInstance = CalorieWidget.init(containerId, options);
    
    // Expose the API globally
    if (!window.CalorieWidget) {
      window.CalorieWidget = CalorieWidget;
    }
    
    // Trigger onCalorieWidgetLoaded event
    if (typeof window.onCalorieWidgetLoaded === 'function') {
      window.onCalorieWidgetLoaded();
    }
  }
});

// Export for use in UMD module
export default CalorieWidget;