export const resolveMediaUrl = (url) => {
  if (!url) return '';
  const trimmed = String(url).trim();
  if (!trimmed) return '';

  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  
  if (trimmed.startsWith('data:')) return trimmed;

  if (trimmed.startsWith('/uploads')) return trimmed;
  if (trimmed.startsWith('uploads')) return `/${trimmed}`;

  if (!trimmed.startsWith('/')) return `/${trimmed}`;

  return trimmed;
};