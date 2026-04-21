import {
  DEFAULT_STORY_FORM,
  DICE_ENABLED_FIELDS,
  STORY_OPTIONS,
  StoryFieldKey,
} from "./options";
import type { StoryFormValues } from "./schema";

function pickRandom<T>(items: T[], exclude?: T): T {
  const pool = exclude === undefined ? items : items.filter((item) => item !== exclude);
  const source = pool.length > 0 ? pool : items;
  return source[Math.floor(Math.random() * source.length)];
}

export function rollField<K extends StoryFieldKey>(
  field: K,
  currentValue?: string
): string {
  const values = STORY_OPTIONS[field].map((item) => item.value);
  return pickRandom(values, currentValue);
}

export function rollDiceFields(
  current: StoryFormValues,
  fields: StoryFieldKey[] = DICE_ENABLED_FIELDS
): StoryFormValues {
  const next = { ...current };

  for (const field of fields) {
    next[field] = rollField(field, current[field] as string) as never;
  }

  return next;
}

export function rollWholeStorySeed(
  current?: Partial<StoryFormValues>
): StoryFormValues {
  const base: StoryFormValues = {
    ...DEFAULT_STORY_FORM,
    ...current,
  };

  return {
    ...base,
    era: rollField("era", base.era),
    region: rollField("region", base.region),
    gender: rollField("gender", base.gender),
    ageGroup: rollField("ageGroup", base.ageGroup),
    role: rollField("role", base.role),
    genre: rollField("genre", base.genre),
    subGenre: rollField("subGenre", base.subGenre),
    tone: rollField("tone", base.tone),
    conflict: rollField("conflict", base.conflict),
    ending: rollField("ending", base.ending),
    perspective: Math.random() > 0.5 ? "first_person" : "third_person",
    romanceLevel: pickRandom(["none", "low", "medium", "high"], base.romanceLevel),
    combatLevel: pickRandom(["none", "low", "medium", "high"], base.combatLevel),
  };
}
