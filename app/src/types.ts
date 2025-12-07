export interface RecipeRequest {
  ingredients: string;
  cuisine: string;
  preferences: string;
  time: number;
  cookingMethod: 'fire' | 'fireless';
}

export interface GeneratedRecipe {
  title: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  cookingTime: string;
  calories: string;
}
