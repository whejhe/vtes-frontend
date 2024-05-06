// front/src/app/models/event-user.model.ts
export interface EventUser {
    _id: string;
    eventId: string;
    userId: string;
    score: number;
    registrationStatus: string;
}