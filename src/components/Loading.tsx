export function Loading({ label = "Loading..." }: { label?: string }) {
  return (
    <div style={{ padding: 24, textAlign: "center", color: "#929292" }}>
      {label}
    </div>
  );
}