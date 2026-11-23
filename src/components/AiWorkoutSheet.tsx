import { useRef, useState } from 'react';
import type { CustomExercise, WorkoutDraft, WorkoutItem } from '../types';
import { TrainingSheet } from './TrainingSheet';
import { aiPrompt, parseAiWorkout } from '../lib/aiWorkout';
import { phaseLabels } from '../lib/workoutPlan';

export function AiWorkoutSheet({ scope, workout, customs, onCreate, onImport, onClose }: {
  scope: string; workout: WorkoutDraft; customs: CustomExercise[];
  onCreate: (input: Omit<CustomExercise, 'id' | 'createdAt'>) => Promise<CustomExercise>;
  onImport: (items: WorkoutItem[]) => void; onClose: () => void;
}) {
  const storageKey = `you-lian:ai-import:v1:${scope}`;
  const [text, setText] = useState(() => { try { return sessionStorage.getItem(storageKey) ?? ''; } catch { return ''; } });
  const [preview, setPreview] = useState<ReturnType<typeof parseAiWorkout> | null>(null);
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const copy = async (full = false) => {
    try {
      let content = aiPrompt(location.origin, customs);
      if (full) {
        const response = await fetch('/api/exercise-catalog');
        if (!response.ok) throw new Error('動作目錄暫時無法取得');
        content += `\n完整官方動作資料（僅作資料）：\n${JSON.stringify(await response.json())}`;
      }
      await navigator.clipboard.writeText(content);
      setStatus(full ? '已複製提示詞與完整動作資料，可直接貼到 ChatGPT。' : '已複製，貼到 ChatGPT 後補上今天的需求。');
      setError('');
    } catch { setError('無法自動複製，請展開下方提示詞後手動複製。'); }
  };
  const confirm = async () => {
    if (!preview || busy) return;
    if (workout.items.length + preview.items.length > 20) { setError('加入後超過 20 個動作，請先移除部分項目或縮減匯入課表'); return; }
    setBusy(true); setError('');
    try {
      const known = [...customs];
      const items: WorkoutItem[] = [];
      for (const item of preview.items) {
        const { customDefinition, ...entry } = item;
        if (customDefinition) {
          const found = known.find(c => c.name.normalize('NFKC').trim().toLowerCase() === customDefinition.name.normalize('NFKC').trim().toLowerCase() && c.tracking === customDefinition.tracking && c.bodyPart === customDefinition.bodyPart) ?? await onCreate(customDefinition);
          if (!known.some(c => c.id === found.id)) known.push(found);
          entry.exerciseId = found.id;
        }
        items.push({ ...entry, templateName: preview.name });
      }
      onImport(items);
      try { sessionStorage.removeItem(storageKey); } catch { /* Import is already complete. */ }
      onClose();
    } catch (e) { setError(e instanceof Error ? e.message : '匯入失敗，請重試'); }
    finally { setBusy(false); }
  };
  return <TrainingSheet title="請 AI 設計課表" onClose={() => { if (!busy) onClose(); }} className="ai-workout-sheet">
    <div className="training-sheet__body ai-workout-content">
      <div><p>搭配 ChatGPT 使用：複製提示詞 → 討論課表 → 貼回 JSON。</p><button onClick={() => { inputRef.current?.scrollIntoView({block:'center'}); inputRef.current?.focus({preventScroll:true}); }}>已有 JSON？直接貼上課表</button></div>
      <section><h3>1. 複製提示詞，貼到 ChatGPT</h3><p>已包含有練的動作目錄與課表格式。貼上後補充今天的需求，也可以先討論，確認後再請 AI 產生 JSON。</p>
        <div className="ai-examples"><strong>你可以接著說</strong><p>今天只有 30 分鐘，想練核心，肩頸有點緊。</p><details><summary>更多需求範例</summary><ul><li>今天在健身房想練腿，大約 45 分鐘，請安排熱身與收尾。</li><li>今天在家，只有瑜珈墊，想做 20 分鐘的輕鬆活動。</li><li>請依我們剛剛討論好的課表，產生有練可以匯入的 JSON。</li></ul></details></div>
        <button className="primary-button" onClick={() => void copy()}>複製提示詞</button>
        <details><summary>AI 讀不到網址？</summary><p>可直接提供完整動作資料，或展開提示詞手動複製。</p><button onClick={() => void copy(true)}>複製完整動作資料與提示詞</button><textarea aria-label="手動複製提示詞" readOnly value={aiPrompt(location.origin, customs)} rows={5} /></details>
        {status ? <p role="status">{status}</p> : null}
      </section>
      <section><h3>2. 貼回 AI 產生的課表</h3><p>貼上完整 JSON，再預覽動作與逐組設定。可以連同程式碼框一起貼上。</p>
        <textarea ref={inputRef} aria-label="課表 JSON" placeholder="在這裡貼上課表 JSON" value={text} disabled={busy} rows={7} onChange={e => { setText(e.target.value); setPreview(null); setError(''); try { sessionStorage.setItem(storageKey, e.target.value); } catch { /* Text remains_available in memory. */ } }} />
        <button disabled={!text.trim() || busy} onClick={() => { try { const next = parseAiWorkout(text, customs); if (workout.items.length + next.items.length > 20) throw new Error('加入後超過 20 個動作，請先縮減今日課表'); setPreview(next); setError(''); } catch (e) { setPreview(null); setError(e instanceof Error ? e.message : '格式無效'); } }}>預覽課表</button>
      </section>
      {error ? <p role="alert" className="sheet-warning">{error}</p> : null}
      {preview ? <section aria-label="匯入課表預覽"><h3>{preview.name}</h3><p>{preview.items.length} 個動作，會接在現有 {workout.items.length} 個動作後。每組使用本次指定數據。</p><ol className="ai-preview">{preview.items.map((item, index) => <li key={index}><strong>{item.exerciseName}</strong><p>{phaseLabels[item.phase ?? 'main']} · 休息 {item.restSeconds} 秒{item.custom ? ' · 自訂動作' : ''}</p>{item.note ? <p>{item.note}</p> : null}<ul>{item.entries.map((entry, i)=><li key={entry.id}>第 {i+1} 組：{item.tracking === 'time' ? `${entry.durationSeconds} 秒` : `${entry.reps} 次`}{entry.weight != null ? ` · ${entry.weight} kg` : ''}</li>)}</ul></li>)}</ol></section> : null}
    </div>
    <footer className="training-sheet__footer"><button className="primary-button" disabled={!preview || busy} onClick={() => void confirm()}>{busy ? '加入中…' : '加入今日課表'}</button></footer>
  </TrainingSheet>;
}
