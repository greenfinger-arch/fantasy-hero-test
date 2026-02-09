import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { maleHeroes, femaleHeroes } from '../data/heroes';

const Result = ({ gender = 'male', scores, onRestart }) => {
  
  const hero = useMemo(() => {
    const S = scores?.S || 0;
    const M = scores?.M || 0;
    const A = scores?.A || 0;
    const F = scores?.F || 0;

    const dataset = gender === 'female' ? femaleHeroes : maleHeroes;
    if (!dataset || dataset.length === 0) return null;

    const stats = [
      { id: 's', val: S },
      { id: 'm', val: M },
      { id: 'a', val: A },
      { id: 'f', val: F }
    ];
    
    const sorted = [...stats].sort((a, b) => b.val - a.val);
    const topStat = sorted[0].id;

    if ((S + M + A + F) >= 10) {
      const legend = dataset.find(h => h.rank === "전설");
      if (legend) return legend;
    }

    return dataset.find(h => h.id.includes(topStat)) || dataset[0];
    
  }, [gender, scores]);

  if (!hero) return <LoadingText>운명의 실타래를 푸는 중...</LoadingText>;

  return (
    <Container
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <TitleWrapper>
        <p className="subtitle">YOUR DESTINY IS REVEALED</p>
        <h1 className="title">운명의 결과</h1>
      </TitleWrapper>

      <ContentLayout>
        {/* 카드 섹션: 영웅 이미지를 보여줌 */}
        <HeroCard 
          $glowColor={hero.glowColor || "#D4AF37"}
          whileHover={{ 
            y: -15, 
            scale: 1.02,
            transition: { duration: 0.3 } 
          }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <div className="card-inner">
            <span className="rank-tag">{hero.rank}</span>
            <img src={hero.image} alt={hero.name} />
            <div className="hero-info">
              <h3>{hero.name}</h3>
              <p>{hero.weapon}</p>
            </div>
          </div>
        </HeroCard>

        {/* 분석 섹션: 텍스트 정보를 보여줌 */}
        <AnalysisSection>
          <Description>"{hero.description}"</Description>
          <AnalysisGrid>
            <Box>
              <div className="label">성격적 장점</div>
              <ul>{hero.strengths?.map((s, i) => <li key={i}>{s}</li>)}</ul>
            </Box>
            <Box>
              <div className="label">보완할 점</div>
              <ul>{hero.weakness?.map((w, i) => <li key={i}>{w}</li>)}</ul>
            </Box>
          </AnalysisGrid>
          <AdviceBox>
            <div className="label">운명의 조언</div>
            <p>{hero.advice}</p>
          </AdviceBox>
          <ButtonGroup>
            <ShareButton 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
              onClick={() => alert('결과 링크가 복사되었습니다!')}
            >
              결과 공유하기
            </ShareButton>
            <RetryButton onClick={onRestart}>
              다시 시작하기
            </RetryButton>
          </ButtonGroup>
        </AnalysisSection>
      </ContentLayout>
    </Container>
  );
};

export default Result;

// --- 스타일 컴포넌트 ---

const Container = styled(motion.div)`
  min-height: 100vh;
  background: #050505;
  padding: 60px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
`;

const TitleWrapper = styled.div`
  text-align: center;
  margin-bottom: 50px;
  .subtitle { 
    color: #8b0000; 
    letter-spacing: 4px; 
    font-size: 0.9rem;
    font-family: 'Cinzel', serif;
  }
  .title { 
    color: #D4AF37; 
    font-size: 3rem; 
    font-family: 'Cinzel', serif;
    text-shadow: 0 0 15px rgba(212, 175, 55, 0.5);
  }
`;

const ContentLayout = styled.div`
  display: flex;
  gap: 50px;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  max-width: 1100px;
`;

const HeroCard = styled(motion.div)`
  width: 320px;
  height: 480px;
  cursor: pointer;

  .card-inner {
    width: 100%;
    height: 100%;
    border: 2px solid #D4AF37;
    border-radius: 15px;
    position: relative;
    overflow: hidden;
    box-shadow: 0 0 30px ${props => props.$glowColor};
    background: #000;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      opacity: 0.85;
      transition: transform 0.5s ease;
    }

    .rank-tag {
      position: absolute;
      top: 15px;
      right: 15px;
      background: #D4AF37;
      color: black;
      padding: 6px 14px;
      border-radius: 4px;
      font-weight: 800;
      font-size: 0.9rem;
      z-index: 2;
    }

    .hero-info {
      position: absolute;
      bottom: 0;
      width: 100%;
      background: linear-gradient(transparent, rgba(0, 0, 0, 0.95));
      padding: 30px 20px;
      text-align: center;
      z-index: 2;

      h3 {
        color: white;
        margin: 0;
        font-size: 1.8rem;
        font-family: 'Cinzel', serif;
      }

      p {
        color: #D4AF37;
        margin-top: 8px;
        font-size: 1rem;
        letter-spacing: 1px;
      }
    }
  }

  &:hover .card-inner img {
    transform: scale(1.1);
    opacity: 1;
  }
`;

const AnalysisSection = styled.div`
  flex: 1;
  min-width: 350px;
  max-width: 550px;
`;

const Description = styled.p`
  font-style: italic;
  color: #e0e0e0;
  border-left: 4px solid #8b0000;
  padding-left: 20px;
  line-height: 1.8;
  font-size: 1.1rem;
  margin-bottom: 30px;
`;

const AnalysisGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 30px;
`;

const Box = styled.div`
  background: #111;
  padding: 20px;
  border-radius: 10px;
  border: 1px solid #222;
  .label { 
    color: #D4AF37; 
    font-weight: bold; 
    margin-bottom: 12px;
    font-size: 0.95rem;
  }
  ul { 
    font-size: 0.9rem; 
    color: #bbb; 
    padding-left: 18px; 
    margin: 0;
    li { margin-bottom: 6px; }
  }
`;

const AdviceBox = styled.div`
  background: rgba(212, 175, 55, 0.05);
  border: 1px solid rgba(212, 175, 55, 0.3);
  padding: 25px;
  border-radius: 10px;
  margin-bottom: 40px;
  .label { 
    color: #D4AF37; 
    font-weight: bold;
    margin-bottom: 10px;
    display: block;
  }
  p { 
    font-size: 1rem; 
    color: #ddd;
    line-height: 1.6;
    margin: 0;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const ShareButton = styled(motion.button)`
  padding: 18px;
  background: #D4AF37;
  border: none;
  font-weight: bold;
  font-size: 1.1rem;
  cursor: pointer;
  border-radius: 6px;
  color: #000;
  transition: background 0.3s;
  &:hover { background: #f1c40f; }
`;

const RetryButton = styled.button`
  padding: 18px;
  background: transparent;
  border: 1px solid #D4AF37;
  color: #D4AF37;
  font-weight: bold;
  font-size: 1.1rem;
  cursor: pointer;
  border-radius: 6px;
  transition: all 0.3s;
  &:hover {
    background: rgba(212, 175, 55, 0.1);
  }
`;

const LoadingText = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #D4AF37;
  font-size: 1.5rem;
  background: #050505;
`;