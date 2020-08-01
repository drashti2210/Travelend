import { Component, OnInit } from '@angular/core';
import { RegistrationService } from  'src/registration.service';
import { Router,ActivatedRoute } from "@angular/router"
@Component({
  selector: 'app-hotel-restoratnt',
  templateUrl: './hotel-restoratnt.component.html',
  styleUrls: ['./hotel-restoratnt.component.css']
})
export class HotelRestoratntComponent implements OnInit {
  pkgdata;
  regdata;
  constructor(private registerServ:RegistrationService,private router:Router ) { }
  i=0;
  ngOnInit() {
    if(localStorage.getItem("username"))
    {
      localStorage.setItem("islogin","yes")
    }
    this.registerServ.PakageDetail().subscribe((data) =>{this.pkgdata=data;console.log("dfghjkll")})
  }
  // getData(data):Promise<any>
  // {
  //   return this.registerServ.getdestbypkgname(data).toPromise()

  // }
 get_dest_pkgname(data)
 {
  // const check=await this.getData(data)
// alert(this.pkgdata)
this.router.navigate(['./available',data])
 }
  
}
