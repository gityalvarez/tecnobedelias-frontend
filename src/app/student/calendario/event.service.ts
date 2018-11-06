import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of as observableOf } from 'rxjs/observable/of';
import { Curso } from 'src/app/_models/Curso';
import { Examen } from 'src/app/_models/Examen';
import * as moment from 'moment';
// import 'rxjs/add/observable/of';

@Injectable()
export class EventService {
    public getEvents(cursos: Curso[], examenes: Examen[]): Observable<any> {
        // const dateObj = new Date();
        // const yearMonth = dateObj.getUTCFullYear() + '-' + (dateObj.getUTCMonth() + 1);
        const data: any = [];

        cursos.forEach((curso) => {
            data.push({
                title: curso.nombreAsignatura + ' (curso)',
                type: 'Inicio de Curso',
                allDay: true,
                start: moment(curso.fechaInicio).format('YYYY-MM-DD'),
                color: '#690'
            });
        });
        examenes.forEach((examen) => {
            data.push({
                title: examen.nombreAsignatura + ' (examen)',
                type: 'Fecha de Examen',
                allDay: true,
                start: examen.fecha,
                color: '#C33'
            });
        });
        return observableOf(data);
    }
}



/*
{
            title: 'All Day Event',
            start: yearMonth + '-01'
        },
        {
            title: 'Long Event',
            start: yearMonth + '-07',
            end: yearMonth + '-10'
        },
        {
            id: 999,
            title: 'Repeating Event',
            start: yearMonth + '-09T16:00:00'
        },
        {
            id: 999,
            title: 'Repeating Event',
            start: yearMonth + '-16T16:00:00'
        },
        {
            title: 'Conference',
            start: yearMonth + '-11',
            end: yearMonth + '-13'
        },
        {
            title: 'Meeting',
            start: yearMonth + '-12T10:30:00',
            end: yearMonth + '-12T12:30:00'
        },
        {
            title: 'Lunch',
            start: yearMonth + '-12T12:00:00'
        },
        {
            title: 'Meeting',
            start: yearMonth + '-12T14:30:00'
        },
        {
            title: 'Happy Hour',
            start: yearMonth + '-12T17:30:00'
        },
        {
            title: 'Dinner',
            start: yearMonth + '-12T20:00:00'
        },
        {
            title: 'Birthday Party',
            start: yearMonth + '-13T07:00:00'
        },
        {
            title: 'Click for Google',
            url: 'http://google.com/',
            start: yearMonth + '-28'
        }


*/
