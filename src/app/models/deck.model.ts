//front/src/app/models/deck.model.ts
export interface Deck {
  _id: string;
  userId: string;
  type: string;
  name: string;
  description: string;
  author: string;
  category: string;
  isPublic: boolean;
  crypt: Array<{
    _id: string;
    quantity: number;
  }>;
  library: Array<{
    _id: string;
    quantity: number;
  }>
}
