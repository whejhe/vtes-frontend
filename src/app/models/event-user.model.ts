import { User } from "./user.model";

// front/src/app/models/event-user.model.ts
export interface EventUser {
    _id: string;
    eventId: string;
    userId: string;
    user: User;
    score: number;
    registrationStatus: string;
}
