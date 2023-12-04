import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

//Angular material
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import {MatCardModule} from '@angular/material/card';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
//Components
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { SignupComponent } from './signup/signup.component';
import { CarFiltersPageComponent } from './car-filters-page/car-filters-page.component';
import { NavComponent } from './nav/nav.component';
import { AddCarPopupComponent } from './add-car-popup/add-car-popup.component';
import { CalendarComponent } from './calendar/calendar.component';
// import { FlatpickrModule } from 'angularx-flatpickr';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { AddAppointmentsComponent } from './add-appointments/add-appointments.component';
import { ProgressbarComponent } from './progressbar/progressbar.component';
import { AppointmentsComponent } from './appointments/appointments.component';
// import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ProductsComponent,
    SignupComponent,
    CarFiltersPageComponent,
    NavComponent,
    AddCarPopupComponent,
    CalendarComponent,
    AddAppointmentsComponent,
    ProgressbarComponent,
    AppointmentsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatCardModule,
    MatSidenavModule,
    MatIconModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    
  ],
  providers: [provideAnimations(), AddCarPopupComponent],
  bootstrap: [AppComponent],
  entryComponents: [
    AddCarPopupComponent,
    ],
})
export class AppModule { }
