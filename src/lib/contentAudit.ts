export type ReviewStatus = 'pending' | 'source-checked' | 'visual-checked' | 'needs-revision' | 'blocked' | 'spot-checked' | 'stale';
export type AuditPart = { status: ReviewStatus; reviewedAt: string | null; findings: string[]; reviewedContentHash?: string | null; reviewedImageSha256?: string | null; internalReviewedAt?: string };
export type ContentAudit = {
  revision: number; contentHash: string; variation: string; counting: string; breathing: string; stopSignals: string[]; doseBasis: string;
  text: AuditPart; image: AuditPart;
  video: AuditPart & { auditBaselineContentHash?: string | null; reviewedEmbedUrl: string | null; fullPlaybackReviewed: boolean; check: { videoId: string; seconds: number[]; start?: number; end?: number; observation: string } | null };
};
export const reviewLabels: Record<ReviewStatus, string> = { pending: '待核對', 'source-checked': '來源已核對', 'visual-checked': '已檢視', 'needs-revision': '待修訂', blocked: '已停用', 'spot-checked': '僅片段抽查', stale: '需重新核對' };
export function diagramNeedsReplacement(audit?: ContentAudit) { return !audit || audit.image.status !== 'visual-checked'; }
