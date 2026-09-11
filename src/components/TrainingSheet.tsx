import { useEffect, useId, useRef, type ReactNode } from "react";
import { X } from "lucide-react";

/** Native top-layer dialog keeps nested instruction sheets and focus isolated. */
export function TrainingSheet({ title, onClose, children, className = "" }: { title: string; onClose: () => void; children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const close = useRef(onClose);
  close.current = onClose;
  useEffect(() => {
    const dialog = ref.current;
    const previous = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    dialog?.showModal();
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      dialog?.close();
      document.body.style.overflow = overflow;
      if (previous?.isConnected) previous.focus();
    };
  }, []);
  return <dialog ref={ref} className={`training-sheet ${className}`} aria-labelledby={titleId}
    onCancel={(event) => { event.preventDefault(); event.stopPropagation(); close.current(); }}
    onClick={(event) => { if (event.target === event.currentTarget) close.current(); }}>
    <div className="training-sheet__surface">
      <header className="training-sheet__header"><h2 id={titleId}>{title}</h2><button type="button" onClick={onClose} aria-label={`關閉${title}`}><X size={22} /></button></header>
      {children}
    </div>
  </dialog>;
}
