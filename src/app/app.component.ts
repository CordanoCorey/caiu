import {
  Component,
  ViewEncapsulation,
  HostListener,
  ViewChild,
  OnInit
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  Control,
  FileUpload,
  DateHelper,
  build,
  Address,
  Image,
  Time,
  TimerComponent,
  LookupValue,
  Calendar,
  CalendarEvent,
  CalendarDay,
  CalendarTime,
  SchedulerComponent,
  SmartComponent,
  TableColumn,
  ConfigActions
} from 'library';

import { ExampleForm, environment } from './shared/models';
import { Store } from '@ngrx/store';

@Component({
  selector: 'docs-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent extends SmartComponent implements OnInit {
  @Control(ExampleForm) form: FormGroup;
  @ViewChild(SchedulerComponent) schedulerCmpt: SchedulerComponent;
  @ViewChild(TimerComponent) timer: TimerComponent;
  activeDemo = 'audit';
  addresses = [
    build(Address, {
      id: 1,
      firstName: 'Corey',
      lastName: 'Gelbaugh',
      address1: '827 Wellington Dr.',
      city: 'Carlisle',
      stateCode: 'PA',
      zip: '17013'
    }),
    build(Address, {
      id: 2,
      firstName: 'Julie',
      lastName: 'Gelbaugh',
      address1: '827 Wellington Dr.',
      city: 'Carlisle',
      stateCode: 'PA',
      zip: '17013',
      isPrimaryAddress: true
    }),
    build(Address, {
      id: 3,
      firstName: 'Jovie',
      lastName: 'Gelbaugh',
      address1: '827 Wellington Dr.',
      city: 'Carlisle',
      stateCode: 'PA',
      zip: '17013'
    }),
    build(Address, {
      id: 4,
      firstName: 'Gigi',
      lastName: 'Eschenmann',
      address1: '623 Sherwood Dr.',
      city: 'Carlisle',
      stateCode: 'PA',
      zip: '17013'
    }),
    build(Address, {
      id: 5,
      firstName: 'Pap',
      lastName: 'Gelbaugh',
      address1: '827 Shannon Ln.',
      city: 'Carlisle',
      stateCode: 'PA',
      zip: '17013'
    })
  ];
  auditHistoryColumns = [
    build(TableColumn, { name: 'name', label: 'Name' }),
    build(TableColumn, { name: 'position', label: 'Position' }),
    build(TableColumn, { name: 'weight', label: 'Weight' }),
    build(TableColumn, { name: 'symbol', label: 'Symbol' })
  ];
  auditHistoryData = [
    {
      startDate: new Date(),
      endDate: new Date(),
      position: 1,
      name: 'Hydrogen',
      weight: 1.0079,
      symbol: 'H'
    },
    {
      startDate: new Date(),
      endDate: new Date(),
      position: 2,
      name: 'Helium',
      weight: 4.0026,
      symbol: 'He'
    },
    {
      startDate: new Date(),
      endDate: new Date(),
      position: 3,
      name: 'Lithium',
      weight: 6.941,
      symbol: 'Li'
    },
    {
      startDate: new Date(),
      endDate: new Date(),
      position: 4,
      name: 'Beryllium',
      weight: 9.0122,
      symbol: 'Be'
    },
    {
      startDate: new Date(),
      endDate: new Date(),
      position: 5,
      name: 'Boron',
      weight: 10.811,
      symbol: 'B'
    },
    {
      startDate: new Date(),
      endDate: new Date(),
      position: 6,
      name: 'Carbon',
      weight: 12.0107,
      symbol: 'C'
    },
    {
      startDate: new Date(),
      endDate: new Date(),
      position: 7,
      name: 'Nitrogen',
      weight: 14.0067,
      symbol: 'N'
    },
    {
      startDate: new Date(),
      endDate: new Date(),
      position: 8,
      name: 'Oxygen',
      weight: 15.9994,
      symbol: 'O'
    },
    {
      startDate: new Date(),
      endDate: new Date(),
      position: 9,
      name: 'Fluorine',
      weight: 18.9984,
      symbol: 'F'
    },
    {
      startDate: new Date(),
      endDate: new Date(),
      position: 10,
      name: 'Neon',
      weight: 20.1797,
      symbol: 'Ne'
    }
  ];
  calendars = [
    build(Calendar, {
      calendarId: 0,
      calendarName: 'Master Calendar',
      isMaster: true,
      isAllDayDefault: false,
      isAllDayEnforced: false
    }),
    build(Calendar, {
      calendarId: 1,
      calendarName: 'All Day Enforced',
      isMaster: false,
      isAllDayDefault: true,
      isAllDayEnforced: true
    }),
    build(Calendar, {
      calendarId: 2,
      calendarName: 'All Day Default',
      isMaster: false,
      isAllDayDefault: true,
      isAllDayEnforced: false,
      days: [
        build(CalendarDay, {
          date: new Date(),
          instructionalDayNumber: 1
        })
      ]
    })
  ];
  calendarEvents = [
    build(CalendarEvent, {
      allDay: false,
      description: 'In Session Description',
      eventId: 1,
      eventName: 'In Session',
      eventTypeId: 2,
      calendarId: 2,
      monthOf: new Date(new Date()).getMonth(),
      dayOf: new Date(new Date()).getDate(),
      yearOf: new Date(new Date()).getFullYear(),
      startTime: build(CalendarTime, {
        hour: '1',
        minute: '0',
        timePeriod: 'PM'
      }),
      endTime: build(CalendarTime, {
        hour: '1',
        minute: '30',
        timePeriod: 'PM'
      })
    }),
    build(CalendarEvent, {
      allDay: false,
      description: 'Graduation Ceremony Description',
      eventId: 2,
      eventName: 'Graduation Ceremony',
      eventTypeId: 1,
      calendarId: 2,
      monthOf: new Date(new Date()).getMonth(),
      dayOf: new Date(new Date()).getDate(),
      yearOf: new Date(new Date()).getFullYear(),
      startTime: build(CalendarTime, {
        hour: '2',
        minute: '0',
        timePeriod: 'PM'
      }),
      endTime: build(CalendarTime, {
        hour: '2',
        minute: '30',
        timePeriod: 'PM'
      })
    })
  ];
  countdownFrom = build(Time, {
    minutes: 0,
    seconds: 10
  });
  eventTypes: LookupValue[] = [
    build(LookupValue, { id: 1, name: 'Event Type 1' }),
    build(LookupValue, { id: 2, name: 'Event Type 2' }),
    build(LookupValue, { id: 3, name: 'Event Type 3' })
  ];
  images = [
    build(Image, { src: 'assets/1.jpg', height: 2160, width: 3840 }),
    build(Image, { src: 'assets/2.jpg', height: 177, width: 284 }),
    build(Image, { src: 'assets/3.jpg', height: 1080, width: 1920 }),
    build(Image, { src: 'assets/4.jpg', height: 2160, width: 3840 }),
    build(Image, { src: 'assets/5.jpg', height: 2160, width: 3840 }),
    build(Image, { src: 'assets/6.jpg', height: 2370, width: 3840 }),
    build(Image, { src: 'assets/7.jpg', height: 550, width: 825 }),
    build(Image, { src: 'assets/8.jpg', height: 2160, width: 3840 }),
    build(Image, { src: 'assets/9.jpg', height: 1728, width: 3072 }),
    build(Image, { src: 'assets/10.jpg', height: 768, width: 1366 }),
    build(Image, { src: 'assets/11.jpg', height: 1200, width: 1920 }),
    build(Image, { src: 'assets/12.jpg', height: 1200, width: 1920 }),
    build(Image, { src: 'assets/13.jpg', height: 1200, width: 1920 }),
    build(Image, { src: 'assets/14.jpg', height: 1050, width: 1400 }),
    build(Image, { src: 'assets/15.jpg', height: 1920, width: 2560 }),
    build(Image, { src: 'assets/16.jpg', height: 1200, width: 1920 }),
    build(Image, { src: 'assets/17.jpg', height: 1200, width: 1920 }),
    build(Image, { src: 'assets/18.jpg', height: 900, width: 1440 }),
    build(Image, { src: 'assets/19.jpg', height: 276, width: 183 }),
    build(Image, { src: 'assets/20.jpg', height: 800, width: 5469 })
  ];
  timeAgoTest = DateHelper.TimeAgo(new Date('7/8/2018'));

  constructor(public store: Store<any>) {
    super(store);
  }

  get windowHeight(): number {
    return parseInt(localStorage.getItem('WINDOW_HEIGHT'), 10) - 64;
  }

  set windowHeight(value: number) {
    localStorage.setItem('WINDOW_HEIGHT', value.toString());
  }

  get windowWidth(): number {
    return parseInt(localStorage.getItem('WINDOW_WIDTH'), 10) - 120;
  }

  set windowWidth(value: number) {
    localStorage.setItem('WINDOW_WIDTH', value.toString());
  }

  ngOnInit() {
    this.store.dispatch(ConfigActions.initialize(environment));
  }

  exportCalendarToPDF() {
    this.schedulerCmpt.exportToPDF();
  }

  onChangeCalendarId(id: number) {
    console.log(id);
  }

  onClick(e: any) {
    console.log('click');
    console.dir(e);
  }

  onTimesUp() {
    this.timer.startAt(this.countdownFrom);
  }

  onUpload(e: FileUpload[]) {
    console.dir(e);
  }

  @HostListener('window:load', ['$event'])
  onLoad(e: any) {
    this.windowHeight =
      e && e.currentTarget && e.currentTarget.innerHeight
        ? e.currentTarget.innerHeight
        : 0;
    this.windowWidth =
      e && e.currentTarget && e.currentTarget.innerWidth
        ? e.currentTarget.innerWidth
        : 0;
    // console.log('\n\nwindow:load', this.windowWidth, this.windowHeight);
  }

  @HostListener('window:resize', ['$event'])
  onResize(e: any) {
    this.windowHeight =
      e && e.currentTarget && e.currentTarget.innerHeight
        ? e.currentTarget.innerHeight
        : 0;
    this.windowWidth =
      e && e.currentTarget && e.currentTarget.innerWidth
        ? e.currentTarget.innerWidth
        : 0;
    // console.log('\n\nwindow:resize', this.windowWidth, this.windowHeight);
  }

  schedulerTest(value: any) {
    console.dir(value);
  }

  printCalendar() {
    console.log(this.schedulerCmpt.html);
    this.print(this.schedulerCmpt.html);
  }
}
