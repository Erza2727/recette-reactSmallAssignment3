import { useEffect, useMemo, useState } from "react";
import { api } from "../api";
import type { RecipeListItem } from "../types";
import { normalizeRecipeList, normalizeRecipeTypes } from "../utils/normalize";
import { Loading } from "../components/Loading";
import { ErrorMessage } from "../components/ErrorMessage";
import { CategoryPills } from "../components/CategoryPills";
import { RecipeCard } from "../components/RecipeCard";

export function HomePage() {
  const [recipes, setRecipes] = useState<RecipeListItem[]>([]);
  const [recipeTypes, setRecipeTypes] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState<string>("ALL");
  const [search, setSearch] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        setError("");

        const [recipesRaw, typesRaw] = await Promise.all([
          api.getRecipes(),
          api.getRecipeTypes(),
        ]);

        if (cancelled) return;

        console.log("Raw recipe types from API:", typesRaw);

        //const normalizedRecipes = normalizeRecipeList(recipesRaw);
        //const normalizedTypes = normalizeRecipeTypes(typesRaw);

        //console.log("Normalized recipe types:", normalizedTypes);

        setRecipes(normalizeRecipeList(recipesRaw));
        setRecipeTypes(normalizeRecipeTypes(typesRaw));
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
  }, []);

  const categories = useMemo(() => ["ALL", ...recipeTypes], [recipeTypes]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();

    return recipes.filter((r) => {
      const matchesType =
        selectedType.toUpperCase() === "ALL"
          ? true
          : r.recipeType.toLowerCase() === selectedType.toLowerCase();
      const matchesSearch =
        q === "" ? true : r.title.trim().toLowerCase().includes(q);
      return matchesType && matchesSearch; // inclusive with category filter
    });
  }, [recipes, selectedType, search]);

  return (
    <div style={{ minHeight: "100vh", background: "#FFFFFF" }}>
      {/* Header */}
      <header
        style={{
          height: 350,
          background: "linear-gradient(180deg, #219EBC, #2172BC)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 20,
          padding: "0 16px",
        }}
      >
        <div style={{ width: "min(700px, 100%)" }}>
          <div
            style={{
              background: "#FFFFFF",
              borderRadius: 999,
              padding: "14px 18px",
              display: "flex",
              alignItems: "center",
              gap: 10,
              boxShadow: "0 2px 12px rgba(0,0,0,0.10)",
            }}
          >
            <span aria-hidden="true">🔍</span>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search for recipes"
              style={{
                border: "none",
                outline: "none",
                width: "100%",
                fontSize: 16,
              }}
            />
          </div>
        </div>

        <h1
          style={{ color: "#FFFFFF", fontSize: 44, margin: 0, fontWeight: 500 }}
        >
          Explore Recipes
        </h1>
      </header>

      {/* Filters + content */}
      <main style={{ padding: "28px 16px" }}>
        <CategoryPills
          categories={categories}
          selected={selectedType}
          onSelect={setSelectedType}
        />

        <div
          style={{
            maxWidth: 980,
            margin: "18px auto 0",
            color: "#929292",
          }}
        >
          You have <b style={{ color: "#000" }}>{filtered.length}</b> recipes to
          explore.
        </div>

        {loading && <Loading label="Loading recipes..." />}
        {!loading && error && <ErrorMessage message={error} />}

        {!loading && !error && filtered.length === 0 && (
          <div style={{ textAlign: "center", marginTop: 40, color: "#929292" }}>
            No recipes found.
          </div>
        )}
        {error ? <ErrorMessage message={error} /> : null}

        {!loading && !error ? (
          <div
            style={{
              maxWidth: 980,
              margin: "18px auto 0",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(210px, 1fr))",
              gap: 20,
            }}
          >
            {filtered.map((r) => (
              <RecipeCard key={r.id} recipe={r} />
            ))}
          </div>
        ) : null}
      </main>
    </div>
  );
}
