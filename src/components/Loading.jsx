import React, { useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Loading = ({ onFinished }) => {
  useEffect(() => {
    // 2.5초 동안 로딩 애니메이션을 보여준 후 결과를 출력합니다.
    const timer = setTimeout(() => {
      onFinished();
    }, 2500);
    return () => clearTimeout(timer);
  }, [onFinished]);

  return (
    <LoadingContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <SpinnerContainer>
        <Spinner />
        <MagicCircle />
      </SpinnerContainer>
      <Text
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        운명의 실타래를 연성하는 중...
      </Text>
      <SubText>과거의 기록에서 당신의 영혼을 찾고 있습니다.</SubText>
    </LoadingContainer>
  );
};

export default Loading;

// --- Styled Components ---

const LoadingContainer = styled(motion.div)`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #050505;
  background-image: radial-gradient(circle at center, #1a0a0a 0%, #050505 100%);
`;

const SpinnerContainer = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
  margin-bottom: 40px;
`;

const Spinner = styled.div`
  width: 100%;
  height: 100%;
  border: 4px solid transparent;
  border-top: 4px solid #D4AF37;
  border-bottom: 4px solid #8b0000;
  border-radius: 50%;
  animation: spin 1.5s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const MagicCircle = styled.div`
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  width: 60px; height: 60px;
  border: 1px solid #D4AF37;
  border-radius: 50%;
  opacity: 0.3;
  animation: pulse 2s ease-in-out infinite;

  @keyframes pulse {
    0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.3; }
    50% { transform: translate(-50%, -50%) scale(1.5); opacity: 0.1; }
  }
`;

const Text = styled(motion.h2)`
  color: #D4AF37;
  font-size: 1.8rem;
  font-family: 'Cinzel', serif;
  margin-bottom: 15px;
  text-shadow: 0 0 10px rgba(212, 175, 55, 0.5);
`;

const SubText = styled.p`
  color: #888;
  font-size: 1rem;
  letter-spacing: 1px;
`;