import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-right-bar',
  templateUrl: './right-bar.component.html',
  styleUrls: ['./right-bar.component.scss']
})
export class RightBarComponent implements OnInit {
  isOpen = false;
  selected = "today"
  data = [
    {time: '9:30AM', title:'Intel Arrived', target:'Alex Randolph', source:'Alex iPhone', state:'green'},
    {time: '12:30AM', title:'Low Battery', target:'Alex Randolph', source:'Alex iPhone', state:'red'},
    {time: '06:00PM', title:'Source Arrived', target:'Alex Randolph', source:'Alex iPhone', state:'green'},
    {time: '01:00PM', title:'License about to end'},
    {time: '04:20AM', title:'Existing Source Re-connect', target:'Alex Randolph', source:'Alex iPhone', state:'green'},

  ]
  constructor() { }

  ngOnInit() {
  }
  toggleNav(){
    this.isOpen = !this.isOpen;
  }
  toggleSelected(val){
    this.selected = val;
  }
}
