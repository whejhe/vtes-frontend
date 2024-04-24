//front/src/app/models/card.model.ts
export interface Card {
  _id: string;
  name: string;
  url: string;
  types: string[];
  title: string;
  clans: string[];
  capacity: number;
  disciplines: string[];
  multidisc: boolean;
  card_text: string;
  ordered_sets: string[];
  blood_cost: string;
  pool_cost: string;
  rulings: string;
  sets: string[];
  group: number;
}
