export const questions = [
  {
    id: 1,
    question: "짙은 안개 속, 낯선 차원의 문이 열렸습니다. 당신이 가장 먼저 손에 쥐는 것은?",
    image: "/images/q1.jpg",
    answers: [ // options를 answers로 변경 (Test.jsx와 일치)
      { text: "묵직한 기운이 느껴지는 대검", effects: { S: 1 } }, // type을 effects 객체로 변경
      { text: "기묘한 문자가 새겨진 마법서", effects: { M: 1 } },
      { text: "소리 없이 공기를 가르는 은색 단검", effects: { A: 1 } },
      { text: "성스러운 빛을 내뿜는 팬던트", effects: { F: 1 } }
    ]
  },
  {
    id: 2,
    question: "숲속에서 굶주린 마수(魔獸)들이 당신을 포위했습니다. 어떻게 대처하시겠습니까?",
    image: "/images/q2.jpg",
    answers: [
      { text: "정면으로 돌진하여 길을 뚫는다", effects: { S: 1 } },
      { text: "광역 주문을 캐스팅하여 소멸시킨다", effects: { M: 1 } },
      { text: "나무 위로 도약해 기습적으로 처치한다", effects: { A: 1 } },
      { text: "기도로 신성한 보호막을 생성한다", effects: { F: 1 } }
    ]
  },
  {
    id: 3,
    question: "부상당한 노인이 도움을 요청하며 지도를 건넵니다. 당신의 반응은?",
    image: "/images/q3.jpg",
    answers: [
      { text: "무거운 짐을 대신 짊어지고 함께 걷는다", effects: { S: 1 } },
      { text: "마법으로 상처를 즉시 치유해준다", effects: { M: 1 } },
      { text: "주변을 정찰하며 위험 요소를 미리 제거한다", effects: { A: 1 } },
      { text: "노인의 안위를 위해 축복의 기도를 올린다", effects: { F: 1 } }
    ]
  },
  {
    id: 4,
    question: "보물이 잠들어 있다는 동굴 앞, 거대한 바위가 입구를 막고 있다면?",
    image: "/images/q4.jpg",
    answers: [
      { text: "모든 근력을 집중해 바위를 밀어낸다", effects: { S: 1 } },
      { text: "마력 폭발을 이용해 바위를 산산조각 낸다", effects: { M: 1 } },
      { text: "바위 틈새의 정교한 장치를 찾아 해제한다", effects: { A: 1 } },
      { text: "동굴의 영령들에게 입구를 열어달라 간청한다", effects: { F: 1 } }
    ]
  },
  {
    id: 5,
    question: "전쟁터 한복판, 당신이 맡은 가장 중요한 역할은 무엇입니까?",
    image: "/images/q5.jpg",
    answers: [
      { text: "최전방에서 적의 공격을 온몸으로 막아내는 방패", effects: { S: 1 } },
      { text: "후방에서 전장을 뒤흔드는 강력한 화력 지원", effects: { M: 1 } },
      { text: "적진 깊숙이 침투해 지휘관을 암살하는 칼날", effects: { A: 1 } },
      { text: "아군의 사기를 높이고 부상자를 돌보는 등불", effects: { F: 1 } }
    ]
  },
  {
    id: 6,
    question: "수천 년 된 금서(禁書)를 발견했습니다. 무엇을 먼저 배우고 싶나요?",
    image: "/images/q6.jpg",
    answers: [
      { text: "육체의 한계를 넘어서는 극한의 무술", effects: { S: 1 } },
      { text: "차원을 뒤틀고 시간을 멈추는 비술", effects: { M: 1 } },
      { text: "그림자 속에 숨어 흔적을 지우는 은신술", effects: { A: 1 } },
      { text: "고난 속에서도 꺾이지 않는 영혼의 정화술", effects: { F: 1 } }
    ]
  },
  {
    id: 7,
    question: "악마가 나타나 달콤한 제안을 합니다. 당신의 대답은?",
    image: "/images/q7.jpg",
    answers: [
      { text: "말이 필요 없다. 칼 끝으로 대답한다", effects: { S: 1 } },
      { text: "악마의 마력마저 흡수해 내 것으로 만든다", effects: { M: 1 } },
      { text: "대화하는 척하며 급소를 노린다", effects: { A: 1 } },
      { text: "사악한 기운을 거부하며 정의를 선포한다", effects: { F: 1 } }
    ]
  },
  {
    id: 8,
    question: "기나긴 여정 중 맞이한 밤, 모닥불 앞에서 당신은 무엇을 하며 시간을 보내나요?",
    image: "/images/q8.jpg",
    answers: [
      { text: "다음 전투를 위해 무기를 손질한다", effects: { S: 1 } },
      { text: "고대 명상법으로 마력을 보충한다", effects: { M: 1 } },
      { text: "지형지물을 살피며 야습에 대비한다", effects: { A: 1 } },
      { text: "동료들과 함께 오늘의 은혜에 감사한다", effects: { F: 1 } }
    ]
  },
  {
    id: 9,
    question: "드래곤의 레어(Lair)에 도착했습니다. 드래곤이 당신을 시험하려 합니다.",
    image: "/images/q9.jpg",
    answers: [
      { text: "자신의 강함을 증명하기 위해 정면 승부를 건다", effects: { S: 1 } },
      { text: "드래곤의 약점을 파악할 고위 탐지 마법을 쓴다", effects: { M: 1 } },
      { text: "화염을 피해 사각지대로 빠르게 파고든다", effects: { A: 1 } },
      { text: "진심 어린 대화로 드래곤과 계약을 맺는다", effects: { F: 1 } }
    ]
  },
  {
    id: 10,
    question: "절친한 동료가 적의 함정에 빠져 죽을 위기에 처했다면?",
    image: "/images/q10.jpg",
    answers: [
      { text: "적진으로 뛰어들어 동료를 직접 구출해온다", effects: { S: 1 } },
      { text: "원거리 마법으로 적들을 일시에 제압한다", effects: { M: 1 } },
      { text: "아무도 모르게 접근해 결박을 풀고 탈출시킨다", effects: { A: 1 } },
      { text: "하늘의 힘을 빌려 동료에게 무적의 가호를 내린다", effects: { F: 1 } }
    ]
  },
  {
    id: 11,
    question: "마침내 평화가 찾아왔습니다. 왕이 하사하는 보상 중 당신의 선택은?",
    image: "/images/q11.jpg",
    answers: [
      { text: "전설의 대장장이가 만든 불멸의 갑옷", effects: { S: 1 } },
      { text: "세상의 모든 지식이 담긴 마법의 수정구", effects: { M: 1 } },
      { text: "어디든 눈 깜짝할 새 이동하는 바람의 장화", effects: { A: 1 } },
      { text: "백성들을 치유할 권능이 담긴 성스러운 성배", effects: { F: 1 } }
    ]
  },
  {
    id: 12,
    question: "현세로 돌아가기 직전, 당신의 영혼에 새겨진 마지막 문구는?",
    image: "/images/q12.jpg",
    answers: [
      { text: "나의 힘은 꺾이지 않는 산과 같으리라", effects: { S: 1 } },
      { text: "지혜는 어둠 속에서 유일하게 빛나는 별이다", effects: { M: 1 } },
      { text: "바람처럼 나타나 그림자처럼 사라지리라", effects: { A: 1 } },
      { text: "정의와 사랑은 영원히 배신하지 않는다", effects: { F: 1 } }
    ]
  }
];