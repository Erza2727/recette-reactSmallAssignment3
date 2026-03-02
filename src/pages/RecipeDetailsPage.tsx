import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../api";
import type { RecipeDetails } from "../types";
import { normalizeRecipeDetails } from "../utils/normalize";
import { Loading } from "../components/Loading";
import { ErrorMessage } from "../components/ErrorMessage";

export function RecipeDetailsPage() {
  const { recipeId } = useParams<{ recipeId: string }>();

  const [recipe, setRecipe] = useState<RecipeDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    let cancelled = false;

    async function load() {
      if (!recipeId) {
        setError("Missing recipeId");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const raw = await api.getRecipeById(recipeId);
        if (cancelled) return;

        setRecipe(normalizeRecipeDetails(raw));
      } catch (e) {
        if (cancelled) return;
        setError(e instanceof Error ? e.message : "Something happened");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [recipeId]);

  if (loading) return <Loading label="Loading recipe..." />;
  if (error) return <ErrorMessage message={error} />;
  if (!recipe) return <ErrorMessage message="Recipe not found" />;

  return (
    <div style={{ minHeight: "100vh", background: "#FFFFFF" }}>
      <div style={{ padding: 16, maxWidth: 980, margin: "0 auto" }}>
        <Link to="/" style={{ color: "#2172BC", textDecoration: "none" }}>
          ← Back
        </Link>
      </div>

      {/* Cover image */}
      <div style={{ height: 520, background: "#EDECF1" }}>
        {recipe.imageUrl ? (
          <img
            src={`data:image/png;base64,${recipe.imageUrl}`}
            //src={recipe.imageUrl}
            alt={recipe.title}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : null}
      </div>

      <div style={{ maxWidth: 980, margin: "0 auto", padding: "24px 16px" }}>
        <h1 style={{ margin: "8px 0 4px", fontSize: 44 }}>{recipe.title}</h1>
        <div style={{ color: "#929292", marginBottom: 18 }}>
          By {recipe.author}
        </div>

        {/* Only Calories + TotalMinutes */}
        <div
          style={{
            display: "flex",
            gap: 16,
            marginBottom: 28,
            flexWrap: "wrap",
          }}
        >
          <InfoBox label="Calories" value={`${recipe.calories} cal`} />
          <InfoBox label="Total time" value={`${recipe.totalMinutes} min`} />
        </div>

        <Section title="About recipe">
          <p style={{ color: "#929292", lineHeight: 1.7, margin: 0 }}>
            {recipe.description}
          </p>
        </Section>

        <Section title="Ingredients">
          <ul
            style={{
              margin: 0,
              paddingLeft: 18,
              color: "#929292",
              lineHeight: 1.8,
            }}
          >
            {recipe.ingredients.map((ing, idx) => (
              <li key={idx}>{ing}</li>
            ))}
          </ul>
        </Section>

        <Section title="Instructions">
          <ol
            style={{
              margin: 0,
              paddingLeft: 18,
              color: "#929292",
              lineHeight: 1.8,
            }}
          >
            {recipe.instructions.map((step, idx) => (
              <li key={idx}>{step}</li>
            ))}
          </ol>
        </Section>
      </div>
    </div>
  );
}

function InfoBox({ label, value }: { label: string; value: string }) {
  return (
    <div
      style={{
        border: "1px solid #EDECF1",
        borderRadius: 10,
        padding: "16px 18px",
        minWidth: 160,
        background: "#FFFFFF",
      }}
    >
      <div style={{ color: "#929292", fontWeight: 600, marginBottom: 8 }}>
        {label}
      </div>
      <div style={{ fontWeight: 800 }}>{value}</div>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section style={{ marginBottom: 26 }}>
      <h2 style={{ margin: "0 0 12px", fontSize: 28 }}>{title}</h2>
      {children}
    </section>
  );
}
