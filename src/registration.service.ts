import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { Router,ActivatedRoute } from "@angular/router"

import 'rxjs/add/operator/map';  
import 'rxjs/add/operator/do';
@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private http: HttpClient,private route:Router) { }
  userRegister(data) {
    console.log("working");
   this.http.post('http://localhost:3000/register',data).subscribe((res)=>{});
  }
  deletePkg(data:Number){
    console.log("in delete pkg");
    console.log(data)
    this.http.delete('http://localhost:3000/delHotel'+"/"+data).subscribe((res)=>{console.log(res);});

  }

  deleteDestination(data){
    console.log("in delete dest");
    console.log(data)
    this.http.delete('http://localhost:3000/delDest'+"/"+data).subscribe((res)=>{console.log(res);});

  }
  bookpkg(data)
  {
  
    this.http.get('http://localhost:3000/book_pkg'+"/"+data+";"+localStorage.getItem("username")).subscribe(res=>{
      var st=JSON.stringify(res)
      var stus=JSON.parse(st)
      if(stus.status==200)
      {
        alert("Package booked")
      }
  
    });
  }
  deleteHotel(data:Number){
    console.log("in delete hotel");
    console.log(data)
    this.http.delete('http://localhost:3000/delHotel'+"/"+data).subscribe((res)=>{console.log(res);});
  }

  packageRegister(data) {
    console.log("add pack working");
   this.http.post('http://localhost:3000/packregister',data).subscribe((res)=>{console.log(res);});
  }

  destRegister(data) {
    console.log("add pack working");
   this.http.post('http://localhost:3000/destregister',data).subscribe((res)=>{console.log(res);});
  }

  RegisterHotel(data) {
    console.log("add pack working");
   this.http.post('http://localhost:3000/hotelregister',data).subscribe((res)=>{console.log(res);});
  }
  PakageDetail()
  {
    console.log("in pkg detail service");
    return this.http.get('http://localhost:3000/pkgDetail')  

  }
  
  DestDetail()
  {
    console.log("in dest detail service");
    return this.http.get('http://localhost:3000/destDetail')  

  }
  
  HotelDetail()
  {
    console.log("in dest detail service");
    return this.http.get('http://localhost:3000/hotelDetail')  

  }
  gethotelbydest(data)
  {
    return this.http.get('http://localhost:3000/hotelBydest'+"/"+data) 
  }
  getdestbypkgname(data)
  {
    return this.http.get('http://localhost:3000/destbypkgname'+"/"+data) 
  }

  UpdatePkg(data,pkgid){
    console.log("data")

    this.http.post('http://localhost:3000/updatepkg'+'/'+pkgid,data).subscribe((res)=>{
      var st=JSON.stringify(res)
      var stus=JSON.parse(st)
      if(stus.n!=0)
      {
        alert("Package updated")
      }
    });
  }

  UpdateDest(data,destid){
    console.log("data")

    this.http.post('http://localhost:3000/updatedest'+'/'+destid,data).subscribe((res)=>{
      var st=JSON.stringify(res)
      var stus=JSON.parse(st)
      if(stus.n!=0)
      {
        alert("Package updated")
      }
    });
  }

  bookhotel(data)
  {
    //alert("in service")
    this.http.post('http://localhost:3000/book',data).subscribe((res)=>{console.log(res);});
  }

}

