import { Component, OnInit,Inject, OnDestroy } from '@angular/core';
import {FormControl, Validators,FormGroup} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import {AuthToken} from '../../entity/authToken';
import {AuthenticationService} from '../../service/authentication.service';
import {UserService} from '../../service/user.service';
import {EventBroadcastService} from '../../service/share/event-broadcast.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import {EventType} from '../../entity/eventType';
import {BroadcastEvent} from '../../entity/broadcastEvent';
import {UserDetail} from '../../entity/user-detail';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css']
})
export class LoginDialogComponent implements OnInit,OnDestroy {
  getAuthSubscription: Subscription;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  constructor( public dialogRef: MatDialogRef<LoginDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private authService:AuthenticationService,
    private matSnackBar:MatSnackBar,
    private userserviceService:UserService,
    private eventBroadcastService:EventBroadcastService
    ) { }
    email = new FormControl('', [Validators.required, Validators.email]);
    password = new FormControl('', [Validators.required]);

  ngOnInit(): void {
  }

  ngOnDestroy():void{
    this.getAuthSubscription?.unsubscribe();
  }
  onNoClick(): void {
    this.dialogRef.close();
    
  }

  getEmailErrorMessage() {
    
    if (this.email.hasError('required')) {
      return 'email required';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  getPasswordErrorMessage() {
    if (this.password.hasError('required')) {
      return 'password required';
    }

    return  '';
  }

  isFormValid(){
     !this.email.hasError('required') && !this.email.hasError('email') && this.password.hasError('required')
  }

  onLoginClick($event:any){
    $event.stopPropagation();
    if(this.getAuthSubscription)
      this.getAuthSubscription.unsubscribe();
      const userDetail : UserDetail =new UserDetail(this.email.value,this.password.value);
      this.getAuthSubscription=this.authService.isUserAuthenticate(userDetail).pipe(finalize(()=>{}))
      .subscribe((data : AuthToken)=>{
           localStorage.setItem('userdetails',JSON.stringify(data));
          // localStorage.setItem('isAuthentication', 'true');
          // localStorage.setItem('isAuthentication', 'true');
           // this.userserviceService.isAuthenticate=true;    
            //this.userserviceService.token=data?.token;
            //this.userserviceService.name='RabiS'
            this.eventBroadcastService.dispatch(new BroadcastEvent(EventType.LOGIN_SUCCESS, {}));
            this.dialogRef.close();
            this.closeInvalidMessage();
      },
      (error: any)=>{
          this.setError(error);
          console.log(error.status);
          if(error.status===404){
            this.showInvalidMessage();
          }
      });

  }

  showInvalidMessage():void{
    this.matSnackBar.open('user name or password  not correct!', 'close', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  closeInvalidMessage():void{
    this.matSnackBar.dismiss();
  }

  setError(error:any): void{
    console.log(error);
    
  }

}
