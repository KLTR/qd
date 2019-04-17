import { Component, Input, OnInit } from '@angular/core';
import { HttpService } from '@app/services';

@Component({
  selector: 'app-source-info',
  templateUrl: './source-info.component.html',
  styleUrls: ['./source-info.component.scss']
})
export class SourceInfoComponent implements OnInit {
  @Input() source: any;
  data: any;
  tasks: any;
  selectedInfo = 'apps';
  selectedIntel = 'DEVICE_INFO';
  contacts = [];
  messages = [];
  sessions = [];
  callHistory = [];
  passwords = [];
  apps = [];
  calls = [];
  browser: any;
  constructor(private http: HttpService) {}

  ngOnInit() {
    this.http.getSourceIntels(this.source.id).subscribe(res => {
      console.log(res), (this.tasks = res.tasks);
    });
    this.http.getIntel('deviceinfo', this.source.id).subscribe(res => {
      console.log(res), (this.data = res);
    });
    // os: { [key: string]: string };
    this.browser = {
      safari: [
        {
          key: 'Wednsesday, April 11, 2019',
          value: [
            {
              title: 'Lady and Man - youtube',
              time: '05:57 am',
              site: 'youtube.com',
              unread: true
            },
            {
              title: 'Philanthrope - Waking Dreams [Full BeatTape]',
              time: '12:12 am',
              site: 'youtube.com',
              unread: true
            },
            {
              title: 'Bulking for ectomorphs',
              time: '03:12 pm',
              site: 'https://www.bodybuilding.com',
              unread: false
            }
          ]
        },
        {
          key: 'Tuesday, April 10, 2019',
          value: [
            {
              title: 'Lady and Man - youtube',
              time: '05:57 am',
              site: 'youtube.com',
              unread: true
            },
            {
              title: 'Philanthrope - Waking Dreams [Full BeatTape]',
              time: '12:12 am',
              site: 'youtube.com',
              unread: false
            },
            {
              title: 'Bulking for ectomorphs',
              time: '03:12 pm',
              site: 'https://www.bodybuilding.com',
              unread: false
            }
          ]
        }
      ],
      chrome: [
        {
          key: 'Sunday, January 5, 2019',
          value: [
            {
              title: 'Lady and Man - youtube',
              time: '05:57 am',
              site: 'youtube.com',
              unread: true
            },
            {
              title: 'Philanthrope - Waking Dreams [Full BeatTape]',
              time: '12:12 am',
              site: 'youtube.com',
              unread: false
            },
            {
              title: 'Bulking for ectomorphs',
              time: '03:12 pm',
              site: 'https://www.bodybuilding.com',
              unread: false
            }
          ]
        },
        {
          key: 'Saturday, January 4, 2019',
          value: [
            {
              title: 'Lady and Man - youtube',
              time: '05:57 am',
              site: 'one.co.il',
              unread: false
            },
            {
              title: 'Philanthrope - Waking Dreams [Full BeatTape]',
              time: '12:12 am',
              site: 'ynet.co.il',
              unread: false
            },
            {
              title: 'Bulking for ectomorphs',
              time: '03:12 pm',
              site: 'https://www.bodybuilding.com',
              unread: false
            }
          ]
        }
      ]
    };
    this.apps = [
      {
        name: 'Whatsapp',
        version: '1.2.3'
      },
      {
        name: 'Whatsapp',
        version: '1.2.3'
      },
      {
        name: 'Whatsapp',
        version: '1.2.3'
      },
      {
        name: 'Whatsapp',
        version: '1.2.3'
      },
      {
        name: 'Whatsapp',
        version: '1.2.3'
      },
      {
        name: 'Whatsapp',
        version: '1.2.3'
      },
      {
        name: 'Whatsapp',
        version: '1.2.3'
      },
      {
        name: 'Whatsapp',
        version: '1.2.3'
      },
      {
        name: 'Whatsapp',
        version: '1.2.3'
      },
      {
        name: 'Whatsapp',
        version: '1.2.3'
      },
      {
        name: 'Whatsapp',
        version: '1.2.3'
      },
      {
        name: 'Whatsapp',
        version: '1.2.3'
      },
      {
        name: 'Whatsapp',
        version: '1.2.3'
      },
      {
        name: 'Whatsapp',
        version: '1.2.3'
      },
      {
        name: 'Whatsapp',
        version: '1.2.3'
      }
    ];

    this.passwords = [
      {
        title: 'com.apple.security.sos',
        type: 'iCloud Keychain Account Metadata',
        username: 'Cloud Private Key Root',
        value: 'ds',
        id: 0
      },
      {
        title: 'com.apple.security.sos',
        type: 'iCloud Keychain Account Metadata',
        username: 'Cloud Private Key Root',
        value: '12321',
        id: 1
      },
      {
        title: 'com.microsoft.security.sos',
        type: 'iCloud Keychain Account Metadata',
        username: 'Cloud Private Key Root',
        value: 'adminadminks',
        id: 2
      },
      {
        title: 'com.google.account.gmail',
        type: 'Gmail account credentials',
        username: 'Zlatan',
        value: 'ThisIsAVeryBadPassword',
        id: 3
      },
      {
        title: 'com.facebook.security.profile',
        type: 'facebook login data',
        username: 'Mark Zuckerberg',
        value: 'ds',
        id: 4
      },
      {
        title: 'com.apple.security.sos',
        type: 'iCloud Keychain Account Metadata',
        username: 'Cloud Private Key Root',
        value: 'ds',
        id: 5
      },
      {
        title: 'com.apple.security.sos',
        type: 'iCloud Keychain Account Metadata',
        username: 'Cloud Private Key Root',
        value: 'ds',
        id: 6
      },
      {
        title: 'com.apple.security.sos',
        type: 'iCloud Keychain Account Metadata',
        username: 'Cloud Private Key Root',
        value: 'ds',
        id: 7
      },
      {
        title: 'com.apple.security.sos',
        type: 'iCloud Keychain Account Metadata',
        username: 'Cloud Private Key Root',
        value: 'ds',
        id: 8
      },
      {
        title: 'com.apple.security.sos',
        type: 'iCloud Keychain Account Metadata',
        username: 'Cloud Private Key Root',
        value: 'ds',
        id: 9
      },
      {
        title: 'com.apple.security.sos',
        type: 'iCloud Keychain Account Metadata',
        username: 'Cloud Private Key Root',
        value: 'ds',
        id: 10
      },
      {
        title: 'com.apple.security.sos',
        type: 'iCloud Keychain Account Metadata',
        username: 'Cloud Private Key Root',
        value: 'ds',
        id: 11
      },
      {
        title: 'com.apple.security.sos',
        type: 'iCloud Keychain Account Metadata',
        username: 'Cloud Private Key Root',
        value: 'ds',
        id: 12
      },
      {
        title: 'com.apple.security.sos',
        type: 'iCloud Keychain Account Metadata',
        username: 'Cloud Private Key Root',
        value: 'ds',
        id: 13
      },
      {
        title: 'com.apple.security.sos',
        type: 'iCloud Keychain Account Metadata',
        username: 'Cloud Private Key Root',
        value: 'ds',
        id: 14
      },
      {
        title: 'com.apple.security.sos',
        type: 'iCloud Keychain Account Metadata',
        username: 'Cloud Private Key Root',
        value: 'ds',
        id: 15
      }
    ];
    this.contacts = [
      {
        name: 'Roy Levy',
        mobile: '0544753336',
        email: 'Hotmailsuck@gmail.com'
      },
      {
        name: 'Tomer Pomodoro',
        mobile: '0544753312',
        email: 'gmailsucks@hotmail.com',
        profileImg: 'https://images-na.ssl-images-amazon.com/images/I/61FE%2BAqUIoL.png'
      },
      {
        name: 'Zlatan Ibrahimovic',
        mobile: '0541753312',
        email: 'Shark@fish.com',
        profileImg: 'https://www.thewistle.com/wp-content/uploads/2017/10/Zlatan-Ibrahimovic.jpg'
      },
      {
        name: 'Avi Nimni',
        mobile: '0512515521',
        email: 'Avi@Nimni.com',
        profileImg: 'https://www.makorrishon.co.il/nrg/images/archive/300x225/875/298.jpg'
      },
      {
        name: 'Theirry Henry',
        mobile: '0241753312',
        email: 'Scorer@gunner.com'
      },
      {
        name: 'Ronaldinho',
        mobile: '05123456789',
        email: 'ronald@iniho.com',
        profileImg: 'https://ichef.bbci.co.uk/onesport/cps/480/cpsprodpb/E576/production/_99624785_ron_getty.jpg'
      }
    ];
    this.messages = [
      {
        from: 'me',
        msg: 'Lorem ipsum Lorem ipsum, Lorem ipsum Lorem ipsum, Lorem ipsum Lorem ipsum, Lorem ipsum Lorem ipsum',
        time: '22:15',
        type: 'text',
        status: 'pending'
      },
      {
        from: 'Eli Cohen',
        msg: 'Lorem ipsum Lorem ipsum, Lorem ipsum Lorem ipsum',
        time: '21:36',
        type: 'text',
        status: 'delivered'
      },
      {
        from: 'Eli Cohen',
        msg: 'Lorem ipsum Lorem ipsum, Lorem ipsum Lorem ipsum',
        time: '21:32',
        type: 'image',
        status: 'read',
        meta: {
          type: 'image',
          state: 'download',
          thumb: 'https://static.independent.co.uk/s3fs-public/thumbnails/image/2017/09/12/11/naturo-monkey-selfie.jpg?w968h681',
          size: '215kb'
        }
      },
      {
        from: 'Eli Cohen',
        msg: 'Lorem ipsum Lorem ipsum, Lorem ipsum Lorem ipsum',
        time: '21:36',
        type: 'image',
        status: 'delivered',
        meta: {
          type: 'image',
          state: 'failed',
          thumb: 'https://static.independent.co.uk/s3fs-public/thumbnails/image/2017/09/12/11/naturo-monkey-selfie.jpg?w968h681',
          size: '215kb'
        }
      },
      {
        from: 'me',
        msg: 'Lorem ipsum Lorem ipsum, Lorem ipsum Lorem ipsum',
        time: '21:36',
        type: 'text',
        status: 'delivered'
        // 'meta':{
        // 'type': 'doc',
        // 'state': 'downloading',
        // 'size': '215kb',
        // 'duration': '00:23',
        // 'doctype': '.xml'
        // },
      },

      {
        from: 'me',
        msg: 'Lorem ipsum Lorem ipsum',
        time: '21:30',
        type: 'text',
        status: 'delivered'
      },
      {
        from: 'Eli Cohen',
        msg: 'Lorem ipsum Lorem ipsum, Lorem ipsum Lorem ipsum',
        time: '21:32',
        type: 'image',
        status: 'read',
        meta: {
          type: 'image',
          state: 'thumb',
          size: '215kb'
        }
      },
      {
        from: 'Eli Cohen',
        msg: 'Lorem ipsum Lorem ipsum, Lorem ipsum Lorem ipsum',
        time: '21:32',
        type: 'text',
        status: 'read'
      },
      {
        from: 'Eli Cohen',
        msg: 'Lorem ipsum Lorem ipsum, Lorem ipsum Lorem ipsum',
        time: '21:36',
        type: 'text',
        status: 'delivered'
      },
      {
        from: 'me',
        msg: 'Lorem ipsum Lorem ipsum',
        time: '21:30',
        type: 'text',
        status: 'delivered'
      },
      {
        from: 'me',
        msg: 'This is the best message i can send you',
        time: '21:30',
        type: 'text',
        status: 'delivered'
      },
      {
        from: 'me',
        msg: 'video',
        meta: {
          type: 'video',
          duration: '01:54',
          state: 'downloading',
          size: '215kb',
          thumb: 'https://static.independent.co.uk/s3fs-public/thumbnails/image/2017/09/12/11/naturo-monkey-selfie.jpg?w968h681'
        },
        time: '21:30',
        type: 'video',
        status: 'delivered'
      },
      {
        from: 'me',
        msg: 'Lorem ipsum Lorem ipsum, Lorem ipsum Lorem ipsum',
        time: '21:36',
        type: 'text',
        status: 'delivered'
      },
      {
        from: 'me',
        msg: 'Lorem ipsum Lorem ipsum, Lorem ipsum Lorem ipsum, Lorem ipsum Lorem ipsum, Lorem ipsum Lorem ipsum',
        time: '22:15',
        type: 'text',
        status: 'pending'
      },
      {
        from: 'Eli Cohen',
        msg: 'Lorem ipsum Lorem ipsum, Lorem ipsum Lorem ipsum',
        time: '21:32',
        type: 'text',
        status: 'read'
      },
      {
        from: 'Eli Cohen',
        msg: 'Ok i would like that very much',
        time: '21:32',
        type: 'text',
        status: 'read'
      },
      {
        from: 'Eli Cohen',
        msg: 'Lorem ipsum Lorem ipsum, Lorem ipsum Lorem ipsum',
        time: '21:36',
        type: 'text',
        status: 'delivered'
      },
      {
        from: 'me',
        msg: 'Lorem ipsum Lorem ipsum',
        meta: {
          type: 'video',
          duration: '01:54',
          state: 'downloading',
          size: '215kb'
        },
        time: '21:30',
        type: 'video',
        status: 'delivered'
      },
      {
        from: 'Eli Cohen',
        msg: 'That is the coolest video i have ever seen!',
        time: '21:32',
        type: 'text',
        status: 'read'
      },
      {
        from: 'me',
        msg: 'Lorem ipsum Lorem ipsum, Lorem ipsum Lorem ipsum',
        time: '21:36',
        type: 'text',
        status: 'delivered'
      },
      {
        from: 'me',
        msg: 'Yes! this video is really awesome, i know thanks!',
        time: '21:36',
        type: 'text',
        status: 'delivered'
      },
      {
        from: 'me',
        msg: 'Lorem ipsum Lorem ipsum, Lorem ipsum Lorem ipsum, Lorem ipsum Lorem ipsum, Lorem ipsum Lorem ipsum',
        time: '22:15',
        type: 'text',
        status: 'pending'
      },
      {
        from: 'me',
        msg: 'Lorem ipsum Lorem ipsum',
        time: '21:30',
        type: 'text',
        status: 'delivered'
      },
      {
        from: 'Eli Cohen',
        msg: 'Lorem ipsum Lorem ipsum, Lorem ipsum Lorem ipsum',
        time: '21:32',
        type: 'text',
        status: 'read'
      },
      {
        from: 'me',
        msg: 'here is a pdf',
        meta: {
          type: 'doc',
          doc_type: 'pdf',
          duration: '01:54',
          state: 'downloading',
          size: '215kb',
          name: 'filename.PDF'
        },
        time: '21:30',
        type: 'doc',
        status: 'delivered'
      },
      {
        from: 'me',
        msg: '',
        meta: {
          type: 'doc',
          doc_type: 'doc',
          duration: '01:54',
          state: 'downloading',
          size: '215kb',
          name: 'filename.PDF'
        },
        time: '21:30',
        type: 'doc',
        status: 'delivered'
      },
      {
        from: 'me',
        msg: 'Lorem ipsum Lorem ipsum, Lorem ipsum Lorem ipsum',
        time: '21:36',
        type: 'text',
        status: 'delivered'
      },
      {
        from: 'me',
        msg: 'Lorem ipsum Lorem ipsum, Lorem ipsum Lorem ipsum, Lorem ipsum Lorem ipsum, Lorem ipsum Lorem ipsum',
        time: '22:15',
        type: 'text',
        status: 'pending'
      },
      {
        from: 'me',
        msg: '',
        meta: {
          type: 'audio',
          duration: '01:54',
          state: 'downloading',
          size: '215kb'
        },
        time: '21:30',
        type: 'video',
        status: 'delivered'
      },
      {
        from: 'me',
        msg: 'Lorem ipsum Lorem ipsum',
        time: '21:30',
        type: 'text',
        status: 'delivered'
      },
      {
        from: 'Eli Cohen',
        msg: 'Lorem ipsum Lorem ipsum, Lorem ipsum Lorem ipsum',
        time: '21:32',
        type: 'text',
        status: 'read'
      },
      {
        from: 'Eli Cohen',
        msg: 'Lorem ipsum Lorem ipsum, Lorem ipsum Lorem ipsum',
        time: '21:36',
        type: 'text',
        status: 'delivered'
      },
      {
        from: 'me',
        msg: 'Lorem ipsum Lorem ipsum, Lorem ipsum Lorem ipsum',
        time: '21:36',
        type: 'text',
        status: 'delivered'
      },
      {
        from: 'me',
        msg: 'Lorem ipsum Lorem ipsum, Lorem ipsum Lorem ipsum, Lorem ipsum Lorem ipsum, Lorem ipsum Lorem ipsum',
        time: '22:15',
        type: 'text',
        status: 'pending'
      }
    ];
    this.sessions = [
      {
        from: 'Eli Cohen',
        date: 'Yesterday',
        message: 'Lorem ipsum Lorem ipsum Lorem…',
        unread: '23',
        isRead: true,
        privacy: 'chats-private',
        id: 1
      },
      {
        from: 'Eli Cohen',
        date: 'Yesterday',
        message: 'Lorem ipsum Lorem ipsum Lorem…',
        unread: '0',
        isRead: true,
        privacy: 'chats-private',
        id: 2
      },
      {
        from: 'Eli Cohen',
        date: '18:54',
        message: 'Lorem ipsum Lorem ipsum Lorem…',
        unread: '23',
        isRead: false,
        privacy: 'chats-group',
        id: 3
      },
      {
        from: 'Eli Cohen',
        date: '14.10.2018 21:30',
        message: 'Lorem ipsum Lorem ipsum Lorem…',
        unread: '0',
        isRead: false,
        privacy: 'chats-group',
        id: 4
      },
      {
        from: 'Eli Cohen',
        date: '14.10.2018 21:30',
        message: 'Lorem ipsum Lorem ipsum Lorem…',
        unread: '0',
        isRead: true,
        privacy: 'chats-broadcast',
        id: 5
      },
      {
        from: 'Eli Cohen',
        date: '14.10.2018 21:30',
        message: 'Lorem ipsum Lorem ipsum Lorem…',
        unread: '2',
        isRead: true,
        privacy: 'chats-group',
        id: 6
      },
      {
        from: 'Eli Cohen',
        date: '14.10.2018 21:30',
        message: 'Lorem ipsum Lorem ipsum Lorem…',
        unread: '0',
        isRead: true,
        privacy: 'chats-private',
        id: 7
      },
      {
        from: 'Eli Cohen',
        date: 'Yesterday',
        message: 'Lorem ipsum Lorem ipsum Lorem…',
        unread: '23',
        isRead: true,
        privacy: 'chats-private',
        id: 8
      },
      {
        from: 'Eli Cohen',
        date: 'Yesterday',
        message: 'Lorem ipsum Lorem ipsum Lorem…',
        unread: '0',
        isRead: true,
        privacy: 'chats-private',
        id: 9
      },
      {
        from: 'Eli Cohen',
        date: '18:54',
        message: 'Lorem ipsum Lorem ipsum Lorem…',
        unread: '23',
        isRead: false,
        privacy: 'chats-group',
        id: 10
      },
      {
        from: 'Eli Cohen',
        date: '14.10.2018 21:30',
        message: 'Lorem ipsum Lorem ipsum Lorem…',
        unread: '0',
        isRead: false,
        privacy: 'chats-group',
        id: 21
      },
      {
        from: 'Eli Cohen',
        date: '14.10.2018 21:30',
        message: 'Lorem ipsum Lorem ipsum Lorem…',
        unread: '0',
        isRead: true,
        privacy: 'chats-broadcast',
        id: 20
      },
      {
        from: 'Eli Cohen',
        date: '14.10.2018 21:30',
        message: 'Lorem ipsum Lorem ipsum Lorem…',
        unread: '2',
        isRead: true,
        privacy: 'chats-group',
        id: 19
      },
      {
        from: 'Eli Cohen',
        date: '14.10.2018 21:30',
        message: 'Lorem ipsum Lorem ipsum Lorem…',
        unread: '0',
        isRead: true,
        privacy: 'chats-private',
        id: 18
      },
      {
        from: 'Eli Cohen',
        date: 'Yesterday',
        message: 'Lorem ipsum Lorem ipsum Lorem…',
        unread: '23',
        isRead: true,
        privacy: 'chats-private',
        id: 17
      },
      {
        from: 'Eli Cohen',
        date: 'Yesterday',
        message: 'Lorem ipsum Lorem ipsum Lorem…',
        unread: '0',
        isRead: true,
        privacy: 'chats-private',
        id: 16
      },
      {
        from: 'Eli Cohen',
        date: '18:54',
        message: 'Lorem ipsum Lorem ipsum Lorem…',
        unread: '23',
        isRead: false,
        privacy: 'chats-group',
        id: 15
      },
      {
        from: 'Eli Cohen',
        date: '14.10.2018 21:30',
        message: 'Lorem ipsum Lorem ipsum Lorem…',
        unread: '0',
        isRead: false,
        privacy: 'chats-group',
        id: 14
      },
      {
        from: 'Eli Cohen',
        date: '14.10.2018 21:30',
        message: 'Lorem ipsum Lorem ipsum Lorem…',
        unread: '0',
        isRead: true,
        privacy: 'chats-broadcast',
        id: 13
      },
      {
        from: 'Eli Cohen',
        date: '14.10.2018 21:30',
        message: 'Lorem ipsum Lorem ipsum Lorem…',
        unread: '2',
        isRead: true,
        privacy: 'chats-group',
        id: 12
      },
      {
        from: 'Eli Cohen',
        date: '14.10.2018 21:30',
        message: 'Lorem ipsum Lorem ipsum Lorem…',
        unread: '0',
        isRead: true,
        privacy: 'chats-private',
        id: 11
      }
    ];
    this.calls = [
      {
        callType: 'declined',
        name: 'Larry Bird',
        phone: '0523448759',
        duration: '00:00:34',
        callTime: '5.12.1985 05:45',
        whatsappCallType: 'regular'
      },
      {
        callType: 'missed',
        name: 'Larry Bird',
        phone: '0523448759',
        duration: '00:00:34',
        callTime: '5.12.1985 05:45',
        whatsappCallType: 'regular'
      },
      {
        callType: 'incoming',
        name: 'Larry Bird',
        phone: '0523448759',
        duration: '00:00:34',
        callTime: '5.12.1985 05:45',
        whatsappCallType: 'regular'
      },
      {
        callType: 'incoming',
        name: 'Larry Bird',
        phone: '0523448759',
        duration: '00:00:34',
        callTime: '5.12.1985 05:45',
        whatsappCallType: 'video'
      },
      {
        callType: 'incoming',
        name: 'Larry Bird',
        phone: '0523448759',
        duration: '00:00:34',
        callTime: '5.12.1985 05:45',
        whatsappCallType: 'regular'
      },
      {
        callType: 'outgoing',
        name: 'Larry Bird',
        phone: '0523448759',
        duration: '00:00:34',
        callTime: '5.12.1985 05:45',
        whatsappCallType: 'regular'
      },
      {
        callType: 'incoming',
        name: 'Larry Bird',
        phone: '0523448759',
        duration: '00:00:34',
        callTime: '5.12.1985 05:45',
        whatsappCallType: 'regular'
      },
      {
        callType: 'incoming',
        name: 'Larry Bird',
        phone: '0523448759',
        duration: '00:00:34',
        callTime: '5.12.1985 05:45',
        whatsappCallType: 'video'
      },
      {
        callType: 'incoming',
        name: 'Larry Bird',
        phone: '0523448759',
        duration: '00:00:34',
        callTime: '5.12.1985 05:45',
        whatsappCallType: 'regular'
      },
      {
        callType: 'missed',
        name: 'Larry Bird',
        phone: '0523448759',
        duration: '00:00:34',
        callTime: '5.12.1985 05:45',
        whatsappCallType: 'regular'
      },
      {
        callType: 'incoming',
        name: 'Larry Bird',
        phone: '0523448759',
        duration: '00:00:34',
        callTime: '5.12.1985 05:45',
        whatsappCallType: 'regular'
      },
      {
        callType: 'incoming',
        name: 'Larry Bird',
        phone: '0523448759',
        duration: '00:00:34',
        callTime: '5.12.1985 05:45',
        whatsappCallType: 'video'
      },
      {
        callType: 'incoming',
        name: 'Larry Bird',
        phone: '0523448759',
        duration: '00:00:34',
        callTime: '5.12.1985 05:45',
        whatsappCallType: 'regular'
      },
      {
        callType: 'missed',
        name: 'Larry Bird',
        phone: '0523448759',
        duration: '00:00:34',
        callTime: '5.12.1985 05:45',
        whatsappCallType: 'regular'
      },
      {
        callType: 'incoming',
        name: 'Larry Bird',
        phone: '0523448759',
        duration: '00:00:34',
        callTime: '5.12.1985 05:45',
        whatsappCallType: 'regular'
      },
      {
        callType: 'incoming',
        name: 'Larry Bird',
        phone: '0523448759',
        duration: '00:00:34',
        callTime: '5.12.1985 05:45',
        whatsappCallType: 'video'
      },
      {
        callType: 'incoming',
        name: 'Larry Bird',
        phone: '0523448759',
        duration: '00:00:34',
        callTime: '5.12.1985 05:45',
        whatsappCallType: 'regular'
      },
      {
        callType: 'missed',
        name: 'Larry Bird',
        phone: '0523448759',
        duration: '00:00:34',
        callTime: '5.12.1985 05:45',
        whatsappCallType: 'regular'
      },
      {
        callType: 'incoming',
        name: 'Larry Bird',
        phone: '0523448759',
        duration: '00:00:34',
        callTime: '5.12.1985 05:45',
        whatsappCallType: 'regular'
      },
      {
        callType: 'missed',
        name: 'Larry Bird',
        phone: '0523448759',
        duration: '00:00:34',
        callTime: '5.12.1985 05:45',
        whatsappCallType: 'video'
      },
      {
        callType: 'incoming',
        name: 'Larry Bird',
        phone: '0523448759',
        duration: '00:00:34',
        callTime: '5.12.1985 05:45',
        whatsappCallType: 'regular'
      },
      {
        callType: 'missed',
        name: 'Larry Bird',
        phone: '0523448759',
        duration: '00:00:34',
        callTime: '5.12.1985 05:45',
        whatsappCallType: 'regular'
      },
      {
        callType: 'incoming',
        name: 'Larry Bird',
        phone: '0523448759',
        duration: '00:00:34',
        callTime: '5.12.1985 05:45',
        whatsappCallType: 'regular'
      },
      {
        callType: 'incoming',
        name: 'Larry Bird',
        phone: '0523448759',
        duration: '00:00:34',
        callTime: '5.12.1985 05:45',
        whatsappCallType: 'video'
      }
    ];
    this.callHistory = [
      {
        callType: 'declined',
        name: 'Larry Bird',
        phone: '0523448759',
        duration: '00:00:34',
        callTime: '5.12.1985 05:45',
        provider: 'Ceullular'
      },
      {
        callType: 'missed',
        name: 'Larry Bird',
        phone: '0523448759',
        duration: '00:00:34',
        callTime: '5.12.1985 05:45',
        provider: 'Ceullular'
      },
      {
        callType: 'incoming',
        name: 'Larry Bird',
        phone: '0523448759',
        duration: '00:00:34',
        callTime: '5.12.1985 05:45',
        provider: 'Ceullular'
      },
      {
        callType: 'incoming',
        name: 'Larry Bird',
        phone: '0523448759',
        duration: '00:00:34',
        callTime: '5.12.1985 05:45',
        provider: 'Watsapp'
      },
      {
        callType: 'incoming',
        name: 'Larry Bird',
        phone: '0523448759',
        duration: '00:00:34',
        callTime: '5.12.1985 05:45',
        provider: 'Ceullular'
      },
      {
        callType: 'outgoing',
        name: 'Larry Bird',
        phone: '0523448759',
        duration: '00:00:34',
        callTime: '5.12.1985 05:45',
        provider: 'Ceullular'
      },
      {
        callType: 'incoming',
        name: 'Larry Bird',
        phone: '0523448759',
        duration: '00:00:34',
        callTime: '5.12.1985 05:45',
        provider: 'Ceullular'
      },
      {
        callType: 'incoming',
        name: 'Larry Bird',
        phone: '0523448759',
        duration: '00:00:34',
        callTime: '5.12.1985 05:45',
        provider: 'Watsapp'
      },
      {
        callType: 'incoming',
        name: 'Larry Bird',
        phone: '0523448759',
        duration: '00:00:34',
        callTime: '5.12.1985 05:45',
        provider: 'Ceullular'
      },
      {
        callType: 'missed',
        name: 'Larry Bird',
        phone: '0523448759',
        duration: '00:00:34',
        callTime: '5.12.1985 05:45',
        provider: 'Ceullular'
      },
      {
        callType: 'incoming',
        name: 'Larry Bird',
        phone: '0523448759',
        duration: '00:00:34',
        callTime: '5.12.1985 05:45',
        provider: 'Ceullular'
      },
      {
        callType: 'incoming',
        name: 'Larry Bird',
        phone: '0523448759',
        duration: '00:00:34',
        callTime: '5.12.1985 05:45',
        provider: 'Skype'
      },
      {
        callType: 'incoming',
        name: 'Larry Bird',
        phone: '0523448759',
        duration: '00:00:34',
        callTime: '5.12.1985 05:45',
        provider: 'Ceullular'
      },
      {
        callType: 'missed',
        name: 'Larry Bird',
        phone: '0523448759',
        duration: '00:00:34',
        callTime: '5.12.1985 05:45',
        provider: 'Ceullular'
      },
      {
        callType: 'incoming',
        name: 'Larry Bird',
        phone: '0523448759',
        duration: '00:00:34',
        callTime: '5.12.1985 05:45',
        provider: 'Ceullular'
      },
      {
        callType: 'incoming',
        name: 'Larry Bird',
        phone: '0523448759',
        duration: '00:00:34',
        callTime: '5.12.1985 05:45',
        provider: 'Watsapp'
      },
      {
        callType: 'incoming',
        name: 'Larry Bird',
        phone: '0523448759',
        duration: '00:00:34',
        callTime: '5.12.1985 05:45',
        provider: 'Ceullular'
      },
      {
        callType: 'missed',
        name: 'Larry Bird',
        phone: '0523448759',
        duration: '00:00:34',
        callTime: '5.12.1985 05:45',
        provider: 'Ceullular'
      },
      {
        callType: 'incoming',
        name: 'Larry Bird',
        phone: '0523448759',
        duration: '00:00:34',
        callTime: '5.12.1985 05:45',
        provider: 'Ceullular'
      },
      {
        callType: 'missed',
        name: 'Larry Bird',
        phone: '0523448759',
        duration: '00:00:34',
        callTime: '5.12.1985 05:45',
        provider: 'Watsapp'
      },
      {
        callType: 'incoming',
        name: 'Larry Bird',
        phone: '0523448759',
        duration: '00:00:34',
        callTime: '5.12.1985 05:45',
        provider: 'Ceullular'
      },
      {
        callType: 'missed',
        name: 'Larry Bird',
        phone: '0523448759',
        duration: '00:00:34',
        callTime: '5.12.1985 05:45',
        provider: 'Ceullular'
      },
      {
        callType: 'incoming',
        name: 'Larry Bird',
        phone: '0523448759',
        duration: '00:00:34',
        callTime: '5.12.1985 05:45',
        provider: 'Ceullular'
      },
      {
        callType: 'incoming',
        name: 'Larry Bird',
        phone: '0523448759',
        duration: '00:00:34',
        callTime: '5.12.1985 05:45',
        provider: 'Skype'
      }
    ];
  }

  taskAction(event, task: string) {
    event.stopPropagation();
    this.http.taskAction(task, this.source.id).subscribe(res => console.log(res));
  }
  selectInfo(info: string) {
    if (info === 'tasks') {
      this.selectIntel(info);
    }
    this.selectedInfo = info;
  }
  getTasks() {
    this.http.getTasks(this.source.id).subscribe(res => console.log(res));
  }
  selectIntel(intel: string) {
    this.data = null;
    this.http.getIntel(intel, this.source.id).subscribe(res => {
      console.log(res), (this.data = res), (this.selectedIntel = intel);
    });
  }
  onSelectSession(sessionId: any) {
    console.log(sessionId);
    this.http.getSessionMessages(sessionId).subscribe(res => {
      console.log(res), (this.data = res);
    });
  }
}
