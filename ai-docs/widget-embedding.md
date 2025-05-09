# Calorie Calculator Widget: Embedding Guide

This guide explains how to embed the Calorie Calculator Widget on any website, including Framer sites.

## Quick Start

Add the following HTML to your website where you want the widget to appear:

```html
<!-- 1. Create a container for the widget -->
<div id="calorie-calculator"></div>

<!-- 2. Load the widget script -->
<script src="https://your-domain.com/calorie-widget.js"></script>

<!-- 3. Initialize the widget -->
<script>
  document.addEventListener('DOMContentLoaded', function() {
    if (typeof CalorieWidget !== 'undefined') {
      CalorieWidget.init('calorie-calculator');
    }
  });
</script>
```

## One-Line Embed (Recommended for Framer)

For the simplest possible integration, use this single line of code:

```html
<script src="https://your-domain.com/calorie-widget.js" data-container="calorie-calculator"></script>
```

This will:
1. Create a container div with ID "calorie-calculator"
2. Load the widget script
3. Automatically initialize the widget

## Customization Options

Customize the widget's appearance and content by passing options to the `init` function:

```html
<div id="calorie-calculator"></div>
<script src="https://your-domain.com/calorie-widget.js"></script>
<script>
  document.addEventListener('DOMContentLoaded', function() {
    CalorieWidget.init('calorie-calculator', {
      // Color scheme
      primaryColor: '#4361EE',   // Header and button color
      secondaryColor: '#3A0CA3', // Secondary button color
      
      // Text content
      title: 'Calorie Calculator',
      subtitle: 'Calculate your daily calorie needs',
      footerText: 'Results based on Mifflin-St Jeor Equation',
      
      // Layout
      maxWidth: '600px',
      
      // Lead generation (enabled by default)
      requireLeadCapture: true,  // Require name/email to view results
      
      // Custom lead capture handler
      onLeadCapture: function(leadData) {
        // Handle the lead data (name, email)
        console.log('Lead captured:', leadData);
        
        // You can send this data to your CRM or email service
        // Example: sendToMailchimp(leadData);
      }
    });
  });
</script>
```

## Lead Generation Feature

The widget includes a built-in lead generation feature that blurs the results until users provide their name and email address:

### Enabling/Disabling Lead Capture

```html
<!-- Enable lead capture (default) -->
<script src="https://your-domain.com/calorie-widget.js" 
  data-container="calorie-calculator"
  data-require-lead-capture="true">
</script>

<!-- Disable lead capture -->
<script src="https://your-domain.com/calorie-widget.js" 
  data-container="calorie-calculator"
  data-require-lead-capture="false">
</script>
```

### Customizing the Lead Form

You can customize the lead form texts through these options:

```html
<script>
  CalorieWidget.init('calorie-calculator', {
    leadFormTitle: 'Get Your Custom Results', 
    leadFormDescription: 'Enter your details to see your personalized calorie plan',
    leadFormButtonText: 'Show My Results',
    leadFormPrivacyText: 'We value your privacy and will never spam you'
  });
</script>
```

### Handling Captured Leads

There are two ways to access the captured leads:

1. **Custom Handler Function**: Provide an `onLeadCapture` callback function
   ```javascript
   CalorieWidget.init('calorie-calculator', {
     onLeadCapture: function(leadData) {
       // Send to your CRM or email service
       sendToMailchimp({
         email: leadData.email,
         firstName: leadData.name,
         tags: ['calorie-calculator']
       });
     }
   });
   ```

2. **Accessing Stored Leads**: The widget stores leads in localStorage for demo purposes
   ```javascript
   // Get the widget instance
   const widget = CalorieWidget.init('calorie-calculator');
   
   // Later, retrieve the leads
   const leads = widget.getLeads();
   console.log(leads); // Array of captured leads with timestamps
   ```

## For Framer Sites

When embedding on Framer sites:

1. In Framer, add an HTML Embed component to your page
2. Paste the one-line embed code into the HTML field:

```html
<script src="https://your-domain.com/calorie-widget.js" 
  data-container="calorie-calculator"
  data-primary-color="#9b59b6"
  data-secondary-color="#8e44ad"
  data-title="Fitness Calorie Calculator">
</script>
```

## Advanced Usage: Data Attribute Customization

You can customize the widget using data attributes:

```html
<script 
  src="https://your-domain.com/calorie-widget.js" 
  data-container="calorie-calculator"
  data-primary-color="#2ecc71"
  data-secondary-color="#27ae60"
  data-title="Eco Calorie Calculator"
  data-subtitle="Calculate your daily energy needs"
  data-footer-text="Powered by green energy and science"
  data-require-lead-capture="true"
></script>
```

## API Reference

The CalorieWidget object provides the following methods:

### `CalorieWidget.init(containerId, options)`

Initializes the widget in the specified container.

- `containerId`: String ID of the container element
- `options`: Object containing customization options

Returns an object with the following methods:
- `update(newOptions)`: Update the widget with new options
- `unmount()`: Remove the widget from the DOM
- `getLeads()`: Get all leads captured by this widget instance

### Customization Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `primaryColor` | String | `#4361EE` | Main color for header and buttons |
| `secondaryColor` | String | `#3A0CA3` | Secondary color for hover states |
| `title` | String | `Calorie Calculator` | Widget title |
| `subtitle` | String | `Calculate your daily calorie needs` | Widget subtitle |
| `footerText` | String | `Results based on Mifflin-St Jeor Equation` | Footer text |
| `maxWidth` | String | `600px` | Maximum width of the widget |
| `requireLeadCapture` | Boolean | `true` | Require name/email to view results |
| `onLeadCapture` | Function | `null` | Callback function when a lead is captured |
| `leadFormTitle` | String | `Your Results Are Ready!` | Lead form title |
| `leadFormDescription` | String | `Enter your name and email...` | Lead form description |
| `leadFormButtonText` | String | `Unlock My Results` | Lead form button text |
| `leadFormPrivacyText` | String | `We respect your privacy...` | Lead form privacy text |

## Examples

### Basic Embedding

```html
<div id="calorie-calculator"></div>
<script src="https://your-domain.com/calorie-widget.js"></script>
<script>
  document.addEventListener('DOMContentLoaded', function() {
    CalorieWidget.init('calorie-calculator');
  });
</script>
```

### Lead Generation Enabled

```html
<div id="lead-gen-widget"></div>
<script src="https://your-domain.com/calorie-widget.js"></script>
<script>
  document.addEventListener('DOMContentLoaded', function() {
    CalorieWidget.init('lead-gen-widget', {
      primaryColor: '#3B82F6',
      secondaryColor: '#1D4ED8',
      title: 'Premium Calorie Calculator',
      requireLeadCapture: true,
      onLeadCapture: function(data) {
        // Send lead data to your server
        fetch('https://your-api.com/leads', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
      }
    });
  });
</script>
```

### No Lead Capture

```html
<div id="no-lead-widget"></div>
<script src="https://your-domain.com/calorie-widget.js"></script>
<script>
  document.addEventListener('DOMContentLoaded', function() {
    CalorieWidget.init('no-lead-widget', {
      primaryColor: '#10B981',
      secondaryColor: '#059669',
      title: 'Free Calorie Calculator',
      requireLeadCapture: false
    });
  });
</script>
```