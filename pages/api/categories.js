// 이 파일은 카테고리 데이터를 제공하는 API 엔드포인트입니다.

const categories = [
  {
    id: 'latest-ai',
    name: '최신 AI',
    icon: '🆕',
    services: [
      { name: 'Goblin Tools', icon: '🧰' },
      { name: 'Numeric', icon: '🔢' },
      { name: 'Adobe Project Concept', icon: '🎨' },
      { name: 'Liquid AI', icon: '💧' },
      { name: 'F5-TTS', icon: '🗣️' },
    ],
    totalServices: 12
  },
  {
    id: 'image-generators',
    name: 'Image Generators',
    icon: '🖼️',
    services: [
      { name: 'MidJourney V6.1', icon: '🎨' },
      { name: 'Adobe Firefly 3', icon: '🔥' },
      { name: 'Stable Diffusion', icon: '🖌️' },
      { name: 'Leonardo AI', icon: '🎭' },
      { name: 'FLUX.1', icon: '⚡' },
    ],
    totalServices: 188
  },
  // 필요하다면 다른 카테고리들 추가...
];

export default function handler(req, res) {
  res.status(200).json(categories);
}
