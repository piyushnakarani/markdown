export type MarkdownFixChangeKey =
  | 'normalizedLineEndings'
  | 'trimmedTrailingSpaces'
  | 'collapsedExtraBlankLines'
  | 'fixedHeadingSpacing'
  | 'fixedListMarkers'
  | 'fixedCodeFenceSpacing'
  | 'closedCodeFences'
  | 'fixedBoldItalicSpacing'
  | 'normalizedBlockquoteMarkers'
  | 'fixedTablePipeSpacing'
  | 'replacedSmartQuotes';

export type MarkdownFixResult = {
  fixed: string;
  changes: MarkdownFixChangeKey[];
};

function fixHeadingSpacing(line: string): string {
  return line.replace(/^(#{1,6})([^\s#])/gm, '$1 $2');
}

function fixListMarkers(line: string): string {
  return line
    .replace(/^(\s*)([-*+])([^\s])/gm, '$1$2 $3')
    .replace(/^(\s*)(\d+)\.([^\s])/gm, '$1$2. $3');
}

function fixCodeFenceSpacing(text: string): string {
  return text.replace(/^```([^\s`])/gm, '```$1');
}

function closeUnclosedFences(text: string): { text: string; closed: boolean } {
  const fenceCount = (text.match(/^```/gm) ?? []).length;
  if (fenceCount % 2 === 0) return { text, closed: false };
  return { text: `${text}\n\`\`\``, closed: true };
}

function fixBoldItalicSpacing(text: string): string {
  return text
    .replace(/\*\*([^*\n]+?)\*\*(?=\S)/g, '**$1** ')
    .replace(/(?<!\*)\*([^*\n]+?)\*(?=\S)/g, '*$1* ');
}

function normalizeBlockquotes(text: string): string {
  return text.replace(/^(\s*)>([^\s>])/gm, '$1> $2');
}

function fixTablePipeSpacing(text: string): string {
  return text
    .split('\n')
    .map((line) => {
      if (!line.includes('|')) return line;
      return line
        .replace(/^\|+/, '| ')
        .replace(/\|+$/g, ' |')
        .replace(/\|\s*\|/g, '| |');
    })
    .join('\n');
}

function replaceSmartQuotes(text: string): string {
  return text
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201C\u201D]/g, '"')
    .replace(/[\u2013\u2014]/g, '-');
}

function collapseBlankLines(text: string): string {
  return text.replace(/\n{4,}/g, '\n\n\n');
}

export function fixBrokenMarkdown(source: string): MarkdownFixResult {
  const changes: MarkdownFixChangeKey[] = [];
  let text = source ?? '';

  if (/\r/.test(text)) {
    text = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
    changes.push('normalizedLineEndings');
  }

  const withoutTrailing = text
    .split('\n')
    .map((line) => line.replace(/[ \t]+$/g, ''))
    .join('\n');
  if (withoutTrailing !== text) {
    text = withoutTrailing;
    changes.push('trimmedTrailingSpaces');
  }

  const collapsed = collapseBlankLines(text);
  if (collapsed !== text) {
    text = collapsed;
    changes.push('collapsedExtraBlankLines');
  }

  const smart = replaceSmartQuotes(text);
  if (smart !== text) {
    text = smart;
    changes.push('replacedSmartQuotes');
  }

  const headings = fixHeadingSpacing(text);
  if (headings !== text) {
    text = headings;
    changes.push('fixedHeadingSpacing');
  }

  const lists = fixListMarkers(text);
  if (lists !== text) {
    text = lists;
    changes.push('fixedListMarkers');
  }

  const fencesSpaced = fixCodeFenceSpacing(text);
  if (fencesSpaced !== text) {
    text = fencesSpaced;
    changes.push('fixedCodeFenceSpacing');
  }

  const closed = closeUnclosedFences(text);
  if (closed.closed) {
    text = closed.text;
    changes.push('closedCodeFences');
  }

  const blockquotes = normalizeBlockquotes(text);
  if (blockquotes !== text) {
    text = blockquotes;
    changes.push('normalizedBlockquoteMarkers');
  }

  const tables = fixTablePipeSpacing(text);
  if (tables !== text) {
    text = tables;
    changes.push('fixedTablePipeSpacing');
  }

  const emphasis = fixBoldItalicSpacing(text);
  if (emphasis !== text) {
    text = emphasis;
    changes.push('fixedBoldItalicSpacing');
  }

  return { fixed: text, changes: [...new Set(changes)] };
}

export const SAMPLE_BROKEN_MARKDOWN = `#Broken heading
This is **bold**text and *italic*word.

-List item one
*Another item
1.Numbered item

\`\`\`js
console.log('missing closing fence');

>Quote without space
[Link](https://example.com)text

|Col1|Col2|
|---|---|
|a|b|
`;
