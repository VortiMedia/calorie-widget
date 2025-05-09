# Calorie Widget Project Context

## Project Overview
The Calorie Widget is a modern, embeddable calculator that doubles as a lead generation tool specifically for gyms. It allows users to calculate their daily calorie needs using the Mifflin-St Jeor formula, while gym owners can capture leads through a blurred results page that requires email submission.

### Key Features
1. **Customizable Widget**
   - Branding (colors, logo, text)
   - Lead capture form customization
   - Imperial/metric unit toggle
   - Modern, responsive design

2. **Admin Dashboard**
   - Widget customization interface
   - Lead management and export
   - Embed code generation
   - Multiple embed options (standard, one-line, iframe)

3. **Lead Generation**
   - Blurred results requiring name/email
   - Customizable lead form text
   - Lead export functionality
   - Integration options (placeholder)

4. **Calculator Functionality**
   - Mifflin-St Jeor formula implementation
   - Activity level adjustments
   - Goals for maintenance, weight loss, and gain
   - Unit conversion support

## Project Structure
- `/src/` - Source code for the widget
  - `/js/components/` - React components
  - `/js/utils/` - Utility functions
  - `/css/` - Stylesheet
- `/dashboard/` - Admin dashboard for gym owners
- `/dist/` - Built widget files
- `/public/` - Static files including the redirect to dashboard
- `/specs/` - Project specifications

## Technical Implementation
- **Frontend**: React with styled-components
- **Build**: Webpack
- **Deployment**: Vercel
- **Data Storage**: localStorage (for demo purposes)
- **Embedding**: JavaScript API and iframe options

## Important Files
1. **Widget Components**
   - `CalorieCalculator.jsx` - Main widget component
   - `CalculatorForm.jsx` - Input form for user data
   - `ResultsDisplay.jsx` - Results display with lead capture

2. **Dashboard**
   - `dashboard/index.html` - Dashboard UI
   - `dashboard/dashboard.js` - Dashboard functionality
   - `dashboard/styles.css` - Dashboard styling

3. **Configuration**
   - `vercel.json` - Deployment configuration
   - `webpack.config.js` - Build configuration

4. **Core Functionality**
   - `src/js/utils/calculator.js` - Calculation logic
   - `src/js/index.js` - Widget initialization
   - `public/index.html` - Root redirect to dashboard

## Context Prime Command
To start this project, use:
```
claude-code --load_context=/Users/david/calorie-widget/specs/project-context.md
```

## Current Status
The project is fully functional with:
- Working calorie calculator widget
- Lead generation functionality
- Admin dashboard for customization
- Embed code generation
- Vercel deployment

## Future Improvements
1. Server-side lead storage (beyond localStorage)
2. Actual email integration (beyond placeholders)
3. Analytics for widget usage and conversion rate
4. A/B testing for lead form variations
5. Enhanced customization options