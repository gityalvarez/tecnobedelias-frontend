import { Injectable } from '@angular/core';
import { Carrera } from '../_models/Carrera';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Curso } from '../_models/Curso';
import { Examen } from '../_models/Examen';

@Injectable({
  providedIn: 'root'
})
export class InscripcionService {

  constructor(private http:HttpClient) { }


  inscripcionACarrera(carrera:Carrera):Observable<any>{
    return this.http.get(environment.API+'/inscripcion/carrera',{params : {'carrera':carrera.nombre}});

  }

  desistirACarrera(carrera:Carrera):Observable<any>{
    return this.http.get(environment.API+'/inscripcion/desistircarrera',{params:{'carrera':carrera.nombre}});
  }

  listaCursos():Observable<any>{
    return this.http.get(environment.API+'/curso/listar');
  }

  consultaCursos():Observable<any>{
    return this.http.get(environment.API+'/inscripcion/curso/consulta')
  }

  inscripcionACurso(curso:Curso):Observable<any>{
    return this.http.get(environment.API+'/inscripcion/curso',{params : {'curso':curso.id.toString()}})
  }

  desistirACurso(curso:Curso):Observable<any>{
    return this.http.get(environment.API+'/inscripcion/desistircurso',{params : {'curso':curso.id.toString()}})
  }

  consultaExamen():Observable<any>{
    return this.http.get(environment.API+'/inscripcion/examen/consulta')
  }

  inscripcionAExamen(examen:Examen):Observable<any>{
    return this.http.get(environment.API+'/inscripcion/examen',{params:{'examen':examen.id.toString()}});
  }

  desistirAExamen(examen:Examen):Observable<any>{
    return this.http.get(environment.API+'/inscripcion/desistirexamen',{params:{'examen':examen.id.toString()}});
  }

}
