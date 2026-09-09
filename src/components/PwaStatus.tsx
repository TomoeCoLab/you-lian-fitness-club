import { Download, RefreshCw, WifiOff, X } from "lucide-react";
import { useEffect, useState } from "react";

type InstallPromptEvent = Event & { prompt: () => Promise<void>; userChoice: Promise<{ outcome: "accepted" | "dismissed" }> };

export function PwaStatus() {
  const [installPrompt, setInstallPrompt] = useState<InstallPromptEvent | null>(null);
  const [updateWorker, setUpdateWorker] = useState<ServiceWorker | null>(null);
  const [online, setOnline] = useState(navigator.onLine);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const onOnline = () => setOnline(true);
    const onOffline = () => setOnline(false);
    const onInstall = (event: Event) => {
      event.preventDefault();
      setInstallPrompt(event as InstallPromptEvent);
      setDismissed(false);
    };
    window.addEventListener("online", onOnline);
    window.addEventListener("offline", onOffline);
    window.addEventListener("beforeinstallprompt", onInstall);
    if ("serviceWorker" in navigator) {
      void navigator.serviceWorker.register("/sw.js").then((registration) => {
        if (registration.waiting) setUpdateWorker(registration.waiting);
        registration.addEventListener("updatefound", () => {
          const worker = registration.installing;
          worker?.addEventListener("statechange", () => {
            if (worker.state === "installed" && navigator.serviceWorker.controller) setUpdateWorker(worker);
          });
        });
      });
      let refreshing = false;
      navigator.serviceWorker.addEventListener("controllerchange", () => {
        if (!refreshing) { refreshing = true; window.location.reload(); }
      });
    }
    return () => {
      window.removeEventListener("online", onOnline);
      window.removeEventListener("offline", onOffline);
      window.removeEventListener("beforeinstallprompt", onInstall);
    };
  }, []);

  if (!online) return <div className="pwa-status pwa-status--offline" role="status"><WifiOff size={17} /><span>目前離線；訪客紀錄仍可使用，Discord 同步會等網路恢復。</span></div>;
  if (updateWorker) return <div className="pwa-status" role="status"><RefreshCw size={17} /><span>YOU LIAN 有新版本</span><button onClick={() => updateWorker.postMessage("SKIP_WAITING")}>立即更新</button></div>;
  if (installPrompt && !dismissed) return <div className="pwa-status" role="status"><Download size={17} /><span>加到主畫面，訓練時更快開啟</span><button onClick={() => { void installPrompt.prompt().then(() => setInstallPrompt(null)); }}>安裝</button><button className="pwa-status__close" onClick={() => setDismissed(true)} aria-label="暫時關閉安裝提示"><X size={16} /></button></div>;
  return null;
}
