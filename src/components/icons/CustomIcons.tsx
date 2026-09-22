import { forwardRef } from 'react';

export interface CustomIconProps extends React.SVGProps<SVGSVGElement> {
  color?: string;
}

export const DocIcon = forwardRef<SVGSVGElement, CustomIconProps>(
  ({ className, color = 'currentColor', ...props }, ref) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      ref={ref}
      aria-hidden="true"
      {...props}
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
    </svg>
  )
);
DocIcon.displayName = 'DocIcon';

export const PdfIcon = forwardRef<SVGSVGElement, CustomIconProps>(
  ({ className, color = 'currentColor', ...props }, ref) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      ref={ref}
      aria-hidden="true"
      {...props}
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <text x="10" y="17" fontSize="8" fontWeight="bold" fill={color} textAnchor="middle">PDF</text>
    </svg>
  )
);
PdfIcon.displayName = 'PdfIcon';
