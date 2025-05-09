import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 2rem;
  background: #FFFFFF;
  position: relative;
`;

const ResultsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const ResultCard = styled.div`
  background-color: #F9FAFB;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(229, 231, 235, 0.5);
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.08);
  }
  
  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background: ${props => props.accentColor || props.color || '#4361EE'};
  }
`;

const MainResultCard = styled(ResultCard)`
  background: linear-gradient(135deg, ${props => `${props.color}10` || '#4361EE10'}, ${props => `${props.secondaryColor}05` || '#3A0CA305'});
  text-align: center;
  padding: 2rem;
  margin-bottom: 1.5rem;

  &:before {
    width: 100%;
    height: 4px;
    top: 0;
    left: 0;
  }
`;

const CardTitle = styled.h3`
  margin-bottom: 1.2rem;
  color: ${props => props.color || '#4361EE'};
  font-weight: 700;
  font-size: 1.2rem;
  position: relative;
  
  &:after {
    content: "";
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 50px;
    height: 2px;
    background-color: ${props => props.color || '#4361EE'};
    opacity: 0.5;
  }
`;

const MainCardTitle = styled.h3`
  margin-bottom: 0.5rem;
  color: ${props => props.color || '#4361EE'};
  font-weight: 700;
  font-size: 1.3rem;
  
  &:after {
    display: none;
  }
`;

const MaintenanceValue = styled.div`
  font-size: 2.5rem;
  font-weight: 800;
  color: ${props => props.color || '#4361EE'};
  margin: 1rem 0;
`;

const MaintenanceLabel = styled.div`
  font-size: 1rem;
  color: #6B7280;
  margin-bottom: 0.5rem;
`;

const ResultsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  margin-bottom: 1.5rem;
  
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const ResultItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px dashed rgba(203, 213, 225, 0.5);
  
  &:last-child {
    margin-bottom: 0;
    padding-bottom: 0;
    border-bottom: none;
  }
`;

const ResultLabel = styled.span`
  color: #4B5563;
  font-weight: 500;
`;

const ResultValue = styled.span`
  font-weight: 700;
  color: #1F2937;
  position: relative;
  
  &:after {
    content: "cal";
    font-size: 0.8rem;
    color: #6B7280;
    margin-left: 4px;
    font-weight: 400;
  }
`;

const BmrInfo = styled.div`
  font-size: 0.9rem;
  color: #6B7280;
  background-color: rgba(243, 244, 246, 0.7);
  padding: 0.75rem;
  border-radius: 12px;
  margin-top: 1rem;
  text-align: center;
`;

const RecalculateButton = styled.button`
  display: block;
  width: 100%;
  padding: 1rem;
  background-color: #FFFFFF;
  color: ${props => props.buttonColor || '#4361EE'};
  border: 2px solid ${props => props.buttonColor || '#4361EE'};
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &:hover {
    background-color: ${props => props.buttonColor || '#4361EE'};
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  &:active {
    transform: translateY(1px);
  }
  
  @media print {
    display: none;
  }
`;

const BlurOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(10px);
  background-color: rgba(255, 255, 255, 0.4);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 10;
  padding: 2rem;
  border-radius: 8px;
`;

const LeadCaptureForm = styled.form`
  background: white;
  padding: 2rem;
  border-radius: 16px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const LeadTitle = styled.h3`
  margin-bottom: 1rem;
  color: ${props => props.color || '#4361EE'};
  font-weight: 700;
`;

const LeadDescription = styled.p`
  margin-bottom: 1.5rem;
  color: #4B5563;
`;

const LeadInput = styled.input`
  width: 100%;
  padding: 0.9rem 1rem;
  border: 1px solid #E5E7EB;
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background-color: #F9FAFB;
  color: #1F2937;
  margin-bottom: 1rem;
  
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

const SubmitButton = styled.button`
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

const PrivacyText = styled.p`
  font-size: 0.75rem;
  color: #6B7280;
  margin-top: 1rem;
`;

const ResultsDisplay = ({ 
  results, 
  onRecalculate, 
  primaryColor, 
  secondaryColor, 
  onLeadCapture, 
  requireLeadCapture = true 
}) => {
  const [showLeadForm, setShowLeadForm] = useState(requireLeadCapture);
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });
  
  if (!results) {
    return null;
  }
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Call the parent's onLeadCapture if it exists
    if (onLeadCapture && typeof onLeadCapture === 'function') {
      onLeadCapture(formData);
    }
    
    // Remove the overlay
    setShowLeadForm(false);
  };
  
  return (
    <Container className="results-container">
      {showLeadForm && (
        <BlurOverlay>
          <LeadCaptureForm onSubmit={handleSubmit}>
            <LeadTitle color={primaryColor}>Your Results Are Ready!</LeadTitle>
            <LeadDescription>Enter your name and email to unlock your personalized calorie plan.</LeadDescription>
            
            <LeadInput 
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              focusColor={primaryColor}
              required
            />
            
            <LeadInput 
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              focusColor={primaryColor}
              required
            />
            
            <SubmitButton 
              type="submit"
              primaryColor={primaryColor}
              secondaryColor={secondaryColor}
            >
              Unlock My Results
            </SubmitButton>
            
            <PrivacyText>
              We respect your privacy and will never share your information.
              You may receive occasional nutrition tips via email.
            </PrivacyText>
          </LeadCaptureForm>
        </BlurOverlay>
      )}
      
      <MainResultCard color={primaryColor} secondaryColor={secondaryColor}>
        <MainCardTitle color={primaryColor}>Your Daily Calories</MainCardTitle>
        <MaintenanceValue color={primaryColor}>{results.tdee}</MaintenanceValue>
        <MaintenanceLabel>Maintenance Level</MaintenanceLabel>
        <BmrInfo>Your Basal Metabolic Rate (BMR) is {results.bmr} calories/day</BmrInfo>
      </MainResultCard>
      
      <ResultsRow>
        <ResultCard color={primaryColor} accentColor="#ef4444">
          <CardTitle color="#ef4444">Weight Loss</CardTitle>
          <ResultItem>
            <ResultLabel>Moderate (0.5kg/week):</ResultLabel>
            <ResultValue>{results.moderateLoss}</ResultValue>
          </ResultItem>
          <ResultItem>
            <ResultLabel>Aggressive (1kg/week):</ResultLabel>
            <ResultValue>{results.aggressiveLoss}</ResultValue>
          </ResultItem>
        </ResultCard>
        
        <ResultCard color={primaryColor} accentColor="#10b981">
          <CardTitle color="#10b981">Weight Gain</CardTitle>
          <ResultItem>
            <ResultLabel>Moderate (0.5kg/week):</ResultLabel>
            <ResultValue>{results.moderateGain}</ResultValue>
          </ResultItem>
          <ResultItem>
            <ResultLabel>Aggressive (1kg/week):</ResultLabel>
            <ResultValue>{results.aggressiveGain}</ResultValue>
          </ResultItem>
        </ResultCard>
      </ResultsRow>
      
      <RecalculateButton 
        onClick={onRecalculate}
        buttonColor={primaryColor}
        className="recalculate-btn"
      >
        Recalculate
      </RecalculateButton>
    </Container>
  );
};

export default ResultsDisplay;