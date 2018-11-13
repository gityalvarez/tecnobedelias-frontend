import { Component, ViewChild, OnInit } from '@angular/core';
import { CalendarComponent } from 'ng-fullcalendar';
import { Options } from 'fullcalendar';
import { EventService } from './event.service';
import { InscripcionService } from 'src/app/_services/inscripcion.service';
import { getRenderedText } from '@angular/core/src/render3';

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
                themeSystem: 'bootstrap3',
                locale: 'es',
                timeFormat: 'H(:mm)',
                displayEventTime: false,
                buttonText: {
                  prev: '<',
                  next: '>',
                  today: 'Hoy',
                  month: 'Mes',
                  week: 'Semana',
                  day: 'Día',
                  list: 'Lista'
                },
                buttonsIcons: {
                  prev: 'left-single-arrow',
                  next: 'right-single-arrow',
                },
                eventLimit: false,
                header: {
                  left: 'prev,next today',
                  center: 'title',
                  right: 'month,agendaWeek,agendaDay,listMonth'
                },
                editable: false,
                events: data,
                eventColor: '#690',
                eventTextColor: 'white',
                dayClick: () => {
                  alert('a day has been clicked!');
                },
                /* eventRender: function (event, element) {
                  const dStart = event.title;
                  element.popover({
                    animation: true,
                    placement: 'top',
                    html: true,
                    container: 'body',
                    title: dStart,
                    trigger: 'click',
                    content: function () {
                      setTimeout(function () {
                        element.popover('hide');
                      }, 2000);
                      return $('#popover-content').html();
                    }
                  });
                }, */
                /* eventRender: function (event, element) {
                  element.popover({
                  title: 'My Title',
                  placement: 'bottom',
                  html: true,
                  animation:false,
                  content: event.msg,
                  trigger: 'manual'
                      }).on('mouseenter', function () {
                          const _this = this;
                          $(this).popover('show');
                          $('.popover').on('mouseleave', function () {
                              $(_this).popover('hide');
                          });
                      }).on('mouseleave', function () {
                          const _this = this;
                          setTimeout(function () {
                              if (!$('.popover:hover').length) {
                                  $(_this).popover('hide');
                              }
                          }, 300);
                      });
                    }
                    */
                /* eventMouseover: function(calEvent, jsEvent) {
                  const tooltip = '<div class='tooltipevent'style='width:100px;height:100px;
                  background:#ccc;position:absolute;z-index:10001;'>' + calEvent.title + '</div>';
                  $('body').append(tooltip);
                  $(this).mouseover(function(e) {
                      $(this).css('z-index', 10000);
                      $('.tooltipevent').fadeIn('500');
                      $('.tooltipevent').fadeTo(10, 1.9);
                  }).mousemove(function(e) {
                      $('.tooltipevent').css('top', e.pageY + 10);
                      $('.tooltipevent').css('left', e.pageX + 20);
                  });
                }, */
                /* eventRender: function(event, element) {
                  element.popover({
                    content: event.title,
                    container: 'body'
                  });
                } */
                /* eventRender: (eventObj, $el) => {
                  $el.tooltip({
                  // $el.popover({
                    title: eventObj.title,
                    content: eventObj.description,
                    trigger: 'hover',
                    placement: 'top',
                    container: 'body'
                  });
                }, */
                eventRender: function (event, element) {
                  element.tooltip({ title: event.title });
                },
              };
              // this.ucCalendar.fullCalendar('rerenderEvents');
            });
          }
        );
      }
    );
    //setTimeout(() => { this.ucCalendar.fullCalendar('changeView', 'week'); }, 1000);
  }
  onChange() {
    // setTimeout(() => { this.ucCalendar.fullCalendar('changeView', 'week'); }, 1000);
    // setTimeout(() => { this.ucCalendar.fullCalendar('render'); }, 1000);
    // this.ucCalendar.fullCalendar('render');
  }
  clickButton(model: any) {
    this.displayEvent = model;
  }
  eventMouseover = (event) => {
    event.popover({
      title: event.name,
      placement: 'right',
      trigger: 'manual',
      content: 'foo',
      container: '#calendar'
    }).popover('toggle');
  }
  eventClick(model: any) {
    model = {
      event: {
        id: model.event.id,
        start: model.event.start,
        end: model.event.end,
        title: model.event.title,
        allDay: model.event.allDay,
        type: model.event.type,
      },
      duration: {}
    };
    this.displayEvent = model;
  }
  eventMouseOver(model, event) {
    model = {
      event: {
        id: model.event.id,
        start: model.event.start,
        end: model.event.end,
        title: model.event.title,
        allDay: model.event.allDay,
        type: model.event.type,
      },
      duration: {}
    };
    this.displayEvent = model;
    event.tooltip({
      title: event.name,
      placement: 'right',
      trigger: 'manual',
      content: 'foo',
      container: '#calendar'
    }).popover('toggle');
  }
  updateEvent(model: any) {
    model = {
      event: {
        id: model.event.id,
        start: model.event.start,
        end: model.event.end,
        title: model.event.title,
        allDay: model.event.allDay,
        type: model.event.type,
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
