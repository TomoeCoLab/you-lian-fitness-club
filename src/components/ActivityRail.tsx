import { Check, ChevronRight, Dumbbell } from "lucide-react";
import { useMemo, useState } from "react";
import type { Checkin, ReactionKind } from "../types";
import { formatSelectedDate } from "../lib/date";
import { Avatar } from "./Avatar";
import { ActivityDetailDialog } from "./ActivityDetailDialog";

type ActivityRailProps = {
  date: string;
  checkins: Checkin[];
  localOnly?: boolean;
  onReact?: (checkinId: string, reaction: ReactionKind | null) => Promise<void>;
};

const modeLabel = {
  quick: "快速打卡",
  standard: "一般紀錄",
  detailed: "完整訓練",
} as const;

export function ActivityRail({ date, checkins, localOnly = false, onReact }: ActivityRailProps) {
  const [activeUserId, setActiveUserId] = useState<string | null>(null);
  const groups = useMemo(() => {
    const byUser = new Map<string, Checkin[]>();
    for (const checkin of checkins) {
      const sessions = byUser.get(checkin.user.id) ?? [];
      sessions.push(checkin);
      byUser.set(checkin.user.id, sessions);
    }
    return [...byUser.values()].map((sessions) => sessions.sort(
      (a, b) => a.createdAt.localeCompare(b.createdAt) || a.id.localeCompare(b.id),
    ));
  }, [checkins]);
  const activeSessions = activeUserId ? groups.find((sessions) => sessions[0]?.user.id === activeUserId) ?? null : null;

  return (
    <aside className="activity-rail" aria-label={`${formatSelectedDate(date)}的${localOnly ? "個人紀錄" : "好友動態"}`}>
      <h2>{formatSelectedDate(date)}</h2>
      {groups.length === 0 ? (
        <div className="activity-empty">
          <Dumbbell size={28} strokeWidth={1.7} />
          <p>{localOnly ? "這一天還沒有訓練紀錄。" : "這一天還沒有人留下訓練紀錄。"}</p>
        </div>
      ) : (
        <div className="activity-list">
          {groups.map((sessions) => {
            const first = sessions[0];
            const latestPhoto = [...sessions].reverse().find((session) => session.photoUrl)?.photoUrl ?? null;
            const totalMinutes = sessions.reduce((total, session) => total + (session.durationMinutes ?? 0), 0);
            const labels = [...new Set(sessions.map((session) => session.workoutType ?? modeLabel[session.mode]))];
            return (
              <article className="activity-row" key={first.user.id}>
                <button className="activity-row__trigger" onClick={() => setActiveUserId(first.user.id)} aria-label={`查看 ${first.user.displayName} 的 ${sessions.length} 場訓練`}>
                  <Avatar user={first.user} size="lg" />
                  <div className="activity-row__body">
                    <strong>{first.user.displayName}</strong>
                    <span>{labels.join(" · ")}</span>
                    <p>{sessions.length > 1 ? `今天累積 ${sessions.length} 場訓練` : "查看完整訓練內容"}</p>
                  </div>
                  <div className="activity-row__meta">
                    <span>{totalMinutes ? `${totalMinutes} 分鐘` : `${sessions.length} 場`}</span>
                    <span className="activity-row__status"><Check className="activity-row__check" size={18} strokeWidth={3} aria-hidden="true" /><ChevronRight size={18} aria-hidden="true" /></span>
                  </div>
                  {latestPhoto ? <img className="activity-row__photo" src={latestPhoto} alt={`${first.user.displayName} 的訓練照片縮圖`} /> : null}
                </button>
              </article>
            );
          })}
        </div>
      )}
      {activeSessions ? <ActivityDetailDialog sessions={activeSessions} onReact={onReact} onClose={() => setActiveUserId(null)} /> : null}
    </aside>
  );
}
