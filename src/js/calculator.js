/**
 * Calorie Calculator Module
 * Handles all calculations for the calorie calculator widget
 */
const CalorieCalculator = (function() {
    /**
     * Calculate BMR using the Mifflin-St Jeor Equation
     * @param {Object} userData - User data for calculation
     * @param {string} userData.gender - 'male' or 'female'
     * @param {number} userData.weight - Weight in kg
     * @param {number} userData.height - Height in cm
     * @param {number} userData.age - Age in years
     * @returns {number} BMR value in calories
     */
    function calculateBMR(userData) {
        // Convert units if needed
        const weight = userData.weightUnit === 'lbs' ? userData.weight * 0.453592 : userData.weight;
        const height = userData.heightUnit === 'inches' ? userData.height * 2.54 : userData.height;
        
        // Mifflin-St Jeor Equation
        if (userData.gender === 'male') {
            return Math.round((10 * weight) + (6.25 * height) - (5 * userData.age) + 5);
        } else {
            return Math.round((10 * weight) + (6.25 * height) - (5 * userData.age) - 161);
        }
    }
    
    /**
     * Calculate Total Daily Energy Expenditure
     * @param {number} bmr - Base Metabolic Rate
     * @param {number} activityMultiplier - Activity level multiplier
     * @returns {number} TDEE value in calories
     */
    function calculateTDEE(bmr, activityMultiplier) {
        return Math.round(bmr * activityMultiplier);
    }
    
    /**
     * Calculate calorie targets for different goals
     * @param {number} tdee - Total Daily Energy Expenditure
     * @returns {Object} Object containing calorie targets for different goals
     */
    function calculateCalorieTargets(tdee) {
        return {
            moderateLoss: Math.round(tdee - 500),
            aggressiveLoss: Math.round(tdee - 1000),
            maintenance: tdee,
            moderateGain: Math.round(tdee + 500),
            aggressiveGain: Math.round(tdee + 1000)
        };
    }
    
    /**
     * Run all calculations and return comprehensive results
     * @param {Object} userData - User data for calculation
     * @returns {Object} Complete calculation results
     */
    function calculateAll(userData) {
        const bmr = calculateBMR(userData);
        const tdee = calculateTDEE(bmr, parseFloat(userData.activityLevel));
        const calorieTargets = calculateCalorieTargets(tdee);
        
        return {
            bmr: bmr,
            tdee: tdee,
            ...calorieTargets
        };
    }
    
    // Public API
    return {
        calculateBMR: calculateBMR,
        calculateTDEE: calculateTDEE,
        calculateCalorieTargets: calculateCalorieTargets,
        calculateAll: calculateAll
    };
})();

// Export for use in CommonJS environments (optional)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CalorieCalculator;
}