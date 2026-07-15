/** Keep two scroll containers aligned by scroll progress (0–1). */
export function syncProportionalScroll(source: HTMLElement, target: HTMLElement): void {
  const sourceMax = source.scrollHeight - source.clientHeight;
  const targetMax = target.scrollHeight - target.clientHeight;

  if (sourceMax <= 0 && targetMax <= 0) return;

  const ratio = sourceMax > 0 ? source.scrollTop / sourceMax : 0;
  target.scrollTop = ratio * Math.max(targetMax, 0);
}
