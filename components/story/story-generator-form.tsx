"use client";

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  DEFAULT_STORY_FORM,
  DICE_ENABLED_FIELDS,
  STORY_OPTIONS,
  type StoryFieldKey,
} from "@/lib/story/options";
import { storyFormSchema, type StoryFormValues } from "@/lib/story/schema";
import { buildStoryPrompt, buildStorySummaryText } from "@/lib/story/prompt";
import { rollDiceFields, rollField, rollWholeStorySeed } from "@/lib/story/random";

type SelectFieldProps = {
  label: string;
  field: StoryFieldKey;
  value: string;
  onChange: (value: string) => void;
  onRoll?: () => void;
};

function SelectField({ label, field, value, onChange, onRoll }: SelectFieldProps) {
  const options = STORY_OPTIONS[field];

  return (
    <div className="space-y-2 rounded-xl border p-4">
      <div className="flex items-center justify-between gap-3">
        <label className="text-sm font-medium">{label}</label>
        {onRoll ? (
          <button
            type="button"
            onClick={onRoll}
            className="rounded-lg border px-3 py-1 text-xs hover:bg-neutral-50"
          >
            掷骰子
          </button>
        ) : null}
      </div>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border px-3 py-2 outline-none"
      >
        {options.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default function StoryGeneratorForm() {
  const [promptPreview, setPromptPreview] = useState("");

  const form = useForm<StoryFormValues>({
    resolver: zodResolver(storyFormSchema),
    defaultValues: DEFAULT_STORY_FORM,
  });

  const values = form.watch();

  const summaryText = useMemo(() => {
    return buildStorySummaryText(values);
  }, [values]);

  const updateField = <K extends keyof StoryFormValues>(field: K, value: StoryFormValues[K]) => {
    form.setValue(field, value, { shouldValidate: true, shouldDirty: true });
  };

  const handleRollSingle = (field: StoryFieldKey) => {
    const currentValue = form.getValues(field);
    const nextValue = rollField(field, currentValue as string);
    form.setValue(field, nextValue as never, { shouldValidate: true, shouldDirty: true });
  };

  const handleRollDiceSet = () => {
    const current = form.getValues();
    const next = rollDiceFields(current, DICE_ENABLED_FIELDS);
    form.reset(next);
  };

  const handleRollAll = () => {
    const current = form.getValues();
    const next = rollWholeStorySeed(current);
    form.reset(next);
  };

  const handlePreviewPrompt = () => {
    const parsed = storyFormSchema.safeParse(form.getValues());
    if (!parsed.success) return;
    setPromptPreview(buildStoryPrompt(parsed.data));
  };

  const onSubmit = (data: StoryFormValues) => {
    const prompt = buildStoryPrompt(data);
    setPromptPreview(prompt);

    // 这里后面接你的 API
    // fetch("/api/story/generate", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ form: data, prompt }),
    // });
  };

  return (
    <div className="mx-auto max-w-6xl space-y-6 p-6">
      <div className="rounded-2xl border p-6">
        <h1 className="text-2xl font-semibold">短篇幻想故事生成器</h1>
        <p className="mt-2 text-sm text-neutral-600">
          可手动选择，也可对部分设定掷骰子随机生成。
        </p>

        <div className="mt-4 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handleRollDiceSet}
            className="rounded-lg border px-4 py-2 text-sm hover:bg-neutral-50"
          >
            掷骰子随机部分设定
          </button>

          <button
            type="button"
            onClick={handleRollAll}
            className="rounded-lg border px-4 py-2 text-sm hover:bg-neutral-50"
          >
            一键随机整套故事
          </button>

          <button
            type="button"
            onClick={handlePreviewPrompt}
            className="rounded-lg border px-4 py-2 text-sm hover:bg-neutral-50"
          >
            预览 Prompt
          </button>
        </div>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6 lg:grid-cols-2">
        <SelectField
          label="时代"
          field="era"
          value={values.era}
          onChange={(value) => updateField("era", value)}
        />

        <SelectField
          label="地域风格"
          field="region"
          value={values.region}
          onChange={(value) => updateField("region", value)}
        />

        <SelectField
          label="性别"
          field="gender"
          value={values.gender}
          onChange={(value) => updateField("gender", value)}
        />

        <SelectField
          label="年龄段"
          field="ageGroup"
          value={values.ageGroup}
          onChange={(value) => updateField("ageGroup", value)}
        />

        <SelectField
          label="主角身份"
          field="role"
          value={values.role}
          onChange={(value) => updateField("role", value)}
          onRoll={() => handleRollSingle("role")}
        />

        <SelectField
          label="主类型"
          field="genre"
          value={values.genre}
          onChange={(value) => updateField("genre", value)}
          onRoll={() => handleRollSingle("genre")}
        />

        <SelectField
          label="副类型"
          field="subGenre"
          value={values.subGenre}
          onChange={(value) => updateField("subGenre", value)}
          onRoll={() => handleRollSingle("subGenre")}
        />

        <SelectField
          label="氛围"
          field="tone"
          value={values.tone}
          onChange={(value) => updateField("tone", value)}
          onRoll={() => handleRollSingle("tone")}
        />

        <SelectField
          label="核心冲突"
          field="conflict"
          value={values.conflict}
          onChange={(value) => updateField("conflict", value)}
          onRoll={() => handleRollSingle("conflict")}
        />

        <SelectField
          label="结局倾向"
          field="ending"
          value={values.ending}
          onChange={(value) => updateField("ending", value)}
          onRoll={() => handleRollSingle("ending")}
        />

        <div className="space-y-2 rounded-xl border p-4">
          <label className="text-sm font-medium">叙事视角</label>
          <select
            value={values.perspective}
            onChange={(e) =>
              updateField("perspective", e.target.value as StoryFormValues["perspective"])
            }
            className="w-full rounded-lg border px-3 py-2 outline-none"
          >
            <option value="first_person">第一人称</option>
            <option value="third_person">第三人称</option>
          </select>
        </div>

        <div className="space-y-2 rounded-xl border p-4">
          <label className="text-sm font-medium">感情线强度</label>
          <select
            value={values.romanceLevel}
            onChange={(e) =>
              updateField("romanceLevel", e.target.value as StoryFormValues["romanceLevel"])
            }
            className="w-full rounded-lg border px-3 py-2 outline-none"
          >
            <option value="none">无</option>
            <option value="low">少量</option>
            <option value="medium">适中</option>
            <option value="high">较强</option>
          </select>
        </div>

        <div className="space-y-2 rounded-xl border p-4">
          <label className="text-sm font-medium">战斗强度</label>
          <select
            value={values.combatLevel}
            onChange={(e) =>
              updateField("combatLevel", e.target.value as StoryFormValues["combatLevel"])
            }
            className="w-full rounded-lg border px-3 py-2 outline-none"
          >
            <option value="none">无</option>
            <option value="low">少量</option>
            <option value="medium">适中</option>
            <option value="high">较强</option>
          </select>
        </div>

        <div className="space-y-2 rounded-xl border p-4">
          <label className="text-sm font-medium">主角名字（可选）</label>
          <input
            value={values.protagonistName}
            onChange={(e) => updateField("protagonistName", e.target.value)}
            placeholder="留空则自动生成"
            className="w-full rounded-lg border px-3 py-2 outline-none"
          />
        </div>

        <div className="space-y-2 rounded-xl border p-4">
          <label className="text-sm font-medium">关键词（可选）</label>
          <input
            value={values.keyword}
            onChange={(e) => updateField("keyword", e.target.value)}
            placeholder="例如：白鹿、雪夜、失落王城"
            className="w-full rounded-lg border px-3 py-2 outline-none"
          />
        </div>

        <div className="space-y-2 rounded-xl border p-4 lg:col-span-2">
          <label className="text-sm font-medium">目标字数：{values.length} 字</label>
          <input
            type="range"
            min={500}
            max={3000}
            step={100}
            value={values.length}
            onChange={(e) => updateField("length", Number(e.target.value))}
            className="w-full"
          />
        </div>

        <div className="rounded-xl border p-4 lg:col-span-2">
          <div className="mb-2 text-sm font-medium">设定摘要</div>
          <p className="whitespace-pre-line text-sm leading-7 text-neutral-700">{summaryText}</p>
        </div>

        <div className="flex gap-3 lg:col-span-2">
          <button
            type="submit"
            className="rounded-lg border px-5 py-2 text-sm hover:bg-neutral-50"
          >
            生成 Prompt
          </button>
        </div>
      </form>

      <div className="rounded-2xl border p-6">
        <h2 className="text-lg font-semibold">Prompt 预览</h2>
        <pre className="mt-4 whitespace-pre-wrap rounded-xl bg-neutral-50 p-4 text-sm leading-7">
          {promptPreview || "点击“预览 Prompt”或“生成 Prompt”后显示"}
        </pre>
      </div>
    </div>
  );
}
