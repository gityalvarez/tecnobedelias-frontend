import { Rol } from "./Rol";

export class Usuario{
    id:number;
    nombre:string;
    apellido:string;
    username:string;
    password:string;
    email:string;
    fechaNacimiento:Date;
    cedula:number;
    foto:string;
    roles:Rol[];

}