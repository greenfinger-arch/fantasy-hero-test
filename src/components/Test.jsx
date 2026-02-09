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

    // 1. 기존 점수를 복사하여 새로운 점수 객체 생성
    const newScores = { ...userScores };
    
    // 2. 선택한 답변의 효과를 계산 (대소문자 무시하고 매칭)
    Object.keys(effects).forEach((stat) => {
      const key = stat.toUpperCase();
      if (Object.prototype.hasOwnProperty.call(newScores, key)) {
        newScores[key] += effects[stat];
      }
    });

    // 3. 내부 상태 업데이트 (UI용)
    setUserScores(newScores);

    // 4. 로직 분기점
    if (currentIdx < questions.length - 1) {
      // 다음 질문으로 이동
      setCurrentIdx(currentIdx + 1);
    } else {
      // 🔥 [핵심 수정] 마지막 질문일 경우, 
      // 업데이트 전의 'userScores'가 아니라 방금 계산된 'newScores'를 직접 넘깁니다!
      console.log("운명 결정 - 최종 산출 점수:", newScores);
      onComplete(newScores);
    }
  };

  const progress = ((currentIdx + 1) / questions.length) * 100;

  return (
    <Container>
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
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.4 }}
        >
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
                  whileHover={{ scale: 1.02, backgroundColor: "rgba(212, 175, 55, 0.1)" }}
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

// --- 스타일 컴포넌트 ---
const Container = styled.div`
  width: 100%; min-height: 100vh; display: flex; flex-direction: column; align-items: center;
  background: radial-gradient(circle at center, #1a0a0a 0%, #050505 100%); padding: 0 15px; overflow-x: hidden;
  @media (max-width: 900px) { height: auto; padding-bottom: 40px; }
`;

const HeaderSection = styled.div` width: 100%; max-width: 1100px; height: 8vh; display: flex; align-items: flex-end; padding-bottom: 15px; `;
const ProgressBarContainer = styled.div` width: 100%; `;
const ProgressLabel = styled.p` color: #D4AF37; font-family: 'Cinzel', serif; font-size: 0.7rem; margin-bottom: 6px; text-align: right; letter-spacing: 1.5px; `;
const BarOuter = styled.div` width: 100%; height: 3px; background: rgba(255, 255, 255, 0.1); `;
const BarInner = styled(motion.div)` height: 100%; background: #D4AF37; box-shadow: 0 0 8px #D4AF37; `;

const MainContent = styled(motion.div)`
  width: 100%; max-width: 1100px; height: 80vh; display: flex; gap: 0; align-items: stretch;
  background: rgba(17, 17, 17, 0.8); backdrop-filter: blur(15px); border: 1px solid rgba(212, 175, 55, 0.2); border-radius: 20px; overflow: hidden;
  @media (max-width: 900px) { flex-direction: column; height: auto; margin-top: 10px; }
`;

const VisualSection = styled.div` flex: 1.3; position: relative; overflow: hidden; background: #000; @media (max-width: 900px) { height: 30vh; flex: none; } `;
const ImageWrapper = styled.div` width: 100%; height: 100%; position: relative;
  img { width: 100%; height: 100%; object-fit: cover; object-position: center 20%; filter: brightness(0.7) contrast(1.1); }
  .overlay { position: absolute; inset: 0; background: linear-gradient(to right, transparent 60%, rgba(17, 17, 17, 1)); @media (max-width: 900px) { background: linear-gradient(to bottom, transparent 50%, rgba(17, 17, 17, 1)); } }
  .question-tag { position: absolute; top: 20px; left: 20px; background: rgba(139, 0, 0, 0.9); color: #fff; padding: 4px 12px; font-family: 'Cinzel', serif; font-size: 0.7rem; border: 1px solid #D4AF37; z-index: 10; }
`;

const InteractiveSection = styled.div` flex: 1; display: flex; flex-direction: column; justify-content: center; padding: 30px 40px; @media (max-width: 900px) { padding: 20px 25px 30px 25px; } `;
const QuestionBox = styled.div` margin-bottom: 25px; .question-text { font-size: clamp(1.2rem, 3.5vh, 1.8rem); color: #fff; line-height: 1.4; margin-bottom: 12px; font-family: 'Cinzel', serif; word-break: keep-all; } .description { color: #aaa; font-size: 0.9rem; line-height: 1.5; font-style: italic; } `;
const AnswerGrid = styled.div` display: flex; flex-direction: column; gap: 10px; `;
const AnswerButton = styled(motion.button)` background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); padding: 16px 20px; border-radius: 10px; color: #ddd; cursor: pointer; display: flex; align-items: center; text-align: left; .alphabet { font-family: 'Cinzel', serif; color: #D4AF37; margin-right: 15px; font-size: 1.1rem; font-weight: bold; } .text { font-size: 0.95rem; line-height: 1.3; } @media (max-height: 700px) { padding: 12px 15px; } `;

export default Test;