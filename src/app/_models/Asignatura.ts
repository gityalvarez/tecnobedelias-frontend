import { Asignatura_Carrera } from "./Asignatura_Carrera";

export class Asignatura{
    id:number;
   codigo:string;
   nombre:string;
   descripcion:string;
   asignaturaCarrera: Asignatura_Carrera[];
   taller:boolean;

}