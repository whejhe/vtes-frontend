//front/src/app/models/user.model.ts
export interface User{
    _id: string;
    role: string;
    name: string;
    nick: string;
    email: string;
    password: string;
    profileImage: string;
    avatarOptions: string[];
}
