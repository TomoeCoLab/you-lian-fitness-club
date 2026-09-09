const MAX_EDGE = 1920;
const TARGET_QUALITY = 0.82;

export async function optimizeCheckinPhoto(source: File): Promise<File> {
  if (!source.type.startsWith("image/")) return source;
  try {
    const bitmap = await createImageBitmap(source, { imageOrientation: "from-image" });
    const scale = Math.min(1, MAX_EDGE / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(bitmap.width * scale));
    canvas.height = Math.max(1, Math.round(bitmap.height * scale));
    const context = canvas.getContext("2d");
    if (!context) return source;
    context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    bitmap.close();
    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/webp", TARGET_QUALITY));
    if (!blob || blob.size >= source.size) return source;
    const baseName = source.name.replace(/\.[^.]+$/, "") || "training-photo";
    return new File([blob], `${baseName}.webp`, { type: "image/webp", lastModified: Date.now() });
  } catch {
    return source;
  }
}
