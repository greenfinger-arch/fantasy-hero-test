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

  // 공유하기 기능
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: '판타지 영웅 테스트 결과',
        text: `나의 영혼과 공명하는 영웅은 [${hero.name}]입니다!`,
        url: window.location.href,
      });
    } else {
      alert("URL이 복사되었습니다.");
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const statLabels = {
    S: "강인한 투지 (Strength)",
    M: "현명한 지혜 (Magic)",
    A: "기민한 감각 (Agility)",
    F: "불굴의 신념 (Faith)"
  };

  return (
    <Container
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <ContentWrapper>
        {/* 헤더 섹션 */}
        <ResultHeader>
          <div className="destiny-title">EPIC DESTINY UNVEILED</div>
          <h1>당신의 영혼과 공명하는 영웅</h1>
          <div className="divider" />
        </ResultHeader>

        <MainLayout>
          {/* 좌측: 영웅 카드 섹션 (완성본) */}
          <HeroCardSection
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <CardFrame>
              <div className="rank-badge">SSR GRADE</div>
              <HeroImage src={hero.image} alt={hero.name} />
              <CardOverlay />
              <HeroTextContent>
                <div className="hero-title-tag">{hero.title}</div>
                <h2>{hero.name}</h2>
                <p className="description">{hero.description}</p>
              </HeroTextContent>
            </CardFrame>
          </HeroCardSection>

          {/* 우측: 상세 정보 및 능력치 섹션 (공백 제거) */}
          <InfoSection
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {/* 잠재력 보드 */}
            <StatCard>
              <div className="card-header">
                <h3>HEROIC POTENTIAL</h3>
                <span className="total-score">TOTAL SYNC: {Object.values(scores).reduce((a, b) => a + b, 0) * 10}%</span>
              </div>

              <div className="stat-grid">
                {Object.keys(statLabels).map((key, i) => (
                  <StatItem key={key}>
                    <div className="label-row">
                      <span className="stat-name">{statLabels[key]}</span>
                      <span className="stat-val">{scores[key] || 0} / 12</span>
                    </div>
                    <BarBg>
                      <BarFill
                        initial={{ width: 0 }}
                        animate={{ width: `${((scores[key] || 0) / 12) * 100}%` }}
                        transition={{ delay: 0.8 + (i * 0.1), duration: 1.5, ease: "circOut" }}
                        $color={key === 'S' || key === 'F' ? "#8b0000" : "#D4AF37"}
                      />
                    </BarBg>
                  </StatItem>
                ))}
              </div>
              <p className="stat-analysis">
                * 당신의 영혼은 <strong>{statLabels[hero.id.split('_')[1]?.toUpperCase() || 'S']}</strong> 영역에서 가장 강력한 공명을 보이고 있습니다.
              </p>
            </StatCard>

            {/* 버튼 영역 (공유 버튼 추가) */}
            <ButtonGroup>
              <ShareButton
                onClick={handleShare}
                whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(212, 175, 55, 0.4)" }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="icon">✦</span> 운명 공유하기
              </ShareButton>
              <RestartButton
                onClick={onRestart}
                whileHover={{ scale: 1.02, backgroundColor: "rgba(255, 255, 255, 0.05)" }}
                whileTap={{ scale: 0.98 }}
              >
                다른 평행세계의 나 찾기
              </RestartButton>
            </ButtonGroup>
          </InfoSection>
        </MainLayout>

        {/* 푸터 장식 (공백 방지) */}
        <FooterDecoration>
          <div className="ornament">◈ ━━━━━━━ ◆ ━━━━━━━ ◈</div>
          <p>© 2024 FANTASY HERO TEST - ALL DESTINIES RESERVED</p>
        </FooterDecoration>
      </ContentWrapper>
    </Container>
  );
};

// --- 스타일 컴포넌트 (럭셔리 복구) ---

const Container = styled(motion.div)`
  width: 100%; min-height: 100vh;
  background: radial-gradient(circle at center, #1a0a0a 0%, #050505 100%);
  display: flex; justify-content: center; align-items: flex-start;
  padding: 80px 20px; color: #fff; overflow-x: hidden;
`;

const ContentWrapper = styled.div` width: 100%; max-width: 1100px; `;

const ResultHeader = styled.div`
  text-align: center; margin-bottom: 50px;
  .destiny-title { font-family: 'Cinzel', serif; color: #D4AF37; letter-spacing: 6px; font-size: 0.8rem; }
  h1 { font-size: clamp(1.8rem, 5vw, 2.5rem); margin-top: 15px; font-weight: 300; }
  .divider { width: 80px; height: 1px; background: linear-gradient(90deg, transparent, #D4AF37, transparent); margin: 30px auto; }
`;

const MainLayout = styled.div`
  display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 50px; align-items: start;
  @media (max-width: 950px) { grid-template-columns: 1fr; }
`;

const HeroCardSection = styled(motion.div)` position: sticky; top: 40px; `;

const CardFrame = styled.div`
  position: relative; border: 1px solid rgba(212, 175, 55, 0.3); border-radius: 10px; overflow: hidden;
  box-shadow: 0 40px 100px rgba(0,0,0,0.7); background: #111;
  .rank-badge { position: absolute; top: 20px; right: 20px; background: rgba(0,0,0,0.7); padding: 5px 12px; border: 1px solid #D4AF37; color: #D4AF37; font-family: 'Cinzel'; font-size: 0.7rem; z-index: 10; }
`;

const HeroImage = styled.img` width: 100%; height: 600px; object-fit: cover; `;

const CardOverlay = styled.div`
  position: absolute; inset: 0;
  background: linear-gradient(to top, #111 0%, rgba(17,17,17,0.8) 40%, transparent 100%);
`;

const HeroTextContent = styled.div`
  position: absolute; bottom: 0; padding: 40px; text-align: center; width: 100%;
  .hero-title-tag { color: #8b0000; font-family: 'Cinzel'; font-size: 0.9rem; margin-bottom: 10px; letter-spacing: 2px; }
  h2 { font-family: 'Cinzel'; font-size: 3rem; color: #fff; margin-bottom: 20px; text-shadow: 0 0 20px rgba(212, 175, 55, 0.4); }
  .description { color: #aaa; line-height: 1.8; font-size: 1.05rem; word-break: keep-all; }
`;

const InfoSection = styled(motion.div)` display: flex; flex-direction: column; gap: 30px; `;

const StatCard = styled.div`
  background: rgba(255, 255, 255, 0.02); border: 1px solid rgba(255, 255, 255, 0.08);
  padding: 35px; border-radius: 15px; backdrop-filter: blur(10px);
  .card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 35px; border-bottom: 1px solid rgba(212, 175, 55, 0.2); padding-bottom: 15px; }
  h3 { font-family: 'Cinzel'; color: #D4AF37; font-size: 1.2rem; }
  .total-score { font-family: 'Cinzel'; color: #8b0000; font-size: 0.8rem; }
  .stat-grid { display: flex; flex-direction: column; gap: 25px; }
  .stat-analysis { margin-top: 30px; font-size: 0.85rem; color: #777; line-height: 1.6; border-top: 1px dashed rgba(255,255,255,0.1); padding-top: 20px; }
`;

const StatItem = styled.div`
  .label-row { display: flex; justify-content: space-between; margin-bottom: 12px; font-size: 0.85rem; font-family: 'Cinzel'; }
  .stat-name { color: #ccc; }
  .stat-val { color: #D4AF37; font-weight: bold; }
`;

const BarBg = styled.div` width: 100%; height: 4px; background: rgba(255,255,255,0.05); border-radius: 2px; `;
const BarFill = styled(motion.div)` height: 100%; background: ${props => props.$color}; box-shadow: 0 0 15px ${props => props.$color}; `;

const ButtonGroup = styled.div` display: flex; flex-direction: column; gap: 15px; margin-top: 10px; `;

const ShareButton = styled(motion.button)`
  background: #D4AF37; color: #000; border: none; padding: 22px; border-radius: 5px;
  font-family: 'Cinzel'; font-weight: bold; font-size: 1.1rem; cursor: pointer; letter-spacing: 2px;
  display: flex; align-items: center; justify-content: center; gap: 10px;
`;

const RestartButton = styled(motion.button)`
  background: transparent; border: 1px solid rgba(212, 175, 55, 0.5); color: #D4AF37;
  padding: 20px; border-radius: 5px; font-family: 'Cinzel'; cursor: pointer; font-size: 0.9rem;
`;

const FooterDecoration = styled.div`
  margin-top: 80px; text-align: center;
  .ornament { color: rgba(212, 175, 55, 0.3); letter-spacing: 10px; margin-bottom: 20px; }
  p { font-size: 0.7rem; color: #444; letter-spacing: 2px; font-family: 'Cinzel'; }
`;

export default Result;