import type { StoryFormValues } from "./schema";
import { getOptionLabel } from "./labels";

function buildStorySummary(values: StoryFormValues) {
  const era = getOptionLabel("era", values.era);
  const region = getOptionLabel("region", values.region);
  const gender = getOptionLabel("gender", values.gender);
  const ageGroup = getOptionLabel("ageGroup", values.ageGroup);
  const role = getOptionLabel("role", values.role);
  const genre = getOptionLabel("genre", values.genre);
  const subGenre = getOptionLabel("subGenre", values.subGenre);
  const tone = getOptionLabel("tone", values.tone);
  const conflict = getOptionLabel("conflict", values.conflict);
  const ending = getOptionLabel("ending", values.ending);
  const perspective = getOptionLabel("perspective", values.perspective);
  const romanceLevel = getOptionLabel("romanceLevel", values.romanceLevel);
  const combatLevel = getOptionLabel("combatLevel", values.combatLevel);

  const protagonistNameText = values.protagonistName
    ? `主角名字为“${values.protagonistName}”。`
    : "主角名字由系统自然生成。";

  const keywordText = values.keyword
    ? `故事中请自然融入以下关键词或意象：${values.keyword}。`
    : "";

  const subGenreText =
    values.subGenre === "none" ? "不额外强调副类型。" : `副类型偏向${subGenre}。`;

  return `
这是一个${era}、${region}气质的短篇幻想故事。
主角性别偏向${gender}，年龄段为${ageGroup}，身份设定为${role}。
故事主类型为${genre}。${subGenreText}
整体氛围为${tone}。
核心冲突是：${conflict}。
结局倾向为${ending}。
叙事视角使用${perspective}。
感情线强度为${romanceLevel}，战斗或动作场面强度为${combatLevel}。
${protagonistNameText}
${keywordText}
目标篇幅约为${values.length}字。
`.trim();
}

export function buildStoryPrompt(values: StoryFormValues) {
  const summary = buildStorySummary(values);

  return `
请根据以下设定，创作一篇完整、可读性强、具有画面感的中文短篇幻想故事。

设定摘要：
${summary}

创作要求：
1. 直接输出故事正文，不要输出分析过程，不要输出设定解释。
2. 故事必须包含清晰的开端、发展、高潮、结尾。
3. 主角必须有鲜明目标、阻碍与选择。
4. 不要只有概述，要有具体场景、动作、细节、情绪变化。
5. 文风要贴合所选时代、地域气质和故事类型。
6. 篇幅控制在 ${Math.max(values.length - 150, 500)} 到 ${values.length + 150} 字左右。
7. 结局必须符合指定倾向，但不要显得生硬。
8. 若用户选择“由系统决定”，请自动补全合理设定。
9. 保持短篇节奏，避免过多支线。
10. 输出格式必须严格为 JSON，不要使用 Markdown 代码块。

JSON Schema:
{
  "title": "故事标题",
  "summary": "100字以内故事简介",
  "story": "完整故事正文",
  "metadata": {
    "era": "${values.era}",
    "region": "${values.region}",
    "genre": "${values.genre}",
    "tone": "${values.tone}",
    "ending": "${values.ending}",
    "estimatedLength": ${values.length}
  }
}
`.trim();
}

export function buildStorySummaryText(values: StoryFormValues) {
  return buildStorySummary(values);
}
