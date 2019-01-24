import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-right-bar',
  templateUrl: './right-bar.component.html',
  styleUrls: ['./right-bar.component.scss']
})
export class RightBarComponent implements OnInit {
  isOpen = false;
  selected = "today"
  @Input() events: any[];

  data = [
    { createdAt: '9:30AM',  msg:'Intel Arrived', owners:{target: 'Alex Randolph', source:'Alex iPhone'}, severity:'INFO', tags:[], importance: true, target_url:''},
    { createdAt: '12:30AM', msg:'Low Battery', owners:{target:'Alex Randolph', source:'Alex iPhone'}, severity:'WARNING', tags:[], importance: true, target_url:''},
    { createdAt: '06:00PM', msg:'Source Arrived', owners:{target:'Alex Randolph', source:'Alex iPhone'}, severity:'INFO', tags:[], importance: true, target_url:''},
    { createdAt: '01:00PM', msg:'License about to end', owners:{},tags:[], importance: true, target_url:''},
    { createdAt: '04:20AM', msg:'Existing Source Re-connect', owners:{target:'Alex Randolph', source:'Alex iPhone'}, severity:'INFO', tags:[], importance: true, target_url:''},
  ]
  constructor() { }

  ngOnInit() {
  }
  ngOnChanges(): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    console.log(this.events)
  }
  toggleNav(){
    this.isOpen = !this.isOpen;
  }
  toggleSelected(val){
    this.selected = val;
  }
  removeEvent(index){
    this.events['events'].splice(index, 1);
  }
}
