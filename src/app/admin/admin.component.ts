import { Component, OnInit } from '@angular/core';
// import { Package } from '../models/package.js';
import { RegistrationService } from  'src/registration.service';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  private model:any;
  private result:any[]
  constructor(private registerServ: RegistrationService) { }
  Repdata;
  adata;
  Destdata;
  hoteldata;
  pkg1:any;
  delHotel(data)
  {
    alert("are you sure you want to delete this hotel");
    this.registerServ.deleteHotel((this.hoteldata[data].hotelid).toString())
  }

  delDestination(data)
  {
    alert("are you sure you want to delete this destination");
    this.registerServ.deleteDestination((this.Destdata[data].destid).toString())
  }

  delPkg(data)
  {
    alert("are you sure you want to delete this Package");
    this.registerServ.deletePkg((this.Repdata[data].pkgid).toString())
  }

  getPkg()
  {
    this.registerServ.PakageDetail().subscribe((data) =>{this.Repdata=data;console.log("dfghjkll")})
  }

  edit(data)
  {
    console.log("INside edit")
    console.log(data)
    localStorage.setItem("pkgid",data.pkgid)

  }

  editDestsination(data)
  {
    console.log("Inside editdest")
    console.log(data)
    localStorage.setItem("destid",data.destid)

  }
  
  ngOnInit() {
    console.log("onIint")
    this.registerServ.PakageDetail().subscribe((data) =>{this.Repdata=data;console.log("dfghjkl;l")})
    console.log("back")
    console.log("onIint")
    this.registerServ.DestDetail().subscribe((data) =>{this.Destdata=data;console.log("poiuyt")})
    console.log("back")
    this.registerServ.HotelDetail().subscribe((data) =>{this.hoteldata=data;console.log("poiuyt")}) 
  }
 
  getDest()
  {
    console.log("in getDest")
    this.registerServ.DestDetail().subscribe((data) =>{this.Destdata=data;console.log("poiuyt")})
    console.log("back") 
    //alert(this.Destdata)
  }

  getHotel()
  {
    console.log("in getDest")
    this.registerServ.HotelDetail().subscribe((data) =>{this.hoteldata=data;console.log("poiuyt")})
    console.log("back") 
  }

  packregister(data) {
  // alert(data)
    this.registerServ.packageRegister(data);
    alert("addedd suceessfully")

}
destregister(data) {
  
  this.registerServ.destRegister(data);
  alert("addedd suceessfully")
}

hotelregister(data) {
   
  this.registerServ.RegisterHotel(data);

}
pkgid;
updatepkg(data)
{
  
  this.pkgid=localStorage.getItem("pkgid")
  console.log(this.pkgid)
  
  console.log("update component")
  this.registerServ.UpdatePkg(data,this.pkgid);
   
}
destid;
updateDestination(data)
{
  
  this.destid=localStorage.getItem("destid")
  console.log(this.destid)
  console.log("update component")
  this.registerServ.UpdateDest(data,this.destid);
   
}
}
