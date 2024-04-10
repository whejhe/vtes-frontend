//front/src/app/models/image.model.ts
export interface Image{
    _id: string;
    userId?: string;
    customCardId?: string;
    name: string;
    type: string;
    imageUrl: string;
    extension: string;
    public: boolean;
    __v?: number;
}
