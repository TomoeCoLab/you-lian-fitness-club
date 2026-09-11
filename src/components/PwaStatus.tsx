import { Download, RefreshCw, WifiOff, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
declare const __APP_VERSION__: string;
type InstallPromptEvent = Event & { prompt: () => Promise<void>; userChoice: Promise<{ outcome: "accepted" | "dismissed" }> };
const DISMISS_KEY = "you-lian:pwa-dismiss-until:v1";
function dismissedUntil() { try { return Number(localStorage.getItem(DISMISS_KEY) || 0); } catch { return 0; } }

export function PwaStatus() {
  const [installPrompt, setInstallPrompt] = useState<InstallPromptEvent | null>(null);
  const [availableVersion, setAvailableVersion] = useState<string | null>(null);
  const [online, setOnline] = useState(navigator.onLine);
  const [ready, setReady] = useState(false);
  const [busy, setBusy] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState("");
  const [dismissed, setDismissed] = useState(() => dismissedUntil() > Date.now());
  const registration = useRef<ServiceWorkerRegistration | null>(null);
  const requestedUpdate = useRef(false);
  useEffect(() => {
    let disposed = false;
    const check = async () => {
      if (!navigator.onLine || document.visibilityState === "hidden") return;
      try {
        const response = await fetch(`/version.json?check=${Date.now()}`, { cache: "no-store" });
        if (!response.ok) return;
        const data = await response.json() as { version?: string };
        if (!disposed && data.version && /^\d+\.\d+\.\d+$/.test(data.version)) setAvailableVersion(data.version !== __APP_VERSION__ ? data.version : null);
      } catch { /* Offline and local development do not need an update warning. */ }
    };
    const onOnline = () => { setOnline(true); void check(); };
    const onOffline = () => setOnline(false);
    const onInstall = (event: Event) => { event.preventDefault(); setInstallPrompt(event as InstallPromptEvent); };
    const onControllerChange = () => { if (requestedUpdate.current) window.location.reload(); };
    const detectBusy = () => setBusy(!document.querySelector(".site-header") || document.body.classList.contains("training-mode-open") || !!document.querySelector('dialog[open], [role="dialog"], input:focus, textarea:focus'));
    const observer = new MutationObserver(detectBusy);
    observer.observe(document.body, { subtree: true, childList: true, attributes: true, attributeFilter: ["class", "open"] });
    detectBusy();
    document.addEventListener("focusin", detectBusy);
    document.addEventListener("focusout", detectBusy);
    window.addEventListener("online", onOnline);
    window.addEventListener("offline", onOffline);
    window.addEventListener("beforeinstallprompt", onInstall);
    window.addEventListener("focus", check);
    document.addEventListener("visibilitychange", check);
    const delay = window.setTimeout(() => setReady(true), 60000);
    const interval = window.setInterval(check, 300000);
    void check();
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.addEventListener("controllerchange", onControllerChange);
      void navigator.serviceWorker.register("/sw.js", { updateViaCache: "none" }).then(value => { if (!disposed) registration.current = value; }).catch(() => {});
    }
    return () => {
      disposed = true; observer.disconnect(); clearTimeout(delay); clearInterval(interval);
      document.removeEventListener("focusin", detectBusy); document.removeEventListener("focusout", detectBusy);
      window.removeEventListener("online", onOnline); window.removeEventListener("offline", onOffline);
      window.removeEventListener("beforeinstallprompt", onInstall); window.removeEventListener("focus", check);
      document.removeEventListener("visibilitychange", check);
      if ("serviceWorker" in navigator) navigator.serviceWorker.removeEventListener("controllerchange", onControllerChange);
    };
  }, []);
  const dismiss = () => { setDismissed(true); try { localStorage.setItem(DISMISS_KEY, String(Date.now() + 7 * 86400000)); } catch {} };
  const update = async () => {
    setUpdating(true); setError("");
    try {
      // Workout edits are saved synchronously by App before this explicit action.
      await registration.current?.update();
      requestedUpdate.current = true;
      if (registration.current?.waiting) registration.current.waiting.postMessage("SKIP_WAITING");
      else window.location.reload();
    } catch { requestedUpdate.current = false; setUpdating(false); setError("更新失敗，請確認網路後再試。"); }
  };
  if (busy) return null;
  if (!online) return <div className="pwa-status pwa-status--offline" role="status"><WifiOff size={17} /><span>目前離線；訪客本機紀錄仍可使用。</span></div>;
  if (availableVersion) return <div className="pwa-status" role="status"><RefreshCw size={17} /><span>{error || `有新版本 ${availableVersion}，未送出的訓練紀錄會保留。`}</span><button disabled={updating} onClick={() => void update()}>{updating ? "更新中…" : "立即更新"}</button></div>;
  if (ready && installPrompt && !dismissed && !window.matchMedia("(display-mode: standalone)").matches) return <div className="pwa-status" role="status"><Download size={17} /><span>加到主畫面，下次更快開始訓練</span><button onClick={() => { void installPrompt.prompt().then(() => installPrompt.userChoice).then(result => { setInstallPrompt(null); if (result.outcome === "dismissed") dismiss(); }).catch(() => setInstallPrompt(null)); }}>安裝</button><button onClick={dismiss} aria-label="暫時關閉安裝提示"><X size={16} /></button></div>;
  return null;
}
