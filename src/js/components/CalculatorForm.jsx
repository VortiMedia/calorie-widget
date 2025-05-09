import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Form = styled.form`
  padding: 2rem;
  background: #FFFFFF;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  margin-bottom: 2rem;
  
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const InputGroup = styled.div`
  position: relative;
  
  &:nth-child(5) {
    grid-column: span 2;
    
    @media (max-width: 600px) {
      grid-column: span 1;
    }
  }
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.6rem;
  font-weight: 500;
  font-size: 0.95rem;
  color: #4B5563;
  transition: color 0.3s ease;
`;

const inputStyles = `
  width: 100%;
  padding: 0.9rem 1rem;
  border: 1px solid #E5E7EB;
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background-color: #F9FAFB;
  color: #1F2937;
  
  &:hover {
    border-color: #D1D5DB;
    background-color: #FFFFFF;
  }
  
  &:focus {
    outline: none;
    border-color: ${props => props.focusColor || '#4361EE'};
    box-shadow: 0 0 0 3px rgba(67, 97, 238, 0.15);
    background-color: #FFFFFF;
  }
`;

const Input = styled.input`
  ${inputStyles}
`;

const Select = styled.select`
  ${inputStyles}
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%236B7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  background-size: 1em;
  padding-right: 2.5rem;
`;

const UnitInputContainer = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const UnitInput = styled(Input)`
  flex: 3;
`;

const UnitSelect = styled(Select)`
  flex: 1;
  min-width: 80px;
`;

const GenderSelector = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const GenderOption = styled.div`
  flex: 1;
  position: relative;
`;

const GenderInput = styled.input`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
  
  &:checked + label {
    background-color: ${props => `${props.checkedColor}15` || '#4361EE15'};
    border-color: ${props => props.checkedColor || '#4361EE'};
    color: ${props => props.checkedColor || '#4361EE'};
  }
  
  &:focus + label {
    box-shadow: 0 0 0 3px rgba(67, 97, 238, 0.15);
  }
`;

const GenderLabel = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 1.2rem;
  border: 1px solid #E5E7EB;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  background-color: #F9FAFB;
  
  &:hover {
    background-color: #FFFFFF;
    border-color: #D1D5DB;
  }
  
  &:before {
    content: ${props => props.gender === 'male' ? '"👨"' : '"👩"'};
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }
`;

const CalculateButton = styled.button`
  display: block;
  width: 100%;
  padding: 1rem;
  background: linear-gradient(135deg, ${props => props.primaryColor || '#4361EE'}, ${props => props.secondaryColor || '#3A0CA3'});
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(67, 97, 238, 0.15);
  position: relative;
  overflow: hidden;
  
  &:after {
    content: "";
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0) 80%);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 10px rgba(67, 97, 238, 0.25);
    
    &:after {
      opacity: 1;
    }
  }
  
  &:active {
    transform: translateY(1px);
    box-shadow: 0 2px 4px rgba(67, 97, 238, 0.2);
  }
`;

const ActivityLevelGroup = styled.div`
  margin-bottom: 2rem;
`;

const ActivitySlider = styled.input`
  width: 100%;
  height: 8px;
  -webkit-appearance: none;
  border-radius: 4px;
  background: linear-gradient(to right, 
    ${props => props.color || '#4361EE'} 0%, 
    ${props => props.color || '#4361EE'} ${props => props.progress || '0%'}, 
    #E5E7EB ${props => props.progress || '0%'}, 
    #E5E7EB 100%
  );
  outline: none;
  
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: white;
    border: 2px solid ${props => props.color || '#4361EE'};
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
  }
  
  &::-webkit-slider-thumb:hover {
    transform: scale(1.1);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.15);
  }
  
  &::-moz-range-thumb {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: white;
    border: 2px solid ${props => props.color || '#4361EE'};
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
  }
  
  &::-moz-range-thumb:hover {
    transform: scale(1.1);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.15);
  }
`;

const ActivityLevelDescription = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  background-color: ${props => `${props.bgColor}10` || '#4361EE10'};
  border-radius: 12px;
  color: #4B5563;
`;

const CalculatorForm = ({ onCalculate, primaryColor, secondaryColor }) => {
  const [formData, setFormData] = useState({
    gender: 'male',
    age: '',
    height: '',
    heightUnit: 'cm',
    weight: '',
    weightUnit: 'kg',
    activityLevel: '1.2'
  });
  
  const [heightPlaceholder, setHeightPlaceholder] = useState('Height (cm)');
  const [weightPlaceholder, setWeightPlaceholder] = useState('Weight (kg)');
  const [activityProgress, setActivityProgress] = useState('0%');
  const [activityDescription, setActivityDescription] = useState('Little or no exercise');
  
  const activityLevelDescriptions = {
    '1.2': 'Little or no exercise, desk job',
    '1.375': 'Light exercise 1-3 days per week',
    '1.55': 'Moderate exercise 3-5 days per week',
    '1.725': 'Hard exercise 6-7 days per week',
    '1.9': 'Physical job or twice daily training'
  };
  
  const calculateActivityProgress = (level) => {
    const min = 1.2;
    const max = 1.9;
    const percentage = ((level - min) / (max - min)) * 100;
    return `${percentage}%`;
  };
  
  useEffect(() => {
    // Update placeholders when units change
    updateHeightPlaceholder();
    updateWeightPlaceholder();
  }, [formData.heightUnit, formData.weightUnit]);
  
  useEffect(() => {
    setActivityProgress(calculateActivityProgress(parseFloat(formData.activityLevel)));
    setActivityDescription(activityLevelDescriptions[formData.activityLevel]);
  }, [formData.activityLevel]);
  
  const updateHeightPlaceholder = () => {
    if (formData.heightUnit === 'cm') {
      setHeightPlaceholder('Height (cm)');
    } else {
      setHeightPlaceholder('Height (inches)');
    }
  };
  
  const updateWeightPlaceholder = () => {
    if (formData.weightUnit === 'kg') {
      setWeightPlaceholder('Weight (kg)');
    } else {
      setWeightPlaceholder('Weight (lbs)');
    }
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onCalculate(formData);
  };
  
  return (
    <Form id="calculator-form" onSubmit={handleSubmit}>
      <GenderSelector>
        <GenderOption>
          <GenderInput 
            type="radio" 
            id="male" 
            name="gender" 
            value="male"
            checked={formData.gender === 'male'}
            onChange={handleChange}
            checkedColor={primaryColor}
          />
          <GenderLabel htmlFor="male" gender="male">Male</GenderLabel>
        </GenderOption>
        
        <GenderOption>
          <GenderInput 
            type="radio" 
            id="female" 
            name="gender" 
            value="female"
            checked={formData.gender === 'female'}
            onChange={handleChange}
            checkedColor={primaryColor}
          />
          <GenderLabel htmlFor="female" gender="female">Female</GenderLabel>
        </GenderOption>
      </GenderSelector>
      
      <FormGrid>
        <InputGroup>
          <Label htmlFor="age">Age</Label>
          <Input 
            type="number" 
            id="age" 
            name="age"
            value={formData.age}
            onChange={handleChange}
            min="15" 
            max="100"
            placeholder="Age (years)"
            focusColor={primaryColor}
            required
          />
        </InputGroup>
        
        <InputGroup>
          <Label htmlFor="weight">Weight</Label>
          <UnitInputContainer>
            <UnitInput 
              type="number" 
              id="weight"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              min={formData.weightUnit === 'kg' ? "30" : "66"} 
              max={formData.weightUnit === 'kg' ? "300" : "660"}
              placeholder={weightPlaceholder}
              focusColor={primaryColor}
              required
            />
            <UnitSelect 
              id="weightUnit" 
              name="weightUnit"
              value={formData.weightUnit}
              onChange={handleChange}
              focusColor={primaryColor}
            >
              <option value="kg">kg</option>
              <option value="lbs">lbs</option>
            </UnitSelect>
          </UnitInputContainer>
        </InputGroup>
        
        <InputGroup>
          <Label htmlFor="height">Height</Label>
          <UnitInputContainer>
            <UnitInput 
              type="number" 
              id="height"
              name="height"
              value={formData.height}
              onChange={handleChange}
              min={formData.heightUnit === 'cm' ? "100" : "40"} 
              max={formData.heightUnit === 'cm' ? "250" : "96"}
              placeholder={heightPlaceholder}
              focusColor={primaryColor}
              required
            />
            <UnitSelect 
              id="heightUnit" 
              name="heightUnit"
              value={formData.heightUnit}
              onChange={handleChange}
              focusColor={primaryColor}
            >
              <option value="cm">cm</option>
              <option value="inches">in</option>
            </UnitSelect>
          </UnitInputContainer>
        </InputGroup>
      </FormGrid>
      
      <ActivityLevelGroup>
        <Label htmlFor="activityLevel">Activity Level</Label>
        <ActivitySlider 
          type="range"
          id="activityLevel"
          name="activityLevel"
          min="1.2"
          max="1.9"
          step="0.175"
          value={formData.activityLevel}
          onChange={handleChange}
          color={primaryColor}
          progress={activityProgress}
        />
        <ActivityLevelDescription bgColor={primaryColor}>
          <strong>{activityDescription}</strong>
        </ActivityLevelDescription>
      </ActivityLevelGroup>
      
      <CalculateButton 
        type="submit" 
        className="calculate-btn"
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
      >
        Calculate Calories
      </CalculateButton>
    </Form>
  );
};

export default CalculatorForm;