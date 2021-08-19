import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { BehaviorSubject } from 'rxjs'
@Injectable()
export class MessagingService {
  currentMessage = new BehaviorSubject(null);
  notification:string[]=[];
  constructor(private angularFireMessaging: AngularFireMessaging) {
   /* this.angularFireMessaging.messages.subscribe((_messaging: AngularFireMessaging) => {
        _messaging.onMessage = _messaging.onMessage.bind(_messaging);
        _messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);
      }
    )*/
  }


  requestPermission() {
    this.angularFireMessaging.requestToken.subscribe(
      (token) => {
        console.log(token);
      },
      (err) => {
        console.error('Unable to get permission to notify.', err);
      }
    );
  }


  receiveMessage() {
    this.angularFireMessaging.messages.subscribe(
      (payload) => {
        console.log("new message received. ", payload);

       let p=JSON.parse(JSON.stringify(payload));
       this.notification.push(p['notification']['body']);
        //this.currentMessage.next(payload);
      })
  }

  getNotification(){
    return this.notification;
  }
}
