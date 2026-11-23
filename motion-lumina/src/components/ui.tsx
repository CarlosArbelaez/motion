import React from "react";
import {AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame} from "remotion";
import {ap, beesRadius, BODY, C, h1, HEAD, rise} from "../theme";

/** Highlight device BEES: franja negra, texto en mayúsculas, esquinas sup-izq e inf-der redondeadas. */
export const Highlight: React.FC<{children: React.ReactNode; on?: "white" | "yellow"; at?: number}> = ({
  children,
  on = "white",
  at = 0,
}) => {
  const frame = useCurrentFrame();
  const p = ap(frame, at, 18);
  return (
    <span
      style={{
        display: "inline-block",
        position: "relative",
        padding: "0.02em 0.24em 0.06em",
        textTransform: "uppercase",
        color: on === "white" ? C.yellow : C.white,
        whiteSpace: "nowrap",
      }}
    >
      <span
        style={{
          position: "absolute",
          inset: 0,
          background: C.black,
          borderRadius: beesRadius(22),
          transformOrigin: "left center",
          scale: `${p} 1`,
        }}
      />
      <span style={{position: "relative", opacity: interpolate(p, [0.4, 1], [0, 1], {extrapolateLeft: "clamp"})}}>
        {children}
      </span>
    </span>
  );
};

export const Kicker: React.FC<{children: React.ReactNode; at?: number}> = ({children, at = 4}) => {
  const frame = useCurrentFrame();
  return (
    <div style={{display: "flex", alignItems: "center", gap: 16, ...rise(frame, at, 16)}}>
      <div style={{width: 44, height: 12, background: C.black, borderRadius: beesRadius(6)}} />
      <div
        style={{
          fontFamily: BODY,
          fontWeight: 600,
          fontSize: 28,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: C.black,
        }}
      >
        {children}
      </div>
    </div>
  );
};

/** Logo original de Lúmina (PNG extraído del PDF adjunto). Siempre sobre blanco. */
export const LogoBug: React.FC = () => (
  <Img src={staticFile("assets/lumina-logo.png")} style={{position: "absolute", right: 72, top: 36, height: 132}} />
);

/** Marco común de escena: fundido de entrada/salida, kicker, titular y logo. */
export const Scene: React.FC<{
  duration: number;
  kicker?: string;
  title?: React.ReactNode;
  titleSize?: number;
  logo?: boolean;
  children: React.ReactNode;
}> = ({duration, kicker, title, titleSize = 68, logo = true, children}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 8, duration - 9, duration - 1], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <AbsoluteFill style={{background: C.white, opacity}}>
      {logo ? <LogoBug /> : null}
      {kicker ? (
        <div style={{position: "absolute", left: 96, top: 78}}>
          <Kicker>{kicker}</Kicker>
        </div>
      ) : null}
      {title ? (
        <div style={{position: "absolute", left: 96, top: 132, width: 1500, ...h1(titleSize), ...rise(frame, 8, 30, 18)}}>
          {title}
        </div>
      ) : null}
      {children}
    </AbsoluteFill>
  );
};

/** Íconos lineales simples (dibujados para este video; no son pictogramas oficiales BEES). */
export const Icon: React.FC<{name: string; size?: number; color?: string}> = ({name, size = 56, color = C.black}) => {
  const p: Record<string, React.ReactNode> = {
    store: (
      <>
        <path d="M4 10 6 4h12l2 6" />
        <path d="M4 10a2.7 2.7 0 0 0 5.3 0 2.7 2.7 0 0 0 5.4 0A2.7 2.7 0 0 0 20 10" />
        <path d="M5.5 12.5V20h13v-7.5M10 20v-4.5h4V20" />
      </>
    ),
    tag: (
      <>
        <path d="M3.5 12.5V4.5h8l9 9-8 8-9-9Z" />
        <circle cx="8" cy="9" r="1.4" />
      </>
    ),
    calendar: (
      <>
        <rect x="3.5" y="5" width="17" height="15.5" rx="2" />
        <path d="M3.5 10h17M8 3v4M16 3v4M8.5 15l2.5 2.5 4.5-5" />
      </>
    ),
    tasks: (
      <>
        <path d="M4 6.5 5.7 8.2 8.6 5M4 12.5l1.7 1.7 2.9-3.2M4 18.5l1.7 1.7 2.9-3.2" />
        <path d="M12 6.5h8.5M12 12.5h8.5M12 18.5h8.5" />
      </>
    ),
    shield: (
      <>
        <path d="M12 3 4.5 6v6c0 4.5 3.2 7.6 7.5 9 4.3-1.4 7.5-4.5 7.5-9V6L12 3Z" />
        <path d="m9 15 6-6" />
        <circle cx="9.3" cy="9.6" r="1" />
        <circle cx="14.7" cy="14.4" r="1" />
      </>
    ),
    chat: (
      <>
        <path d="M4 5.5h16v11H11l-4.5 4v-4H4v-11Z" />
        <path d="M8 9.5h8M8 12.8h5" />
      </>
    ),
    search: (
      <>
        <circle cx="10.5" cy="10.5" r="6" />
        <path d="m15 15 5.5 5.5" />
      </>
    ),
    plus: <path d="M12 4.5v15M4.5 12h15" />,
    cart: (
      <>
        <path d="M3 4.5h3l2.2 10.5h10l1.8-7.5H7" />
        <circle cx="9.5" cy="19" r="1.4" />
        <circle cx="17" cy="19" r="1.4" />
      </>
    ),
    pulse: <path d="M2.5 12h4l2.5-6 4 12 2.5-6h6" />,
    check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
    growth: (
      <>
        <path d="M3.5 17.5 9.5 11l4 3.5 7-8" />
        <path d="M15.5 6.5h5v5" />
      </>
    ),
    data: (
      <>
        <path d="M5 20V11M12 20V5M19 20v-6" />
      </>
    ),
    target: (
      <>
        <circle cx="12" cy="12" r="8.5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="12" cy="12" r="0.8" />
      </>
    ),
    bolt: <path d="M13 3 5 13.5h6L10 21l8.5-11h-6L13 3Z" />,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      {p[name]}
    </svg>
  );
};

export const Tag: React.FC<{children: React.ReactNode; bg?: string; color?: string}> = ({children, bg = C.black, color = C.yellow}) => (
  <div
    style={{
      display: "inline-block",
      background: bg,
      color,
      fontFamily: BODY,
      fontWeight: 600,
      fontSize: 22,
      letterSpacing: "0.07em",
      textTransform: "uppercase",
      padding: "7px 16px 8px",
      borderRadius: beesRadius(12),
    }}
  >
    {children}
  </div>
);

export const headFont = HEAD;
