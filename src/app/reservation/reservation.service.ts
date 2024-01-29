import { Injectable } from '@angular/core';
import { Reservation } from '../models/reservation';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ReservationService {

    private apiURL = "http://localhost:3000"
    private reservations : Reservation [] = [];

    constructor(private http: HttpClient){}

  //  constructor(){
  //   let savedReservations = localStorage.getItem("reservations");
  //   this.reservations = savedReservations ? JSON.parse (savedReservations) : [];
  //  }


   //CRUD OPERATIONS

   getReservations() : Observable<Reservation []> {
    return this.http.get<Reservation[]>(this.apiURL +"/reservations");
   }


   getReservation(id : string) : Observable<Reservation[]>{
    return this.http.get<Reservation[]>(this.apiURL +"/reservation/" +id);
   }


   addReservation(reservation : Reservation) : Observable<void> {
    return this.http.post<void>(this.apiURL +"/reservation", reservation);
   }


   deleteReservation(id: string) : Observable<void> {
   return this.http.delete<void>(this.apiURL + "/reservation/" + id);
   }


   updateReservations(id: string, updatedReservation : Reservation) : Observable<void> {
    return this.http.put<void>(this.apiURL +"/reservation/" +id, updatedReservation);
   }
}
