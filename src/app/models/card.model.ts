//front/src/app/models/card.model.ts
export interface Card {
    _id: string;
    name: string;
    url: string;
    types: string[];
    clans: string[];
    capacity: number;
    disciplines: string[];
    card_text: string;
    sets: string[];
    group: number;
}