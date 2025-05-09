/**
 * UI Handler Module
 * Manages all user interactions for the calorie calculator widget
 */
const CalorieCalculatorUI = (function() {
    // Cache DOM elements
    const form = document.getElementById('calculator-form');
    const resultsContainer = document.getElementById('results');
    const recalculateBtn = document.getElementById('recalculate-btn');
    const printBtn = document.getElementById('print-btn');
    
    // Form elements
    const genderSelect = document.getElementById('gender');
    const ageInput = document.getElementById('age');
    const heightInput = document.getElementById('height');
    const heightUnitSelect = document.getElementById('height-unit');
    const weightInput = document.getElementById('weight');
    const weightUnitSelect = document.getElementById('weight-unit');
    const activitySelect = document.getElementById('activity');
    
    // Result elements
    const bmrValue = document.getElementById('bmr-value');
    const tdeeValue = document.getElementById('tdee-value');
    const moderateLoss = document.getElementById('moderate-loss');
    const aggressiveLoss = document.getElementById('aggressive-loss');
    const moderateGain = document.getElementById('moderate-gain');
    const aggressiveGain = document.getElementById('aggressive-gain');
    
    /**
     * Initialize the UI event listeners
     */
    function init() {
        form.addEventListener('submit', handleFormSubmit);
        recalculateBtn.addEventListener('click', resetCalculator);
        printBtn.addEventListener('click', printResults);
        
        // Handle unit changes
        heightUnitSelect.addEventListener('change', updateHeightPlaceholder);
        weightUnitSelect.addEventListener('change', updateWeightPlaceholder);
        
        // Initialize placeholders
        updateHeightPlaceholder();
        updateWeightPlaceholder();
        
        // Hide results initially
        resultsContainer.style.display = 'none';
    }
    
    /**
     * Update height input placeholder based on selected unit
     */
    function updateHeightPlaceholder() {
        const unit = heightUnitSelect.value;
        if (unit === 'cm') {
            heightInput.placeholder = 'Height (cm)';
            heightInput.min = '100';
            heightInput.max = '250';
        } else {
            heightInput.placeholder = 'Height (inches)';
            heightInput.min = '40';
            heightInput.max = '96';
        }
    }
    
    /**
     * Update weight input placeholder based on selected unit
     */
    function updateWeightPlaceholder() {
        const unit = weightUnitSelect.value;
        if (unit === 'kg') {
            weightInput.placeholder = 'Weight (kg)';
            weightInput.min = '30';
            weightInput.max = '300';
        } else {
            weightInput.placeholder = 'Weight (lbs)';
            weightInput.min = '66';
            weightInput.max = '660';
        }
    }
    
    /**
     * Handle form submission
     * @param {Event} e - Form submit event
     */
    function handleFormSubmit(e) {
        e.preventDefault();
        
        // Collect form data
        const userData = {
            gender: genderSelect.value,
            age: parseInt(ageInput.value),
            height: parseFloat(heightInput.value),
            heightUnit: heightUnitSelect.value,
            weight: parseFloat(weightInput.value),
            weightUnit: weightUnitSelect.value,
            activityLevel: activitySelect.value
        };
        
        // Calculate results
        const results = CalorieCalculator.calculateAll(userData);
        
        // Display results
        displayResults(results);
    }
    
    /**
     * Display calculation results
     * @param {Object} results - Calculation results
     */
    function displayResults(results) {
        // Update result elements
        bmrValue.textContent = results.bmr;
        tdeeValue.textContent = results.tdee;
        moderateLoss.textContent = results.moderateLoss;
        aggressiveLoss.textContent = results.aggressiveLoss;
        moderateGain.textContent = results.moderateGain;
        aggressiveGain.textContent = results.aggressiveGain;
        
        // Hide form and show results
        form.style.display = 'none';
        resultsContainer.style.display = 'block';
    }
    
    /**
     * Reset calculator to initial state
     */
    function resetCalculator() {
        // Show form and hide results
        form.style.display = 'block';
        resultsContainer.style.display = 'none';
    }
    
    /**
     * Print the results
     */
    function printResults() {
        window.print();
    }
    
    // Public API
    return {
        init: init
    };
})();

// Initialize UI when DOM is fully loaded
document.addEventListener('DOMContentLoaded', CalorieCalculatorUI.init);