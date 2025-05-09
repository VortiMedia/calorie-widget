import React, { useState } from 'react';
import styled from 'styled-components';
import CalculatorForm from './CalculatorForm';
import ResultsDisplay from './ResultsDisplay';
import { calculateAll } from '../utils/calculator';

const Widget = styled.div`
  max-width: ${props => props.maxWidth || '600px'};
  margin: 2rem auto;
  background-color: white;
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  font-family: 'Inter', 'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif;
  color: #25283D;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
  }
  
  @media (max-width: 768px) {
    margin: 1rem;
    max-width: none;
  }
`;

const Header = styled.div`
  background: linear-gradient(135deg, ${props => props.primaryColor || '#4361EE'}, ${props => props.secondaryColor || '#3A0CA3'});
  color: white;
  padding: 2rem;
  text-align: center;
  position: relative;
  overflow: hidden;
  
  &:before {
    content: "";
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%);
    opacity: 0.7;
  }
`;

const Logo = styled.img`
  max-height: 60px;
  margin-bottom: 1rem;
  display: block;
  margin-left: auto;
  margin-right: auto;
`;

const Title = styled.h2`
  margin-bottom: 0.5rem;
  font-weight: 700;
  font-size: 1.8rem;
  letter-spacing: -0.5px;
  position: relative;
`;

const Subtitle = styled.p`
  margin: 0;
  font-weight: 400;
  opacity: 0.9;
  position: relative;
`;

const Footer = styled.div`
  padding: 1.5rem 2rem;
  border-top: 1px solid rgba(209, 220, 232, 0.5);
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${props => props.footerBg || '#FAFBFF'};
`;

const FooterText = styled.p`
  margin: 0;
  font-size: 0.9rem;
  color: #6B7280;
`;

const PrintButton = styled.button`
  padding: 0.6rem 1.2rem;
  background-color: transparent;
  color: ${props => props.buttonColor || '#4361EE'};
  border: 1px solid ${props => props.buttonColor || '#4361EE'};
  border-radius: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 6px;
  
  &:before {
    content: "🖨️";
    font-size: 14px;
  }
  
  &:hover {
    background-color: ${props => props.buttonColor || '#4361EE'};
    color: white;
  }
  
  @media print {
    display: none;
  }
`;

const ThankYouMessage = styled.div`
  text-align: center;
  color: ${props => props.color || '#10b981'};
  background-color: ${props => `${props.color}10` || '#10b98110'};
  padding: 0.75rem 1rem;
  border-radius: 8px;
  margin: 0 2rem 1rem;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:before {
    content: "✓";
    font-size: 1rem;
    font-weight: bold;
    margin-right: 0.5rem;
    display: inline-block;
    width: 18px;
    height: 18px;
    line-height: 18px;
    text-align: center;
    border-radius: 50%;
    background-color: ${props => props.color || '#10b981'};
    color: white;
  }
`;

const CalorieCalculator = (props) => {
  const [results, setResults] = useState(null);
  const [showForm, setShowForm] = useState(true);
  const [leadData, setLeadData] = useState(null);
  const [showThankYou, setShowThankYou] = useState(false);
  
  const primaryColor = props.primaryColor || '#4361EE';
  const secondaryColor = props.secondaryColor || '#3A0CA3';
  
  const handleCalculate = (userData) => {
    const calculationResults = calculateAll(userData);
    setResults(calculationResults);
    setShowForm(false);
  };
  
  const handleRecalculate = () => {
    setShowForm(true);
    setShowThankYou(false);
  };
  
  const handlePrint = () => {
    window.print();
  };
  
  const handleLeadCapture = (data) => {
    // Here you would typically send this data to your server or email system
    setLeadData(data);
    setShowThankYou(true);
    
    // If props.onLeadCapture exists, call it with the lead data
    if (props.onLeadCapture && typeof props.onLeadCapture === 'function') {
      props.onLeadCapture(data);
    }
    
    // For demo purposes, log to console
    console.log('Lead captured:', data);
  };
  
  return (
    <Widget maxWidth={props.maxWidth} className="calorie-calculator-widget">
      <Header primaryColor={primaryColor} secondaryColor={secondaryColor}>
        {props.logoUrl && <Logo src={props.logoUrl} alt="Logo" />}
        <Title>{props.title || 'Calorie Calculator'}</Title>
        <Subtitle>{props.subtitle || 'Calculate your daily calorie needs'}</Subtitle>
      </Header>
      
      {showThankYou && !showForm && (
        <ThankYouMessage color="#10b981">
          Thank you, {leadData?.name}! Your personalized results are now available.
        </ThankYouMessage>
      )}
      
      {showForm ? (
        <CalculatorForm 
          onCalculate={handleCalculate}
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
        />
      ) : (
        <ResultsDisplay 
          results={results} 
          onRecalculate={handleRecalculate}
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
          onLeadCapture={handleLeadCapture}
          requireLeadCapture={props.requireLeadCapture !== false} // Default to true unless explicitly set to false
        />
      )}
      
      <Footer footerBg={props.footerBg || '#FAFBFF'}>
        <FooterText>{props.footerText || 'Results based on Mifflin-St Jeor Equation'}</FooterText>
        <PrintButton onClick={handlePrint} buttonColor={primaryColor}>Print Results</PrintButton>
      </Footer>
    </Widget>
  );
};

export default CalorieCalculator;