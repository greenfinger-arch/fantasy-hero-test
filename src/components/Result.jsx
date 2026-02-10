import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { maleHeroes, femaleHeroes } from '../data/heroes';

const Result = ({ gender, scores, onRestart }) => {
  const hero = useMemo(() => {
    const dataset = gender === 'female' ? femaleHeroes : maleHeroes;
    const stats = [
      { id: 'S', val: scores?.S || 0 },
      { id: 'M', val: scores?.M || 0 },
      { id: 'A', val: scores?.A || 0 },
      { id: 'F', val: scores?.F || 0 }
    ];
    const sorted = [...stats].sort((a, b) => b.val - a.val);
    const topStat = sorted[0].val > 0 ? sorted[0].id.toLowerCase() : 's';
    const found = dataset.find(h => h.id.toLowerCase().includes(`_${topStat}_`));
    return found || dataset[1];
  }, [gender, scores]);

  return (
    <Container
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <ContentWrapper>
        {/* 상단 타이틀 부 */}
        <ResultHeader
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="destiny-title">EPIC DESTINY UNVEILED</div>
          <h1>당신의 영혼과 공명하는 영웅</h1>
          <div className="divider" />
        </ResultHeader>

        <MainLayout>
          {/* 영웅 카드: 전설 등급 연출 */}
          <HeroCardSection
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4, type: "spring", stiffness: 50 }}
          >
            <CardFrame>
              <HeroImage src={hero.image} alt={hero.name} />
              <div className="card-overlay" />
              <div className="rank-badge">SSR</div>
              <div className="type-tag">{hero.title}</div>

              <HeroTextContent>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  {hero.name}
                </motion.h2>
                <motion.p
                  className="description"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  {hero.description}
                </motion.p>
              </HeroTextContent>
            </CardFrame>
          </HeroCardSection>

          {/* 능력치 & 액션 부 */}
          <InfoSection
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <StatCard>
              <h3>HEROIC POTENTIAL</h3>
              <div className="stat-grid">
                {['S', 'M', 'A', 'F'].map((stat, i) => (
                  <StatItem key={stat}>
                    <div className="label-row">
                      <span>{stat} TYPE</span>
                      <span>{scores[stat] || 0}</span>
                    </div>
                    <BarBg>
                      <BarFill
                        initial={{ width: 0 }}
                        animate={{ width: `${((scores[stat] || 0) / 10) * 100}%` }}
                        transition={{ delay: 1 + (i * 0.1), duration: 1.2, ease: "easeOut" }}
                        $color={i === 0 ? "#D4AF37" : "#8b0000"}
                      />
                    </BarBg>
                  </StatItem>
                ))}
              </div>
            </StatCard>

            <ButtonGroup>
              <RestartButton
                onClick={onRestart}
                whileHover={{ scale: 1.02, backgroundColor: "rgba(212, 175, 55, 0.1)" }}
                whileTap={{ scale: 0.98 }}
              >
                새로운 운명 탐색하기
              </RestartButton>
              <ShareButton whileHover={{ scale: 1.02 }}>
                결과 공유하기
              </ShareButton>
            </ButtonGroup>
          </InfoSection>
        </MainLayout>
      </ContentWrapper>
    </Container>
  );
};

// --- Styled Components (세련된 판타지 디자인 복구) ---

const Container = styled(motion.div)`
  width: 100%; min-height: 100vh;
  background: radial-gradient(circle at center, #1a0a0a 0%, #050505 100%);
  display: flex; justify-content: center; align-items: center;
  padding: 60px 20px; color: #fff;
`;

const ContentWrapper = styled.div` width: 100%; max-width: 1200px; display: flex; flex-direction: column; align-items: center; `;

const ResultHeader = styled(motion.div)`
  text-align: center; margin-bottom: 60px;
  .destiny-title { font-family: 'Cinzel', serif; color: #D4AF37; letter-spacing: 5px; font-size: 0.8rem; margin-bottom: 10px; }
  h1 { font-size: 2.8rem; font-weight: 300; letter-spacing: -1px; }
  .divider { width: 60px; height: 2px; background: #D4AF37; margin: 25px auto; box-shadow: 0 0 10px #D4AF37; }
`;

const MainLayout = styled.div`
  display: grid; grid-template-columns: 1fr 1fr; gap: 60px; width: 100%;
  @media (max-width: 1000px) { grid-template-columns: 1fr; gap: 40px; }
`;

const HeroCardSection = styled(motion.div)` width: 100%; display: flex; justify-content: center; `;

const CardFrame = styled.div`
  width: 100%; max-width: 500px; height: 650px; position: relative;
  border: 1px solid rgba(212, 175, 55, 0.4); border-radius: 15px; overflow: hidden;
  box-shadow: 0 30px 60px rgba(0,0,0,0.8), inset 0 0 100px rgba(0,0,0,0.5);
  background: #111;
`;

const HeroImage = styled.img` width: 100%; height: 100%; object-fit: cover; filter: brightness(0.8) contrast(1.1); `;

const HeroTextContent = styled.div`
  position: absolute; bottom: 0; left: 0; right: 0; padding: 50px 40px;
  background: linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.8) 50%, transparent 100%);
  text-align: center;
  h2 { font-family: 'Cinzel', serif; color: #D4AF37; font-size: 2.6rem; margin-bottom: 15px; text-shadow: 0 0 15px rgba(212, 175, 55, 0.5); }
  .description { color: #ccc; line-height: 1.8; font-size: 1rem; word-break: keep-all; font-weight: 300; }
`;

const InfoSection = styled(motion.div)` display: flex; flex-direction: column; gap: 30px; justify-content: center; `;

const StatCard = styled.div`
  background: rgba(255, 255, 255, 0.03); backdrop-filter: blur(10px);
  padding: 40px; border-radius: 20px; border: 1px solid rgba(255, 255, 255, 0.05);
  h3 { font-family: 'Cinzel', serif; color: #D4AF37; margin-bottom: 30px; letter-spacing: 2px; font-size: 1.1rem; }
  .stat-grid { display: flex; flex-direction: column; gap: 25px; }
`;

const StatItem = styled.div`
  .label-row { display: flex; justify-content: space-between; margin-bottom: 10px; font-family: 'Cinzel', serif; font-size: 0.85rem; color: #aaa; }
`;

const BarBg = styled.div` width: 100%; height: 4px; background: rgba(255,255,255,0.05); border-radius: 2px; `;
const BarFill = styled(motion.div)` height: 100%; background: ${props => props.$color}; box-shadow: 0 0 10px ${props => props.$color}; `;

const ButtonGroup = styled.div` display: flex; flex-direction: column; gap: 15px; `;

const RestartButton = styled(motion.button)`
  padding: 22px; background: transparent; border: 1px solid #D4AF37; color: #D4AF37;
  font-family: 'Cinzel', serif; font-size: 1rem; cursor: pointer; border-radius: 5px; letter-spacing: 2px;
`;

const ShareButton = styled(motion.button)`
  padding: 22px; background: #D4AF37; border: none; color: #000;
  font-family: 'Cinzel', serif; font-size: 1rem; cursor: pointer; border-radius: 5px; font-weight: bold; letter-spacing: 2px;
`;

// 추가적인 장식 요소 (Rank Badge 등)
const rankBadgeStyle = `
  .rank-badge { position: absolute; top: 30px; right: 30px; border: 2px solid #D4AF37; color: #D4AF37; padding: 5px 10px; font-family: 'Cinzel'; font-weight: bold; border-radius: 5px; background: rgba(0,0,0,0.5); }
  .type-tag { position: absolute; top: 35px; left: 30px; color: #fff; font-size: 0.7rem; letter-spacing: 3px; font-family: 'Cinzel'; opacity: 0.8; }
`;

export default Result;