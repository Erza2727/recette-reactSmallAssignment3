const API_BASE = "http://localhost:3500";

async function requestJson<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`);
  if (!res.ok) {
    throw new Error("Request failed");
  }
  return res.json();
}

export const api = {
  getRecipes: () => requestJson("/recipes"),
  getRecipeTypes: () => requestJson("/recipes/recipeTypes"),
  getRecipeById: (id: string) => requestJson(`/recipes/${id}`),
};