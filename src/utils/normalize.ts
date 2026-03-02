import type { RecipeDetails, RecipeListItem } from "../types";

// Try to map common shapes into your required TS contracts.
// If your API already matches, this will still work.
export function normalizeRecipeList(data: unknown): RecipeListItem[] {
  if (!Array.isArray(data)) return [];

  return data.map((r: any) => ({
    id: String(r.id ?? r._id ?? r.recipeId ?? ""),
    title: String(r.title ?? r.name ?? ""),
    imageUrl: String(r.imageUrl ?? r.image ?? r.coverImage ?? ""),
    recipeType: String(r.recipeType ?? r.type ?? r.category ?? ""),
    tags: Array.isArray(r.tags) ? r.tags.map((t: any) => String(t)) : [],
  }));
}

// export function normalizeRecipeTypes(data: unknown): string[] {
//   // API might return ["APPETIZERS", ...] OR {recipeTypes:[...]}
//   if (Array.isArray(data)) return data.map(String);

//   if (
//     data &&
//     typeof data === "object" &&
//     Array.isArray((data as any).recipeTypes)
//   ) {
//     return (data as any).recipeTypes
//       .map((t: any) => {
//         if (typeof t === "string") return t;
//         if (t && typeof t === "object" && "name" in t) return String(t.name);
//         return ""; // fallback
//       })
//       .filter(Boolean); // remove any empty strings
//   }
//   return [];
// }
export function normalizeRecipeTypes(data: unknown): string[] {
  // API returns array of objects or strings
  if (Array.isArray(data)) {
    return data
      .map((t: any) => {
        if (typeof t === "string") return t; // already a string
        if (t && typeof t === "object" && "name" in t) return String(t.name); // extract name
        return "";
      })
      .filter(Boolean); // remove empty strings
  }

  // API might return { recipeTypes: [...] }
  if (
    data &&
    typeof data === "object" &&
    Array.isArray((data as any).recipeTypes)
  ) {
    return (data as any).recipeTypes
      .map((t: any) => {
        if (typeof t === "string") return t;
        if (t && typeof t === "object" && "name" in t) return String(t.name);
        return "";
      })
      .filter(Boolean);
  }

  return [];
}

export function normalizeRecipeDetails(data: unknown): RecipeDetails {
  const r: any = data ?? {};
  return {
    id: String(r.id ?? r._id ?? r.recipeId ?? ""),
    title: String(r.title ?? r.name ?? ""),
    imageUrl: String(r.imageUrl ?? r.image ?? r.coverImage ?? ""),
    author: String(r.author ?? r.createdBy ?? r.by ?? "Unknown"),
    description: String(r.description ?? r.about ?? ""),
    calories: Number(r.calories ?? r.Calories ?? 0),
    totalMinutes: Number(r.totalMinutes ?? r.TotalMinutes ?? r.totalTime ?? 0),
    ingredients: Array.isArray(r.ingredients) ? r.ingredients.map(String) : [],
    instructions: Array.isArray(r.instructions)
      ? r.instructions.map(String)
      : [],
    tags: Array.isArray(r.tags) ? r.tags.map((t: any) => String(t)) : [],
    recipeType: String(r.recipeType ?? r.type ?? r.category ?? ""),
  };
}
