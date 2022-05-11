import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import {EventBroadcastService} from '../../service/share/event-broadcast.service';
import {UserService} from '../../service/user.service';
import {EventType} from '../../entity/eventType';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
@Output() onDrawerClick =new EventEmitter<any>();
userName:string;
isAuthenticateUser:boolean=false;
  constructor(private eventBroadcastService:EventBroadcastService,
    private userservice:UserService
    ) { }

  ngOnInit(): void {
    this.setAuthentication();
    this.eventBroadcastService.on(EventType.LOGIN_SUCCESS).subscribe(event => this.handleEvent(event.payload));
  }
 
  ngAfterViewInit(): void {

  }

  onToggleDrawerClick():void{
    console.log('click on drawer');
    this.onDrawerClick.emit({type:'onclick'});
  }

  handleEvent(event: any) {
    this.setAuthentication();
    
  }

  setAuthentication(){
    this.isAuthenticateUser=this.userservice.isAuthenticate;
    this.userName=this.userservice.userName;

  }

}
