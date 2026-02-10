import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { maleHeroes, femaleHeroes } from '../data/heroes';

const Result = ({ gender = 'male', scores, onRestart }) => {
  // 디버깅용 로그
  console.log("전달된 점수:", scores);

  const hero = useMemo(() => {
    // 1. 데이터셋 선택 및 안전 장치
    const dataset = gender === 'female' ? femaleHeroes : maleHeroes;
    if (!dataset || dataset.length === 0) return null;

    // 2. 점수 집계 및 최고점 타입 추출
    // scores가 null이거나 대소문자가 섞여올 경우를 대비해 안전하게 처리합니다.
    const stats = [
      { type: 's', val: scores?.S || scores?.s || 0 },
      { type: 'm', val: scores?.M || scores?.m || 0 },
      { type: 'a', val: scores?.A || scores?.a || 0 },
      { type: 'f', val: scores?.F || scores?.f || 0 }
    ];

    const sortedStats = [...stats].sort((a, b) => b.val - a.val);
    const topType = sortedStats[0].type;

    // 3. 전설 등급 판정 (합계 점수 11점 이상)
    const totalScore = stats.reduce((acc, curr) => acc + curr.val, 0);
    if (totalScore >= 11) {
      const legend = dataset.find(h => h.rank === "전설" || h.rank === "SSR");
      if (legend) return legend;
    }

    // 4. 🔥 [정밀 매칭] m_s_1 또는 M_S_1 형태에서 중앙의 타입을 정확히 매칭
    const matchedHero = dataset.find(h => {
      const heroId = h.id.toLowerCase();
      const idParts = heroId.split('_');
      // 예: 'm_s_1' -> idParts[1]은 's'가 됨
      return idParts[1] === topType;
    });

    // 5. [최종 예외 처리] 매칭 실패 시 포함 여부 확인, 그래도 없으면 소드마스터가 아닌 중간 캐릭터(index 1) 반환
    if (!matchedHero) {
      const backupHero = dataset.find(h => h.id.toLowerCase().includes(`_${topType}_`));
      return backupHero || dataset[1];
    }

    return matchedHero;
  }, [gender, scores]);

  // 로딩 상태 처리
  if (!hero) return <LoadingText>운명의 실타래를 푸는 중...</LoadingText>;

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      alert('운명의 기록이 복사되었습니다! 친구들에게 공유해 보세요.');
    });
  };

  return (
    <Container
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <TitleWrapper>
        <motion.p
          className="subtitle"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          YOUR DESTINY IS REVEALED
        </motion.p>
        <motion.h1
          className="title"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
        >
          운명의 결과
        </motion.h1>
      </TitleWrapper>

      <ContentLayout>
        <HeroCard
          $glowColor={hero.glowColor || "#D4AF37"}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <div className="card-inner">
            <span className="rank-tag">{hero.rank}</span>
            <img src={hero.image} alt={hero.name} />
            <div className="hero-info">
              <p className="hero-weapon">{hero.weapon}</p>
              <h3>{hero.name}</h3>
            </div>
          </div>
        </HeroCard>

        <AnalysisSection
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <Description>"{hero.description}"</Description>

          <AnalysisGrid>
            <Box>
              <div className="label">성격적 장점</div>
              <ul>
                {/* 데이터 필드가 strengths 혹은 pros일 경우 모두 대응 */}
                {(hero.strengths || hero.pros || ["장점을 불러오는 중입니다."]).map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </Box>
            <Box>
              <div className="label">보완할 점</div>
              <p style={{ fontSize: '0.85rem', color: '#aaa', margin: 0 }}>
                {hero.weakness || hero.cons || "조금 더 자신을 믿으세요."}
              </p>
            </Box>
          </AnalysisGrid>

          <AdviceBox>
            <div className="label">📜 운명의 조언</div>
            <p>{hero.advice || "당신의 길을 묵묵히 걸어가십시오."}</p>
          </AdviceBox>

          <ButtonGroup>
            <ShareButton
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleShare}
            >
              운명 공유하기
            </ShareButton>
            <RetryButton
              whileHover={{ backgroundColor: "rgba(212, 175, 55, 0.1)" }}
              whileTap={{ scale: 0.98 }}
              onClick={onRestart}
            >
              다시 시작하기
            </RetryButton>
          </ButtonGroup>
        </AnalysisSection>
      </ContentLayout>
    </Container>
  );
};

// --- 스타일 컴포넌트 (요청하신 대로 기존 코드 유지) ---
const Container = styled(motion.div)` min-height: 100vh; background: radial-gradient(circle at top, #1a0a0a 0%, #050505 100%); padding: 40px 20px 80px; display: flex; flex-direction: column; align-items: center; color: white; overflow-x: hidden; `;
const TitleWrapper = styled.div` text-align: center; margin-bottom: 40px; .subtitle { color: #8b0000; letter-spacing: 4px; font-size: 0.8rem; font-family: 'Cinzel', serif; margin-bottom: 10px; } .title { color: #D4AF37; font-size: clamp(2rem, 8vw, 3.5rem); font-family: 'Cinzel', serif; text-shadow: 0 0 20px rgba(212, 175, 55, 0.4); } `;
const ContentLayout = styled.div` display: flex; gap: 40px; flex-wrap: wrap; justify-content: center; align-items: flex-start; width: 100%; max-width: 1000px; @media (max-width: 900px) { gap: 30px; } `;
const HeroCard = styled(motion.div)` width: 100%; max-width: 340px; aspect-ratio: 2/3; position: relative; .card-inner { width: 100%; height: 100%; border: 1px solid rgba(212, 175, 55, 0.5); border-radius: 20px; position: relative; overflow: hidden; box-shadow: 0 10px 50px -10px ${props => props.$glowColor}88; background: #111; img { width: 100%; height: 100%; object-fit: cover; opacity: 0.9; } .rank-tag { position: absolute; top: 20px; right: 20px; background: #D4AF37; color: black; padding: 5px 15px; border-radius: 5px; font-weight: 800; font-size: 0.8rem; z-index: 2; } .hero-info { position: absolute; bottom: 0; width: 100%; background: linear-gradient(transparent, rgba(0, 0, 0, 0.9) 70%); padding: 40px 20px 30px; text-align: center; z-index: 2; h3 { color: white; margin: 5px 0 0; font-size: 2rem; font-family: 'Cinzel', serif; } .hero-weapon { color: #D4AF37; font-size: 0.9rem; letter-spacing: 2px; text-transform: uppercase; } } } `;
const AnalysisSection = styled(motion.div)` flex: 1; min-width: 320px; max-width: 500px; `;
const Description = styled.p` font-style: italic; color: #ccc; border-left: 3px solid #8b0000; padding-left: 20px; line-height: 1.6; font-size: 1.05rem; margin-bottom: 25px; word-break: keep-all; `;
const AnalysisGrid = styled.div` display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 25px; `;
const Box = styled.div` background: rgba(255, 255, 255, 0.03); padding: 18px; border-radius: 12px; border: 1px solid rgba(255, 255, 255, 0.05); .label { color: #D4AF37; font-weight: bold; margin-bottom: 10px; font-size: 0.85rem; font-family: 'Cinzel', serif; } ul { font-size: 0.85rem; color: #aaa; padding-left: 15px; margin: 0; li { margin-bottom: 5px; } } `;
const AdviceBox = styled.div` background: rgba(212, 175, 55, 0.05); border: 1px solid rgba(212, 175, 55, 0.2); padding: 20px; border-radius: 12px; margin-bottom: 30px; .label { color: #D4AF37; font-weight: bold; margin-bottom: 8px; display: block; font-size: 0.9rem; } p { font-size: 0.95rem; color: #ddd; line-height: 1.5; margin: 0; } `;
const ButtonGroup = styled.div` display: flex; flex-direction: column; gap: 12px; `;
const ShareButton = styled(motion.button)` padding: 16px; background: #D4AF37; border: none; font-weight: bold; font-size: 1rem; cursor: pointer; border-radius: 8px; color: #000; `;
const RetryButton = styled(motion.button)` padding: 16px; background: transparent; border: 1px solid rgba(212, 175, 55, 0.5); color: #D4AF37; font-weight: bold; font-size: 1rem; cursor: pointer; border-radius: 8px; `;
const LoadingText = styled.div` height: 100vh; display: flex; align-items: center; justify-content: center; color: #D4AF37; font-size: 1.2rem; background: #050505; font-family: 'Cinzel', serif; `;

export default Result;