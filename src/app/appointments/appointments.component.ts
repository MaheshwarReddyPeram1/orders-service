import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/config/_services/user.service';
import { concatMap, toArray } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss']
})
export class AppointmentsComponent implements OnInit {
  appointmentData:any = []
  userData:any = localStorage.getItem('user')
  user = JSON.parse(this.userData)
  constructor(
    private userService: UserService,
    private router: Router,

  ){}

  ngOnInit(): void {
      this.userService.getOrderByUser(this.user.user._id).subscribe((adata:any) => {
        let ids:any=[]
        adata.cardata.forEach((e:any) => {
          if(ids.findIndex((mm:any) => mm==e.carId) == -1){
            ids.push(e.carId)
          }
        });
        this.userService.getcarsByIds(ids).subscribe((carsdata:any)=>{
          let i = 
          adata.cardata.forEach((e:any) => {
            let indx = carsdata.cardata.findIndex( (f:any) => f._id == e.carId)
            let finalData ={
              appointment: e,
              car: carsdata.cardata[indx]
            }
            this.appointmentData.push(finalData)
          });
          console.log("hello mahi", this.appointmentData);
        })
      })
  }

  cancelAppontment(appointment:any, car:any){
    let finaldata = {...appointment}
    finaldata['carname'] = car.manufacturer + ' ' + car.model
    this.userService.cancelAppontment(finaldata).subscribe((data:any)=>{
      this.appointmentData = [...this.appointmentData.filter((f:any) => f.appointment._id != finaldata._id)]
    })
  }

  changeDate(data:any){
    this.router.navigateByUrl(`calendar?id=${data.appointment.carId}&day=${data.appointment.start}`);
  }

}
