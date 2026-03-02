const BASE_URL = "http://localhost:3500";

export type RecipeTypeDto = { _id: string; name: string };

// Minimal shape for list page (fast)
export type RecipeListDto = {
  _id: string;
  title: string;
  image: string; // base64 string
  tags?: string[];
  recipeTypes?: string[];
};

// Full details shape (you can expand after you see the real response)
export type RecipeDetailsDto = RecipeListDto & {
  author?: string;
  description?: string;
  calories?: number;
  totalMinutes?: number;
  ingredients?: string[];
  instructions?: string[];
};

async function getJson<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return res.json() as Promise<T>;
}

export function fetchRecipes() {
  return getJson<RecipeListDto[]>(`${BASE_URL}/recipes`);
}

export function fetchRecipeTypes() {
  return getJson<RecipeTypeDto[]>(`${BASE_URL}/recipes/recipeTypes`);
}

export function fetchRecipeById(id: string) {
  return getJson<RecipeDetailsDto>(`${BASE_URL}/recipes/${id}`);
}