import { Component, OnInit } from '@angular/core';
import { RegistrationService } from  'src/registration.service';
import { Router,ActivatedRoute } from "@angular/router"
@Component({
  selector: 'app-available',
  templateUrl: './available.component.html',
  styleUrls: ['./available.component.css']
})
export class AvailableComponent implements OnInit {

  constructor(private registerServ:RegistrationService,private route:Router,private activeroute:ActivatedRoute) { }
  id;
  dest;
  ngOnInit() {
    this.id=this.activeroute.snapshot.paramMap.get('data')
  
 // alert(this.id)
    this.registerServ.getdestbypkgname(this.id).subscribe((data)=>this.dest=data)
  }
  pkg_book()
  {
    alert("Are you sure you want to book??")
    this.registerServ.bookpkg(this.id);

    
  }
}
