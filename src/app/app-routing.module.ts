import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { CarFiltersPageComponent } from './car-filters-page/car-filters-page.component';
import { CalendarComponent } from './calendar/calendar.component';
import { AppointmentsComponent } from './appointments/appointments.component';

const routes: Routes = [
  {path:'', component:LoginComponent},
  {path:'signup', component:SignupComponent},
  {path:'home', component:HomeComponent},
  {path:'carsale', component:CarFiltersPageComponent},
  {path:'calendar', component:CalendarComponent},
  {path:'appointment', component:AppointmentsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
