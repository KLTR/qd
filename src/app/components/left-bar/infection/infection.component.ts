import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-infection',
  templateUrl: './infection.component.html',
  styleUrls: ['./infection.component.scss']
})
export class InfectionComponent implements OnInit {
@Input() infection
  constructor() { }

  ngOnInit() {
  }


  setInfectionIcon(state){
    switch(state){
      case "IN_PROGRESS":
      return 'infection-attacking'
      case "FAILED":
      return 'infection-failed'
  }
    }

}
