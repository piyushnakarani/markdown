/** Strip HTML tags for plain-text accessible names. */
function stripTags(html: string): string {
  return html
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function escapeHtmlAttr(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/**
 * GFM task lists render bare `<input type="checkbox">` without labels.
 * Wrap each item in a `<label>` so assistive tech gets the task text as the control name.
 */
export function enhanceAccessibleTaskLists(html: string): string {
  const withItems = html.replace(
    /<li>(\s*<input\s+([^>]*?)type="checkbox"([^>]*?)>\s*)([\s\S]*?)<\/li>/gi,
    (_match, _fullInput, before: string, after: string, content: string) => {
      const attrs = `${before}type="checkbox"${after}`;
      const checked = /checked/i.test(attrs);
      const taskText = stripTags(content) || 'Task list item';
      const statusPrefix = checked ? 'Completed task' : 'Incomplete task';
      const ariaLabel = escapeHtmlAttr(`${statusPrefix}: ${taskText}`);
      const input = `<input ${before}type="checkbox"${after} disabled aria-readonly="true" aria-label="${ariaLabel}" />`;
      return `<li class="task-list-item"><label class="task-list-label">${input}<span class="task-list-text">${content}</span></label></li>`;
    },
  );

  return withItems.replace(
    /<ul>(\s*(?:<li class="task-list-item">[\s\S]*?<\/li>\s*)+)<\/ul>/gi,
    '<ul class="contains-task-list">$1</ul>',
  );
}
