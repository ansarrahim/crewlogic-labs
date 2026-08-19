import type { DailyCount } from "@/lib/leads";

const WIDTH = 280;
const HEIGHT = 64;
const PADDING = 4;

function buildPath(values: number[], max: number): string {
  if (values.length < 2) return "";
  const stepX = (WIDTH - PADDING * 2) / (values.length - 1);
  return values
    .map((value, i) => {
      const x = PADDING + i * stepX;
      const y = HEIGHT - PADDING - (value / max) * (HEIGHT - PADDING * 2);
      return `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(" ");
}

export default function LeadsSparkline({ data }: { data: DailyCount[] }) {
  const values = data.map((d) => d.count);
  const max = Math.max(1, ...values);

  return (
    <svg
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      className="h-16 w-full"
      role="img"
      aria-label={`Leads over the last ${data.length} days`}
    >
      <path
        d={buildPath(values, max)}
        fill="none"
        stroke="#b8935a"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
