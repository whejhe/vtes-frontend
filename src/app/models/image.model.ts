//front/src/app/models/image.model.ts
export interface Image{
    _id: string;
    userId?: string;
    customCardId?: string;
    name: string;
    image: string;
    type: string;
    author: string;
    extension: string;
    imageUrl: string;
    public: boolean;
}
