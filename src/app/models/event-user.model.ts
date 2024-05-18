// front/src/app/models/event-user.model.ts
import { User } from "./user.model";

export interface EventUser {
    eventId: string;
    userId: User[];
    tiradas: Tirada[];
}

export interface Tirada {
    userId: string;
    round1: number;
    round2: number;
    round3: number;
}
