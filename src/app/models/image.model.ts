//front/src/app/models/image.model.ts
export interface Image{
    _id: string;
    userId?: string;
    customCardId?: string;
    name: string;
    type: string;
    extension: string;
    publico: boolean;
    imageUrl: string;
}