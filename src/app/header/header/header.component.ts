import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }
  islogin:boolean;
  ngOnInit() {

    if(localStorage.getItem("islogin")=="yes"){
      
      this.islogin=true;
    }
    else
    {

      this.islogin=false;
    }
  }

}
