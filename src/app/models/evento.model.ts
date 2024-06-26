// front/src/app/models/event.model.ts

export interface Evento {
    ranking: any;
    _id?: string;
    userId?: string;
    name?: string;
    email?: string;
    type?: string;
    precio?: string;
    provincia?: string;
    localidad?: string;
    direccion?: string;
    description?: string;
    fecha?: string;
    hora?: string;
    numMaxParticipantes?: number;
    participantesInscritos?: number;
    iniciado?: boolean;
    ronda?: {
        numero: number;
        mesas: {
            numero: number;
            players: {
                userId: {
                    _id: string;
                    name: string;
                    email: string;
                    avatarUrl: string;
                };
                tablePoints: number;
                points: number;
            }[];
        }[];
    }[];
}


export enum Hora {
    diez = "10:00",
    once = "11:00",
    doce = "12:00",
    una = "13:00",
    dos = "14:00",
    tres = "15:00",
    cuatro = "16:00",
    cinco = "17:00",
    seis = "18:00",
    siete = "19:00",
    ocho = "20:00",
    nueve = "21:00",
    diezN = "22:00",
    onceN = "23:00",
    doceN = "0:00",
}


