import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'src/config/_services/user.service';

@Component({
  selector: 'app-progressbar',
  templateUrl: './progressbar.component.html',
  styleUrls: ['./progressbar.component.scss']
})
export class ProgressbarComponent implements OnInit{
  constructor(private userService: UserService,
    public dialogRef: MatDialogRef<ProgressbarComponent>){

  }

  ngOnInit(): void {
    this.userService.progressBar.subscribe((val:any) =>{
    this.dialogRef.close()
    })
  }
}
