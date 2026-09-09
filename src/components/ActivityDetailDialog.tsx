import { Check, ChevronLeft, ChevronRight, Clock3, Dumbbell, Flame, Hand, X } from "lucide-react";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { formatSelectedDate } from "../lib/date";
import { lockAppForModal, trapTabKey } from "../lib/modal";
import type { Checkin, ReactionKind } from "../types";
import { Avatar } from "./Avatar";

type ActivityDetailDialogProps = {
  sessions: Checkin[];
  onClose: () => void;
  onReact?: (checkinId: string, reaction: ReactionKind | null) => Promise<void>;
};

const modeLabel = {
  quick: "快速打卡",
  standard: "一般紀錄",
  detailed: "完整訓練",
} as const;

function parseTimestamp(value: string): Date {
  return new Date(value.includes("T") ? value : `${value.replace(" ", "T")}Z`);
}

function formatTime(value: string): string {
  const timestamp = parseTimestamp(value);
  return Number.isNaN(timestamp.getTime())
    ? "已完成"
    : timestamp.toLocaleTimeString("zh-TW", { hour: "2-digit", minute: "2-digit", hour12: false });
}

function exerciseSummary(checkin: Checkin): string {
  if (checkin.exercises.length === 0) return checkin.workoutType ?? modeLabel[checkin.mode];
  return checkin.exercises.map((exercise) => exercise.name).join("、");
}

const reactions: Array<{ kind: ReactionKind; label: string; icon: typeof Dumbbell }> = [
  { kind: "strong", label: "有力", icon: Dumbbell },
  { kind: "fire", label: "燃燒", icon: Flame },
  { kind: "clap", label: "拍手", icon: Hand },
];

export function ActivityDetailDialog({ sessions, onReact, onClose }: ActivityDetailDialogProps) {
  const titleId = useId();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const lightboxCloseButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLElement>(null);
  const lightboxRef = useRef<HTMLDivElement>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const orderedSessions = useMemo(
    () => [...sessions].sort((a, b) => a.createdAt.localeCompare(b.createdAt) || a.id.localeCompare(b.id)),
    [sessions],
  );
  const photos = useMemo(
    () => orderedSessions.flatMap((session) => session.photoUrl ? [{ url: session.photoUrl, session }] : []),
    [orderedSessions],
  );
  const totalMinutes = orderedSessions.reduce((total, session) => total + (session.durationMinutes ?? 0), 0);
  const user = orderedSessions[0]?.user;

  useEffect(() => {
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const unlock = lockAppForModal();
    document.body.classList.add("activity-detail-open");
    closeButtonRef.current?.focus();
    return () => {
      document.body.classList.remove("activity-detail-open");
      unlock();
      previousFocus?.focus();
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (lightboxIndex !== null) setLightboxIndex(null);
        else onClose();
        return;
      }
      trapTabKey(event, lightboxIndex !== null ? lightboxRef.current : dialogRef.current);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [lightboxIndex, onClose]);

  useEffect(() => {
    if (lightboxIndex !== null) lightboxCloseButtonRef.current?.focus();
  }, [lightboxIndex]);

  if (!user) return null;

  const moveLightbox = (amount: number) => {
    setLightboxIndex((current) => {
      if (current === null || photos.length === 0) return null;
      return (current + amount + photos.length) % photos.length;
    });
  };

  return createPortal(
    <div className="activity-detail-layer" role="presentation">
      <button className="activity-detail-scrim" onClick={onClose} aria-label="關閉訓練詳情" />
      <section ref={dialogRef} className="activity-detail" role="dialog" aria-modal="true" aria-labelledby={titleId} aria-hidden={lightboxIndex !== null} tabIndex={-1}>
        <header className="activity-detail__header">
          <div className="activity-detail__identity">
            <Avatar user={user} size="lg" />
            <div>
              <span>{formatSelectedDate(orderedSessions[0].date)}</span>
              <h2 id={titleId}>{user.displayName} 的訓練</h2>
            </div>
          </div>
          <button ref={closeButtonRef} className="icon-button icon-button--plain" onClick={onClose} aria-label="關閉">
            <X size={28} />
          </button>
        </header>

        <div className="activity-detail__summary" aria-label="當日訓練摘要">
          <span><strong>{orderedSessions.length}</strong> 場訓練</span>
          <span><strong>{totalMinutes || "—"}</strong> {totalMinutes ? "分鐘" : "未記時長"}</span>
          <span><strong>{photos.length}</strong> 張照片</span>
        </div>

        <div className="session-timeline">
          {orderedSessions.map((session, index) => {
            const photoIndex = photos.findIndex((photo) => photo.session.id === session.id);
            return (
              <article className="session-card" key={session.id}>
                <div className="session-card__rail" aria-hidden="true">
                  <span>{index + 1}</span>
                  {index < orderedSessions.length - 1 ? <i /> : null}
                </div>
                <div className="session-card__content">
                  <header>
                    <div>
                      <span className="session-card__time"><Clock3 size={14} />{formatTime(session.createdAt)}</span>
                      <h3>{session.workoutType ?? modeLabel[session.mode]}</h3>
                    </div>
                    <span className="session-card__duration">
                      {session.durationMinutes ? `${session.durationMinutes} 分鐘` : "完成"}
                      <Check size={16} strokeWidth={3} />
                    </span>
                  </header>

                  {session.note ? <p className="session-card__note">{session.note}</p> : null}

                  {session.exercises.length > 0 ? (
                    <div className="session-exercises">
                      {session.exercises.map((exercise, exerciseIndex) => (
                        <div className="session-exercise" key={`${session.id}-${exerciseIndex}`}>
                          <div><Dumbbell size={15} /><strong>{exercise.name}</strong></div>
                          <span>{exercise.sets} 組 · {exercise.weight} kg · {exercise.reps} 次</span>
                          {exercise.entries?.length ? (
                            <ol>
                              {exercise.entries.map((entry, entryIndex) => (
                                <li key={entry.id}>
                                  第 {entryIndex + 1} 組：{entry.durationSeconds
                                    ? `${entry.durationSeconds} 秒`
                                    : `${entry.weight ?? 0} kg × ${entry.reps ?? 0} 次`}
                                </li>
                              ))}
                            </ol>
                          ) : null}
                        </div>
                      ))}
                    </div>
                  ) : <p className="session-card__quick">{exerciseSummary(session)}</p>}

                  {session.photoUrl ? (
                    <button
                      className="session-photo"
                      onClick={() => setLightboxIndex(photoIndex)}
                      aria-label={`放大第 ${index + 1} 場訓練照片`}
                    >
                      <img src={session.photoUrl} alt={`${user.displayName} 第 ${index + 1} 場訓練照片`} />
                      <span>點擊查看原圖</span>
                    </button>
                  ) : null}
                  <div className="session-reactions" aria-label="回應這場訓練">
                    {reactions.map(({ kind, label, icon: Icon }) => (
                      <button
                        key={kind}
                        className={session.reactions.mine === kind ? "session-reaction session-reaction--active" : "session-reaction"}
                        aria-pressed={session.reactions.mine === kind}
                        onClick={() => void onReact?.(session.id, session.reactions.mine === kind ? null : kind)}
                      >
                        <Icon size={15} /><span>{label}</span>{session.reactions.counts[kind] > 0 ? <strong>{session.reactions.counts[kind]}</strong> : null}
                      </button>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {lightboxIndex !== null && photos[lightboxIndex] ? (
        <div ref={lightboxRef} className="photo-lightbox" role="dialog" aria-modal="true" aria-label="訓練照片" tabIndex={-1}>
          <button className="photo-lightbox__scrim" onClick={() => setLightboxIndex(null)} aria-label="關閉照片" />
          <img src={photos[lightboxIndex].url} alt={`${user.displayName} 的訓練照片`} />
          <div className="photo-lightbox__topbar">
            <span>{lightboxIndex + 1} / {photos.length}</span>
            <button ref={lightboxCloseButtonRef} onClick={() => setLightboxIndex(null)} aria-label="關閉照片"><X size={28} /></button>
          </div>
          {photos.length > 1 ? (
            <>
              <button className="photo-lightbox__arrow photo-lightbox__arrow--previous" onClick={() => moveLightbox(-1)} aria-label="上一張"><ChevronLeft size={32} /></button>
              <button className="photo-lightbox__arrow photo-lightbox__arrow--next" onClick={() => moveLightbox(1)} aria-label="下一張"><ChevronRight size={32} /></button>
            </>
          ) : null}
        </div>
      ) : null}
    </div>,
    document.body,
  );
}
