import { Component, ElementRef, ViewChild } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter, map, mergeMap, mergeMapTo } from 'rxjs/operators';
import { MessagingService } from './service/messaging.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'pari';
  visibility = true;


  constructor(private router: Router, private activatedRoute: ActivatedRoute, private afMessaging: AngularFireMessaging, private messageS: MessagingService) { }
  visible: boolean = false;

  ngOnInit() {


    this.messageS.requestPermission();
    this.messageS.receiveMessage();

    //this.requestPermission();
    //this.listen();


    this.router.events.pipe(
      filter(events => events instanceof NavigationEnd),
      map(evt => this.activatedRoute),
      map(route => {
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route;
      }))
      .pipe(
        filter(route => route.outlet === 'primary'),
        mergeMap(route => route.data)).subscribe(x => x.header === true ? this.visibility = true : this.visibility = false)
  }
  /*
    requestPermission() {
      this.afMessaging.requestToken
        .subscribe(
          (token) => { console.log('Permission granted! Save to the server!', token); },
          (error) => { console.error(error); },
        );
    }

    listen() {
      this.afMessaging.messages
        .subscribe((message) => { console.log(message); });
    }*/
}
