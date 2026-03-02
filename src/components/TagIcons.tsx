import type { RecipeTag } from "../types";

const ICONS: Record<string, string> = {
  Meat: "🥩",
  Fish: "🐟",
  Spicy: "🌶️",
  Chicken: "🍗",
  "Kid friendly": "🧒",
};

export function TagIcons({ tags }: { tags: RecipeTag[] }) {
  const shown = tags.filter((t) => t in ICONS);
  if (shown.length === 0) return null;

  return (
    <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
      {shown.map((t) => (
        <span key={String(t)} title={String(t)} aria-label={String(t)}>
          {ICONS[String(t)]}
        </span>
      ))}
    </div>
  );
}