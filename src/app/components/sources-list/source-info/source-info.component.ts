import { HttpService } from '@app/services';
import { Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-source-info',
  templateUrl: './source-info.component.html',
  styleUrls: ['./source-info.component.scss']
})
export class SourceInfoComponent implements OnInit {
@Input() source: any
data: any;
tasks: any;
selectedInfo = 'apps';
selectedIntel = 'DEVICE_INFO'
contacts = [];
messages = [];
sessions = [];
callHistory = [];
passwords = [];
apps = [];
  constructor(private http: HttpService) { }

  ngOnInit() {
    this.http.getSourcesTasks(this.source.id).subscribe(res => {console.log(res),this.tasks = res.tasks});
    this.http.getIntel('deviceinfo',this.source.id).subscribe(res => {console.log(res), this.data = res});


    // field: "title"
    // field: "type"
    // field: "username"
    // field: "value"

    this.apps = [
      {
        name: 'Whatsapp',
        notes: '1.2.3'
      },
      {
        name: 'Whatsapp',
        notes: '1.2.3'
      },
      {
        name: 'Whatsapp',
        notes: '1.2.3'
      },
      {
        name: 'Whatsapp',
        notes: '1.2.3'
      },
      {
        name: 'Whatsapp',
        notes: '1.2.3'
      },
      {
        name: 'Whatsapp',
        notes: '1.2.3'
      },
      {
        name: 'Whatsapp',
        notes: '1.2.3'
      },
      {
        name: 'Whatsapp',
        notes: '1.2.3'
      },
      {
        name: 'Whatsapp',
        notes: '1.2.3'
      },
      {
        name: 'Whatsapp',
        notes: '1.2.3'
      },
      {
        name: 'Whatsapp',
        notes: '1.2.3'
      },
      {
        name: 'Whatsapp',
        notes: '1.2.3'
      },
      {
        name: 'Whatsapp',
        notes: '1.2.3'
      },
      {
        name: 'Whatsapp',
        notes: '1.2.3'
      },
      {
        name: 'Whatsapp',
        notes: '1.2.3'
      },
    ]

    this.passwords = [
      {
        title: 'com.apple.security.sos',
        type: 'iCloud Keychain Account Metadata',
        username: 'Cloud Private Key Root',
        value: 'ds'
      },
      {
        title: 'com.apple.security.sos',
        type: 'iCloud Keychain Account Metadata',
        username: 'Cloud Private Key Root',
        value: 'ds'
      },
      {
        title: 'com.apple.security.sos',
        type: 'iCloud Keychain Account Metadata',
        username: 'Cloud Private Key Root',
        value: 'ds'
      },
      {
        title: 'com.apple.security.sos',
        type: 'iCloud Keychain Account Metadata',
        username: 'Cloud Private Key Root',
        value: 'ds'
      },
      {
        title: 'com.apple.security.sos',
        type: 'iCloud Keychain Account Metadata',
        username: 'Cloud Private Key Root',
        value: 'ds'
      },
      {
        title: 'com.apple.security.sos',
        type: 'iCloud Keychain Account Metadata',
        username: 'Cloud Private Key Root',
        value: 'ds'
      },
      {
        title: 'com.apple.security.sos',
        type: 'iCloud Keychain Account Metadata',
        username: 'Cloud Private Key Root',
        value: 'ds'
      },
      {
        title: 'com.apple.security.sos',
        type: 'iCloud Keychain Account Metadata',
        username: 'Cloud Private Key Root',
        value: 'ds'
      },
      {
        title: 'com.apple.security.sos',
        type: 'iCloud Keychain Account Metadata',
        username: 'Cloud Private Key Root',
        value: 'ds'
      },
      {
        title: 'com.apple.security.sos',
        type: 'iCloud Keychain Account Metadata',
        username: 'Cloud Private Key Root',
        value: 'ds'
      },
      {
        title: 'com.apple.security.sos',
        type: 'iCloud Keychain Account Metadata',
        username: 'Cloud Private Key Root',
        value: 'ds'
      },
      {
        title: 'com.apple.security.sos',
        type: 'iCloud Keychain Account Metadata',
        username: 'Cloud Private Key Root',
        value: 'ds'
      },
      {
        title: 'com.apple.security.sos',
        type: 'iCloud Keychain Account Metadata',
        username: 'Cloud Private Key Root',
        value: 'ds'
      },
      {
        title: 'com.apple.security.sos',
        type: 'iCloud Keychain Account Metadata',
        username: 'Cloud Private Key Root',
        value: 'ds'
      },
      {
        title: 'com.apple.security.sos',
        type: 'iCloud Keychain Account Metadata',
        username: 'Cloud Private Key Root',
        value: 'ds'
      },
      {
        title: 'com.apple.security.sos',
        type: 'iCloud Keychain Account Metadata',
        username: 'Cloud Private Key Root',
        value: 'ds'
      }
    ]

    this.contacts = [
      {  
        name : 'Roy Levy',
        mobile : '0544753336' ,
        email : 'Hotmailsuck@gmail.com'
      },
      {   
        name : 'Tomer Pomodoro',
        mobile : '0544753312' ,
        email : 'gmailsucks@hotmail.com'
    },
    {   
      name : 'Zlatan Ibrahimovic',
      mobile : '0541753312' ,
      email : 'Shark@fish.com',
      profileImg: 'https://www.thewistle.com/wp-content/uploads/2017/10/Zlatan-Ibrahimovic.jpg'
  },
  {
    name: 'Avi Nimni',
    mobile: '0512515521',
    email: 'Avi@Nimni.com',
    profileImg: 'https://www.makorrishon.co.il/nrg/images/archive/300x225/875/298.jpg'
  },
  {   
    name : 'Theirry Henry',
    mobile : '0241753312' ,
    email : 'Scorer@gunner.com'
}
    ];
    this.messages = [
      {
      'from': 'me',
      'msg': 'Lorem ipsum Lorem ipsum, Lorem ipsum Lorem ipsum, Lorem ipsum Lorem ipsum, Lorem ipsum Lorem ipsum',
      'time': '22:15',
      'type': 'text',
      'status': 'pending'
      },
      {
      'from': 'Eli Cohen',
      'msg': 'Lorem ipsum Lorem ipsum, Lorem ipsum Lorem ipsum',
      'time': '21:36',
      'type': 'text',
      'status': 'delivered'
      },
      {
      'from': 'Eli Cohen',
      'msg': 'Lorem ipsum Lorem ipsum, Lorem ipsum Lorem ipsum',
      'time': '21:32',
      'type': 'image',
      'status': 'read',
      'meta':{
      'type': 'image',
      'state': 'download',
      'thumb':
      'https://static.independent.co.uk/s3fs-public/thumbnails/image/2017/09/12/11/naturo-monkey-selfie.jpg?w968h681',
      'size': '215kb'
      },
      },
      {
      'from': 'Eli Cohen',
      'msg': 'Lorem ipsum Lorem ipsum, Lorem ipsum Lorem ipsum',
      'time': '21:36',
      'type': 'image',
      'status': 'delivered',
      'meta':{
      'type': 'image',
      'state': 'failed',
      'thumb':
      'https://static.independent.co.uk/s3fs-public/thumbnails/image/2017/09/12/11/naturo-monkey-selfie.jpg?w968h681',
      'size': '215kb'
      },
      },
      {
      'from': 'me',
      'msg': 'Lorem ipsum Lorem ipsum, Lorem ipsum Lorem ipsum',
      'time': '21:36',
      'type': 'text',
      'status': 'delivered',
      // 'meta':{
      // 'type': 'doc',
      // 'state': 'downloading',
      // 'size': '215kb',
      // 'duration': '00:23',
      // 'doctype': '.xml'
      // },
      },
      
      {
      'from': 'me',
      'msg': 'Lorem ipsum Lorem ipsum',
      'time': '21:30',
      'type': 'text',
      'status': 'delivered'
      },
      {
      'from': 'Eli Cohen',
      'msg': 'Lorem ipsum Lorem ipsum, Lorem ipsum Lorem ipsum',
      'time': '21:32',
      'type': 'image',
      'status': 'read',
      'meta':{
      'type': 'image',
      'state': 'thumb',
      'size': '215kb'
      },
      },
      {
      'from': 'Eli Cohen',
      'msg': 'Lorem ipsum Lorem ipsum, Lorem ipsum Lorem ipsum',
      'time': '21:32',
      'type': 'text',
      'status': 'read'
      },
      {
      'from': 'Eli Cohen',
      'msg': 'Lorem ipsum Lorem ipsum, Lorem ipsum Lorem ipsum',
      'time': '21:36',
      'type': 'text',
      'status': 'delivered'
      },
      {
      'from': 'me',
      'msg': 'Lorem ipsum Lorem ipsum',
      'time': '21:30',
      'type': 'text',
      'status': 'delivered'
      },
      {
      'from': 'me',
      'msg': 'Lorem ipsum Lorem ipsum',
      'meta':{
      'type': 'video',
      'duration': '01:54',
      'state': 'downloading',
      'size': '215kb',
      'thumb':
      'https://static.independent.co.uk/s3fs-public/thumbnails/image/2017/09/12/11/naturo-monkey-selfie.jpg?w968h681',
      },
      'time': '21:30',
      'type': 'video',
      'status': 'delivered',
      },
      {
      'from': 'me',
      'msg': 'Lorem ipsum Lorem ipsum, Lorem ipsum Lorem ipsum',
      'time': '21:36',
      'type': 'text',
      'status': 'delivered'
      },
      {
      'from': 'me',
      'msg': 'Lorem ipsum Lorem ipsum, Lorem ipsum Lorem ipsum, Lorem ipsum Lorem ipsum, Lorem ipsum Lorem ipsum',
      'time': '22:15',
      'type': 'text',
      'status': 'pending'
      },
      
      {
      'from': 'Eli Cohen',
      'msg': 'Lorem ipsum Lorem ipsum, Lorem ipsum Lorem ipsum',
      'time': '21:32',
      'type': 'text',
      'status': 'read'
      },
      {
      'from': 'Eli Cohen',
      'msg': 'Lorem ipsum Lorem ipsum, Lorem ipsum Lorem ipsum',
      'time': '21:36',
      'type': 'text',
      'status': 'delivered'
      },
      {
      'from': 'me',
      'msg': 'Lorem ipsum Lorem ipsum',
      'meta':{
      'type': 'video',
      'duration': '01:54',
      'state': 'downloading',
      'size': '215kb',
      },
      'time': '21:30',
      'type': 'video',
      'status': 'delivered',
      },
      {
      'from': 'me',
      'msg': 'Lorem ipsum Lorem ipsum, Lorem ipsum Lorem ipsum',
      'time': '21:36',
      'type': 'text',
      'status': 'delivered'
      },
      {
      'from': 'me',
      'msg': 'Lorem ipsum Lorem ipsum, Lorem ipsum Lorem ipsum, Lorem ipsum Lorem ipsum, Lorem ipsum Lorem ipsum',
      'time': '22:15',
      'type': 'text',
      'status': 'pending'
      },
      {
      'from': 'me',
      'msg': 'Lorem ipsum Lorem ipsum',
      'time': '21:30',
      'type': 'text',
      'status': 'delivered'
      },
      {
      'from': 'Eli Cohen',
      'msg': 'Lorem ipsum Lorem ipsum, Lorem ipsum Lorem ipsum',
      'time': '21:32',
      'type': 'text',
      'status': 'read'
      },
      {
        'from': 'me',
        'msg': 'Lorem ipsum Lorem ipsum',
        'meta':{
        'type': 'doc',
        'doc_type': 'pdf',
        'duration': '01:54',
        'state': 'downloading',
        'size': '215kb',
        },
        'time': '21:30',
        'type': 'video',
        'status': 'delivered',
        },
      {
      'from': 'me',
      'msg': 'Lorem ipsum Lorem ipsum, Lorem ipsum Lorem ipsum',
      'time': '21:36',
      'type': 'text',
      'status': 'delivered'
      },
      {
      'from': 'me',
      'msg': 'Lorem ipsum Lorem ipsum, Lorem ipsum Lorem ipsum, Lorem ipsum Lorem ipsum, Lorem ipsum Lorem ipsum',
      'time': '22:15',
      'type': 'text',
      'status': 'pending'
      },
      {
        'from': 'me',
        'msg': 'Lorem ipsum Lorem ipsum',
        'meta':{
        'type': 'audio',
        'duration': '01:54',
        'state': 'downloading',
        'size': '215kb',
        },
        'time': '21:30',
        'type': 'video',
        'status': 'delivered',
      },
      {
      'from': 'me',
      'msg': 'Lorem ipsum Lorem ipsum',
      'time': '21:30',
      'type': 'text',
      'status': 'delivered'
      },
      {
      'from': 'Eli Cohen',
      'msg': 'Lorem ipsum Lorem ipsum, Lorem ipsum Lorem ipsum',
      'time': '21:32',
      'type': 'text',
      'status': 'read'
      },
      {
      'from': 'Eli Cohen',
      'msg': 'Lorem ipsum Lorem ipsum, Lorem ipsum Lorem ipsum',
      'time': '21:36',
      'type': 'text',
      'status': 'delivered'
      },
      {
      'from': 'me',
      'msg': 'Lorem ipsum Lorem ipsum, Lorem ipsum Lorem ipsum',
      'time': '21:36',
      'type': 'text',
      'status': 'delivered'
      },
      {
      'from': 'me',
      'msg': 'Lorem ipsum Lorem ipsum, Lorem ipsum Lorem ipsum, Lorem ipsum Lorem ipsum, Lorem ipsum Lorem ipsum',
      'time': '22:15',
      'type': 'text',
      'status': 'pending'
      },
      ]
    this.sessions = [
      {
      'from': 'Eli Cohen',
      'date': 'Yesterday',
      'message': 'Lorem ipsum Lorem ipsum Lorem…',
      'unread': '23',
      'isRead': true,
      'privacy': 'chats-private',
      'id': 1
      },
      {
      'from': 'Eli Cohen',
      'date': 'Yesterday',
      'message': 'Lorem ipsum Lorem ipsum Lorem…',
      'unread': '0',
      'isRead': true,
      'privacy': 'chats-private',
      'id': 2
      },
      {
      'from': 'Eli Cohen',
      'date': '18:54',
      'message': 'Lorem ipsum Lorem ipsum Lorem…',
      'unread': '23',
      'isRead': false,
      'privacy': 'chats-group',
      'id': 3
      },
      {
      'from': 'Eli Cohen',
      'date': '14.10.2018 21:30',
      'message': 'Lorem ipsum Lorem ipsum Lorem…',
      'unread': '0',
      'isRead': false,
      'privacy': 'chats-group',
      'id':4
      
      },
      {
      'from': 'Eli Cohen',
      'date': '14.10.2018 21:30',
      'message': 'Lorem ipsum Lorem ipsum Lorem…',
      'unread': '0',
      'isRead': true,
      'privacy': 'chats-broadcast',
      'id': 5
      
      },
      {
      'from': 'Eli Cohen',
      'date': '14.10.2018 21:30',
      'message': 'Lorem ipsum Lorem ipsum Lorem…',
      'unread': '2',
      'isRead': true,
      'privacy': 'chats-group',
      'id': 6
      
      },
      {
      'from': 'Eli Cohen',
      'date': '14.10.2018 21:30',
      'message': 'Lorem ipsum Lorem ipsum Lorem…',
      'unread': '0',
      'isRead': true,
      'privacy': 'chats-private',
      'id': 7
      
      },
      {
      'from': 'Eli Cohen',
      'date': 'Yesterday',
      'message': 'Lorem ipsum Lorem ipsum Lorem…',
      'unread': '23',
      'isRead': true,
      'privacy': 'chats-private',
      'id': 8
      },
      {
      'from': 'Eli Cohen',
      'date': 'Yesterday',
      'message': 'Lorem ipsum Lorem ipsum Lorem…',
      'unread': '0',
      'isRead': true,
      'privacy': 'chats-private',
      'id': 9
      },
      {
      'from': 'Eli Cohen',
      'date': '18:54',
      'message': 'Lorem ipsum Lorem ipsum Lorem…',
      'unread': '23',
      'isRead': false,
      'privacy': 'chats-group',
      'id': 10
      },
      {
      'from': 'Eli Cohen',
      'date': '14.10.2018 21:30',
      'message': 'Lorem ipsum Lorem ipsum Lorem…',
      'unread': '0',
      'isRead': false,
      'privacy': 'chats-group',
      'id': 21
      
      },
      {
      'from': 'Eli Cohen',
      'date': '14.10.2018 21:30',
      'message': 'Lorem ipsum Lorem ipsum Lorem…',
      'unread': '0',
      'isRead': true,
      'privacy': 'chats-broadcast',
      'id': 20
      
      },
      {
      'from': 'Eli Cohen',
      'date': '14.10.2018 21:30',
      'message': 'Lorem ipsum Lorem ipsum Lorem…',
      'unread': '2',
      'isRead': true,
      'privacy': 'chats-group',
      'id': 19
      
      },
      {
      'from': 'Eli Cohen',
      'date': '14.10.2018 21:30',
      'message': 'Lorem ipsum Lorem ipsum Lorem…',
      'unread': '0',
      'isRead': true,
      'privacy': 'chats-private',
      'id': 18
      
      },
      {
      'from': 'Eli Cohen',
      'date': 'Yesterday',
      'message': 'Lorem ipsum Lorem ipsum Lorem…',
      'unread': '23',
      'isRead': true,
      'privacy': 'chats-private',
      'id': 17
      },
      {
      'from': 'Eli Cohen',
      'date': 'Yesterday',
      'message': 'Lorem ipsum Lorem ipsum Lorem…',
      'unread': '0',
      'isRead': true,
      'privacy': 'chats-private',
      'id': 16
      },
      {
      'from': 'Eli Cohen',
      'date': '18:54',
      'message': 'Lorem ipsum Lorem ipsum Lorem…',
      'unread': '23',
      'isRead': false,
      'privacy': 'chats-group',
      'id': 15
      },
      {
      'from': 'Eli Cohen',
      'date': '14.10.2018 21:30',
      'message': 'Lorem ipsum Lorem ipsum Lorem…',
      'unread': '0',
      'isRead': false,
      'privacy': 'chats-group',
      'id': 14
      
      },
      {
      'from': 'Eli Cohen',
      'date': '14.10.2018 21:30',
      'message': 'Lorem ipsum Lorem ipsum Lorem…',
      'unread': '0',
      'isRead': true,
      'privacy': 'chats-broadcast',
      'id': 13
      
      },
      {
      'from': 'Eli Cohen',
      'date': '14.10.2018 21:30',
      'message': 'Lorem ipsum Lorem ipsum Lorem…',
      'unread': '2',
      'isRead': true,
      'privacy': 'chats-group',
      'id': 12
      
      },
      {
      'from': 'Eli Cohen',
      'date': '14.10.2018 21:30',
      'message': 'Lorem ipsum Lorem ipsum Lorem…',
      'unread': '0',
      'isRead': true,
      'privacy': 'chats-private',
      'id': 11
      
      },
    ];

    this.callHistory = [
      {
        callType: 'declined',
        name: 'Larry Bird',
        phone: '0523448759',
        duration : '00:00:34',
        callTime: '5.12.1985 05:45',
        provider: 'Ceullular'
      },
      {
        callType: 'missed',
        name: 'Larry Bird',
        phone: '0523448759',
        duration : '00:00:34',
        callTime: '5.12.1985 05:45',
        provider: 'Ceullular'
      },
      {
        callType: 'incoming',
        name: 'Larry Bird',
        phone: '0523448759',
        duration : '00:00:34',
        callTime: '5.12.1985 05:45',
        provider: 'Ceullular'
      },
      {
        callType: 'incoming',
        name: 'Larry Bird',
        phone: '0523448759',
        duration : '00:00:34',
        callTime: '5.12.1985 05:45',
        provider: 'Watsapp'
      },
      {
        callType: 'incoming',
        name: 'Larry Bird',
        phone: '0523448759',
        duration : '00:00:34',
        callTime: '5.12.1985 05:45',
        provider: 'Ceullular'
      },
      {
        callType: 'outgoing',
        name: 'Larry Bird',
        phone: '0523448759',
        duration : '00:00:34',
        callTime: '5.12.1985 05:45',
        provider: 'Ceullular'
      },
      {
        callType: 'incoming',
        name: 'Larry Bird',
        phone: '0523448759',
        duration : '00:00:34',
        callTime: '5.12.1985 05:45',
        provider: 'Ceullular'
      },
      {
        callType: 'incoming',
        name: 'Larry Bird',
        phone: '0523448759',
        duration : '00:00:34',
        callTime: '5.12.1985 05:45',
        provider: 'Watsapp'
      },
      {
        callType: 'incoming',
        name: 'Larry Bird',
        phone: '0523448759',
        duration : '00:00:34',
        callTime: '5.12.1985 05:45',
        provider: 'Ceullular'
      },
      {
        callType: 'missed',
        name: 'Larry Bird',
        phone: '0523448759',
        duration : '00:00:34',
        callTime: '5.12.1985 05:45',
        provider: 'Ceullular'
      },
      {
        callType: 'incoming',
        name: 'Larry Bird',
        phone: '0523448759',
        duration : '00:00:34',
        callTime: '5.12.1985 05:45',
        provider: 'Ceullular'
      },
      {
        callType: 'incoming',
        name: 'Larry Bird',
        phone: '0523448759',
        duration : '00:00:34',
        callTime: '5.12.1985 05:45',
        provider: 'Skype'
      },
      {
        callType: 'incoming',
        name: 'Larry Bird',
        phone: '0523448759',
        duration : '00:00:34',
        callTime: '5.12.1985 05:45',
        provider: 'Ceullular'
      },
      {
        callType: 'missed',
        name: 'Larry Bird',
        phone: '0523448759',
        duration : '00:00:34',
        callTime: '5.12.1985 05:45',
        provider: 'Ceullular'
      },
      {
        callType: 'incoming',
        name: 'Larry Bird',
        phone: '0523448759',
        duration : '00:00:34',
        callTime: '5.12.1985 05:45',
        provider: 'Ceullular'
      },
      {
        callType: 'incoming',
        name: 'Larry Bird',
        phone: '0523448759',
        duration : '00:00:34',
        callTime: '5.12.1985 05:45',
        provider: 'Watsapp'
      },
      {
        callType: 'incoming',
        name: 'Larry Bird',
        phone: '0523448759',
        duration : '00:00:34',
        callTime: '5.12.1985 05:45',
        provider: 'Ceullular'
      },
      {
        callType: 'missed',
        name: 'Larry Bird',
        phone: '0523448759',
        duration : '00:00:34',
        callTime: '5.12.1985 05:45',
        provider: 'Ceullular'
      },
      {
        callType: 'incoming',
        name: 'Larry Bird',
        phone: '0523448759',
        duration : '00:00:34',
        callTime: '5.12.1985 05:45',
        provider: 'Ceullular'
      },
      {
        callType: 'missed',
        name: 'Larry Bird',
        phone: '0523448759',
        duration : '00:00:34',
        callTime: '5.12.1985 05:45',
        provider: 'Watsapp'
      },
      {
        callType: 'incoming',
        name: 'Larry Bird',
        phone: '0523448759',
        duration : '00:00:34',
        callTime: '5.12.1985 05:45',
        provider: 'Ceullular'
      },
      {
        callType: 'missed',
        name: 'Larry Bird',
        phone: '0523448759',
        duration : '00:00:34',
        callTime: '5.12.1985 05:45',
        provider: 'Ceullular'
      },
      {
        callType: 'incoming',
        name: 'Larry Bird',
        phone: '0523448759',
        duration : '00:00:34',
        callTime: '5.12.1985 05:45',
        provider: 'Ceullular'
      },
      {
        callType: 'incoming',
        name: 'Larry Bird',
        phone: '0523448759',
        duration : '00:00:34',
        callTime: '5.12.1985 05:45',
        provider: 'Skype'
      },
    ]

  }
 

taskAction(event,task: string){
  event.stopPropagation();
  this.http.taskAction(task, this.source.id).subscribe(res => console.log(res));
}
  selectInfo(info: string){
    this.selectedInfo = info;
  }
  selectIntel(intel: string){
    this.selectedIntel = intel;
    console.log(this.selectedIntel);
    this.http.getIntel(intel,this.source.id).subscribe(res => console.log(res));
  }
}
