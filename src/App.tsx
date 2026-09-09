import { CalendarDays, Check, ChevronDown, Dumbbell, LogOut, NotebookTabs, Users, X } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ApiError, api } from "./lib/api";
import { dateFromKey, dateKey, monthKey, shiftMonth, todayKey } from "./lib/date";
import type { AppConfig, Checkin, CheckinDraft, ReactionKind, User, WorkoutTemplate, WorkoutTemplateItem } from "./types";
import { ActivityRail } from "./components/ActivityRail";
import { Avatar } from "./components/Avatar";
import { Brand } from "./components/Brand";
import { Calendar } from "./components/Calendar";
import { CheckinDrawer } from "./components/CheckinDrawer";
import { FriendFeed } from "./components/FriendFeed";
import { HeroCarousel } from "./components/HeroCarousel";
import { LoginScreen } from "./components/LoginScreen";
import { StaleWorkoutDialog } from "./components/StaleWorkoutDialog";
import { TrainingGuide } from "./components/TrainingGuide";
import {
  GUEST_MODE_KEY,
  guestUser,
  loadGuestHistory,
  loadGuestMonth,
  saveGuestCheckin,
  setGuestReaction,
} from "./lib/guestStore";
import { createGuestTemplate, deleteGuestTemplate, loadGuestTemplates } from "./lib/templateStore";
import { clearWorkout, loadWorkout, saveWorkout } from "./lib/workoutStore";
import type { WorkoutDraft } from "./types";

type View = "calendar" | "activity" | "guide";
type Session = { kind: "discord" | "guest"; user: User };

function viewFromHash(): View {
  const value = window.location.hash.replace(/^#\/?/, "");
  return value === "activity" || value === "guide" ? value : "calendar";
}

function App() {
  const [config, setConfig] = useState<AppConfig | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [startupError, setStartupError] = useState(false);
  const [month, setMonth] = useState(() => {
    const today = dateFromKey(todayKey());
    return new Date(today.getFullYear(), today.getMonth(), 1);
  });
  const [selectedDate, setSelectedDate] = useState(todayKey());
  const [checkins, setCheckins] = useState<Checkin[]>([]);
  const [calendarLoading, setCalendarLoading] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [view, setView] = useState<View>(() => viewFromHash());
  const [toast, setToast] = useState<string | null>(null);
  const [workout, setWorkout] = useState<WorkoutDraft>(() => loadWorkout());
  const [drawerPrefill, setDrawerPrefill] = useState<CheckinDraft | null>(null);
  const [checkoutFromWorkout, setCheckoutFromWorkout] = useState(false);
  const [staleWorkoutOpen, setStaleWorkoutOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [templates, setTemplates] = useState<WorkoutTemplate[]>([]);
  const [progressHistory, setProgressHistory] = useState<Checkin[]>([]);
  const [guideDataLoading, setGuideDataLoading] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  const bootstrap = useCallback(() => {
    setLoading(true);
    setStartupError(false);
    Promise.all([
      api.config(),
      api.me().catch((error: unknown) => {
        if (error instanceof ApiError && error.status === 401) return null;
        throw error;
      }),
    ])
      .then(([appConfig, me]) => {
        setConfig(appConfig);
        if (me?.user) {
          localStorage.removeItem(GUEST_MODE_KEY);
          setSession({ kind: "discord", user: me.user });
        } else if (localStorage.getItem(GUEST_MODE_KEY) === "true") {
          setSession({ kind: "guest", user: guestUser });
        }
      }).catch(() => {
        if (!navigator.onLine && localStorage.getItem(GUEST_MODE_KEY) === "true") {
          setConfig({ configured: false, demo: false, guildId: "", channelId: "" });
          setSession({ kind: "guest", user: guestUser });
        } else setStartupError(true);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => bootstrap(), [bootstrap]);

  useEffect(() => {
    const onHashChange = () => setView(viewFromHash());
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  useEffect(() => {
    if (!profileOpen) return;
    const closeOnOutside = (event: PointerEvent) => {
      if (event.target instanceof Node && !profileRef.current?.contains(event.target)) setProfileOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setProfileOpen(false);
    };
    document.addEventListener("pointerdown", closeOnOutside);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutside);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [profileOpen]);

  const navigate = (next: View) => {
    setProfileOpen(false);
    setView(next);
    const hash = next === "calendar" ? "#/" : `#/${next}`;
    if (window.location.hash !== hash) window.history.pushState(null, "", hash);
  };

  const loadCalendar = useCallback(async (activeMonth: Date) => {
    if (!session) return;
    setCalendarLoading(true);
    try {
      const activeMonthKey = monthKey(activeMonth);
      const records = session.kind === "guest"
        ? await loadGuestMonth(activeMonthKey)
        : (await api.calendar(activeMonthKey)).checkins;
      setCheckins(records);
    } catch {
      setToast("月曆載入失敗，請稍後再試。");
      window.setTimeout(() => setToast(null), 3800);
    } finally {
      setCalendarLoading(false);
    }
  }, [session]);

  useEffect(() => {
    if (session) void loadCalendar(month);
  }, [loadCalendar, month, session]);

  const loadGuideData = useCallback(async () => {
    if (!session) return;
    setGuideDataLoading(true);
    try {
      if (session.kind === "guest") {
        setTemplates(loadGuestTemplates());
        setProgressHistory(await loadGuestHistory());
      } else {
        const [templateResult, progressResult] = await Promise.all([api.templates(), api.progress()]);
        setTemplates(templateResult.templates);
        setProgressHistory(progressResult.checkins);
      }
    } catch {
      setToast("課表與進度暫時載入失敗。");
      window.setTimeout(() => setToast(null), 3800);
    } finally {
      setGuideDataLoading(false);
    }
  }, [session]);

  useEffect(() => {
    if (view === "guide") void loadGuideData();
  }, [loadGuideData, view]);

  const user = session?.user ?? null;
  const localOnly = session?.kind === "guest";

  const selectedCheckins = useMemo(
    () => checkins.filter((checkin) => checkin.date === selectedDate),
    [checkins, selectedDate],
  );

  const updateReaction = async (checkinId: string, reaction: ReactionKind | null) => {
    if (!session) return;
    try {
      const reactions = session.kind === "guest"
        ? await setGuestReaction(checkinId, reaction)
        : (await api.react(checkinId, reaction)).reactions;
      if (!reactions) return;
      const update = (records: Checkin[]) => records.map((checkin) => checkin.id === checkinId ? { ...checkin, reactions } : checkin);
      setCheckins(update);
      setProgressHistory(update);
    } catch {
      setToast("回應沒有送出，請稍後再試。");
      window.setTimeout(() => setToast(null), 3800);
    }
  };

  const saveTemplate = async (name: string, items: WorkoutTemplateItem[]) => {
    if (!session) return;
    const template = session.kind === "guest" ? createGuestTemplate(name, items) : (await api.createTemplate(name, items)).template;
    setTemplates((current) => [template, ...current]);
    setToast(session.kind === "guest" ? "課表已保存在這個瀏覽器。" : "課表已同步到你的帳號。");
    window.setTimeout(() => setToast(null), 3800);
  };

  const removeTemplate = async (id: string) => {
    if (!session) return;
    if (session.kind === "guest") deleteGuestTemplate(id);
    else {
      const response = await api.deleteTemplate(id);
      if (!response.ok) throw new Error("Template delete failed");
    }
    setTemplates((current) => current.filter((template) => template.id !== id));
  };

  const completedWorkoutSets = useMemo(
    () => workout.items.reduce((total, item) => total + item.entries.filter((entry) => entry.completed).length, 0),
    [workout.items],
  );

  useEffect(() => {
    if (workout.items.length > 0 && workout.workoutDate !== todayKey()) setStaleWorkoutOpen(true);
  }, [workout.items.length, workout.workoutDate]);

  const goToToday = () => {
    const today = todayKey();
    const todayDate = dateFromKey(today);
    setMonth(new Date(todayDate.getFullYear(), todayDate.getMonth(), 1));
    setSelectedDate(today);
    navigate("calendar");
  };

  const showCurrentActivityMonth = () => {
    const today = dateFromKey(todayKey());
    setMonth(new Date(today.getFullYear(), today.getMonth(), 1));
    navigate("activity");
  };

  const changeMonth = (amount: number) => {
    const next = shiftMonth(month, amount);
    setMonth(next);
    setSelectedDate(dateKey(next));
  };

  const selectCalendarDate = (date: string) => {
    const selected = dateFromKey(date);
    if (monthKey(selected) !== monthKey(month)) setMonth(new Date(selected.getFullYear(), selected.getMonth(), 1));
    setSelectedDate(date);
    if (window.matchMedia("(max-width: 700px)").matches) {
      window.setTimeout(() => document.querySelector(".activity-rail")?.scrollIntoView({ behavior: "smooth", block: "start" }), 160);
    }
  };

  const save = async (draft: CheckinDraft, photo: File | null) => {
    if (!session) return;
    const result = session.kind === "guest"
      ? { ...(await saveGuestCheckin(draft, photo)), notificationQueued: false }
      : await api.saveCheckin(draft, photo);
    setCheckins((current) => {
      return [...current, result.record].sort(
        (a, b) => a.date.localeCompare(b.date) || a.createdAt.localeCompare(b.createdAt),
      );
    });
    if (checkoutFromWorkout) {
      setWorkout(clearWorkout());
      setCheckoutFromWorkout(false);
      setDrawerPrefill(null);
    }
    setDrawerOpen(false);
    setToast(
      session.kind === "guest"
        ? "已新增一場訓練並保存在這個瀏覽器。"
        : result.notificationQueued
        ? "已新增一場訓練，Discord 通知已排入發送。"
        : "已新增一場訓練。Discord 通知尚未設定。",
    );
    window.setTimeout(() => setToast(null), 3800);
  };

  const updateWorkout = (next: WorkoutDraft) => {
    const today = todayKey();
    const startingFresh = workout.items.length === 0 && next.items.length > 0 && next.workoutDate !== today;
    const normalized = startingFresh ? { ...next, workoutDate: today, startedAt: new Date().toISOString() } : next;
    setWorkout(normalized);
    saveWorkout(normalized);
  };

  const prepareWorkoutCheckout = (targetDate: string, useLastUpdateAsEnd: boolean) => {
    const items = workout.items.map((item) => {
      const entries = item.entries.filter((entry) => entry.completed);
      if (entries.length === 0) return null;
      const last = entries.at(-1);
      return {
        name: item.exerciseName,
        sets: entries.length,
        weight: last?.weight ?? 0,
        reps: last?.reps ?? 1,
        entries,
      };
    }).filter((item): item is NonNullable<typeof item> => item !== null);
    if (items.length === 0) {
      setToast("至少完成一組後才能帶入今天打卡。");
      window.setTimeout(() => setToast(null), 3800);
      return;
    }
    const started = new Date(workout.startedAt).getTime();
    const lastUpdate = new Date(workout.updatedAt).getTime();
    const ended = useLastUpdateAsEnd && Number.isFinite(lastUpdate) ? lastUpdate : Date.now();
    const durationMinutes = Number.isFinite(started) ? Math.min(1440, Math.max(1, Math.round((ended - started) / 60_000))) : null;
    const target = dateFromKey(targetDate);
    setMonth(new Date(target.getFullYear(), target.getMonth(), 1));
    setSelectedDate(targetDate);
    setDrawerPrefill({
      date: targetDate,
      mode: "detailed",
      workoutType: "YOU LIAN 指引訓練",
      durationMinutes,
      note: null,
      exercises: items,
    });
    setCheckoutFromWorkout(true);
    setDrawerOpen(true);
  };

  const checkoutWorkout = () => {
    if (workout.workoutDate !== todayKey()) {
      setStaleWorkoutOpen(true);
      return;
    }
    prepareWorkoutCheckout(workout.workoutDate, false);
  };

  const openTodayCheckin = () => {
    goToToday();
    setDrawerPrefill(null);
    setCheckoutFromWorkout(false);
    setDrawerOpen(true);
  };

  const finishPreviousWorkout = () => {
    setStaleWorkoutOpen(false);
    prepareWorkoutCheckout(workout.workoutDate, true);
  };

  const startTodayWorkout = () => {
    const empty = clearWorkout();
    setWorkout(empty);
    setStaleWorkoutOpen(false);
    navigate("guide");
    setToast("已清空前次未送出的訓練，可以開始今天的紀錄。");
    window.setTimeout(() => setToast(null), 3800);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
    setDrawerPrefill(null);
    setCheckoutFromWorkout(false);
  };

  const logout = async () => {
    if (session?.kind === "guest") {
      localStorage.removeItem(GUEST_MODE_KEY);
      setCheckins([]);
      setView("calendar");
      setSession(null);
      return;
    }
    await api.logout();
    window.location.reload();
  };

  const enterGuestMode = () => {
    localStorage.setItem(GUEST_MODE_KEY, "true");
    setView("calendar");
    setSession({ kind: "guest", user: guestUser });
  };

  if (startupError) return <div className="app-loading app-loading--error"><Brand /><X size={28} /><strong>目前無法載入 YOU LIAN</strong><span>請確認網路後再試一次。</span><button className="primary-button" onClick={bootstrap}>重新嘗試</button></div>;
  if (loading || !config) return <div className="app-loading"><Brand /><span>載入中</span></div>;
  if (!user) {
    const authError = new URLSearchParams(window.location.search).get("auth_error");
    return <LoginScreen config={config} authError={authError} onGuest={enterGuestMode} />;
  }

  return (
    <div className="app-shell">
      <header className="site-header">
        <Brand />
        <nav aria-label="主要導覽">
          <button className={view === "calendar" ? "nav-button nav-button--active" : "nav-button"} onClick={() => navigate("calendar")} aria-current={view === "calendar" ? "page" : undefined}>日曆</button>
          <button className={view === "activity" ? "nav-button nav-button--active" : "nav-button"} onClick={() => navigate("activity")} aria-current={view === "activity" ? "page" : undefined}>{localOnly ? "我的紀錄" : "好友動態"}</button>
          <button className={view === "guide" ? "nav-button nav-button--active" : "nav-button"} onClick={() => navigate("guide")} aria-current={view === "guide" ? "page" : undefined}>健身指引</button>
        </nav>
        <div className="site-header__actions">
          <button className="primary-button" onClick={openTodayCheckin}>今天有練</button>
          <div ref={profileRef} className="user-control profile-control">
            <button className="profile-trigger" onClick={() => setProfileOpen((current) => !current)} aria-expanded={profileOpen} aria-haspopup="menu">
              <Avatar user={user} /><span>{localOnly ? "訪客 · 本機" : user.displayName}</span><ChevronDown size={16} />
            </button>
            {profileOpen ? <div className="profile-menu" role="menu"><div><Avatar user={user} /><span><strong>{localOnly ? "訪客模式" : user.displayName}</strong><small>{localOnly ? "資料只在此瀏覽器" : "Discord 伺服器成員"}</small></span></div><button role="menuitem" onClick={() => void logout()}><LogOut size={18} />{localOnly ? "離開訪客模式" : "登出"}</button></div> : null}
          </div>
        </div>
      </header>

      {view === "calendar" ? (
        <main>
          <HeroCarousel />
          <div className={`workspace${calendarLoading ? " workspace--loading" : ""}`}>
            <Calendar
              month={month}
              checkins={checkins}
              selectedDate={selectedDate}
              onSelectDate={selectCalendarDate}
              onPreviousMonth={() => changeMonth(-1)}
              onNextMonth={() => changeMonth(1)}
              onToday={goToToday}
            />
            <ActivityRail date={selectedDate} checkins={selectedCheckins} localOnly={localOnly} onReact={updateReaction} />
          </div>
        </main>
      ) : view === "activity" ? <main><FriendFeed month={month} checkins={checkins} localOnly={localOnly} onReact={updateReaction} onPreviousMonth={() => changeMonth(-1)} onNextMonth={() => changeMonth(1)} onToday={showCurrentActivityMonth} /></main> : (
        <TrainingGuide workout={workout} templates={templates} history={progressHistory} dataLoading={guideDataLoading} onWorkoutChange={updateWorkout} onCheckout={checkoutWorkout} onSaveTemplate={saveTemplate} onDeleteTemplate={removeTemplate} />
      )}

      <footer className="site-footer"><span className="discord-symbol" aria-hidden="true">●●</span><span>{localOnly ? "訪客模式 · 資料只保存在這個瀏覽器" : "只顯示「今天有練」伺服器成員的動態"}</span></footer>
      <nav className="mobile-nav" aria-label="行動版導覽">
        <button className={view === "calendar" ? "mobile-nav__button mobile-nav__button--active" : "mobile-nav__button"} onClick={() => navigate("calendar")} aria-current={view === "calendar" ? "page" : undefined}><CalendarDays size={20} /><span>日曆</span></button>
        <button className={view === "activity" ? "mobile-nav__button mobile-nav__button--active" : "mobile-nav__button"} onClick={() => navigate("activity")} aria-current={view === "activity" ? "page" : undefined}>{localOnly ? <NotebookTabs size={20} /> : <Users size={20} />}<span>{localOnly ? "我的紀錄" : "好友動態"}</span></button>
        <button className={view === "guide" ? "mobile-nav__button mobile-nav__button--active" : "mobile-nav__button"} onClick={() => navigate("guide")} aria-current={view === "guide" ? "page" : undefined}><Dumbbell size={20} /><span>健身指引</span></button>
      </nav>
      {drawerOpen ? <CheckinDrawer date={selectedDate} prefill={drawerPrefill} onClose={closeDrawer} onSave={save} localOnly={localOnly} /> : null}
      {staleWorkoutOpen ? <StaleWorkoutDialog date={workout.workoutDate} completedSets={completedWorkoutSets} onFinishPrevious={finishPreviousWorkout} onStartToday={startTodayWorkout} onClose={() => setStaleWorkoutOpen(false)} /> : null}
      {toast ? <div className="toast" role="status"><Check size={18} strokeWidth={3} />{toast}</div> : null}
    </div>
  );
}

export default App;
