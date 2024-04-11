//front/src/app/models/deck.model.ts
export interface Deck {
  _id: string;
  userId: string;
  name: string;
  description: string;
  author: string;
  category: string;
  publico: boolean;
  cardIds:{
    type: string[]
  };
}
