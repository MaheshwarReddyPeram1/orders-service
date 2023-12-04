import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddCarPopupComponent } from '../add-car-popup/add-car-popup.component';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit{
  dialogRef: MatDialogRef<AddCarPopupComponent> | undefined
  userData:any = localStorage.getItem('user')
  user = JSON.parse(this.userData)
  data = {
    "manufacturer": "Aston Martin",
        "model": "Rapide EASTON MARTIN",
        "vehicleType": "Passenger",
        "priceInThousands": '',
        "engineSize": 5.7,
        "horsepower": 545,
        "width": 73.6,
        "length": 179.7,
        "curbWeight": 3.21,
        "fuelCapacity": 19.1,
        "fuelEfficiency": 25,
        "latestLaunch": "2024-05-12T04:00:00.000Z",
  }
  constructor(public dialog: MatDialog) {
  }
  ngOnInit(){
    console.log(this.user);
    
  }
  addCar() {
    const dialogRef = this.dialog.open(AddCarPopupComponent, {
      height: '500px',
      width: '1000px',
      data:this.data
    }, );
  }
}
