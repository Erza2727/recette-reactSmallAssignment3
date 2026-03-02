export type RecipeTag = "Meat" | "Fish" | "Spicy" | "Chicken" | "Kid friendly" | string;

export interface RecipeListItem {
  id: string;
  title: string;
  imageUrl: string;
  recipeType: string;   // category, e.g. "MAIN COURSES"
  tags: RecipeTag[];    // used for icons on the card
}

export interface RecipeTypeResponse {
  recipeTypes: string[];
}

// For details page.
// If your API returns slightly different names, update here + in the page component.
export interface RecipeDetails {
  id: string;
  title: string;
  imageUrl: string;
  author: string;
  description: string;
  calories: number;      // show "Calories"
  totalMinutes: number;  // show "Total time"
  ingredients: string[]; // list
  instructions: string[]; // list/steps
  tags: RecipeTag[];
  recipeType: string;
}