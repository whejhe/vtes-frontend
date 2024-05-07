// front/src/app/models/event.model.ts
export interface Evento {
    _id?: string,
    creatorId?: string,
    name?: string,
    email?: string,
    type?: String,
    precio?: string,
    provincia?: String,
    localidad?: string,
    direccion?: string,
    description?: String,
    fecha?: Date,
    hora?: Hora,
    numMaxParticipantes?: string
}

export enum Hora {
    diez = "10:00",
    once = "11:00",
    doce = "12:00",
    una = "13:00",
    dos = "14:00",
    tres ="15:00",
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


