import { useState } from "react";
export function SaveWorkoutTemplate({ onSave }: { onSave: (name: string) => Promise<void> }) {
  const [name, setName] = useState(""); const [busy, setBusy] = useState(false); const [message, setMessage] = useState("");
  return <details className="template-save-disclosure"><summary>將今日課表儲存為自訂課表</summary><div className="template-save-panel"><label>課表名稱<input aria-label="自訂課表名稱" maxLength={40} value={name} onChange={event => setName(event.target.value)} placeholder="例如：週一推力日" /></label><button disabled={!name.trim() || busy} onClick={async () => {
    setBusy(true); setMessage("");
    try { await onSave(name.trim()); setName(""); setMessage("已儲存每組設定，可在「課表與進度 → 自訂課表」找到。"); }
    catch (error) { setMessage(error instanceof Error ? error.message : "儲存失敗，請稍後重試。"); }
    finally { setBusy(false); }
  }}>{busy ? "儲存中" : "儲存課表"}</button></div>{message ? <p role="status">{message}</p> : null}</details>;
}
