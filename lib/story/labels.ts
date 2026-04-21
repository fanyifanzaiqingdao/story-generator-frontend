import { STORY_OPTIONS, StoryFieldKey } from "./options";

export function getOptionLabel(field: StoryFieldKey, value: string): string {
  const found = STORY_OPTIONS[field].find((item) => item.value === value);
  return found?.label ?? value;
}
