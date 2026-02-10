import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { maleHeroes, femaleHeroes } from '../data/heroes';

const Result = ({ gender, scores, onRestart }) => {
  const hero = useMemo(() => {
    const dataset = gender === 'female' ? femaleHeroes : maleHeroes;

    // 1. 점수 분석 (데이터가 없어도 안전하게 처리)
    const stats = [
      { id: 'S', val: scores?.S || 0 },
      { id: 'M', val: scores?.M || 0 },
      { id: 'A', val: scores?.A || 0 },
      { id: 'F', val: scores?.F || 0 }
    ];

    // 2. 가장 높은 점수 찾기
    const sortedStats = [...stats].sort((a, b) => b.val - a.val);
    const topStat = sortedStats[0].val > 0 ? sortedStats[0].id.toLowerCase() : null;

    // 3. 🎯 소드마스터 저주 방어 로직
    // 만약 모든 점수가 0이면, 소드마스터(보통 ID 끝이 1)가 아닌 랜덤 영웅을 강제로 선택
    if (!topStat) {
      const randomIndex = Math.floor(Math.random() * (dataset.length - 1)) + 1;
      return dataset[randomIndex];
    }

    // 4. 매칭되는 영웅 찾기
    const found = dataset.find(h => h.id.toLowerCase().includes(`_${topStat}_`));

    // 만약 매칭 실패 시 소드마스터가 아닌 두 번째 영웅을 기본값으로 설정
    return found || dataset[1];
  }, [gender, scores]);

  return (
    <Container
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <ContentWrapper>
        <Header>
          <motion.p
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="subtitle"
          >
            THE DESTINY HAS BEEN REVEALED
          </motion.p>
          <motion.h1
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            당신의 영혼과 공명하는 영웅
          </motion.h1>
        </Header>

        <MainDisplay>
          {/* 카드 연출부 */}
          <HeroCard
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4, type: "spring" }}
          >
            <ImageFrame>
              <img src={hero.image} alt={hero.name} />
              <div className="overlay-gradient" />
              <div className="hero-type-tag">{hero.title}</div>
            </ImageFrame>
            <HeroInfo>
              <h2>{hero.name}</h2>
              <p>{hero.description}</p>
            </HeroInfo>
          </HeroCard>

          {/* 능력치 연출부 */}
          <SidePanel
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <StatBox>
              <h3>HEROIC POTENTIAL</h3>
              {['S', 'M', 'A', 'F'].map((key, i) => (
                <StatLine key={key}>
                  <div className="info">
                    <span>{key} TYPE</span>
                    <span>{scores[key] || 0}</span>
                  </div>
                  <BarContainer>
                    <BarFill
                      initial={{ width: 0 }}
                      animate={{ width: `${((scores[key] || 0) / 10) * 100}%` }}
                      transition={{ delay: 0.8 + (i * 0.1), duration: 1 }}
                    />
                  </BarContainer>
                </StatLine>
              ))}
            </StatBox>

            <ActionArea>
              <RestartBtn onClick={onRestart} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                운명 다시 결정하기
              </RestartBtn>
            </ActionArea>
          </SidePanel>
        </MainDisplay>
      </ContentWrapper>
    </Container>
  );
};

// --- Styled Components (압도적 디자인 복구) ---

const Container = styled(motion.div)`
  width: 100%; min-height: 100vh; background: #050505;
  display: flex; justify-content: center; align-items: center; padding: 40px 20px;
`;

const ContentWrapper = styled.div` width: 100%; max-width: 1200px; `;

const Header = styled.div`
  text-align: center; margin-bottom: 50px;
  .subtitle { color: #D4AF37; font-family: 'Cinzel', serif; letter-spacing: 4px; font-size: 0.9rem; }
  h1 { color: #fff; font-size: 2.5rem; margin-top: 10px; font-weight: 300; }
`;

const MainDisplay = styled.div`
  display: grid; grid-template-columns: 1.2fr 0.8fr; gap: 40px;
  @media (max-width: 900px) { grid-template-columns: 1fr; }
`;

const HeroCard = styled(motion.div)`
  background: #111; border: 1px solid rgba(212, 175, 55, 0.3); border-radius: 20px; overflow: hidden;
  box-shadow: 0 20px 50px rgba(0,0,0,0.5);
`;

const ImageFrame = styled.div`
  width: 100%; height: 500px; position: relative;
  img { width: 100%; height: 100%; object-fit: cover; }
  .overlay-gradient { position: absolute; inset: 0; background: linear-gradient(to bottom, transparent 50%, #111); }
  .hero-type-tag { position: absolute; top: 20px; left: 20px; background: #8b0000; color: #fff; padding: 5px 15px; font-family: 'Cinzel'; font-size: 0.8rem; border: 1px solid #D4AF37; }
`;

const HeroInfo = styled.div`
  padding: 40px; text-align: center;
  h2 { color: #D4AF37; font-family: 'Cinzel'; font-size: 2.5rem; margin-bottom: 20px; }
  p { color: #aaa; line-height: 1.8; font-size: 1.1rem; }
`;

const SidePanel = styled(motion.div)` display: flex; flex-direction: column; gap: 30px; `;

const StatBox = styled.div`
  background: rgba(255,255,255,0.03); padding: 30px; border-radius: 20px; border: 1px solid rgba(255,255,255,0.1);
  h3 { color: #fff; font-family: 'Cinzel'; margin-bottom: 30px; letter-spacing: 2px; }
`;

const StatLine = styled.div`
  margin-bottom: 20px;
  .info { display: flex; justify-content: space-between; color: #fff; font-family: 'Cinzel'; font-size: 0.8rem; margin-bottom: 8px; }
`;

const BarContainer = styled.div` width: 100%; height: 6px; background: rgba(255,255,255,0.1); border-radius: 3px; overflow: hidden; `;
const BarFill = styled(motion.div)` height: 100%; background: linear-gradient(90deg, #D4AF37, #8b0000); box-shadow: 0 0 10px #D4AF37; `;

const ActionArea = styled.div` display: flex; flex-direction: column; gap: 15px; `;
const RestartBtn = styled(motion.button)`
  padding: 20px; background: transparent; border: 1px solid #D4AF37; color: #D4AF37;
  font-family: 'Cinzel'; cursor: pointer; border-radius: 10px; font-size: 1rem;
  &:hover { background: rgba(212, 175, 55, 0.1); }
`;

export default Result;