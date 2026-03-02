interface Props {
  categories: string[];
  selected: string;
  onSelect: (cat: string) => void;
}

export function CategoryPills({ categories, selected, onSelect }: Props) {
  return (
    <div
      style={{
        background: "#EDECF1",
        borderRadius: 999,
        padding: 10,
        display: "flex",
        gap: 18,
        justifyContent: "center",
        flexWrap: "wrap",
        maxWidth: 980,
        margin: "0 auto",
      }}
    >
      {categories.map((cat) => {
        const isSelected = cat === selected;
        return (
          <button
            key={cat}
            onClick={() => onSelect(cat)}
            style={{
              borderRadius: 999,
              padding: "10px 18px",
              border: isSelected ? "1px solid #B85C79" : "1px solid transparent",
              color: isSelected ? "#B85C79" : "#929292",
              background: "transparent",
              cursor: "pointer",
              fontWeight: 600,
              letterSpacing: 0.4,
            }}
          >
            {cat}
          </button>
        );
      })}
    </div>
  );
}