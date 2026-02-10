import React, { useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { maleHeroes, femaleHeroes } from '../data/heroes';

const Result = ({ gender, scores, onRestart }) => {
  // 1. 데이터 매칭 로직 (소드마스터 원천 차단 및 정확도 강화)
  const hero = useMemo(() => {
    const dataset = gender === 'female' ? femaleHeroes : maleHeroes;
    const stats = [
      { id: 'S', val: scores?.S || 0 },
      { id: 'M', val: scores?.M || 0 },
      { id: 'A', val: scores?.A || 0 },
      { id: 'F', val: scores?.F || 0 }
    ];

    // 가장 높은 점수 추출
    const sorted = [...stats].sort((a, b) => b.val - a.val);
    const topStat = sorted[0].id.toLowerCase();

    // 점수가 모두 0일 경우(데이터 유실)를 대비해 비전 궁수(a)나 다른 영웅을 기본값으로
    if (sorted[0].val === 0) return dataset.find(h => h.id.includes('_a_')) || dataset[2];

    // 정확한 타입 매칭
    const found = dataset.find(h => h.id.toLowerCase().includes(`_${topStat}_`));
    return found || dataset[1];
  }, [gender, scores]);

  const handleShare = () => {
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({ title: '판타지 영웅 테스트', text: `${hero.name}이(가) 나왔습니다!`, url });
    } else {
      navigator.clipboard.writeText(url);
      alert("링크가 복사되었습니다!");
    }
  };

  return (
    <Container initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <ContentWrapper>
        {/* 상단 장식 구역 */}
        <header style={{ textAlign: 'center', marginBottom: '40px' }}>
          <GoldText className="cinzel">THE LEGENDARY ARCHIVE</GoldText>
          <MainTitle>당신의 영웅적 실체</MainTitle>
        </header>

        <GridLayout>
          {/* 좌측: 영화 같은 영웅 카드 */}
          <CardContainer
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="badge">SSR CLASS</div>
            <HeroImage src={hero.image} alt={hero.name} />
            <div className="card-shadow" />
            <CardInfo>
              <p className="title cinzel">{hero.title}</p>
              <h2 className="name cinzel">{hero.name}</h2>
            </HeroInfo>
          </CardContainer>

          {/* 우측: 꽉 찬 분석 데이터 */}
          <AnalysisContainer
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {/* 장점 & 단점 섹션 (공백 해결사) */}
            <TraitSection>
              <TraitBox color="#D4AF37">
                <h4 className="cinzel">STRENGTHS</h4>
                <ul>
                  {hero.pros?.map((p, i) => <li key={i}>{p}</li>) || <li>뛰어난 전략적 판단력과 용기</li>}
                </ul>
              </TraitBox>
              <TraitBox color="#8b0000">
                <h4 className="cinzel">WEAKNESSES</h4>
                <ul>
                  {hero.cons?.map((c, i) => <li key={i}>{c}</li>) || <li>가끔 지나친 완벽주의로 인한 고뇌</li>}
                </ul>
              </TraitBox>
            </TraitSection>

            {/* 능력치 그래프 */}
            <StatBoard>
              <h4 className="cinzel" style={{ color: '#D4AF37', marginBottom: '20px' }}>POTENTIAL GRAPH</h4>
              {['S', 'M', 'A', 'F'].map((s, i) => (
                <StatRow key={s}>
                  <div className="row-info">
                    <span className="cinzel">{s} TYPE</span>
                    <span>{scores[s] || 0}</span>
                  </div>
                  <div className="bar-bg">
                    <motion.div
                      className="bar-fill"
                      initial={{ width: 0 }}
                      animate={{ width: `${((scores[s] || 0) / 12) * 100}%` }}
                      transition={{ delay: 0.6 + (i * 0.1), duration: 1 }}
                      style={{ backgroundColor: i % 2 === 0 ? '#D4AF37' : '#8b0000' }}
                    />
                  </div>
                </StatRow>
              ))}
            </StatBoard>

            {/* 하단 버튼부 */}
            <ButtonGrid>
              <ShareBtn onClick={handleShare} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                결과 공유하기
              </ShareBtn>
              <RestartBtn onClick={onRestart}>운명의 수레바퀴 다시 돌리기</RestartBtn>
            </ButtonGrid>
          </AnalysisContainer>
        </GridLayout>
      </ContentWrapper>
    </Container>
  );
};

// --- Styled Components (디자인 밀도 극대화) ---

const Container = styled(motion.div)`
  width: 100%; min-height: 100vh; background: #050505;
  padding: 60px 20px; display: flex; justify-content: center;
  font-family: 'Noto Sans KR', sans-serif;
  .cinzel { font-family: 'Cinzel', serif; }
`;

const ContentWrapper = styled.div` width: 100%; max-width: 1100px; `;

const GoldText = styled.p` color: #D4AF37; letter-spacing: 5px; font-size: 0.8rem; `;
const MainTitle = styled.h1` color: #fff; font-size: 2.5rem; font-weight: 300; margin-top: 10px; `;

const GridLayout = styled.div`
  display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 50px; margin-top: 40px;
  @media (max-width: 950px) { grid-template-columns: 1fr; }
`;

const CardContainer = styled(motion.div)`
  position: relative; border-radius: 20px; overflow: hidden; height: 650px;
  border: 1px solid rgba(212, 175, 55, 0.4); box-shadow: 0 30px 60px rgba(0,0,0,0.8);
  .badge { position: absolute; top: 20px; right: 20px; background: rgba(0,0,0,0.8); border: 1px solid #D4AF37; color: #D4AF37; padding: 5px 15px; z-index: 10; font-size: 0.8rem; }
`;

const HeroImage = styled.img` width: 100%; height: 100%; object-fit: cover; `;
const CardInfo = styled.div`
  position: absolute; bottom: 0; width: 100%; padding: 60px 40px;
  background: linear-gradient(to top, #000 20%, transparent); text-align: center;
  .title { color: #8b0000; letter-spacing: 3px; margin-bottom: 10px; }
  .name { color: #fff; font-size: 3rem; }
`;

const AnalysisContainer = styled(motion.div)` display: flex; flex-direction: column; gap: 30px; `;

const TraitSection = styled.div` display: grid; grid-template-columns: 1fr 1fr; gap: 20px; `;
const TraitBox = styled.div`
  background: rgba(255,255,255,0.03); padding: 25px; border-radius: 15px; border-left: 4px solid ${props => props.color};
  h4 { color: ${props => props.color}; margin-bottom: 15px; font-size: 0.9rem; letter-spacing: 2px; }
  ul { padding-left: 18px; color: #ccc; font-size: 0.85rem; line-height: 1.6; }
  li { margin-bottom: 8px; }
`;

const StatBoard = styled.div`
  background: rgba(255,255,255,0.02); padding: 30px; border-radius: 15px;
`;

const StatRow = styled.div`
  margin-bottom: 20px;
  .row-info { display: flex; justify-content: space-between; color: #fff; font-size: 0.8rem; margin-bottom: 8px; }
  .bar-bg { width: 100%; height: 5px; background: rgba(255,255,255,0.1); border-radius: 3px; overflow: hidden; }
  .bar-fill { height: 100%; box-shadow: 0 0 10px rgba(212, 175, 55, 0.5); }
`;

const ButtonGrid = styled.div` display: flex; flex-direction: column; gap: 15px; `;
const ShareBtn = styled(motion.button)`
  background: #D4AF37; color: #000; border: none; padding: 20px; font-family: 'Cinzel'; font-weight: bold; cursor: pointer; border-radius: 8px;
`;
const RestartBtn = styled(motion.button)`
  background: transparent; border: 1px solid rgba(255,255,255,0.2); color: #777; padding: 15px; cursor: pointer; border-radius: 8px; font-size: 0.8rem;
  &:hover { color: #D4AF37; border-color: #D4AF37; }
`;

export default Result;