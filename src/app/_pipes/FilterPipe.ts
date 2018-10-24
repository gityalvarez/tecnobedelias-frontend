import { Pipe, PipeTransform, Injectable } from '@angular/core';

@Pipe({
    name: 'filter',
})
@Injectable()
export class FilterPipe implements PipeTransform {
    transform(items: any[], fields:string[], value: string): any[] {
        if (!items) {
            return [];
        }
        if (!value){
            return items
        }        
        return items.filter(item=>{
            var j = 0 
            for(let i in fields){
                j = j + item[fields[i]].toLowerCase().includes(value.toLowerCase())
            }
            return (j>0)
        })
    }
}
                



            

            /*const nombre = item[fields[0]].toLowerCase().includes(value.toLowerCase()) 
            const apellido = item[fields[1]].toLowerCase().includes(value.toLowerCase())
            const username = item[fields[2]].toLowerCase().includes(value.toLowerCase())
            const email = item[fields[3]].toLowerCase().includes(value.toLowerCase())

            console.log( nombre + apellido + username + email);
            return (nombre + apellido + username +email );     
            */ 