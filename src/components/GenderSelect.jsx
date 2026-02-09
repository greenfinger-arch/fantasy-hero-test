import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const GenderSelect = ({ onSelect }) => {
  return (
    <Container
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.8 }}
    >
      <Header>
        <motion.h2
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          SELECT YOUR ORIGIN
        </motion.h2>
        <p>전생할 육신의 성별을 선택하십시오</p>
      </Header>

      <CardContainer>
        {/* 남성 선택 카드 */}
        <SelectionCard
          whileHover={{ scale: 1.05, borderColor: "#4d94ff" }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onSelect('male')}
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <CardImage src="/images/hero1.jpg" alt="Male Hero" />
          <CardTitle color="#4d94ff">MALE</CardTitle>
          <CardDesc>강인한 육체와 파괴적인 힘</CardDesc>
          <Glow color="rgba(77, 148, 255, 0.2)" />
        </SelectionCard>

        {/* 여성 선택 카드 */}
        <SelectionCard
          whileHover={{ scale: 1.05, borderColor: "#ff4d94" }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onSelect('female')}
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <CardImage src="/images/hero2.jpg" alt="feMale Hero" />
          <CardTitle color="#ff4d94">FEMALE</CardTitle>
          <CardDesc>우아한 기품과 신비로운 마력</CardDesc>
          <Glow color="rgba(255, 77, 148, 0.2)" />
        </SelectionCard>
      </CardContainer>
    </Container>
  );
};

export default GenderSelect;

// --- Styled Components ---

const Container = styled(motion.div)`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #050505;
  padding: 20px;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 50px;

  h2 {
    font-family: 'Cinzel', serif;
    font-size: 2.5rem;
    color: #D4AF37;
    margin-bottom: 10px;
    letter-spacing: 5px;
  }

  p {
    color: #888;
    letter-spacing: 2px;
  }
`;

const CardContainer = styled.div`
  display: flex;
  gap: 40px;
  flex-wrap: wrap;
  justify-content: center;
`;

const SelectionCard = styled(motion.div)`
  width: 280px;
  height: 400px;
  background: #111;
  border: 1px solid #333;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: border 0.3s ease;

  &:hover {
    border-width: 2px;
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 60%;
  object-fit: cover;
  filter: grayscale(100%) contrast(1.2);
  opacity: 0.6;
  transition: all 0.5s ease;

  ${SelectionCard}:hover & {
    filter: grayscale(0%) contrast(1);
    opacity: 1;
    scale: 1.1;
  }
`;

const CardTitle = styled.h3`
  font-family: 'Cinzel', serif;
  font-size: 2rem;
  margin-top: 20px;
  color: ${props => props.color};
  letter-spacing: 3px;
  z-index: 2;
`;

const CardDesc = styled.p`
  color: #aaa;
  font-size: 0.9rem;
  margin-top: 10px;
  z-index: 2;
`;

const Glow = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to top, ${props => props.color}, transparent);
  opacity: 0;
  transition: opacity 0.3s ease;

  ${SelectionCard}:hover & {
    opacity: 1;
  }
`;