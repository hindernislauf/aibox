// pages/api/services.js

const allServices = [
  {
    name: "Goblin Tools",
    domain: "https://goblin.tools/",
    description: "웹용 시리즈를 생성하기 위한 AI 툴셋입니다.",
    category: "latest-ai",
    type: "무료",
    tags: ["AI도구모음이 필요해", "보조 기능(AI)"],
    upvotes: 31
  },
  {
    name: "Numeric",
    domain: "https://www.numeric.io/",
    description: "비즈니스 회계를 단순화하는 AI 도구입니다.",
    category: "latest-ai",
    type: "프리미엄",
    tags: ["프로페셔널", "재무"],
    upvotes: 29
  },
  {
    name: "Adobe Project Concept",
    domain: "https://blog.adobe.com/en/publish/2024/10/14/new-creative-beginnings-gen-ai-redefining-ideation-with-project-concept",
    description: "창의적을 자극하는 실험적인 AI 프로젝트입니다.",
    category: "latest-ai",
    type: "무료",
    tags: ["미리보기"],
    upvotes: 27
  },
  {
    name: "Liquid AI",
    domain: "https://www.liquid-ai.com/",
    description: "LFM이라는 강력한 생성 AI 모델 세트입니다.",
    category: "latest-ai",
    type: "프리미엄",
    tags: ["개발자 도구", "LLM 모델"],
    upvotes: 27
  },
  {
    name: "F5-TTS",
    domain: "https://github.com/facebookresearch/fairseq/tree/main/examples/speech_synthesis",
    description: "고품질 텍스트 음성 변환을 위한 오픈 소스 프로젝트입니다.",
    category: "latest-ai",
    type: "무료",
    tags: ["개발자 도구", "GITHUB 프로젝트"],
    upvotes: 37
  },
  {
    name: "Relyance AI",
    domain: "https://relyance.ai/",
    description: "회사의 데이터 처리에 대한 위험한 기사성을 확보하고 글로벌 개인 정보 보호 및 보안 규정 준수를 보장하세요.",
    category: "latest-ai",
    type: "유료픽",
    tags: ["데이터 및 분석"],
    upvotes: 21
  },
  {
    name: "Swarm by OpenAI",
    domain: "https://github.com/openai/swarm-agents",
    description: "AI 에이전트 오케스트레이션을 탐색하기 위한 OpenAI의 오픈 소스 고급 프레임워크입니다.",
    category: "latest-ai",
    type: "무료",
    tags: ["AI 에이전트", "GITHUB 프로젝트"],
    upvotes: 47
  },
  {
    name: "Tesla Robotaxi",
    domain: "https://www.tesla.com/robotaxi",
    description: "자율적이고 미래 지향적인 디자인의 Robotaxi 차량(테슬라에서 새롭게 공개).",
    category: "latest-ai",
    type: "유료픽",
    tags: ["미래의 모습", "로봇 및 장치"],
    upvotes: 51
  },
  {
    name: "PMRF",
    domain: "https://github.com/jmliu88/PMRF",
    description: "사실적인 이미지 복원을 위한 강력한 알고리즘입니다.",
    category: "latest-ai",
    type: "무료",
    tags: ["개발자 도구", "이미지 편집"],
    upvotes: 26
  },
  {
    name: "AI Shopping Guides",
    domain: "https://www.amazon.com/b?node=23902524011",
    description: "Amazon의 AI 쇼핑 도우미인 Rufus를 통해 맞춤형 쇼핑 가이드, 제품 추천, 질문에 대한 답변을 받아보세요.",
    category: "latest-ai",
    type: "무료",
    tags: ["AI 쇼핑몰", "생활 도우미"],
    upvotes: 36
  },
  {
    name: "Readyverse",
    domain: "https://readyplayer.me/readyverse",
    description: "메타버스 게임과 환경을 탐색하기 위한 완벽한 플랫폼입니다.",
    category: "latest-ai",
    type: "무료",
    tags: ["게임"],
    upvotes: 23
  },
  {
    name: "MarketAlerts.ai",
    domain: "https://marketalerts.ai/",
    description: "금융 시장 모니터링 및 분석을 위한 AI 도구입니다.",
    category: "latest-ai",
    type: "프리미엄",
    tags: ["AI도구모음이 필요해", "재무"],
    upvotes: 36
  }
];

export default function handler(req, res) {
  const { category, page = 1, limit = 12 } = req.query;
  console.log('Requested category:', category); // 디버깅용

  const filteredServices = category
    ? allServices.filter(service => service.category.toLowerCase() === category.toLowerCase())
    : allServices;

  console.log('Filtered services:', filteredServices); // 디버깅용

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const paginatedServices = filteredServices.slice(startIndex, endIndex);

  const totalPages = Math.ceil(filteredServices.length / limit);

  res.status(200).json({
    services: paginatedServices,
    currentPage: page,
    totalPages: totalPages,
    totalServices: filteredServices.length
  });
}
