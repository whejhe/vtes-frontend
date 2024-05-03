export interface CustomCard {
  _id?: string;
  userId: string;
  deckId?: string;
  name: string;
  author: string;
  capacity?: number;
  image: File | string;
  clan: string;
  disciplines: string[];
  group: number;
  type: string[];
  logoColor: string;
  description: string;
  publico: boolean;
  costBlood: number;
  costPool: number;
  url: `https://vtesapp.duckdns.org/uploads/customCards/`;
}
