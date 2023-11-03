export enum RAZAS {
    Hobbits="Hobbits",
    Humanos="Humanos",
    Elfos="Elfos",
    Enanos="Enanos",
    Ents="Ents"
}

export type Personaje = {
    id: string;
    name: string;
    raza: RAZAS
    descripcion: string;
    habilidades: [];
};