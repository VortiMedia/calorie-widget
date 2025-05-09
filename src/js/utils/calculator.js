/**
 * Calculate BMR using the Mifflin-St Jeor Equation
 * @param {Object} userData - User data for calculation
 * @param {string} userData.gender - 'male' or 'female'
 * @param {number} userData.weight - Weight in user-specified unit
 * @param {string} userData.weightUnit - 'kg' or 'lbs'
 * @param {number} userData.height - Height in user-specified unit
 * @param {string} userData.heightUnit - 'cm' or 'inches'
 * @param {number} userData.age - Age in years
 * @returns {number} BMR value in calories
 */
export function calculateBMR(userData) {
  // Convert units to metric if needed
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
export function calculateTDEE(bmr, activityMultiplier) {
  return Math.round(bmr * activityMultiplier);
}

/**
 * Calculate calorie targets for different goals
 * @param {number} tdee - Total Daily Energy Expenditure
 * @returns {Object} Object containing calorie targets for different goals
 */
export function calculateCalorieTargets(tdee) {
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
export function calculateAll(userData) {
  const bmr = calculateBMR(userData);
  const tdee = calculateTDEE(bmr, parseFloat(userData.activityLevel));
  const calorieTargets = calculateCalorieTargets(tdee);
  
  return {
    bmr: bmr,
    tdee: tdee,
    ...calorieTargets
  };
}