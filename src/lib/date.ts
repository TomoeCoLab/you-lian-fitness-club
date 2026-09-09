const taipeiDateFormatter = new Intl.DateTimeFormat("en-CA", {
  timeZone: "Asia/Taipei",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

export function todayKey(): string {
  return taipeiDateFormatter.format(new Date());
}

export function taipeiDateKey(value: Date | string): string {
  const date = value instanceof Date ? value : new Date(value);
  return Number.isNaN(date.getTime()) ? todayKey() : taipeiDateFormatter.format(date);
}

export function monthKey(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}

export function dateKey(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

export function dateFromKey(value: string): Date {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
}

export function formatMonth(date: Date): string {
  return `${date.getFullYear()} 年 ${date.getMonth() + 1} 月`;
}

export function formatSelectedDate(value: string): string {
  const date = dateFromKey(value);
  const today = value === todayKey() ? "・今天" : "";
  return `${date.getMonth() + 1} 月 ${date.getDate()} 日${today}`;
}

export function shiftMonth(date: Date, amount: number): Date {
  return new Date(date.getFullYear(), date.getMonth() + amount, 1);
}

export type CalendarDay = {
  key: string;
  dayNumber: number;
  inMonth: boolean;
};

export function calendarDays(month: Date): CalendarDay[] {
  const first = new Date(month.getFullYear(), month.getMonth(), 1);
  const start = new Date(first);
  start.setDate(first.getDate() - first.getDay());
  const last = new Date(month.getFullYear(), month.getMonth() + 1, 0);
  const visibleDayCount = first.getDay() + last.getDate() > 35 ? 42 : 35;
  return Array.from({ length: visibleDayCount }, (_, index) => {
    const date = new Date(start);
    date.setDate(start.getDate() + index);
    return {
      key: dateKey(date),
      dayNumber: date.getDate(),
      inMonth: date.getMonth() === month.getMonth(),
    };
  });
}
