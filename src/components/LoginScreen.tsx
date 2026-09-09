import { ArrowRight, HardDrive, LockKeyhole, Users } from "lucide-react";
import type { AppConfig } from "../types";
import { Brand } from "./Brand";

type LoginScreenProps = {
  config: AppConfig;
  authError: string | null;
  onGuest: () => void;
};

const errorMessages: Record<string, string> = {
  discord_not_configured: "Discord 應用尚未完成設定。",
  invalid_oauth_state: "登入驗證已過期，請重新嘗試。",
  token_exchange_failed: "Discord 登入交換失敗，請稍後再試。",
  discord_profile_failed: "無法取得 Discord 身分資料。",
  not_in_rep_club: "這個帳號尚未加入 YOU LIAN 伺服器。",
};

export function LoginScreen({ config, authError, onGuest }: LoginScreenProps) {
  return (
    <main className="login-screen">
      <header className="login-header"><Brand /><span>私人健身打卡圈</span></header>
      <section className="login-hero">
        <img src="/hero-squat.webp" alt="重量訓練者在深蹲架進行訓練" fetchPriority="high" />
        <div className="login-hero__copy">
          <h1>今天，<br />有練。</h1>
          <p>和熟悉的人留下真實的訓練，不排名，也不製造壓力。</p>
          <div className="login-actions">
            <a className="primary-button primary-button--light" href="/api/auth/login">
              {config.demo ? "進入本機示範" : "使用 Discord 登入"}<ArrowRight size={20} />
            </a>
            <button className="guest-button" onClick={onGuest}>
              以訪客模式使用<HardDrive size={18} />
            </button>
          </div>
          <span className="guest-note">訪客資料只保存在這個瀏覽器，不會同步或公開。</span>
          {authError ? <p className="login-error" role="alert">{errorMessages[authError] ?? "登入失敗，請再試一次。"}</p> : null}
          {!config.demo && !config.configured ? <p className="login-error">站主尚未完成 Discord OAuth 設定。</p> : null}
        </div>
      </section>
      <section className="login-principles">
        <div><Users size={24} /><strong>社群功能限伺服器成員</strong><span>只有先受邀加入「今天有練」的成員能同步與分享。</span></div>
        <div><LockKeyhole size={24} /><strong>訪客完全留在本機</strong><span>個人日曆、訓練與照片不會送到伺服器。</span></div>
      </section>
    </main>
  );
}
