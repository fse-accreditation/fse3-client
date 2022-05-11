import { Component, ViewChild,AfterViewInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {LoginDialogComponent} from './component/login-dialog/login-dialog.component'
import {UserService} from './service/user.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'estock-market';
  @ViewChild('drawer') drawer : any;
  showFiller= false;
  isAuthenticate=false;
  constructor(public dialog: MatDialog,private userService: UserService ){}
  
  ngAfterViewInit(){
    if(!this.userService.isAuthenticate){
      this.openLoginDialog();
    }
  }

  toggleDrawer(data : any): void{
    this.drawer.toggle();
  }

  openLoginDialog(): void {
    const dialogRef = this.dialog.open(LoginDialogComponent, {
      width: '400px',
      height:'150x',
      disableClose:true,
      data: {name: 'Tommy', animal: 'Dog'}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      
    });
  }



}
