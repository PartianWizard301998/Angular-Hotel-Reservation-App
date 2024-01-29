import { Component, OnInit } from '@angular/core';  
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { ReservationService } from '../reservation/reservation.service';
import { Reservation } from '../models/reservation';
import { Router, ActivatedRoute } from '@angular/router';
import { HomeComponent } from '../home/home.component';


@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrl: './reservation-form.component.css'
})
export class ReservationFormComponent implements OnInit {


  reservationForm : FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    private reservationService : ReservationService,
    private router : Router,
    private activatedRoute : ActivatedRoute){

  }
  ngOnInit(): void {
   this.reservationForm = this.formBuilder.group({
    checkInDate : ['', Validators.required],
    checkOutDate : ['', Validators.required],
    guestName : ['',Validators.required],
    guestEmail : ['',[ Validators.required, Validators.email]],
    roomNumber : ['',Validators.required]
   })

   let id = this.activatedRoute.snapshot.paramMap.get('id')

   if(id){
    this.reservationService.getReservation(id).subscribe(reservation =>{

      if (reservation) 
      this.reservationForm.patchValue(reservation)
    })
   
    }
   }


  

  onSubmit() {

    if(this.reservationForm.valid){

      let reservation : Reservation = this.reservationForm.value;

      let id = this.activatedRoute.snapshot.paramMap.get('id')

   if(id){
      //if the ID is already available => Update Reservation

      this.reservationService.updateReservations(id, reservation).subscribe(() =>{
        console.log("Update Request Processed.");
        
      })

   }else{
    // If the ID is not there then Create the new Reservation.
    this.reservationService.addReservation(reservation).subscribe(() =>{
      console.log("Create Request Processed.");
      
    })
   }

      this.router.navigate(['/list'])
    }
    
    }
}
