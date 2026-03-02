import { Link } from "react-router-dom";
import type { RecipeListItem } from "../types";
import { TagIcons } from "./TagIcons";

export function RecipeCard({ recipe }: { recipe: RecipeListItem }) {
  return (
    <Link
      to={`/recipes/${recipe.id}`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <div
        style={{
          background: "#FFFFFF",
          borderRadius: 10,
          overflow: "hidden",
          boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
          cursor: "pointer",
        }}
      >
        <div style={{ height: 150, background: "#EDECF1" }}>
          {recipe.imageUrl ? (
            <img
              src={`data:image/png;base64,${recipe.imageUrl}`}
              alt={recipe.title}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              loading="lazy"
            />
          ) : null}
        </div>

        <div style={{ padding: 12 }}>
          <div style={{ fontWeight: 700 }}>{recipe.title}</div>
          <TagIcons tags={recipe.tags} />
        </div>
      </div>
    </Link>
  );
}
