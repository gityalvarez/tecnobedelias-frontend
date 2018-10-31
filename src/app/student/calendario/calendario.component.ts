import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarComponent } from 'ng-fullcalendar';
import { Options } from 'fullcalendar';
import { EventService } from './event.service';
import { InscripcionService } from 'src/app/_services/inscripcion.service';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent implements OnInit {
  calendarOptions: Options;
  displayEvent: any;
  @ViewChild(CalendarComponent) ucCalendar: CalendarComponent;
  constructor(protected eventService: EventService, private inscripcionService: InscripcionService) { }

  ngOnInit() {
    this.inscripcionService.consultaCursos().subscribe(
      (cursos) => {
        this.inscripcionService.consultaExamen().subscribe(
          (examenes) => {
            this.eventService.getEvents(cursos, examenes).subscribe(data => {
              this.calendarOptions = {
                // defaultView: 'week',
                // lang: 'es',
                locale: 'es',
                buttonText: {
                  today: 'Hoy',
                  month: 'Mes',
                  week: 'Semana',
                  day: 'Día',
                  list: 'Lista'
                },
                editable: true,
                eventLimit: false,
                header: {
                  left: 'prev,next today',
                  center: 'title',
                  right: 'month,agendaWeek,agendaDay,listMonth'
                },
                events: data
              };
            });
          }
        );
      }
    );
    this.ucCalendar.fullCalendar('render');
  }
  onRender() {
    this.ucCalendar.fullCalendar('render');
  }
  onShow() {
    setTimeout(() => { this.ucCalendar.fullCalendar('changeView', 'week'); }, 1000);
    setTimeout(() => { this.ucCalendar.fullCalendar('render'); }, 1000);
    this.ucCalendar.fullCalendar('render');
  }

  clickButton(model: any) {
    this.displayEvent = model;
  }
  eventClick(model: any) {
    model = {
      event: {
        id: model.event.id,
        start: model.event.start,
        end: model.event.end,
        title: model.event.title,
        allDay: model.event.allDay
        // other params
      },
      duration: {}
    };
    this.displayEvent = model;
  }
  updateEvent(model: any) {
    model = {
      event: {
        id: model.event.id,
        start: model.event.start,
        end: model.event.end,
        title: model.event.title
        // other params
      },
      duration: {
        _data: model.duration._data
      }
    };
    this.displayEvent = model;
  }
}



/*this.calendarOptions = {
        editable: true,
        eventLimit: false,
        header: {
          left: 'prev,next today',
          center: 'title',
          right: 'month,agendaWeek,agendaDay,listMonth'
        },
        selectable: true,
        events: []
      };

      this.inscripcionService.consultaCursos().subscribe(
        (cursos)=>{
          this.inscripcionService.consultaExamen().subscribe(
            (examenes)=>{
              this.eventService.getEvents(cursos,examenes).subscribe(data => {
                this.events = data;
              });
            }
          )
        }
      )

  }

  loadEvents() {
    this.inscripcionService.consultaCursos().subscribe(
      (cursos)=>{
        this.inscripcionService.consultaExamen().subscribe(
          (examenes)=>{
            this.eventService.getEvents(cursos,examenes).subscribe(data => {
              this.events = data;
            });
          }
        )
      }
    )
  }

  */
