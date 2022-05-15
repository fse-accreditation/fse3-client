import { Component, OnInit,OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import {ProductService} from '../../service/product.service';
import {BidService} from '../../service/bid.service';
import {UserService} from '../../service/user.service';
import { finalize } from 'rxjs/operators';
import {ProductDetail} from '../../entity/product-detail'
import {FormControl, Validators} from '@angular/forms';
import { AppConstants } from '../../entity/appConstants'
import {EventBroadcastService} from '../../service/share/event-broadcast.service';
import {EventType} from '../../entity/eventType';
import * as _moment from 'moment';
import {default as _rollupMoment} from 'moment';
import { ProductBidDetail } from 'src/app/entity/product-bid-detail';

const moment = _rollupMoment || _moment;
@Component({
  selector: 'app-product-bid-search',
  templateUrl: './product-bid-search.component.html',
  styleUrls: ['./product-bid-search.component.css']
 // encapsulation: ViewEncapsulation.None
})
export class ProductBidSearchComponent implements OnInit,OnDestroy {
  getAllProductofSellerSubscription: Subscription;
  getBidSubscription: Subscription;
  productDetailArray:ProductDetail[];
  productBidDetailList: ProductBidDetail[];
  productDetail: ProductDetail;
  selectedProduct:string='';
  productControl = new FormControl('', Validators.required);
  isLoading=false;
  hasData=false;
  isCompLoading=false;
  hasProductDetailError=false;
  hasError=false;
  productBidColumns: string[] = ['productName', 'bidAmount', 'email','phone'];
  bidEndDateShow:string;
  isUserClickOnSearch=false;
  isAuthenticateUser=false;
  productOpenState=false;
  productBidOpenState=false;
  hasProductError=false;
  constructor(private productService:ProductService
    ,private bidService :BidService
    ,private eventBroadcastService:EventBroadcastService
    ,private userService: UserService
    ) { }

  ngOnInit(): void {
    this.setAuthentication();
    this.loadAllProductofSeller();
    this.eventBroadcastService.on(EventType.LOGIN_SUCCESS).subscribe(event => this.handleEvent(event.payload));
  }
  handleEvent(event: any) {
    this.setAuthentication();
    this.loadAllProductofSeller();
  }
 
  setAuthentication(){
    this.isAuthenticateUser=this.userService.isAuthenticate;
  }

  loadAllProductofSeller(){
    if(!this.isAuthenticateUser)
    return;
    if(this.getAllProductofSellerSubscription)
    this.getAllProductofSellerSubscription.unsubscribe();
    const sellerEmail= this.userService.userName;
    this.getAllProductofSellerSubscription=this.productService.getAllProductBySeller(sellerEmail).pipe(finalize(()=>{}))
    .subscribe((data : any)=>{
      this.productDetailArray=[...data.result];  
    },
    (error: any)=>{
        this.setError(error);
    });    

  }

  onSearchClick($event:any){
    $event.stopPropagation();
    this.isUserClickOnSearch=true;
    this.getProductDetail();
    this.getProductBid();

  }
  

  getProductDetail(){
     const productId:string = this.productControl.value?.productId ?? '';
     if(productId==='')
     return;
     this.productDetail=this.productDetailArray.filter(x=>x.productId===productId)[0];
     this.bidEndDateShow=moment(this.productDetail.bidEndDate).format(AppConstants.DATE_FORMAT);
 }

 getProductBid(){
  this.isLoading=true;
  this.hasData=false;
  this.hasError=false;
 if(this.getBidSubscription)
  this.getBidSubscription.unsubscribe();
  const productId:string = this.productControl.value?.productId ?? '';
     if(productId==='')
     return;
  this.getBidSubscription=this.bidService.getAllProductBid(productId).pipe(finalize(()=>{
   this.isLoading=false;
  }))
  .subscribe((data : any)=>{
    this.productBidDetailList =[...data.result]; 
    this.hasData=this.productBidDetailList.length>0;  
  },
  (error: any)=>{
      this.setError(error);
      this.isLoading=false;
      this.hasData=false;
      this.hasError=true;
  });
}
 
ngOnDestroy():void{
    this.getAllProductofSellerSubscription?.unsubscribe();
    this.getBidSubscription?.unsubscribe();
  }
  setError(error:any): void{
    console.log(error);
    
  }
}
