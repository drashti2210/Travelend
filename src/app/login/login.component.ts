import { Component, OnInit } from '@angular/core';
import { RegistrationService } from  'src/registration.service';
import { LoginCheckService } from 'src/login-check.service';
import { Router,ActivatedRoute } from "@angular/router"

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username;password;
  constructor(private registerServ: RegistrationService,private loginServ:LoginCheckService,private route:Router) { }

  ngOnInit() {
   
  }
  register(data) {
   
    this.registerServ.userRegister(data);
    this.route.navigate(['/'])
  
}
login(data)
{
 
  localStorage.setItem("username",data.username)
 this.loginServ.checklogin(data);
}
}
