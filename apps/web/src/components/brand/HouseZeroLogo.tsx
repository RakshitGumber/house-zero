import type { SVGProps } from "react";

export function HouseZeroLogo({
  className,
  ...props
}: SVGProps<SVGSVGElement>) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 72 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <text
        x="36"
        y="56"
        fill="var(--color-primary)"
        fontFamily="monospace"
        fontSize="54"
        fontWeight="700"
        textAnchor="middle"
      >
        0
      </text>
      <path d="M46 4h7v11h-7V4Z" fill="#050505" />
      <path d="M10 19 36 2l26 17-6 8-20-13-20 13-6-8Z" fill="#050505" />
    </svg>
  );
}
