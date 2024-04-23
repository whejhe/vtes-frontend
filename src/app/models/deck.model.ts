//front/src/app/models/deck.model.ts
export interface Deck {
  _id: string;
  userId: string;
  type: string;
  name: string;
  description: string;
  author: string;
  category: string;
  publico: boolean;
  cards:string[];
}
