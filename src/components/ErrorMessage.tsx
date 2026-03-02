export function ErrorMessage({ message }: { message: string }) {
  return (
    <div style={{ padding: 16, margin: "16px auto", maxWidth: 900, color: "#B85C79" }}>
      {message}
    </div>
  );
}