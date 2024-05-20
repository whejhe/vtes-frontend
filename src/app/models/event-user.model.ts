// front/src/app/models/event-user.model.ts
import { User } from "./user.model";

export interface EventUser {
    eventId: string;
    userId: User[];
    tirada: number[];
}