const focusableSelector = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
].join(",");

let modalDepth = 0;

export function lockAppForModal(): () => void {
  const root = document.getElementById("root");
  modalDepth += 1;
  document.body.classList.add("modal-open");
  if (root) root.inert = true;

  return () => {
    modalDepth = Math.max(0, modalDepth - 1);
    if (modalDepth === 0) {
      document.body.classList.remove("modal-open");
      if (root) root.inert = false;
    }
  };
}

export function trapTabKey(event: KeyboardEvent, container: HTMLElement | null): void {
  if (event.key !== "Tab" || !container) return;
  const controls = [...container.querySelectorAll<HTMLElement>(focusableSelector)]
    .filter((element) => !element.hasAttribute("hidden") && element.getAttribute("aria-hidden") !== "true");
  if (controls.length === 0) {
    event.preventDefault();
    container.focus();
    return;
  }

  const first = controls[0];
  const last = controls.at(-1) ?? first;
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}
