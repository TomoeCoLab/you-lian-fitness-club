import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { lockAppForModal, trapTabKey } from "../lib/modal";
import { exportGuestBackup, importGuestBackup } from "../lib/guestStore";
import { loadWorkout } from "../lib/workoutStore";
import type { WorkoutDraft } from "../types";

export function DataManagementDialog({ localOnly, workout, onRestore, onRefresh, onClose }: {
  localOnly: boolean; workout: WorkoutDraft; onRestore: (draft: WorkoutDraft) => void; onRefresh: () => void; onClose: () => void;
}) {
  const dialog = useRef<HTMLDivElement>(null);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [notifications, setNotifications] = useState<Array<{ checkinId: string; date: string; state: string; attempts: number }>>([]);
  const [legacy, setLegacy] = useState(() => loadWorkout("unclaimed"));
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    const unlock = lockAppForModal();
    dialog.current?.focus();
    const key = (event: KeyboardEvent) => { if (event.key === "Escape") onClose(); trapTabKey(event, dialog.current); };
    document.addEventListener("keydown", key);
    return () => { document.removeEventListener("keydown", key); unlock(); previous?.focus(); };
  }, [onClose]);
  const refresh = async () => {
    try {
      const response = await fetch("/api/notifications");
      if (!response.ok) throw new Error("通知狀態暫時無法載入。");
      const data = await response.json();
      setNotifications(data.notifications);
    } catch (error) { setMessage(error instanceof Error ? error.message : "載入失敗。"); }
  };
  useEffect(() => { if (!localOnly) void refresh(); }, [localOnly]);
  const run = async (action: () => Promise<void>) => {
    setBusy(true); setMessage("");
    try { await action(); } catch (error) { setMessage(error instanceof Error ? error.message : "操作失敗，原始資料仍保留。"); }
    finally { setBusy(false); }
  };
  return createPortal(<div className="modal-backdrop"><div className="data-management" role="dialog" aria-modal="true" aria-labelledby="data-title" ref={dialog} tabIndex={-1}>
    <header><h2 id="data-title">資料與通知</h2><button className="icon-button" aria-label="關閉資料與通知" onClick={onClose}><X /></button></header>
    <p>{localOnly ? "訪客資料僅存在此瀏覽器。清除網站資料、換手機或使用無痕模式都可能遺失；請定期下載備份。" : "打卡與自訂課表同步到帳號；未送出的訓練、倒數與畫面位置僅存在此瀏覽器，且依帳號分開。"}</p>
    {localOnly ? <section><h3>訪客備份</h3><p>包含打卡、照片、自訂課表、動作與目前訓練。匯入採合併方式，同 ID 紀錄及目前非空的訓練草稿不覆蓋。備份含私人照片，請妥善保管。</p>
      <button disabled={busy} onClick={() => void run(async () => {
        const url = URL.createObjectURL(await exportGuestBackup()); const link = document.createElement("a");
        link.href = url; link.download = `you-lian-backup-${new Date().toISOString().slice(0, 10)}.json`; link.click();
        setTimeout(() => URL.revokeObjectURL(url), 30000); setMessage("已產生備份，請確認下載檔案已保存。");
      })}>下載含照片備份</button>
      <label className="backup-import">匯入備份<input type="file" accept="application/json,.json" disabled={busy} onChange={event => { const file = event.target.files?.[0]; if (file) void run(async () => { const count = await importGuestBackup(file); onRefresh(); setMessage(`已合併 ${count} 筆打卡；既有資料未覆蓋。`); }); event.target.value = ""; }} /></label>
    </section> : <section><h3>最近 20 筆 Discord 通知</h3><p>打卡保存與通知分開處理。通知失敗會自動重試，最多 5 次；不必再次打卡。逾時重試極少數情況可能重複通知。</p><button onClick={() => void refresh()}>重新整理通知狀態</button>
      {notifications.length ? <ul>{notifications.map(item => <li key={item.checkinId}>{item.date} · {({ sent: "已送出", pending: "等待發送／重試", processing: "發送中", failed: "重試已用完，請聯絡站主" } as Record<string, string>)[item.state] ?? item.state}（嘗試 {item.attempts} 次）</li>)}</ul> : <p>尚無通知紀錄，或通知服務尚未設定。</p>}
    </section>}
    {legacy.items.length > 0 ? <section><h3>找到舊版未送出訓練</h3><p>舊版沒有記錄草稿屬於哪個帳號。請確認這 {legacy.items.length} 個動作確實是你的，再恢復到目前身分。原始草稿仍會保留，請勿重複匯入已打卡的組數。</p><button disabled={workout.items.length > 0 || busy} onClick={() => void run(async () => { onRestore({ ...legacy, checkoutRequestId: undefined }); setLegacy({ ...legacy, items: [] }); setMessage("已恢復舊版草稿，請確認日期與完成組數。"); })}>恢復舊版草稿</button>{workout.items.length > 0 ? <p>目前已有訓練，為避免覆蓋，請先完成目前訓練。</p> : null}</section> : null}
    {message ? <p role="status">{message}</p> : null}
  </div></div>, document.body);
}
