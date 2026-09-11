// Served under /api/ so existing service workers never cache the diagnostic page.
export function appLoginTestPage(): Response {
  return new Response(`<!doctype html>
<html lang="zh-Hant"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="referrer" content="no-referrer"><title>Android 登入測試｜YOU LIAN</title>
<style>*{box-sizing:border-box}body{margin:0;background:#f5f5f3;color:#171717;font:16px/1.7 system-ui,sans-serif}main{max-width:620px;margin:auto;padding:32px 20px}h1{font-size:28px;line-height:1.3}section{background:white;border:1px solid #ddd;border-radius:16px;padding:20px;margin:20px 0}button,.action{display:block;width:100%;padding:14px 16px;margin:12px 0;background:#171717;color:white;border:1px solid #171717;border-radius:10px;font:inherit;text-align:center;text-decoration:none;cursor:pointer}.secondary{background:white;color:#171717}button:disabled{opacity:.5;cursor:wait}[hidden]{display:none!important}a{color:inherit}small{color:#555}pre{white-space:pre-wrap;overflow-wrap:anywhere;font-size:13px}#status{border-left:3px solid #333;padding-left:12px}:focus-visible{outline:3px solid #617da8;outline-offset:3px}</style></head>
<body><main><a href="/">← 回到今天有練</a><p><small>YOU LIAN / 實驗功能</small></p><h1>Android × Brave<br>Discord App 登入測試</h1><p>測試能否從手機打開 Discord 授權，再回到 Brave。此功能尚未經實機確認，不影響原本的登入方式。</p>
<section><h2>1. 準備授權</h2><p>請在 Android 的 Brave 開啟此頁。準備完成後，再親自點擊 App 按鈕；不會自動跳轉。</p><button id="prepare">準備本次測試</button><p id="status" role="status" aria-live="polite">尚未準備</p><div id="links" hidden><a class="action" id="app">2. 嘗試用 Discord App 授權</a><a class="action secondary" id="web">改用網頁授權（備援）</a><small>連結有效 10 分鐘。若只打開 Discord 首頁、沒有授權畫面，請回到此頁改用網頁授權。重新準備會使上一組測試連結失效。</small></div></section>
<section><h2>3. 返回後確認</h2><p>成功授權會回到網站首頁。若回到其他瀏覽器或出現登入錯誤，請記下畫面，不必清除 Cookie 或登出。</p><button class="secondary" id="check">檢查此瀏覽器登入狀態</button><p id="session" role="status">尚未檢查</p><p><small>既有登入狀態不能證明本次 App 授權成功；是否出現 App 授權畫面，仍需你確認。</small></p><button class="secondary" id="copy">複製測試摘要</button><pre id="report"></pre></section><p><small>摘要只包含操作與登入狀態，不包含帳號、Cookie、授權碼或完整授權連結。不會自動上傳。</small></p></main>
<script>
const el=id=>document.getElementById(id);let expiry=0;const events=[];
try{const saved=JSON.parse(sessionStorage.getItem('you-lian-auth-test')||'null');if(saved&&Date.now()-saved.at<3600000&&Array.isArray(saved.events))events.push(...saved.events.filter(x=>typeof x==='string').slice(-20))}catch{}
function log(text){events.push(new Date().toLocaleTimeString()+' '+text);if(events.length>25)events.shift();el('report').textContent=events.join('\\n');try{sessionStorage.setItem('you-lian-auth-test',JSON.stringify({at:Date.now(),events}))}catch{}}
log(/Android/i.test(navigator.userAgent)?'裝置：Android':'裝置：非 Android（不能驗證 App 跳轉）');
log('顯示模式：'+(matchMedia('(display-mode: standalone)').matches?'桌面獨立視窗':'瀏覽器'));
el('prepare').onclick=async()=>{el('prepare').disabled=true;el('links').hidden=true;el('status').textContent='正在準備…';try{const r=await fetch('/api/auth/app-test/prepare',{method:'POST',credentials:'same-origin',cache:'no-store'});const d=await r.json();if(!r.ok)throw new Error(d.error||'準備失敗');el('app').href=d.intentUrl;el('web').href=d.authorizeUrl;expiry=d.expiresAt*1000;el('links').hidden=false;el('status').textContent='準備完成，請選擇 App 或網頁授權。';log('授權連結已準備')}catch(e){el('status').textContent=e.message;log('準備失敗')}finally{el('prepare').disabled=false}};
for(const id of ['app','web'])el(id).onclick=e=>{if(Date.now()>=expiry){e.preventDefault();el('links').hidden=true;el('status').textContent='連結已過期，請重新準備。';return}log(id==='app'?'已點擊 App 跳轉（不代表已打開或授權）':'已選網頁授權')};
el('check').onclick=async()=>{el('check').disabled=true;try{const r=await fetch('/api/me',{cache:'no-store'});el('session').textContent=r.ok?'此瀏覽器目前已登入；不代表本次 App 授權已成功。':r.status===401?'此瀏覽器目前未登入。':'無法確認，請稍後再試。';log(el('session').textContent)}catch{el('session').textContent='網路連線失敗，無法確認。'}finally{el('check').disabled=false}};
el('copy').onclick=async()=>{try{await navigator.clipboard.writeText(el('report').textContent);el('copy').textContent='已複製摘要'}catch{el('copy').textContent='無法自動複製，請長按下方摘要複製'}};
</script></body></html>`, { headers: {
    "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store",
    "Referrer-Policy": "no-referrer", "X-Content-Type-Options": "nosniff",
    "Content-Security-Policy": "default-src 'none'; script-src 'unsafe-inline'; style-src 'unsafe-inline'; connect-src 'self'; frame-ancestors 'none'; base-uri 'none'; form-action 'none'",
  } });
}
