import { Component, OnInit } from '@angular/core';
import { Reservation } from '../models/reservation';
import { ReservationService } from '../reservation/reservation.service';
import { HomeComponent } from '../home/home.component';
import { Console } from 'console';



@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrl: './reservation-list.component.css'
})
export class ReservationListComponent implements OnInit {
 
 
 reservations : Reservation [] = [];

 
 constructor(private reservationService : ReservationService ){
  this.reservationService.getReservations().subscribe(reservations =>{
    this.reservations = reservations
  });

 }
 
  ngOnInit(): void {
 
  }

  deleteReservation(id: string){
    this.reservationService.deleteReservation(id).subscribe(() =>{
      console.log("Delete Request Got Processed.")
      
    });
  }

}
