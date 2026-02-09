import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const Home = ({ onStart }) => {
  return (
    <MainContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
      transition={{ duration: 1 }}
    >
      <BackgroundFilter />

      <Content>
        <Subtitle
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          안개 너머 새로운 차원이 열립니다
        </Subtitle>
        
        <Title
          initial={{ y: 20, opacity: 0, scale: 0.9 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.8, type: "spring", stiffness: 100 }}
        >
          판타지 전생 테스트
          <br />
          <span className="sub-title">12가지 운명의 질문</span>
          <motion.div 
            className="glow-line" 
            initial={{ width: 0 }} 
            animate={{ width: "100%" }} 
            transition={{ delay: 1.2, duration: 0.8 }} 
          />
        </Title>

        <Description
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
        >
          당신의 영혼에 숨겨진 진정한 힘을 깨우고, 
          <br />그 세계에서 당신을 기다리는 전설적인 영웅을 만나보세요.
        </Description>

        <StartButton
          whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(212, 175, 55, 0.6)" }}
          whileTap={{ scale: 0.95 }}
          onClick={onStart} // 여기서 App.jsx의 startBGM과 페이지 전환이 동시에 일어남
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          운명의 문 열기
        </StartButton>
      </Content>
    </MainContainer>
  );
};

export default Home;

// --- 스타일 컴포넌트 ---

const MainContainer = styled(motion.div)`
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  background: url('/images/home_background.jpg') no-repeat center center fixed;
  background-size: cover;
  animation: bgPan 40s linear infinite alternate;

  @keyframes bgPan {
    0% { background-position: 0% 0%; }
    100% { background-position: 100% 100%; }
  }
`;

const BackgroundFilter = styled.div`
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
  background: radial-gradient(circle at center, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.8) 70%, rgba(0,0,0,1) 100%);
  background-image: url('https://www.transparenttextures.com/patterns/dark-matter.png');
  z-index: 1;
`;

const Content = styled.div`
  text-align: center;
  z-index: 10;
  padding: 0 20px;
  max-width: 800px;
`;

const Subtitle = styled(motion.p)`
  color: #a0a0a0;
  font-size: 1.2rem;
  letter-spacing: 4px;
  margin-bottom: 10px;
  font-family: 'Cinzel', serif;
`;

const Title = styled(motion.h1)`
  font-family: 'Cinzel', serif;
  font-size: 4.5rem;
  color: #D4AF37;
  text-shadow: 0 0 25px rgba(212, 175, 55, 0.7);
  line-height: 1.2;
  margin-bottom: 30px;
  position: relative;

  .sub-title {
    font-size: 2.2rem;
    color: #ff3333;
    display: block;
    margin-top: 15px;
    font-weight: 700;
    letter-spacing: 2px;
    text-shadow: 
      -1px -1px 0 #000,  
       1px -1px 0 #000,
      -1px  1px 0 #000,
       1px  1px 0 #000,
       0 0 15px rgba(255, 0, 0, 0.7);
  }

  .glow-line {
    position: absolute;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
    height: 3px;
    background: linear-gradient(90deg, transparent, #D4AF37, transparent);
    box-shadow: 0 0 15px #D4AF37;
  }

  @media (max-width: 768px) {
    font-size: 3.5rem;
    .sub-title { font-size: 1.8rem; }
  }
`;

const Description = styled(motion.p)`
  color: #e0e0e0;
  line-height: 1.8;
  margin-bottom: 60px;
  font-size: 1.1rem;
`;

const StartButton = styled(motion.button)`
  background: transparent;
  border: 2px solid #D4AF37;
  color: #D4AF37;
  padding: 18px 45px;
  font-size: 1.3rem;
  font-family: 'Cinzel', serif;
  letter-spacing: 3px;
  cursor: pointer;
  border-radius: 5px;
  &:hover {
    background: #D4AF37;
    color: #050505;
  }
`;