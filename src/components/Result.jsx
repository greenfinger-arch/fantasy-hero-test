import React, { useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { maleHeroes, femaleHeroes } from '../data/heroes';

const Result = ({ gender, scores, onRestart }) => {
  // 1. 데이터 디버깅 (로그 확인 필수!)
  useEffect(() => {
    console.log("최종 도착 점수:", scores);
  }, [scores]);

  const hero = useMemo(() => {
    const dataset = gender === 'female' ? femaleHeroes : maleHeroes;

    // 점수 합산 및 최대값 찾기
    const stats = [
      { id: 'S', val: scores?.S || 0 },
      { id: 'M', val: scores?.M || 0 },
      { id: 'A', val: scores?.A || 0 },
      { id: 'F', val: scores?.F || 0 }
    ];

    // 가장 높은 점수의 ID 추출
    const maxStat = stats.sort((a, b) => b.val - a.val)[0].id.toLowerCase();

    // 🎯 [핵심] ID 매칭 로직 강화 (예: m_s_1 처럼 중간에 타입이 포함된 경우)
    const found = dataset.find(h => h.id.toLowerCase().includes(`_${maxStat}_`));

    // 만약 점수가 다 0이거나 못 찾으면, 소드마스터(보통 1번) 말고 랜덤하게라도 보여줌
    return found || dataset[Math.floor(Math.random() * dataset.length)];
  }, [gender, scores]);

  return (
    <Container
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <CardSection>
        {/* 영웅 카드 등장 연출 */}
        <HeroCard
          initial={{ y: 50, opacity: 0, rotateY: -20 }}
          animate={{ y: 0, opacity: 1, rotateY: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 }}
        >
          <div className="rank-tag">DESTINY RANK: SSR</div>
          <ImageContainer>
            <img src={hero.image} alt={hero.name} />
            <div className="glow-effect" />
          </ImageContainer>

          <InfoBox>
            <motion.h3
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {hero.title}
            </motion.h3>
            <motion.h1
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              {hero.name}
            </motion.h1>
            <p className="desc">{hero.description}</p>
          </InfoBox>
        </HeroCard>

        {/* 능력치 그래프 연출 */}
        <StatBoard
          initial={{ x: 30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          <h3>POTENTIAL STATS</h3>
          {['S', 'M', 'A', 'F'].map((s, idx) => (
            <StatRow key={s}>
              <span className="label">{s}</span>
              <BarBg>
                <BarFill
                  initial={{ width: 0 }}
                  animate={{ width: `${(scores[s] / 12) * 100}%` }} // 12개 질문 기준
                  transition={{ duration: 1, delay: 1.2 + (idx * 0.1) }}
                />
              </BarBg>
            </StatRow>
          ))}
          <RestartButton
            onClick={onRestart}
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px #D4AF37" }}
            whileTap={{ scale: 0.95 }}
          >
            REAWAKEN DESTINY
          </RestartButton>
        </StatBoard>
      </CardSection>
    </Container>
  );
};

// --- 스타일 컴포넌트 ---
const Container = styled(motion.div)`
  width: 100%; min-height: 100vh; display: flex; justify-content: center; align-items: center;
  background: #050505; padding: 20px;
`;

const CardSection = styled.div`
  display: flex; gap: 40px; max-width: 1000px; width: 100%;
  @media (max-width: 900px) { flex-direction: column; align-items: center; }
`;

const HeroCard = styled(motion.div)`
  flex: 1; background: #111; border: 2px solid #D4AF37; border-radius: 20px;
  position: relative; overflow: hidden; box-shadow: 0 0 40px rgba(212, 175, 55, 0.2);
  .rank-tag { position: absolute; top: 15px; right: 15px; color: #D4AF37; font-family: 'Cinzel'; font-weight: bold; z-index: 5; }
`;

const ImageContainer = styled.div`
  width: 100%; height: 450px; position: relative;
  img { width: 100%; height: 100%; object-fit: cover; filter: contrast(1.1) brightness(0.9); }
  .glow-effect { position: absolute; bottom: 0; left: 0; right: 0; height: 50%; background: linear-gradient(to top, #111, transparent); }
`;

const InfoBox = styled.div`
  padding: 30px; text-align: center;
  h3 { color: #8b0000; font-family: 'Cinzel'; font-size: 1rem; margin-bottom: 5px; }
  h1 { color: #fff; font-family: 'Cinzel'; font-size: 2.2rem; margin-bottom: 15px; letter-spacing: 2px; }
  .desc { color: #aaa; line-height: 1.6; font-size: 0.95rem; word-break: keep-all; }
`;

const StatBoard = styled(motion.div)`
  flex: 0.7; display: flex; flex-direction: column; justify-content: center;
  h3 { font-family: 'Cinzel'; margin-bottom: 20px; color: #D4AF37; }
`;

const StatRow = styled.div`
  display: flex; align-items: center; gap: 15px; margin-bottom: 15px;
  .label { width: 20px; color: #fff; font-family: 'Cinzel'; font-weight: bold; }
`;

const BarBg = styled.div` flex: 1; height: 8px; background: rgba(255,255,255,0.1); border-radius: 4px; overflow: hidden; `;
const BarFill = styled(motion.div)` height: 100%; background: linear-gradient(90deg, #8b0000, #D4AF37); box-shadow: 0 0 10px #D4AF37; `;

const RestartButton = styled(motion.button)`
  margin-top: 30px; padding: 15px; background: transparent; border: 1px solid #D4AF37;
  color: #D4AF37; font-family: 'Cinzel'; font-size: 1rem; cursor: pointer; border-radius: 5px;
  transition: all 0.3s;
`;

export default Result;