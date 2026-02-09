import React, { useState, useCallback, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion'; // ✨ motion을 추가했습니다!
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

  // --- 사운드 관리 (Ref 사용으로 리렌더링 방지) ---
  const audioRef = useRef(new Audio('/sounds/main_bgm.mp3'));

  // 1. 사운드 시작 및 페이드인 로직
  const startBGM = useCallback(() => {
    const audio = audioRef.current;
    if (audio.paused) {
      audio.loop = true;
      audio.volume = 0; // 0에서 시작
      audio.play().catch((err) => console.log("사운드 재생 실패 (사용자 상호작용 필요):", err));

      // 2초 동안 서서히 볼륨을 높이는 페이드인 (0.0 -> 0.4)
      let vol = 0;
      const fadeIn = setInterval(() => {
        if (vol < 0.4) {
          vol += 0.05;
          audio.volume = Math.min(vol, 0.4);
        } else {
          clearInterval(fadeIn);
        }
      }, 200);
    }
  }, []);

  // 2. 뮤트 토글 함수
  const toggleMute = useCallback(() => {
    const nextMuted = !isMuted;
    audioRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  }, [isMuted]);

  // --- 단계별 핸들러 ---
  
  // 홈에서 시작 버튼 클릭 시 호출
  const handleStart = useCallback(() => {
    startBGM(); // 사운드 재생 트리거
    setStage('gender');
  }, [startBGM]);

  const handleGenderSelect = useCallback((selectedGender) => {
    setGender(selectedGender);
    setStage('test');
  }, []);

  const handleTestComplete = useCallback((finalScores) => {
    setScores(finalScores);
    setStage('loading');
  }, []);

  const handleLoadingFinished = useCallback(() => {
    setStage('result');
  }, []);

  const handleRestart = useCallback(() => {
    setGender(null);
    setScores({ S: 0, M: 0, A: 0, F: 0 });
    setStage('home');
    // 다시 시작할 때 사운드를 끄고 싶다면 아래 주석 해제
    // audioRef.current.pause();
    // audioRef.current.currentTime = 0;
  }, []);

  return (
    <AppContainer>
      {/* 전역 뮤트 버튼: 어느 단계에서나 우측 상단 고정 */}
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

        {stage === 'result' && scores && (
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
`;

const MuteButton = styled(motion.button)`
  position: fixed;
  top: 25px;
  right: 25px;
  z-index: 1000; /* 모든 컴포넌트 위에 표시 */
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(212, 175, 55, 0.4);
  color: #D4AF37;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
  backdrop-filter: blur(8px);
  transition: all 0.3s ease;

  &:hover {
    background: rgba(212, 175, 55, 0.2);
    border-color: #D4AF37;
    box-shadow: 0 0 15px rgba(212, 175, 55, 0.3);
  }
`;