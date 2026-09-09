import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo } from "react";
import type { Checkin } from "../types";
import { calendarDays, formatMonth } from "../lib/date";
import { Avatar } from "./Avatar";

type CalendarProps = {
  month: Date;
  checkins: Checkin[];
  selectedDate: string;
  onSelectDate: (date: string) => void;
  onPreviousMonth: () => void;
  onNextMonth: () => void;
  onToday: () => void;
};

const weekdays = ["週日", "週一", "週二", "週三", "週四", "週五", "週六"];

export function Calendar({
  month,
  checkins,
  selectedDate,
  onSelectDate,
  onPreviousMonth,
  onNextMonth,
  onToday,
}: CalendarProps) {
  const byDate = useMemo(() => {
    const map = new Map<string, Map<string, Checkin[]>>();
    for (const checkin of checkins) {
      const day = map.get(checkin.date) ?? new Map<string, Checkin[]>();
      const sessions = day.get(checkin.user.id) ?? [];
      sessions.push(checkin);
      day.set(checkin.user.id, sessions);
      map.set(checkin.date, day);
    }
    return map;
  }, [checkins]);

  return (
    <section className="calendar" aria-label={formatMonth(month)}>
      <header className="calendar__header">
        <h2>{formatMonth(month)}</h2>
        <div className="calendar__controls">
          <button className="icon-button" onClick={onPreviousMonth} aria-label="上個月">
            <ChevronLeft size={20} strokeWidth={2.2} />
          </button>
          <button className="icon-button" onClick={onNextMonth} aria-label="下個月">
            <ChevronRight size={20} strokeWidth={2.2} />
          </button>
          <button className="soft-button" onClick={onToday}>今天</button>
        </div>
      </header>
      <div className="calendar__weekdays" aria-hidden="true">
        {weekdays.map((weekday) => <span key={weekday}>{weekday}</span>)}
      </div>
      <div className="calendar__grid">
        {calendarDays(month).map((day) => {
          const dayUsers = [...(byDate.get(day.key)?.values() ?? [])];
          const sessionCount = dayUsers.reduce((total, sessions) => total + sessions.length, 0);
          const selected = day.key === selectedDate;
          return (
            <button
              className={`calendar-day${selected ? " calendar-day--selected" : ""}${day.inMonth ? "" : " calendar-day--muted"}`}
              key={day.key}
              onClick={() => onSelectDate(day.key)}
              aria-label={`${day.key}，${dayUsers.length} 人、${sessionCount} 場訓練`}
              aria-current={selected ? "date" : undefined}
            >
              <span className="calendar-day__number">{day.dayNumber}</span>
              {dayUsers.length > 0 ? (
                <span className="calendar-day__avatars">
                  {dayUsers.slice(0, 3).map((sessions) => (
                    <span className="calendar-day__person" key={sessions[0].user.id}>
                      <Avatar user={sessions[0].user} size="sm" />
                      {sessions.length > 1 ? <span className="calendar-day__count">×{sessions.length}</span> : null}
                    </span>
                  ))}
                  {dayUsers.length > 3 ? <span className="calendar-day__more">+{dayUsers.length - 3}</span> : null}
                </span>
              ) : null}
            </button>
          );
        })}
      </div>
    </section>
  );
}
