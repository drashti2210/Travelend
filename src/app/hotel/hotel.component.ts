import { Component, OnInit } from '@angular/core';
import { RegistrationService } from  'src/registration.service';
import { Router,ActivatedRoute } from "@angular/router"
@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.css']
})
export class HotelComponent implements OnInit {
hoteldata;
hotel;
  constructor(private registerServ:RegistrationService,private _route:ActivatedRoute,private router:Router) { }

  ngOnInit() {
    console
    var elem=JSON.parse(this._route.snapshot.paramMap.get('hotelde'));
    this.hotel=elem;

    this.registerServ.HotelDetail().subscribe((data) =>{this.hoteldata=data;console.log("poiuyt")})
   
  }
  book_hotel(data)
  {
    // alert(data)
    this.registerServ.bookhotel(data);
    alert("Your ticket will be sent via mail")
  }
 

 get_hotel_by_dest(data)
{

  //alert(data.destination)
   this.registerServ.gethotelbydest((data.destination)).subscribe((data)=>{this.hotel=data});
   
  
  // if(this.hotel.lenght!=0){
  // this.router.navigate(['/hotel',{hotelde:JSON.stringify(this.hotel)}]);
  // }
}

}
