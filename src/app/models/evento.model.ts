// front/src/app/models/event.model.ts
export interface Evento {
    _id?: string,
    creatorId?: string,
    name?: string,
    email?: string,
    type?: String,
    provincia?: String,
    localidad?: string,
    direccion?: string,
    description?: String,
    fecha?: Date,
    hora?: String,
    numMaxParticipantes?: string
}