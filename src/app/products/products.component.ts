import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserService } from '../../config/_services/user.service';
import { AddCarPopupComponent } from '../add-car-popup/add-car-popup.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products: any = []

  constructor(private userService: UserService,
    public dialog: MatDialog,
    private router: Router,
    
    ) { }

  ngOnInit() {
    this.getallProducts()
    this.userService.updatecars.subscribe((v)=>{
      this.getallProducts()
    })
  }

  getallProducts(){
    this.userService.getallProducts().subscribe((data: any) => {
      this.products = data
      console.log(this.products);
    })
    
  }

  

  editCar(car:any){
    car.edit = true
    const dialogRef = this.dialog.open(AddCarPopupComponent, {
      height: '500px',
      width: '1000px',
      data:car} );
  }


  removeCar(car:any){
    this.userService.removeCar({_id: car._id}).subscribe((res:any) =>{
      console.log(res)
      if(res.status == 200){

        this.products = this.products.filter((res:any) => res._id != car._id)
        console.log(res)
      }
      
    })
  }


  bookAppointment(car:any){
    this.router.navigateByUrl(`calendar?id=${car._id}`);
  }


}
