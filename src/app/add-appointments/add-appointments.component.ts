import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-appointments',
  templateUrl: './add-appointments.component.html',
  styleUrls: ['./add-appointments.component.scss']
})
export class AddAppointmentsComponent implements OnInit {
  isloadinSpnnier: boolean = false;
  constructor(public dialogRef: MatDialogRef<AddAppointmentsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,){}
    details:any;
    ngOnInit(): void {
      this.details = new FormGroup({
        name: new FormControl(this.data?.name ? this.data.name : '', [Validators.required]),
        email: new FormControl(this.data?.email ? this.data.email : '', [Validators.required]),
        phoneNumber: new FormControl(this.data?.phoneNumber ? this.data.phoneNumber : '', [Validators.required]),
        address: new FormControl(this.data?.address ? this.data.address : '', [Validators.required]),
        zipCode: new FormControl(this.data?.zipCode ? this.data.zipCode : '', [Validators.required]),
        state: new FormControl(this.data?.state ? this.data.state : '', [Validators.required]),
        creditScore: new FormControl(this.data?.creditScore ? this.data.creditScore : '', [Validators.required])
      });
    }

    geteditData() {
      const controls = this.details.controls;
  
      let data = {
        "name": controls['name'].value,
        "email": controls['email'].value,
        "phoneNumber": controls['phoneNumber'].value,
        "address": (controls['address'].value),
        "zipCode": (controls['zipCode'].value),
        "state": controls['state'].value,
        "creditScore": controls['creditScore'].value
      }
      return data
    }
  

    onCancle(){

    }

    onSubmit(){
      this.isloadinSpnnier = true

      setTimeout(() => {
      this.dialogRef.close(this.geteditData())
      this.isloadinSpnnier = false

      }, 1000)
    }

    handleFileInputChange(e:any){

    }
}
