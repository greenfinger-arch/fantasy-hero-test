import React, { useState, useCallback, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import styled from 'styled-components';

// 컴포넌트 임포트
import Home from './components/Home';
import GenderSelect from './components/GenderSelect';
import Test from './components/Test';
import Loading from './components/Loading';
import Result from './components/Result';

// 공용 스타일
import './App.css';

function App() {
  // --- 상태 관리 ---
  const [stage, setStage] = useState('home');
  const [gender, setGender] = useState(null);
  const [scores, setScores] = useState({ S: 0, M: 0, A: 0, F: 0 });
  const [isMuted, setIsMuted] = useState(false);

  // --- 사운드 관리 ---
  const audioRef = useRef(new Audio('/sounds/main_bgm.mp3'));

  const startBGM = useCallback(() => {
    const audio = audioRef.current;
    if (audio.paused) {
      audio.loop = true;
      audio.volume = 0;
      audio.play().catch((err) => console.log("Sound play failed:", err));

      let vol = 0;
      const fadeIn = setInterval(() => {
        if (vol < 0.3) {
          vol += 0.05;
          audio.volume = Math.min(vol, 0.3);
        } else {
          clearInterval(fadeIn);
        }
      }, 200);
    }
  }, []);

  const toggleMute = useCallback(() => {
    const nextMuted = !isMuted;
    audioRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  }, [isMuted]);

  // --- 단계별 핸들러 ---

  const handleStart = useCallback(() => {
    startBGM();
    setStage('gender');
  }, [startBGM]);

  const handleGenderSelect = useCallback((selectedGender) => {
    setGender(selectedGender);
    setStage('test');
  }, []);

  // [핵심 수정] 테스트 완료 시 점수를 저장하고 로딩 창으로 이동
  const handleTestComplete = (finalScores) => {
    console.log("App.jsx가 받은 최종 점수:", finalScores);
    setScores(finalScores); // 1. 점수 저장
    setStage('loading');    // 2. 곧바로 로딩 단계로 진입
  };

  // [핵심 수정] 로딩이 끝나면 결과 창으로 이동
  const handleLoadingFinished = useCallback(() => {
    setStage('result');
  }, []);

  // [핵심 수정] 다시 시작하기 로직
  const handleRestart = useCallback(() => {
    setScores({ S: 0, M: 0, A: 0, F: 0 });
    setStage('home');
  }, []);

  return (
    <AppContainer>
      {/* 뮤트 버튼 */}
      <MuteButton
        onClick={toggleMute}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isMuted ? '🔇' : '🔊'}
      </MuteButton>

      <AnimatePresence mode="wait">
        {stage === 'home' && (
          <Home key="home" onStart={handleStart} />
        )}

        {stage === 'gender' && (
          <GenderSelect key="gender" onSelect={handleGenderSelect} />
        )}

        {stage === 'test' && (
          <Test
            key="test"
            gender={gender}
            onComplete={handleTestComplete}
          />
        )}

        {stage === 'loading' && (
          <Loading key="loading" onFinished={handleLoadingFinished} />
        )}

        {stage === 'result' && (
          <Result
            key="result-view"
            gender={gender}
            scores={scores}
            onRestart={handleRestart}
          />
        )}
      </AnimatePresence>
    </AppContainer>
  );
}

export default App;

// --- Styled Components ---

const AppContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #050505;
  color: #D4AF37;
  overflow-x: hidden;
  position: relative;
  -webkit-overflow-scrolling: touch;
`;

const MuteButton = styled(motion.button)`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 10000;
  background: rgba(0, 0, 0, 0.6);
  border: 1px solid rgba(212, 175, 55, 0.5);
  color: #D4AF37;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  backdrop-filter: blur(5px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);

  @media (max-width: 900px) {
    top: 15px;
    right: 15px;
    width: 40px;
    height: 40px;
    font-size: 1rem;
  }
`;