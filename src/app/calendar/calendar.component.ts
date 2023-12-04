import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
  OnInit,
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
} from 'date-fns';
import { Subject } from 'rxjs';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
import { MatDialog } from '@angular/material/dialog';
import { EventColor } from 'calendar-utils';
import { AddAppointmentsComponent } from '../add-appointments/add-appointments.component';
import { ProgressbarComponent } from '../progressbar/progressbar.component';
import { UserService } from 'src/config/_services/user.service';
import { ActivatedRoute } from '@angular/router';

const colors: Record<string, EventColor> = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit{
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any> | undefined;

  view: CalendarView = CalendarView.Month;
  userData:any = localStorage.getItem('user')
  user = JSON.parse(this.userData)
  CalendarView = CalendarView;
  hourSegments = 1;
  hourSegmentHeight = 60;
  dayStartHour = 8;
  dayEndHour = 17;

  viewDate: Date = new Date();
  tomorrow = new Date();
  
  modalData: {
    action: string;
    event: CalendarEvent;
  } | undefined;

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];

  refresh = new Subject<void>();

  event:any = {
    start: startOfDay(new Date(2023, 10, 15, 15, 10)),
      title: 'An event with no end date',
      color: { ...colors['yellow'] },
      actions: this.actions,
  }

  events: CalendarEvent[] = [

  ];

  activeDayIsOpen: boolean = true;
  carData:any;
  allOrders: any = [];

  constructor(public dialog: MatDialog, private userService: UserService, private route: ActivatedRoute) {}

  ngOnInit(): void {
      let carId = this.route.snapshot.queryParamMap.get('id')
      let day = this.route.snapshot.queryParamMap.get('day')
      if(day){
        this.view = CalendarView.Day
        this.viewDate = new Date(day)
      }
      this.userService.getCarById(carId).subscribe((data:any) => {
        this.carData = data
      })
      this.userService.getCarOrders(carId).subscribe((data:any) => {
        this.allOrders = data.cardata
        let newEvent = {
          start: new Date,
          title: '',
          color: { ...colors['yellow'] },
          actions: this.actions,
          draggable: true,
          data: {}
        }
        this.allOrders.map((m:any) => {
          newEvent.start = new Date(m.start)
          newEvent.data = m
          if(m.userId == this.user.user._id){
            newEvent.title = m.name
          }
          else{
            newEvent.title = 'Booked'
            newEvent.color= { ...colors['red'] }
            newEvent.draggable = false
          }
          this.events = [...this.events, newEvent]
          newEvent = {
            start: new Date,
            title: '',
            color: { ...colors['yellow'] },
            actions: this.actions,
            draggable: true,
            data: {}
          }
          console.log(this.events, "mahi");
        })
      })
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {

    if(new Date(date).getDay() == 0){
      console.log("sunday..");
      
      return
    }

    this.view = CalendarView.Day
    this.viewDate = date
  }

  hourClicked(date: Date): void {
    // Do something when an hour is clicked
    if(new Date(date).getDay() == 0){
      return
    }
    let newEvent = {
      start: new Date(date),
      title: '',
      color: { ...colors['yellow'] },
      actions: this.actions,
      draggable: true,
      data: {}
    }
    // this.events.push(newEvent)
    const dialogRef = this.dialog.open(AddAppointmentsComponent, {
      height: '400px',
      width: '1000px',
      } );
      dialogRef.afterClosed().subscribe((val:any) =>{
        val["carId"] = this.carData._id
        val["carname"] = this.carData.manufacturer +' '+ this.carData.model

        
        val["userId"] = this.user.user._id
        val['start'] = newEvent.start
        newEvent.title = val.name
        newEvent.data = val
        this.userService.addOrder(val).subscribe((data:any) =>{
          console.log(data,"addOrder");
          newEvent.data = data.order
        this.events = [...this.events, newEvent]
        })
      })
  }


  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    // this.modal.open(this.modalContent, { size: 'lg' });
  }

  addEvent(): void {
    this.events = [
      ...this.events,
      {
        title: 'New event',
        start: startOfDay(new Date(2023, 11, 15, 10, 0)),
        end: endOfDay(new Date()),
        color: colors['red'],
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      },
    ];
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  eventTimesChanged({ event, newStart, newEnd }: CalendarEventTimesChangedEvent): void {
    // Handle event time changes if needed
    if(new Date(newStart).getDay() == 0){
      return
    }
    const dialogRef = this.dialog.open(ProgressbarComponent, {
      height: '150px',
      width: '400px',
      } );
      console.log(this.events, "mahi 111")
      let dummyevent:any = {...event}
      let i = this.events.findIndex((f:any) => f.data._id == dummyevent?.data._id)
      this.events[i].start = new Date(newStart)
      let dataorder:any= {...this.events[i]}
      dataorder.data.start = new Date(newStart)
      this.userService.updateOrder(dataorder.data).subscribe((data:any) => {
        this.events = [...this.events]
        setTimeout(() => {
          this.userService.progressBar.emit('done')
        }, 1000);
      })
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
}
