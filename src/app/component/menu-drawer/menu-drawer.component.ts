import { Component, OnInit,TemplateRef, ViewChild,AfterViewInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import {UserService} from '../../service/user.service';
import {EventBroadcastService} from '../../service/share/event-broadcast.service';
import {EventType} from '../../entity/eventType';
import { Router } from '@angular/router';
@Component({
  selector: 'app-menu-drawer',
  templateUrl: './menu-drawer.component.html',
  styleUrls: ['./menu-drawer.component.css']
})
export class MenuDrawerComponent implements OnInit,AfterViewInit {
  @ViewChild('drawer',{static:true}) drawer : any;
  showFiller=false;
  isAuthenticateUser=false;
  constructor(public userService:UserService,
    private eventBroadcastService:EventBroadcastService,
    private router:Router) { }

  ngOnInit(): void {
    this.setAuthentication();
    this.eventBroadcastService.on(EventType.LOGIN_SUCCESS).subscribe(event => this.handleEvent(event.payload));
  }

  ngAfterViewInit() : void{

  }
  handleEvent(event: any) {
   this.setAuthentication();
  }

  setAuthentication(){
    this.isAuthenticateUser=this.userService.isAuthenticate;
  }
  signOut(signOut:any){
    this.userService.SignOut();
    this.router.navigate(['/stock/search']);
    location.reload();
  }

}
