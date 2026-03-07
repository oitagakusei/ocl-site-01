const getDateParts = (
  iso?: string,
  monthFormat: "numeric" | "2-digit" = "numeric"
) => {
  if (!iso) return null;

  const date = new Date(iso);

  if (Number.isNaN(date.getTime())) return null;

  const formatter = new Intl.DateTimeFormat("ja-JP", {
    timeZone: "Asia/Tokyo",
    year: "numeric",
    month: monthFormat,
    day: monthFormat,
  });

  const parts = formatter.formatToParts(date);

  const year = parts.find((p) => p.type === "year")?.value ?? "";
  const month = parts.find((p) => p.type === "month")?.value ?? "";
  const day = parts.find((p) => p.type === "day")?.value ?? "";

  return { year, month, day };
};

// YYYY.MM.DD
export const formatYmd = (iso?: string): string => {
  const parts = getDateParts(iso, "2-digit");
  if (!parts) return "";

  return `${parts.year}.${parts.month}.${parts.day}`;
};

// YYYY/MM/DD
export const formatSlashDate = (iso?: string): string => {
  const parts = getDateParts(iso, "2-digit");
  if (!parts) return "";

  return `${parts.year}/${parts.month}/${parts.day}`;
};

// YYYY年M月D日
export const formatJapaneseDate = (iso?: string): string => {
  const parts = getDateParts(iso, "numeric");
  if (!parts) return "";

  return `${parts.year}年${parts.month}月${parts.day}日`;
};
