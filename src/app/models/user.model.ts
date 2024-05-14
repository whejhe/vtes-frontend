//front/src/app/models/user.model.ts
export interface User{
    _id: string;
    role: Role;
    name: string;
    nick: string;
    email: string;
    password: string;
    profileImage: string;
    blocked: boolean;
    avatarUrl: string;
}

export enum Role{
    SUPER_ADMIN = 'SUPER_ADMIN',
    ADMIN = 'ADMIN',
    COLLABORATOR = 'COLLABORATOR',
    USER = 'USER'
}