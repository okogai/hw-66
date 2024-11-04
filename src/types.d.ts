export interface IMeal {
  mealType: string;
  text: string;
  date: string;
  calories: number;
}

export interface IMealFromDB extends IMeal {
  id: string;
}
