import { useTranslations } from 'next-intl';

type MermaidFlowchartPreviewProps = {
  variant?: 'dark' | 'light';
  className?: string;
};

const NODE_W = 144;
const NODE_H = 44;
const NODE_Y = 22;

export default function MermaidFlowchartPreview({
  variant = 'dark',
  className = '',
}: MermaidFlowchartPreviewProps) {
  const t = useTranslations('common');
  const isDark = variant === 'dark';
  const arrowColor = isDark ? '#94a3b8' : '#64748b';
  const bg = isDark ? 'transparent' : '#f8fafc';

  const nodes = [
    {
      id: 'md',
      label: t('flowNodeMd'),
      x: 4,
      stroke: '#3b82f6',
      fillDark: '#1e3a5f',
      fillLight: '#eff6ff',
      textDark: '#38adf8',
      glow: 'rgba(59,130,246,0.35)',
    },
    {
      id: 'engine',
      label: t('flowNodeEngine'),
      x: 168,
      stroke: '#a855f7',
      fillDark: '#2e1a47',
      fillLight: '#faf5ff',
      textDark: '#c084fc',
      glow: 'rgba(168,85,247,0.35)',
    },
    {
      id: 'pdf',
      label: t('flowNodePdf'),
      x: 332,
      stroke: '#10b981',
      fillDark: '#0f2e26',
      fillLight: '#ecfdf5',
      textDark: '#34d399',
      glow: 'rgba(16,185,129,0.35)',
    },
  ] as const;

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div
        className={`relative w-full max-w-[540px] rounded-2xl border p-5 ${
          isDark
            ? 'border-blue-500/20 bg-slate-900/60 shadow-lg shadow-blue-500/5'
            : 'border-slate-200 bg-white shadow-sm'
        }`}
      >
        <span
          className={`absolute -top-2.5 left-4 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-md border ${
            isDark
              ? 'text-blue-400 bg-blue-950 border-blue-800'
              : 'text-blue-600 bg-blue-50 border-blue-200'
          }`}
        >
          {t('flowVectors')}
        </span>

        <svg
          viewBox="0 0 480 96"
          className="w-full h-auto mt-2"
          role="img"
          aria-label={t('flowAria')}
        >
          <rect width="480" height="96" fill={bg} rx="8" />
          <defs>
            <marker
              id="flow-arrow-head"
              markerWidth="9"
              markerHeight="9"
              refX="8"
              refY="4.5"
              orient="auto"
            >
              <path d="M0,0 L9,4.5 L0,9 Z" fill={arrowColor} />
            </marker>
            {nodes.map((node) => (
              <filter key={`glow-${node.id}`} id={`glow-${node.id}`} x="-30%" y="-30%" width="160%" height="160%">
                <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor={node.glow} />
              </filter>
            ))}
          </defs>

          {/* Connector arrows (behind nodes) */}
          <g stroke={arrowColor} strokeWidth="2" fill="none" markerEnd="url(#flow-arrow-head)">
            <line x1={nodes[0].x + NODE_W} y1={NODE_Y + NODE_H / 2} x2={nodes[1].x - 6} y2={NODE_Y + NODE_H / 2} />
            <line x1={nodes[1].x + NODE_W} y1={NODE_Y + NODE_H / 2} x2={nodes[2].x - 6} y2={NODE_Y + NODE_H / 2} />
          </g>

          {/* Junction dots */}
          <circle cx={nodes[0].x + NODE_W} cy={NODE_Y + NODE_H / 2} r="3" fill={nodes[0].stroke} />
          <circle cx={nodes[1].x} cy={NODE_Y + NODE_H / 2} r="3" fill={nodes[1].stroke} />
          <circle cx={nodes[1].x + NODE_W} cy={NODE_Y + NODE_H / 2} r="3" fill={nodes[1].stroke} />
          <circle cx={nodes[2].x} cy={NODE_Y + NODE_H / 2} r="3" fill={nodes[2].stroke} />

          {nodes.map((node) => (
            <g key={node.id} filter={isDark ? `url(#glow-${node.id})` : undefined}>
              <rect
                x={node.x}
                y={NODE_Y}
                width={NODE_W}
                height={NODE_H}
                rx="10"
                fill={isDark ? node.fillDark : node.fillLight}
                stroke={node.stroke}
                strokeWidth="1.5"
              />
              <text
                x={node.x + NODE_W / 2}
                y={NODE_Y + NODE_H / 2 + 4}
                textAnchor="middle"
                fill={isDark ? node.textDark : node.stroke}
                fontSize="11"
                fontWeight="600"
                fontFamily="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
              >
                {node.label}
              </text>
            </g>
          ))}
        </svg>

        <p
          className={`mt-3 text-center font-mono text-[10px] leading-relaxed ${
            isDark ? 'text-[var(--text-tertiary)]' : 'text-slate-500'
          }`}
        >
          {t('flowCaption')}
        </p>
      </div>
    </div>
  );
}
