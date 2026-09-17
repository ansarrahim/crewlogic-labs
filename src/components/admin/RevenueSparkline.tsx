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

export default function RevenueSparkline({ dailyCents }: { dailyCents: number[] }) {
  const max = Math.max(1, ...dailyCents);

  return (
    <svg
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      className="h-16 w-full"
      role="img"
      aria-label={`Revenue by day so far this month, ${dailyCents.length} days`}
    >
      <path
        d={buildPath(dailyCents, max)}
        fill="none"
        stroke="#34d399"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
