# Calorie Calculator Widget Embedding Guide

This guide explains how to embed the Calorie Calculator Widget on various platforms including WordPress, Framer, and standard HTML websites.

## Available Embedding Methods

The Calorie Calculator Widget offers three embedding options:

1. **Standard Embed**: The most versatile method, providing full customization and configuration options
2. **One-Line Embed**: The simplest method, using just a single script tag with data attributes
3. **iframe Embed**: A completely isolated embed, perfect for platforms with strict Content Security Policies

## Embedding on WordPress

### Using the Standard Embed

1. Go to your WordPress dashboard
2. Navigate to the page or post where you want to add the widget
3. Switch to the "Text" or "HTML" editor view
4. Paste your embed code (generated from the dashboard)
5. Save/update your page or post

### Using a WordPress Plugin

For the most seamless WordPress integration, you can use a shortcode:

1. Install the "Custom HTML Widget" plugin if not already active
2. Go to Appearance > Widgets
3. Add a "Custom HTML" widget to your desired widget area
4. Paste your embed code into the widget
5. Save the widget

### Adding to WordPress Block Editor (Gutenberg)

1. In the Block Editor, add a new "Custom HTML" block
2. Paste your embed code into the block
3. Save your page or post

## Embedding on Framer

### Using the iframe Embed (Recommended for Framer)

1. In Framer, add a new "HTML Embed" component to your design
2. Paste the iframe embed code generated from the dashboard
3. Adjust the size as needed in your Framer design

### Using the JavaScript Embed

1. In Framer, add a new "HTML Embed" component
2. Paste the Standard embed code
3. Publish your Framer project

## Embedding on Custom HTML Websites

### Standard HTML Site

Simply paste any of the three embed code types into your HTML where you want the widget to appear. The Standard embed is recommended for maximum control.

```html
<!-- Paste your embed code here -->
<div id="calorie-calculator"></div>
<script src="https://your-domain.com/calorie-widget.js"></script>
<script>
  document.addEventListener('DOMContentLoaded', function() {
    if (typeof CalorieWidget !== 'undefined') {
      CalorieWidget.init('calorie-calculator', {
        // Your configuration options here
      });
    }
  });
</script>
```

### React Applications

If you're integrating with a React application, you can:

1. Include the script in your HTML template:
   ```html
   <script src="https://your-domain.com/calorie-widget.js"></script>
   ```

2. Add a container div with an ID:
   ```jsx
   function YourComponent() {
     useEffect(() => {
       if (window.CalorieWidget) {
         window.CalorieWidget.init('calorie-calculator', {
           // Your configuration options
         });
       }
     }, []);
     
     return <div id="calorie-calculator"></div>;
   }
   ```

## Widget Customization Options

All embedding methods support the following customization options:

| Option | Description | Default Value |
|--------|-------------|---------------|
| `primaryColor` | Primary theme color | `#4361EE` |
| `secondaryColor` | Secondary theme color | `#3A0CA3` |
| `title` | Widget title | `Calorie Calculator` |
| `subtitle` | Widget subtitle | `Calculate your daily calorie needs` |
| `footerText` | Footer text | `Results based on Mifflin-St Jeor Equation` |
| `maxWidth` | Maximum width in pixels | `600` |
| `requireLeadCapture` | Enable lead capture form | `true` |
| `imperialUnits` | Use imperial units (inches/lbs) | `true` |
| `calculationFormula` | Formula to use (`mifflin` or `harris`) | `mifflin` |
| `logoUrl` | URL to your logo image | - |

## Troubleshooting

### Widget Not Displaying

- Ensure the script URL is correct and accessible
- Check that the container ID matches in both the div and initialization code
- Verify there are no JavaScript errors in your browser console

### Lead Capture Not Working

- Confirm that `requireLeadCapture` is set to `true`
- Check your browser console for any errors when submitting the form
- Verify your integration settings if using an email service

### Styling Issues

- If the widget style conflicts with your site, try using the iframe embed
- Custom CSS can be added to your site to override widget styles
- Adjust the `maxWidth` parameter to better fit your layout

## Need Help?

For additional assistance or custom integration help, please contact our support team.