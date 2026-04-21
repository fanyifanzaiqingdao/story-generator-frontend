export type OptionItem = {
  label: string;
  value: string;
  description?: string;
};

import type { StoryFormValues } from "@/lib/story/schema";

export type StoryFieldKey =
  | "era"
  | "region"
  | "gender"
  | "ageGroup"
  | "role"
  | "genre"
  | "subGenre"
  | "tone"
  | "conflict"
  | "ending"
  | "perspective"
  | "romanceLevel"
  | "combatLevel";

export const STORY_OPTIONS: Record<StoryFieldKey, OptionItem[]> = {
  era: [
    { label: "古代", value: "ancient" },
    { label: "近代", value: "early_modern" },
    { label: "现代", value: "modern" },
    { label: "未来", value: "future" },
    { label: "架空时代", value: "fantasy_era" },
  ],
  region: [
    { label: "中国风", value: "chinese" },
    { label: "欧洲风", value: "european" },
    { label: "北美风", value: "north_american" },
    { label: "中东风", value: "middle_eastern" },
    { label: "北欧幻想", value: "nordic_fantasy" },
    { label: "混合架空世界", value: "mixed_fantasy" },
  ],
  gender: [
    { label: "男", value: "male" },
    { label: "女", value: "female" },
    { label: "由系统决定", value: "auto" },
  ],
  ageGroup: [
    { label: "少年（12-17）", value: "teen" },
    { label: "青年（18-25）", value: "young_adult" },
    { label: "成年（26-40）", value: "adult" },
    { label: "中年（41-55）", value: "middle_aged" },
    { label: "长者（56+）", value: "elder" },
  ],
  role: [
    { label: "流浪者", value: "wanderer" },
    { label: "学徒", value: "apprentice" },
    { label: "猎人", value: "hunter" },
    { label: "骑士侍从", value: "squire" },
    { label: "书院学生", value: "student" },
    { label: "侦探助手", value: "detective_assistant" },
    { label: "机械师", value: "engineer" },
    { label: "失忆旅人", value: "amnesiac_traveler" },
    { label: "亡国后裔", value: "fallen_heir" },
    { label: "被通缉者", value: "wanted_fugitive" },
  ],
  genre: [
    { label: "冒险", value: "adventure" },
    { label: "科幻", value: "science_fiction" },
    { label: "武侠", value: "wuxia" },
    { label: "西部", value: "western" },
    { label: "骑士传奇", value: "knight" },
    { label: "侦探", value: "detective" },
    { label: "魔法奇幻", value: "fantasy" },
    { label: "蒸汽朋克", value: "steampunk" },
    { label: "末日生存", value: "apocalypse" },
  ],
  subGenre: [
    { label: "无", value: "none" },
    { label: "悬疑", value: "mystery" },
    { label: "成长", value: "coming_of_age" },
    { label: "复仇", value: "revenge" },
    { label: "爱情", value: "romance" },
    { label: "宫廷", value: "court" },
    { label: "异能", value: "supernatural" },
    { label: "航海", value: "voyage" },
  ],
  tone: [
    { label: "温暖治愈", value: "warm" },
    { label: "紧张刺激", value: "tense" },
    { label: "黑暗压抑", value: "dark" },
    { label: "浪漫忧伤", value: "melancholic" },
    { label: "轻松幽默", value: "lighthearted" },
    { label: "史诗宏大", value: "epic" },
    { label: "神秘诡异", value: "mysterious" },
  ],
  conflict: [
    { label: "寻找失踪的人", value: "find_missing_person" },
    { label: "逃离追捕", value: "escape_hunt" },
    { label: "夺回遗失之物", value: "retrieve_artifact" },
    { label: "揭开一个秘密", value: "uncover_secret" },
    { label: "保护某个人", value: "protect_someone" },
    { label: "完成试炼", value: "trial" },
    { label: "调查离奇案件", value: "investigate_case" },
    { label: "阻止灾难", value: "stop_disaster" },
  ],
  ending: [
    { label: "圆满", value: "happy" },
    { label: "开放式", value: "open" },
    { label: "悲剧", value: "tragic" },
    { label: "反转", value: "twist" },
    { label: "苦中带甜", value: "bittersweet" },
  ],
  perspective: [
    { label: "第一人称", value: "first_person" },
    { label: "第三人称", value: "third_person" },
  ],
  romanceLevel: [
    { label: "无", value: "none" },
    { label: "少量", value: "low" },
    { label: "适中", value: "medium" },
    { label: "较强", value: "high" },
  ],
  combatLevel: [
    { label: "无", value: "none" },
    { label: "少量", value: "low" },
    { label: "适中", value: "medium" },
    { label: "较强", value: "high" },
  ],
};

export const DICE_ENABLED_FIELDS: StoryFieldKey[] = [
  "role",
  "genre",
  "subGenre",
  "tone",
  "conflict",
  "ending",
];

export const DEFAULT_STORY_FORM: StoryFormValues = {
  era: "fantasy_era",
  region: "mixed_fantasy",
  gender: "auto",
  ageGroup: "young_adult",
  role: "wanderer",
  genre: "fantasy",
  subGenre: "none",
  tone: "mysterious",
  conflict: "uncover_secret",
  ending: "bittersweet",
  perspective: "third_person",
  romanceLevel: "low",
  combatLevel: "medium",
  protagonistName: "",
  keyword: "",
  length: 1200,
};
