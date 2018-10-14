import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Carrera } from '../_models/Carrera';

@Injectable({
  providedIn: 'root'
})
export class CarreraService {

  private carrera = new Carrera();

  constructor(private http:HttpClient) { }

  getCarreras():Observable<any>{
    return this.http.get(environment.API+'/carrera/listar');
  }

  agregarCarrera(carrera:Carrera):Observable<any>{
    console.log('entre al agregarCarreraService con la carrera '+carrera.nombre );
    return this.http.post(environment.API+'/carrera/crear',carrera);
  }

  set(carrera:Carrera){
    this.carrera=carrera;
  }

  get(){
    return this.carrera;
  }
  
}
