// Dashboard JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize dashboard functionality
    initializeTabs();
    initializeColorPickers();
    initializePresets();
    initializeLogoUpload();
    initializeLeadToggle();
    initializeIntegrationToggle();
    initializeEmbedTabs();
    initializeWidthControl();
    initializeClipboard();
    initializeSaveSettings();
    initializeResetSettings();
    loadSettings();
    loadLeads();
    updateEmbedCode();
    
    // Update embed code and preview when settings change
    document.querySelectorAll('input, select, textarea').forEach(input => {
        // Update on change events (checkbox, radio, select)
        input.addEventListener('change', function() {
            updateEmbedCode();
            // Add small delay before refreshing preview
            setTimeout(updatePreview, 100);
        });
        
        // Additionally update on input events for text fields
        if (input.type === 'text' || input.type === 'number' || input.tagName === 'TEXTAREA') {
            input.addEventListener('input', function() {
                updateEmbedCode();
                // Debounce the preview update to avoid too many refreshes
                clearTimeout(input.debounceTimer);
                input.debounceTimer = setTimeout(updatePreview, 500);
            });
        }
    });
});

// Tab navigation
function initializeTabs() {
    const navLinks = document.querySelectorAll('.sidebar-menu a');
    const sections = document.querySelectorAll('.tab-content section');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get section ID from data attribute
            const sectionId = this.getAttribute('data-section') + '-section';
            
            // Remove active class from all links and sections
            navLinks.forEach(navLink => navLink.classList.remove('active'));
            sections.forEach(section => section.classList.remove('active'));
            
            // Add active class to clicked link and corresponding section
            this.classList.add('active');
            document.getElementById(sectionId).classList.add('active');
        });
    });
}

// Color pickers
function initializeColorPickers() {
    const primaryColorPicker = document.getElementById('primary-color');
    const primaryColorText = document.getElementById('primary-color-text');
    const secondaryColorPicker = document.getElementById('secondary-color');
    const secondaryColorText = document.getElementById('secondary-color-text');
    
    // Sync color picker with text input
    primaryColorPicker.addEventListener('input', function() {
        primaryColorText.value = this.value.toUpperCase();
        updatePreview();
    });
    
    primaryColorText.addEventListener('input', function() {
        const value = this.value;
        if (/^#[0-9A-F]{6}$/i.test(value)) {
            primaryColorPicker.value = value;
            updatePreview();
        }
    });
    
    secondaryColorPicker.addEventListener('input', function() {
        secondaryColorText.value = this.value.toUpperCase();
        updatePreview();
    });
    
    secondaryColorText.addEventListener('input', function() {
        const value = this.value;
        if (/^#[0-9A-F]{6}$/i.test(value)) {
            secondaryColorPicker.value = value;
            updatePreview();
        }
    });
}

// Color presets
function initializePresets() {
    const presetButtons = document.querySelectorAll('.preset-btn');
    
    presetButtons.forEach(button => {
        button.addEventListener('click', function() {
            const primaryColor = this.getAttribute('data-primary');
            const secondaryColor = this.getAttribute('data-secondary');
            
            // Update color pickers and text inputs
            document.getElementById('primary-color').value = primaryColor;
            document.getElementById('primary-color-text').value = primaryColor.toUpperCase();
            document.getElementById('secondary-color').value = secondaryColor;
            document.getElementById('secondary-color-text').value = secondaryColor.toUpperCase();
            
            updatePreview();
        });
    });
}

// Logo upload
function initializeLogoUpload() {
    const logoUpload = document.getElementById('logo-upload');
    const logoPreview = document.getElementById('logo-preview');
    const removeLogoBtn = document.getElementById('remove-logo');
    let logoData = null;
    
    logoPreview.addEventListener('click', function() {
        logoUpload.click();
    });
    
    logoUpload.addEventListener('change', function() {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                logoData = e.target.result;
                logoPreview.innerHTML = `<img src="${logoData}" alt="Logo preview">`;
                removeLogoBtn.style.display = 'block';
                updateEmbedCode();
            };
            reader.readAsDataURL(file);
        }
    });
    
    removeLogoBtn.addEventListener('click', function(e) {
        e.preventDefault();
        logoData = null;
        logoPreview.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
            <span>Upload Logo</span>
        `;
        logoUpload.value = '';
        this.style.display = 'none';
        updateEmbedCode();
    });
}

// Lead capture toggle
function initializeLeadToggle() {
    const leadCaptureToggle = document.getElementById('lead-capture-toggle');
    const leadFormSettings = document.getElementById('lead-form-settings');
    
    leadCaptureToggle.addEventListener('change', function() {
        leadFormSettings.style.display = this.checked ? 'block' : 'none';
        updatePreview();
    });
}

// Integration settings toggle
function initializeIntegrationToggle() {
    const integrationSelect = document.getElementById('lead-email-integration');
    const integrationSettings = document.getElementById('integration-settings');
    
    integrationSelect.addEventListener('change', function() {
        integrationSettings.style.display = this.value !== 'none' ? 'block' : 'none';
    });
}

// Embed code tabs
function initializeEmbedTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.embed-tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            this.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });
}

// Widget width control
function initializeWidthControl() {
    const widthInput = document.getElementById('widget-width');
    const previewFrameContainer = document.getElementById('preview-frame-container');
    
    widthInput.addEventListener('input', function() {
        const width = parseInt(this.value);
        if (width >= 300 && width <= 1200) {
            previewFrameContainer.style.width = `${width}px`;
            updatePreview(); // Refresh preview when width changes
        }
    });
    
    // Add refresh preview button
    const refreshButton = document.createElement('button');
    refreshButton.id = 'refresh-preview';
    refreshButton.className = 'btn btn-outline refresh-btn';
    refreshButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M23 4v6h-6"></path><path d="M1 20v-6h6"></path>
            <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10"></path>
            <path d="M20.49 15a9 9 0 0 1-14.85 3.36L1 14"></path>
        </svg>
        Refresh Preview
    `;
    refreshButton.addEventListener('click', function(e) {
        e.preventDefault();
        updatePreview();
    });
    
    // Insert refresh button after the preview
    const previewContainer = document.querySelector('.preview-container');
    if (previewContainer) {
        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'refresh-button-container';
        buttonContainer.appendChild(refreshButton);
        previewContainer.appendChild(buttonContainer);
    }
}

// Initialize clipboard.js
function initializeClipboard() {
    const clipboard = new ClipboardJS('.copy-btn');
    
    clipboard.on('success', function(e) {
        const button = e.trigger;
        const originalText = button.innerHTML;
        
        button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> Copied!';
        
        setTimeout(function() {
            button.innerHTML = originalText;
        }, 2000);
        
        e.clearSelection();
    });
}

// Save settings
function initializeSaveSettings() {
    const saveButton = document.getElementById('save-settings');
    
    saveButton.addEventListener('click', function() {
        const settings = getSettings();
        localStorage.setItem('calorieWidgetSettings', JSON.stringify(settings));
        
        // Show save confirmation
        const originalText = this.textContent;
        this.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> Saved!';
        
        setTimeout(() => {
            this.textContent = originalText;
        }, 2000);
    });
}

// Reset settings
function initializeResetSettings() {
    const resetButton = document.getElementById('reset-settings');
    
    resetButton.addEventListener('click', function() {
        if (confirm('Are you sure you want to reset all settings to default?')) {
            localStorage.removeItem('calorieWidgetSettings');
            location.reload();
        }
    });
}

// Update embed code preview
function updateEmbedCode() {
    const settings = getSettings();
    
    // Update standard embed code
    const standardEmbedCode = generateStandardEmbedCode(settings);
    document.getElementById('standard-embed-code').textContent = standardEmbedCode;
    
    // Update one-line embed code
    const oneLineEmbedCode = generateOneLineEmbedCode(settings);
    document.getElementById('one-line-embed-code').textContent = oneLineEmbedCode;
    
    // Update iframe embed code
    const iframeEmbedCode = generateIframeEmbedCode(settings);
    document.getElementById('iframe-embed-code').textContent = iframeEmbedCode;
    
    // Update preview
    updatePreview();
}

// Generate standard embed code
function generateStandardEmbedCode(settings) {
    // The base URL for your widget files (can be adjusted based on your hosting)
    const baseUrl = getBaseUrl();
    
    let code = `<!-- Calorie Calculator Widget - Standard Embed -->\n`;
    code += `<div id="calorie-calculator"></div>\n`;
    code += `<script src="${baseUrl}/calorie-widget.js"></script>\n`;
    code += `<script>\n`;
    code += `  document.addEventListener('DOMContentLoaded', function() {\n`;
    code += `    if (typeof CalorieWidget !== 'undefined') {\n`;
    code += `      CalorieWidget.init('calorie-calculator', {\n`;
    
    // Add color settings
    code += `        primaryColor: '${settings.primaryColor}',\n`;
    code += `        secondaryColor: '${settings.secondaryColor}',\n`;
    
    // Add text settings
    code += `        title: '${escapeJsString(settings.title)}',\n`;
    code += `        subtitle: '${escapeJsString(settings.subtitle)}',\n`;
    code += `        footerText: '${escapeJsString(settings.footerText)}',\n`;
    
    // Add size settings
    code += `        maxWidth: '${settings.maxWidth}px',\n`;
    
    // Add lead capture settings
    code += `        requireLeadCapture: ${settings.requireLeadCapture},\n`;
    
    if (settings.requireLeadCapture) {
        code += `        // Lead form customization\n`;
        code += `        leadFormTitle: '${escapeJsString(settings.leadFormTitle)}',\n`;
        code += `        leadFormDescription: '${escapeJsString(settings.leadFormDescription)}',\n`;
        code += `        leadFormButtonText: '${escapeJsString(settings.leadFormButton)}',\n`;
        code += `        leadFormPrivacyText: '${escapeJsString(settings.leadFormPrivacy)}',\n`;
    }
    
    // Add logo if uploaded
    if (settings.logo) {
        code += `        logoUrl: '${settings.logo}',\n`;
    }
    
    // Add calculation settings
    code += `        // Calculation settings\n`;
    code += `        imperialUnits: ${settings.imperialUnits},\n`;
    code += `        calculationFormula: '${settings.calculationFormula}',\n`;
    
    // Add display settings
    const goalsToDisplay = [];
    if (settings.goalMaintenance) goalsToDisplay.push('maintenance');
    if (settings.goalWeightLoss) goalsToDisplay.push('weight-loss');
    if (settings.goalWeightGain) goalsToDisplay.push('weight-gain');
    
    code += `        goalsToDisplay: ${JSON.stringify(goalsToDisplay)},\n`;
    
    // Add lead capture handler (if enabled)
    if (settings.requireLeadCapture) {
        code += `\n        // Handle captured leads\n`;
        code += `        onLeadCapture: function(leadData) {\n`;
        code += `          console.log('Lead captured:', leadData);\n`;
        
        // Add email integration code if configured
        if (settings.integration !== 'none') {
            code += `          // Send lead data to ${settings.integration}\n`;
            
            if (settings.integration === 'webhook' && settings.integrationApiKey) {
                code += `          fetch('${escapeJsString(settings.integrationApiKey)}', {\n`;
                code += `            method: 'POST',\n`;
                code += `            headers: { 'Content-Type': 'application/json' },\n`;
                code += `            body: JSON.stringify(leadData)\n`;
                code += `          });\n`;
            } else if (settings.integration === 'mailchimp' && settings.integrationApiKey) {
                code += `          // Mailchimp integration\n`;
                code += `          const mailchimpData = {\n`;
                code += `            email_address: leadData.email,\n`;
                code += `            status: 'subscribed',\n`;
                code += `            merge_fields: {\n`;
                code += `              FNAME: leadData.name\n`;
                code += `            }\n`;
                code += `          };\n`;
                
                if (settings.integrationListId) {
                    code += `          // Add to specific list: ${settings.integrationListId}\n`;
                }
                
                code += `          // Add your Mailchimp API implementation here\n`;
            } else if (settings.integration === 'convertkit' && settings.integrationApiKey) {
                code += `          // ConvertKit integration\n`;
                code += `          const convertkitData = {\n`;
                code += `            email: leadData.email,\n`;
                code += `            first_name: leadData.name\n`;
                code += `          };\n`;
                
                if (settings.integrationListId) {
                    code += `          // Add to form/tag: ${settings.integrationListId}\n`;
                }
                
                code += `          // Add your ConvertKit API implementation here\n`;
            } else {
                code += `          // Add your ${settings.integration} integration code here\n`;
            }
        }
        
        code += `        }\n`;
    }
    
    code += `      });\n`;
    code += `    }\n`;
    code += `  });\n`;
    code += `</script>`;
    
    return code;
}

// Generate one-line embed code
function generateOneLineEmbedCode(settings) {
    // The base URL for your widget files
    const baseUrl = getBaseUrl();
    
    let code = `<!-- Calorie Calculator Widget - One-Line Embed -->\n`;
    code += `<script\n`;
    code += `  src="${baseUrl}/calorie-widget.js"\n`;
    code += `  data-container="calorie-calculator"\n`;
    
    // Add data attributes for settings
    code += `  data-primary-color="${settings.primaryColor}"\n`;
    code += `  data-secondary-color="${settings.secondaryColor}"\n`;
    code += `  data-title="${escapeHtmlAttr(settings.title)}"\n`;
    code += `  data-subtitle="${escapeHtmlAttr(settings.subtitle)}"\n`;
    code += `  data-footer-text="${escapeHtmlAttr(settings.footerText)}"\n`;
    code += `  data-max-width="${settings.maxWidth}"\n`;
    code += `  data-require-lead-capture="${settings.requireLeadCapture}"\n`;
    code += `  data-imperial-units="${settings.imperialUnits}"\n`;
    code += `  data-calculation-formula="${settings.calculationFormula}"\n`;
    
    // Add goals to display
    if (settings.goalMaintenance) code += `  data-goal-maintenance="true"\n`;
    if (settings.goalWeightLoss) code += `  data-goal-weight-loss="true"\n`;
    if (settings.goalWeightGain) code += `  data-goal-weight-gain="true"\n`;
    
    if (settings.requireLeadCapture) {
        code += `  data-lead-form-title="${escapeHtmlAttr(settings.leadFormTitle)}"\n`;
        code += `  data-lead-form-description="${escapeHtmlAttr(settings.leadFormDescription)}"\n`;
        code += `  data-lead-form-button="${escapeHtmlAttr(settings.leadFormButton)}"\n`;
        code += `  data-lead-form-privacy="${escapeHtmlAttr(settings.leadFormPrivacy)}"\n`;
    }
    
    if (settings.logo) {
        code += `  data-logo-url="${settings.logo}"\n`;
    }
    
    if (settings.integration !== 'none' && settings.integrationApiKey) {
        code += `  data-integration="${settings.integration}"\n`;
        code += `  data-integration-api-key="${escapeHtmlAttr(settings.integrationApiKey)}"\n`;
        
        if (settings.integrationListId) {
            code += `  data-integration-list-id="${escapeHtmlAttr(settings.integrationListId)}"\n`;
        }
    }
    
    code += `></script>`;
    
    return code;
}

// Generate iframe embed code
function generateIframeEmbedCode(settings) {
    // The base URL for your widget files
    const baseUrl = getBaseUrl();
    
    // Create simplified query parameters for Framer compatibility
    const essentialParams = new URLSearchParams();
    
    // Add only the most essential settings to keep the URL short
    essentialParams.append('p', encodeURIComponent(settings.primaryColor.replace('#', ''))); // primaryColor
    essentialParams.append('s', encodeURIComponent(settings.secondaryColor.replace('#', ''))); // secondaryColor
    essentialParams.append('t', encodeURIComponent(settings.title)); // title
    essentialParams.append('w', settings.maxWidth); // width
    essentialParams.append('l', settings.requireLeadCapture ? '1' : '0'); // lead capture
    
    // Add logo only if provided (compressed parameter)
    if (settings.logo) {
        // For data URLs, just use a flag that logo is enabled
        if (settings.logo.startsWith('data:')) {
            essentialParams.append('logo', '1');
        } else {
            essentialParams.append('logo', encodeURIComponent(settings.logo));
        }
    }
    
    // Generate iframe code
    let code = `<!-- Calorie Calculator Widget - iframe Embed -->\n`;
    code += `<iframe\n`;
    code += `  src="${baseUrl}/widget-preview?${essentialParams.toString()}"\n`;
    code += `  width="${settings.maxWidth}"\n`;
    code += `  height="620"\n`;
    code += `  style="border: none; width: 100%; max-width: ${settings.maxWidth}px;"\n`;
    code += `  title="${escapeHtmlAttr(settings.title)}"\n`;
    code += `  loading="lazy"\n`;
    code += `></iframe>`;
    
    return code;
}

// Helper function to get the base URL for widget files
function getBaseUrl() {
    // In development, use window.location.origin
    // In production, use your actual domain
    return window.location.origin;
}

// Helper functions to escape strings
function escapeJsString(str) {
    if (!str) return '';
    return str
        .replace(/\\/g, '\\\\')
        .replace(/'/g, "\\'")
        .replace(/"/g, '\\"')
        .replace(/\n/g, '\\n')
        .replace(/\r/g, '\\r')
        .replace(/\t/g, '\\t');
}

function escapeHtmlAttr(str) {
    if (!str) return '';
    return str
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}

// Update preview iframe
function updatePreview() {
    const previewFrame = document.getElementById('preview-frame');
    const settings = getSettings();
    const baseUrl = getBaseUrl();
    
    // Create query string for preview
    const queryParams = new URLSearchParams();
    
    // Add all settings as query parameters
    queryParams.append('primaryColor', encodeURIComponent(settings.primaryColor));
    queryParams.append('secondaryColor', encodeURIComponent(settings.secondaryColor));
    queryParams.append('title', encodeURIComponent(settings.title));
    queryParams.append('subtitle', encodeURIComponent(settings.subtitle));
    queryParams.append('footerText', encodeURIComponent(settings.footerText));
    queryParams.append('maxWidth', settings.maxWidth);
    queryParams.append('requireLeadCapture', settings.requireLeadCapture);
    queryParams.append('imperialUnits', settings.imperialUnits);
    queryParams.append('calculationFormula', settings.calculationFormula);
    
    // Add goals to display
    queryParams.append('goalMaintenance', settings.goalMaintenance);
    queryParams.append('goalWeightLoss', settings.goalWeightLoss);
    queryParams.append('goalWeightGain', settings.goalWeightGain);
    
    if (settings.requireLeadCapture) {
        queryParams.append('leadFormTitle', encodeURIComponent(settings.leadFormTitle));
        queryParams.append('leadFormDescription', encodeURIComponent(settings.leadFormDescription));
        queryParams.append('leadFormButton', encodeURIComponent(settings.leadFormButton));
        queryParams.append('leadFormPrivacy', encodeURIComponent(settings.leadFormPrivacy));
    }
    
    // Add logo if uploaded
    if (settings.logo) {
        queryParams.append('logo', encodeURIComponent(settings.logo));
    }
    
    // Add integration settings
    if (settings.integration && settings.integration !== 'none') {
        queryParams.append('integration', settings.integration);
        
        if (settings.integrationApiKey) {
            queryParams.append('integrationApiKey', encodeURIComponent(settings.integrationApiKey));
        }
        
        if (settings.integrationListId) {
            queryParams.append('integrationListId', encodeURIComponent(settings.integrationListId));
        }
    }
    
    // Add preview timestamp to prevent caching
    queryParams.append('_t', Date.now());
    
    // Recreate the iframe to avoid caching issues
    const previewFrameContainer = document.getElementById('preview-frame-container');
    if (previewFrameContainer) {
        // Remove old iframe
        while (previewFrameContainer.firstChild) {
            previewFrameContainer.removeChild(previewFrameContainer.firstChild);
        }
        
        // Create new iframe
        const newFrame = document.createElement('iframe');
        newFrame.id = 'preview-frame';
        newFrame.width = '100%';
        newFrame.height = '620';
        newFrame.src = `${baseUrl}/widget-preview?${queryParams.toString()}&_t=${Date.now()}`;
        previewFrameContainer.appendChild(newFrame);
        
        // Update the preview container width
        previewFrameContainer.style.width = `${settings.maxWidth}px`;
    }
}

// Get all settings from form
function getSettings() {
    return {
        // Colors
        primaryColor: document.getElementById('primary-color').value,
        secondaryColor: document.getElementById('secondary-color').value,
        
        // Branding
        title: document.getElementById('widget-title').value,
        subtitle: document.getElementById('widget-subtitle').value,
        footerText: document.getElementById('widget-footer').value,
        logo: document.querySelector('#logo-preview img') ? document.querySelector('#logo-preview img').src : null,
        maxWidth: document.getElementById('widget-width').value,
        
        // Lead capture
        requireLeadCapture: document.getElementById('lead-capture-toggle').checked,
        leadFormTitle: document.getElementById('lead-form-title').value,
        leadFormDescription: document.getElementById('lead-form-description').value,
        leadFormButton: document.getElementById('lead-form-button').value,
        leadFormPrivacy: document.getElementById('lead-form-privacy').value,
        
        // Integration
        integration: document.getElementById('lead-email-integration').value,
        integrationApiKey: document.getElementById('integration-api-key').value,
        integrationListId: document.getElementById('integration-list-id').value,
        
        // Calculator settings
        imperialUnits: document.getElementById('imperial-units-toggle').checked,
        calculationFormula: document.getElementById('formula-mifflin').checked ? 'mifflin' : 'harris',
        goalMaintenance: document.getElementById('goal-maintenance').checked,
        goalWeightLoss: document.getElementById('goal-weight-loss').checked,
        goalWeightGain: document.getElementById('goal-weight-gain').checked
    };
}

// Load saved settings from localStorage
function loadSettings() {
    const savedSettings = localStorage.getItem('calorieWidgetSettings');
    if (!savedSettings) return;
    
    const settings = JSON.parse(savedSettings);
    
    // Apply saved settings to form
    for (const [key, value] of Object.entries(settings)) {
        const element = document.getElementById(key) || document.getElementById(key + '-toggle');
        if (!element) continue;
        
        if (element.type === 'checkbox') {
            element.checked = value;
        } else if (element.type === 'radio') {
            element.checked = true;
        } else {
            element.value = value;
        }
    }
    
    // Handle special cases
    if (settings.primaryColor) {
        document.getElementById('primary-color-text').value = settings.primaryColor;
    }
    
    if (settings.secondaryColor) {
        document.getElementById('secondary-color-text').value = settings.secondaryColor;
    }
    
    if (settings.logo) {
        document.getElementById('logo-preview').innerHTML = `<img src="${settings.logo}" alt="Logo preview">`;
        document.getElementById('remove-logo').style.display = 'block';
    }
    
    if (settings.integration && settings.integration !== 'none') {
        document.getElementById('integration-settings').style.display = 'block';
    }
    
    // Update UI based on toggles
    if (!settings.requireLeadCapture) {
        document.getElementById('lead-form-settings').style.display = 'none';
    }
    
    // Update preview frame width
    if (settings.maxWidth) {
        document.getElementById('preview-frame-container').style.width = `${settings.maxWidth}px`;
    }
}

// Load and display leads
function loadLeads() {
    const leads = JSON.parse(localStorage.getItem('calorieWidgetLeads') || '[]');
    const leadsTableBody = document.getElementById('leads-table-body');
    const noLeadsMessage = document.getElementById('no-leads-message');
    const leadCount = document.getElementById('lead-count');
    const exportLeadsBtn = document.getElementById('export-leads');
    const clearLeadsBtn = document.getElementById('clear-leads');
    
    // Update lead count
    leadCount.textContent = `${leads.length} lead${leads.length !== 1 ? 's' : ''} captured`;
    
    // Show/hide no leads message
    if (leads.length === 0) {
        noLeadsMessage.style.display = 'flex';
        leadsTableBody.innerHTML = '';
        exportLeadsBtn.disabled = true;
        clearLeadsBtn.disabled = true;
        return;
    } else {
        noLeadsMessage.style.display = 'none';
        exportLeadsBtn.disabled = false;
        clearLeadsBtn.disabled = false;
    }
    
    // Populate leads table
    leadsTableBody.innerHTML = '';
    leads.forEach(lead => {
        const row = document.createElement('tr');
        
        const timestamp = new Date(lead.timestamp);
        const formattedDate = timestamp.toLocaleDateString() + ' ' + timestamp.toLocaleTimeString();
        
        row.innerHTML = `
            <td>${lead.name}</td>
            <td>${lead.email}</td>
            <td>${formattedDate}</td>
            <td>${lead.widgetId || 'default'}</td>
        `;
        
        leadsTableBody.appendChild(row);
    });
    
    // Export leads to CSV
    exportLeadsBtn.addEventListener('click', function() {
        exportLeadsToCSV(leads);
    });
    
    // Clear all leads
    clearLeadsBtn.addEventListener('click', function() {
        if (confirm('Are you sure you want to delete all leads? This cannot be undone.')) {
            localStorage.removeItem('calorieWidgetLeads');
            loadLeads(); // Reload leads (will show empty state)
        }
    });
}

// Export leads to CSV file
function exportLeadsToCSV(leads) {
    // Create CSV content
    let csvContent = 'Name,Email,Date,Widget ID\n';
    
    leads.forEach(lead => {
        const timestamp = new Date(lead.timestamp);
        const formattedDate = timestamp.toLocaleString();
        
        csvContent += `"${lead.name}","${lead.email}","${formattedDate}","${lead.widgetId || 'default'}"\n`;
    });
    
    // Create download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    
    link.setAttribute('href', url);
    link.setAttribute('download', 'calorie-widget-leads.csv');
    link.style.display = 'none';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}