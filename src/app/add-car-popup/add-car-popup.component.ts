import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from 'src/config/_services/user.service';

@Component({
  selector: 'app-add-car-popup',
  templateUrl: './add-car-popup.component.html',
  styleUrls: ['./add-car-popup.component.scss']
})
export class AddCarPopupComponent implements OnInit {
  carDetails: any
  files: any
  isloadinSpnnier = false
  constructor(
    public dialogRef: MatDialogRef<AddCarPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService
  ) { }
  ngOnInit(): void {
    this.carDetails = new FormGroup({
      manufacturer: new FormControl(this.data?.manufacturer ? this.data.manufacturer : '', [Validators.required]),
      model: new FormControl(this.data?.model ? this.data.model : '', [Validators.required]),
      vehicleType: new FormControl(this.data?.vehicleType ? this.data.vehicleType : '', [Validators.required]),
      priceInThousands: new FormControl(this.data?.priceInThousands ? this.data.priceInThousands : '', [Validators.required]),
      engineSize: new FormControl(this.data?.engineSize ? this.data.engineSize : '', [Validators.required]),
      horsepower: new FormControl(this.data?.horsepower ? this.data.horsepower : '', [Validators.required]),
      width: new FormControl(this.data?.width ? this.data.width : '', [Validators.required]),
      length: new FormControl(this.data?.length ? this.data.length : '', [Validators.required]),
      curbWeight: new FormControl(this.data?.curbWeight ? this.data.curbWeight : '', [Validators.required]),
      fuelCapacity: new FormControl(this.data?.fuelCapacity ? this.data.fuelCapacity : '', [Validators.required]),
      fuelEfficiency: new FormControl(this.data?.fuelEfficiency ? this.data.fuelEfficiency : '', [Validators.required]),
      latestLaunch: new FormControl(this.data?.latestLaunch ? this.data.latestLaunch : '', [Validators.required]),
    });
  }

  geteditData() {
    const controls = this.carDetails.controls;

    let data = {
      "manufacturer": controls['manufacturer'].value,
      "model": controls['model'].value,
      "vehicleType": controls['vehicleType'].value,
      "priceInThousands": (controls['priceInThousands'].value),
      "engineSize": (controls['engineSize'].value),
      "horsepower": controls['horsepower'].value,
      "width": controls['width'].value,
      "length": controls['length'].value,
      "curbWeight": controls['curbWeight'].value,
      "fuelCapacity": controls['fuelCapacity'].value,
      "fuelEfficiency": controls['fuelEfficiency'].value,
      "latestLaunch": controls['latestLaunch'].value,
      "_id": this.data._id
    }
    return data
  }




  onSubmit = () => {
    const controls = this.carDetails.controls;
    let formData = new FormData()
    formData.append("manufacturer", controls['manufacturer'].value)
    formData.append("model", controls['model'].value)
    formData.append("vehicleType", controls['vehicleType'].value)
    formData.append("priceInThousands", (controls['priceInThousands'].value))
    formData.append("engineSize", (controls['engineSize'].value))
    formData.append("horsepower", controls['horsepower'].value)
    formData.append("width", controls['width'].value)
    formData.append("length", controls['length'].value)
    formData.append("curbWeight", controls['curbWeight'].value)
    formData.append("fuelCapacity", controls['fuelCapacity'].value)
    formData.append("fuelEfficiency", controls['fuelEfficiency'].value)
    formData.append("latestLaunch", controls['latestLaunch'].value)
    this.isloadinSpnnier = true
    if (!this.data.edit) {
      formData.append("Image", this.files)
      setTimeout(() => {
        this.userService.addCar(formData).subscribe((res: any) => {
          console.log(res);
          this.dialogRef.close();
          this.userService.updatecars.emit("added")
          this.isloadinSpnnier = false
        })
      }, 1000);
    }
    else {
      this.userService.updateCar(this.geteditData()).subscribe((res: any) => {
        console.log(res);
        this.dialogRef.close();
        this.userService.updatecars.emit("updated")
        this.isloadinSpnnier = false
      })
    }
  }

  onCancle() {
    this.dialogRef.close();
  }

  handleFileInputChange = (event: any) => {
    this.files = event.target.files[0]
  }

}
