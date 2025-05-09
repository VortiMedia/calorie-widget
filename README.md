# Calorie Calculator Widget

A modern, customizable calorie calculator widget that can be embedded on any website, including Framer sites.

![Calorie Calculator Widget](https://placehold.co/600x400/4361EE/white?text=Calorie+Calculator+Widget)

## Features

- **Modern UI**: Clean, responsive design with customizable themes
- **Easy Embedding**: Simple script tag integration for any website
- **Customizable**: Change colors, text, and layout to match your brand
- **Lead Generation**: Capture emails with a built-in lead form
- **Multiple Calculation Features**: BMR, TDEE, weight loss/gain targets
- **Metric & Imperial**: Support for both measurement systems
- **Print Support**: Users can print their results

## Getting Started

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/calorie-widget.git
cd calorie-widget
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Build for production:
```bash
npm run build
```

### Deployment

The widget can be deployed to Vercel with a single command:

```bash
npm run deploy
```

## Usage

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

### One-Line Embed

```html
<script src="https://your-domain.com/calorie-widget.js" data-container="calorie-calculator"></script>
```

### Customization

```html
<div id="calorie-calculator"></div>
<script src="https://your-domain.com/calorie-widget.js"></script>
<script>
  document.addEventListener('DOMContentLoaded', function() {
    CalorieWidget.init('calorie-calculator', {
      primaryColor: '#2ecc71',
      secondaryColor: '#27ae60',
      title: 'Eco Calorie Calculator',
      subtitle: 'Calculate your daily energy needs',
      footerText: 'Powered by green energy and science'
    });
  });
</script>
```

### Lead Generation Feature

The widget includes a built-in lead generation feature that blurs the results until users provide their name and email address:

```html
<div id="lead-gen-widget"></div>
<script src="https://your-domain.com/calorie-widget.js"></script>
<script>
  document.addEventListener('DOMContentLoaded', function() {
    const widget = CalorieWidget.init('lead-gen-widget', {
      // Enable lead capture (enabled by default)
      requireLeadCapture: true,
      
      // Custom lead form handler
      onLeadCapture: function(leadData) {
        // Send the lead data to your CRM or email service
        sendToMailchimp(leadData);
      }
    });
    
    // Later, you can retrieve captured leads
    const leads = widget.getLeads();
    console.log(leads);
  });
</script>
```

Disable lead capture if not needed:

```html
<script src="https://your-domain.com/calorie-widget.js" 
  data-container="calorie-calculator"
  data-require-lead-capture="false">
</script>
```

## Documentation

For detailed documentation on embedding and customization options, see:

- [Widget Embedding Guide](./ai-docs/widget-embedding.md)
- [Calorie Formulas Documentation](./ai-docs/calorie-formulas.md)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

ISC

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.