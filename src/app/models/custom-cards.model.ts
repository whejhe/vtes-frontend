export interface CustomCard {
  _id?: string;
  deckId?: string;
  name: string;
  capacity: number;
  image: File | string;
  clan: string;
  disciplines: string[];
  group: number;
  logoColor: string;
  description: string;
}
