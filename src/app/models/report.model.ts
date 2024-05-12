//front/src/app/models/report.model.ts
export interface Report{
    _id: string;
    name: string;
    email: string;
    comment: string;
    authorOfCard: string;
    nameOfCard: string;
    notification: boolean;
}
