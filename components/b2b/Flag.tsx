import Icon from "@/components/b2b/Icon";
import type { Region } from "@/lib/i18n";

// Drawn as SVG because Windows has no flag emojis (🇩🇪 shows up as the letters "DE").
const FLAGS: Record<Exclude<Region, "OTHER">, { viewBox: string; shapes: React.ReactNode }> = {
  DE: {
    viewBox: "0 0 5 3",
    shapes: (
      <>
        <rect width="5" height="1" fill="#000" />
        <rect y="1" width="5" height="1" fill="#DD0000" />
        <rect y="2" width="5" height="1" fill="#FFCE00" />
      </>
    ),
  },
  DK: {
    viewBox: "0 0 37 28",
    shapes: (
      <>
        <rect width="37" height="28" fill="#C8102E" />
        <rect x="12" width="4" height="28" fill="#fff" />
        <rect y="12" width="37" height="4" fill="#fff" />
      </>
    ),
  },
  SE: {
    viewBox: "0 0 16 10",
    shapes: (
      <>
        <rect width="16" height="10" fill="#006AA7" />
        <rect x="5" width="2" height="10" fill="#FECC00" />
        <rect y="4" width="16" height="2" fill="#FECC00" />
      </>
    ),
  },
  NO: {
    viewBox: "0 0 22 16",
    shapes: (
      <>
        <rect width="22" height="16" fill="#BA0C2F" />
        <rect x="6" width="4" height="16" fill="#fff" />
        <rect y="6" width="22" height="4" fill="#fff" />
        <rect x="7" width="2" height="16" fill="#00205B" />
        <rect y="7" width="22" height="2" fill="#00205B" />
      </>
    ),
  },
  CH: {
    viewBox: "0 0 32 32",
    shapes: (
      <>
        <rect width="32" height="32" fill="#DA291C" />
        <rect x="13" y="6" width="6" height="20" fill="#fff" />
        <rect x="6" y="13" width="20" height="6" fill="#fff" />
      </>
    ),
  },
};

export default function Flag({ region, className = "" }: { region: Region; className?: string }) {
  if (region === "OTHER") {
    return <Icon name="public" size={18} className={`text-primary ${className}`} />;
  }
  const flag = FLAGS[region];
  return (
    <svg
      viewBox={flag.viewBox}
      aria-hidden="true"
      preserveAspectRatio={region === "CH" ? "xMidYMid meet" : "none"}
      className={`inline-block h-3.5 shrink-0 rounded-[2px] shadow-[0_0_0_1px_rgba(0,0,0,0.08)] ${
        region === "CH" ? "w-3.5" : "w-5"
      } ${className}`}
    >
      {flag.shapes}
    </svg>
  );
}
