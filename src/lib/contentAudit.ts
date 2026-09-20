export type ReviewStatus = 'pending' | 'source-checked' | 'visual-checked' | 'needs-revision' | 'blocked' | 'spot-checked' | 'stale';
export type ContentAudit = {
  image: { status: ReviewStatus };
  video: { status: ReviewStatus; reviewedEmbedUrl: string | null; check: { videoId: string; start?: number; end?: number } | null };
};
export function diagramNeedsReplacement(audit?: ContentAudit) { return !audit || audit.image.status !== 'visual-checked'; }
