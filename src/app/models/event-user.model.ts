// front/src/app/models/event-user.model.ts
import { User } from "./user.model";

export interface EventUser {
    _id: string;
    eventId: string;
    userId: User[];
    score: number;
    registrationStatus: string;
    // position?: number;
}
