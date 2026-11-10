import React from "react";
import { C } from "../brand";

type P = { size?: number; color?: string; strokeWidth?: number };

export const Check: React.FC<P & { progress?: number }> = ({
  size = 24,
  color = C.ink,
  strokeWidth = 3,
  progress = 1,
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path
      d="M4.5 12.5l5 5L19.5 7"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      pathLength={1}
      strokeDasharray={1}
      strokeDashoffset={1 - progress}
    />
  </svg>
);

/** Persona: cabeza y hombros, trazo simple. */
export const Person: React.FC<P> = ({ size = 24, color = C.ink, strokeWidth = 2.2 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="8" r="4" stroke={color} strokeWidth={strokeWidth} />
    <path d="M4 21c0-4.2 3.6-7 8-7s8 2.8 8 7" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
  </svg>
);

export const Doc: React.FC<P> = ({ size = 24, color = C.ink, strokeWidth = 2 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M6 2.5h8l4.5 4.5v14.5H6z" stroke={color} strokeWidth={strokeWidth} strokeLinejoin="round" />
    <path d="M14 2.5V7h4.5" stroke={color} strokeWidth={strokeWidth} strokeLinejoin="round" />
    <path d="M9 12h6M9 15.5h6M9 19h4" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
  </svg>
);

/** Rombo de compuerta, como en la presentación. */
export const Diamond: React.FC<P> = ({ size = 22, color = C.yellow }) => (
  <svg width={size} height={size} viewBox="0 0 24 24">
    <rect x="5" y="5" width="14" height="14" transform="rotate(45 12 12)" fill={color} />
  </svg>
);

export const Arrow: React.FC<P> = ({ size = 28, color = C.ink, strokeWidth = 3 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M3 12h17M14 6l6 6-6 6" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** Círculo punteado: "por medir". */
export const DashedCircle: React.FC<P> = ({ size = 26, color = C.ink }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="2.2" strokeDasharray="3 3" />
  </svg>
);

export const Chat: React.FC<P> = ({ size = 24, color = C.ink, strokeWidth = 2 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path
      d="M4 5h16v11H10l-5 4v-4H4z"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinejoin="round"
      strokeDasharray="3 2.5"
    />
  </svg>
);
