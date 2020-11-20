import { Component, OnInit } from '@angular/core';
import {MatTableModule } from '@angular/material/table'; 



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
details :any;
  constructor() { }


  ngOnInit(): void {

  
         this.details=JSON.parse(localStorage.getItem('Details')|| '{}');
         console.log(this.details);
  		
  }

}
