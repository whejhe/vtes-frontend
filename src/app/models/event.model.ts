export interface Event{
    _id: string,
    creatorId: string,
    name:string,
    email:string,
    type:String,
    provincia:String,
    localidad:string,
    direccion:string,
    description: String,
    fecha:Date,
    hora:String,
    numMaxParticipantes:Number
}