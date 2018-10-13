import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'cedula' })

export class CedulaPipe implements PipeTransform {
    transform(cedula? : number): string {
        let cedulaString : string;
        if (cedula){
            cedulaString = cedula.toString();
            return ("Cedula: "+cedulaString.substring(0,1)+'.'+cedulaString.substring(1,4)+'.'+cedulaString.substring(4,7)+'-'+cedulaString.substring(7,8));

        }
    }

}