import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Checkin, ReactionKind } from "../types";
import { formatMonth, formatSelectedDate } from "../lib/date";
import { ActivityRail } from "./ActivityRail";

type FriendFeedProps = {
  month: Date;
  checkins: Checkin[];
  localOnly?: boolean;
  onPreviousMonth: () => void;
  onNextMonth: () => void;
  onToday: () => void;
  onReact?: (checkinId: string, reaction: ReactionKind | null) => Promise<void>;
};

export function FriendFeed({ month, checkins, localOnly = false, onReact, onPreviousMonth, onNextMonth, onToday }: FriendFeedProps) {
  const groups = new Map<string, Checkin[]>();
  for (const checkin of checkins) {
    const group = groups.get(checkin.date) ?? [];
    group.push(checkin);
    groups.set(checkin.date, group);
  }
  const dates = [...groups.keys()].sort((a, b) => b.localeCompare(a));

  return (
    <section className="friend-feed">
      <header>
        <div><h1>{localOnly ? "我的紀錄" : "好友動態"}</h1><p>{localOnly ? "只保存在這個瀏覽器，不會同步到其他裝置。" : "這裡只會出現已加入「今天有練」的訓練紀錄。"}</p></div>
        <div className="friend-feed__month" aria-label="好友動態月份">
          <strong>{formatMonth(month)}</strong>
          <button onClick={onPreviousMonth} aria-label="上個月"><ChevronLeft size={19} /></button>
          <button onClick={onNextMonth} aria-label="下個月"><ChevronRight size={19} /></button>
          <button onClick={onToday}>本月</button>
        </div>
      </header>
      {dates.length ? dates.map((date) => (
        <div className="friend-feed__day" key={date}>
          <span className="friend-feed__date">{formatSelectedDate(date)}</span>
          <ActivityRail date={date} checkins={groups.get(date) ?? []} localOnly={localOnly} onReact={onReact} />
        </div>
      )) : <p className="friend-feed__empty">{localOnly ? "這個月還沒有訓練紀錄。" : "這個月還沒有好友動態。"}</p>}
    </section>
  );
}
