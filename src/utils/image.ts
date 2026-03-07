// microCMS画像URLを整える処理で、?fm=webp の付与の安定化
export const appendImageFormat = (src: string, format = "webp"): string => {
  if (!src) return "";
  return `${src}${src.includes("?") ? "&" : "?"}fm=${format}`;
};
