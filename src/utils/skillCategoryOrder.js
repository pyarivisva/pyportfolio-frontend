export const SKILL_CATEGORY_ORDER = [
  'Frontend',
  'Backend',
  'Database',
  'Programming',
  'Tools',
  'DevOps',
  'Mobile',
  'Design',
  'Cloud',
];

const normalize = (value) => String(value ?? '').trim().toLowerCase();

const orderIndex = new Map(
  SKILL_CATEGORY_ORDER.map((category, index) => [normalize(category), index])
);

export const compareSkillCategories = (a, b) => {
  const aKey = normalize(a);
  const bKey = normalize(b);

  const aIdx = orderIndex.has(aKey) ? orderIndex.get(aKey) : Number.POSITIVE_INFINITY;
  const bIdx = orderIndex.has(bKey) ? orderIndex.get(bKey) : Number.POSITIVE_INFINITY;

  if (aIdx !== bIdx) return aIdx - bIdx;

  // Unknown categories: keep stable-ish alphabetical order
  return String(a ?? '').localeCompare(String(b ?? ''));
};

export const sortSkillCategoryEntries = (entries) => {
  if (!Array.isArray(entries)) return [];
  return [...entries].sort(([a], [b]) => compareSkillCategories(a, b));
};
