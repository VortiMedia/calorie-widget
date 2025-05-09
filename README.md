# Calorie Calculator Widget

An embeddable calorie calculator widget for gyms, fitness websites, and nutrition professionals. This widget helps visitors calculate their daily calorie needs and can capture leads for your business.

## Features

- 🧮 Calculates BMR, TDEE, and calorie targets using Mifflin-St Jeor or Harris-Benedict formulas
- 📱 Responsive design that works on desktop and mobile
- 🎨 Fully customizable colors, text, and branding
- 📋 Optional lead capture form to grow your email list
- 📊 Integration with email marketing services (Mailchimp, ConvertKit, etc.)
- 🔌 Easy embedding on any website, WordPress, or Framer

## Demo

View the live demo: [Calorie Calculator Widget Demo](https://your-demo-url.com)

![Widget Preview](preview.png)

## Quick Start

1. Clone this repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server with hot reloading:
   ```
   npm run dev
   ```
   This will open the widget in your browser at http://localhost:3000

4. Access the dashboard:
   ```
   http://localhost:3000/dashboard
   ```
   This is where you can customize the widget and get embed codes

5. Build the production version:
   ```
   npm run build
   ```
   This will create the dist folder with all files needed for deployment

6. Deploy to Vercel:
   ```
   npm run deploy
   ```
   This will deploy the app to Vercel for hosting

## Customization Dashboard

The widget includes a dashboard where you can:

- Customize colors, text, and branding
- Configure lead capture settings
- Connect to email marketing services
- Generate embed codes for your website
- View and export captured leads

Access the dashboard at: `/dashboard`

## Embedding Options

The widget can be embedded in several ways:

### Standard Embed

```html
<div id="calorie-calculator"></div>
<script src="https://your-domain.com/calorie-widget.js"></script>
<script>
  document.addEventListener('DOMContentLoaded', function() {
    if (typeof CalorieWidget !== 'undefined') {
      CalorieWidget.init('calorie-calculator', {
        primaryColor: '#4361EE',
        secondaryColor: '#3A0CA3',
        title: 'Calorie Calculator',
        // More options...
      });
    }
  });
</script>
```

### One-Line Embed

```html
<script 
  src="https://your-domain.com/calorie-widget.js" 
  data-container="calorie-calculator" 
  data-primary-color="#4361EE" 
  data-title="Calorie Calculator">
</script>
```

### iframe Embed

```html
<iframe 
  src="https://your-domain.com/widget-preview?primaryColor=%234361EE" 
  width="600" 
  height="620" 
  style="border: none; width: 100%; max-width: 600px;" 
  title="Calorie Calculator" 
  loading="lazy">
</iframe>
```

For detailed embedding instructions, see [Widget Embedding Guide](ai-docs/widget-embedding.md).

## Documentation

- [Calorie Calculation Formulas](ai-docs/calorie-formulas.md)
- [Widget Embedding Guide](ai-docs/widget-embedding.md)
- [Widget Specification](specs/calorie-calculator-widget-specification.md)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

[ISC License](LICENSE)