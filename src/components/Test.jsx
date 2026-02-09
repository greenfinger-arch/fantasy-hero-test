import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import { questions } from '../data/questions';

const Test = ({ gender, onComplete }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [userScores, setUserScores] = useState({ S: 0, M: 0, A: 0, F: 0 });

  if (!questions || questions.length === 0) {
    return (
      <Container>
        <h2 style={{ color: 'white' }}>운명의 기록을 불러올 수 없습니다.</h2>
      </Container>
    );
  }

  const currentQuestion = questions[currentIdx];
  const currentAnswers = currentQuestion.answers || currentQuestion.options || [];

  const handleAnswer = (effects) => {
    if (!effects) return;
    const newScores = { ...userScores };
    Object.keys(effects).forEach((stat) => {
      const key = stat.toUpperCase();
      if (newScores.hasOwnProperty(key)) {
        newScores[key] += effects[stat];
      }
    });
    setUserScores(newScores);

    if (currentIdx < questions.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      onComplete(newScores);
    }
  };

  const progress = ((currentIdx + 1) / questions.length) * 100;

  return (
    <Container>
      {/* 상단 프로그레스 영역: 높이 최소화 */}
      <HeaderSection>
        <ProgressBarContainer>
          <ProgressLabel>DESTINY PROGRESS: {Math.round(progress)}%</ProgressLabel>
          <BarOuter>
            <BarInner 
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }} 
              transition={{ duration: 0.5 }}
            />
          </BarOuter>
        </ProgressBarContainer>
      </HeaderSection>

      <AnimatePresence mode="wait">
        <MainContent
          key={currentIdx}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {/* 좌측: 스토리 이미지 영역 (데스크톱에서 시인성 확보) */}
          <VisualSection>
            <ImageWrapper>
              <img 
                src={currentQuestion.image || "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=800"} 
                alt="Story Scene" 
              />
              <div className="overlay" />
              <div className="question-tag">CHAPTER {currentIdx + 1}</div>
            </ImageWrapper>
          </VisualSection>

          {/* 우측: 질문 및 선택지 영역 */}
          <InteractiveSection>
            <QuestionBox>
              <h2 className="question-text">{currentQuestion.question}</h2>
              {currentQuestion.description && (
                <p className="description">{currentQuestion.description}</p>
              )}
            </QuestionBox>

            <AnswerGrid>
              {currentAnswers.map((answer, index) => (
                <AnswerButton
                  key={index}
                  whileHover={{ 
                    scale: 1.02, 
                    backgroundColor: "rgba(212, 175, 55, 0.1)",
                    borderColor: "#D4AF37" 
                  }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAnswer(answer.effects || {})}
                >
                  <span className="alphabet">{String.fromCharCode(65 + index)}</span>
                  <span className="text">{answer.text}</span>
                </AnswerButton>
              ))}
            </AnswerGrid>
          </InteractiveSection>
        </MainContent>
      </AnimatePresence>
    </Container>
  );
};

export default Test;

// --- 스타일 컴포넌트 (데스크톱 최적화 엔진) ---

const Container = styled.div`
  width: 100%;
  height: 100vh; /* 화면 높이 고정 */
  display: flex;
  flex-direction: column;
  align-items: center;
  background: radial-gradient(circle at center, #1a0a0a 0%, #050505 100%);
  overflow: hidden; /* 전체 스크롤 방지 */
  padding: 0 20px;
`;

const HeaderSection = styled.div`
  width: 100%;
  max-width: 1100px;
  height: 10vh; /* 헤더 비중 제한 */
  display: flex;
  align-items: flex-end;
  padding-bottom: 20px;
`;

const ProgressBarContainer = styled.div`
  width: 100%;
`;

const ProgressLabel = styled.p`
  color: #D4AF37;
  font-family: 'Cinzel', serif;
  font-size: 0.75rem;
  margin-bottom: 8px;
  text-align: right;
  letter-spacing: 2px;
`;

const BarOuter = styled.div`
  width: 100%;
  height: 3px;
  background: rgba(255, 255, 255, 0.1);
  overflow: hidden;
`;

const BarInner = styled(motion.div)`
  height: 100%;
  background: #D4AF37;
  box-shadow: 0 0 10px #D4AF37;
`;

const MainContent = styled(motion.div)`
  width: 100%;
  max-width: 1100px;
  height: 75vh; /* 메인 영역 높이 제한 */
  display: flex;
  gap: 40px;
  align-items: stretch;
  background: rgba(17, 17, 17, 0.6);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(212, 175, 55, 0.1);
  border-radius: 24px;
  overflow: hidden;

  @media (max-width: 900px) {
    flex-direction: column;
    height: auto;
    overflow-y: auto;
    max-height: 85vh;
  }
`;

const VisualSection = styled.div`
  flex: 1.2;
  position: relative;
  overflow: hidden;
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: brightness(0.7) contrast(1.1);
  }

  .overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to right, transparent 70%, rgba(17, 17, 17, 1));
    @media (max-width: 900px) {
      background: linear-gradient(to bottom, transparent 70%, rgba(17, 17, 17, 1));
    }
  }

  .question-tag {
    position: absolute;
    top: 30px;
    left: 30px;
    background: #8b0000;
    color: #fff;
    padding: 5px 15px;
    font-family: 'Cinzel', serif;
    font-size: 0.8rem;
    border: 1px solid #D4AF37;
  }
`;

const InteractiveSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 40px;
  @media (max-width: 900px) {
    padding: 30px;
  }
`;

const QuestionBox = styled.div`
  margin-bottom: 30px;
  .question-text {
    font-size: clamp(1.4rem, 4vh, 2rem);
    color: #fff;
    line-height: 1.3;
    margin-bottom: 15px;
    font-family: 'Cinzel', serif;
    word-break: keep-all;
  }
  .description {
    color: #999;
    font-size: 1rem;
    line-height: 1.5;
    font-style: italic;
  }
`;

const AnswerGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const AnswerButton = styled(motion.button)`
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 18px 25px;
  border-radius: 12px;
  color: #ccc;
  cursor: pointer;
  display: flex;
  align-items: center;
  text-align: left;
  transition: all 0.3s ease;
  
  .alphabet {
    font-family: 'Cinzel', serif;
    color: #D4AF37;
    margin-right: 20px;
    font-size: 1.2rem;
    font-weight: bold;
  }
  
  .text {
    font-size: 1rem;
    line-height: 1.4;
  }

  @media (max-height: 800px) {
    padding: 14px 20px;
  }
`;