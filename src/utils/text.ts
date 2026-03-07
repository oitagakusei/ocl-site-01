// メタディスクリプション用
// 記事本文の最初の150文字を動的に出力
export const truncateText = (text: string, maxLength = 150): string => {
  const trimmed = text.trim();

  if (!trimmed) return "";

  return trimmed.length > maxLength
    ? `${trimmed.substring(0, maxLength)}…`
    : trimmed;
};

// 改行を <br> に変換しつつ、HTMLはエスケープ
export const nl2br = (text?: string): string => {
  if (!text) return "";

  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\r?\n/g, "<br>");
};
