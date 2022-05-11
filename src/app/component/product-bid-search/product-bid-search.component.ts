import { Component, OnInit,OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import {ProductService} from '../../service/product.service';
import {BidService} from '../../service/bid.service';
import {UserService} from '../../service/user.service';
import { finalize } from 'rxjs/operators';
import {ProductDetail} from '../../entity/product-detail'
import {FormControl, Validators} from '@angular/forms';
import {StockDetail} from '../../entity/stock-detail';
import {StockService} from '../../service/stock.service';
import { AppConstants } from '../../entity/appConstants'
import {EventBroadcastService} from '../../service/share/event-broadcast.service';
import {EventType} from '../../entity/eventType';
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
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
  //getCompanyByCodeSubscription: Subscription;
  //getAllStockSubscription: Subscription;
  productDetailArray:ProductDetail[];
  //stockDetail : StockDetail[];
  productBidDetailList: ProductBidDetail[];
  productDetail: ProductDetail;
  selectedProduct:string='';
  productControl = new FormControl('', Validators.required);
  //today:Date=new Date();
  //startDate = new FormControl(moment());
  //endDate = new FormControl(moment());
  isLoading=false;
  hasData=false;
  isCompLoading=false;
  hasProductDetailError=false;
  hasError=false;
  //minPrice:number=0;
  //maxPrice:number=0;
  productBidColumns: string[] = ['productName', 'bidAmount', 'email','phone'];
  //startDateShow:string;
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
    //let before7day = new Date();
    //before7day.setDate(before7day.getDate()-7)
    //this.startDate.setValue(before7day);
    this.eventBroadcastService.on(EventType.LOGIN_SUCCESS).subscribe(event => this.handleEvent(event.payload));
  }
  handleEvent(event: any) {
    this.setAuthentication();
    //this.getAllCompany();
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
    .subscribe((data : ProductDetail[])=>{
      this.productDetailArray=[...data];  
    },
    (error: any)=>{
        this.setError(error);
    });    

  }

  onSearchClick($event:any){
    $event.stopPropagation();
    this.isUserClickOnSearch=true;
    this.getProductDetal();
    this.getProductBid();

  }
  

  getProductDetal(){
    //this.isCompLoading=true;
    //this.hasProductError=false;
    //this.startDateShow=moment(this.startDate.value).format(AppConstants.DATE_FORMAT);
    //this.endDateShow=moment(this.endDate.value).format(AppConstants.DATE_FORMAT);
    //if(this.getCompanyByCodeSubscription)
     //this.getCompanyByCodeSubscription.unsubscribe();
     const productId:string = this.productControl.value?.productId ?? '';
     if(productId==='')
     return;
     this.productDetail=this.productDetailArray.filter(x=>x.productId===productId)[0];
     this.bidEndDateShow=moment(this.productDetail.bidEndDate).format(AppConstants.DATE_FORMAT);
    // console.log('fff');
     //console.log(this.productDetail);

     
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
    this.productBidDetailList =[...data]; 
    this.hasData=this.productBidDetailList.length>0;  
  },
  (error: any)=>{
      this.setError(error);
      this.isLoading=false;
      this.hasData=false;
      this.hasError=true;
  });
}
  /*
  
  getAllCompany(){
      if(!this.isAuthenticateUser)
      return;

     if(this.getAllCompanySubscription)
        this.getAllCompanySubscription.unsubscribe();
     this.getAllCompanySubscription=this.companyService.getAllCompany().pipe(finalize(()=>{
        
      }))
      .subscribe((data : any)=>{
        this.companyDetailsArray=[...data.result];  
      },
      (error: any)=>{
          this.setError(error);
      });
  }
  
  getCompanyByCode(){
    this.isCompLoading=true;
    this.hasCompDetailsError=false;
    this.startDateShow=moment(this.startDate.value).format(AppConstants.DATE_FORMAT);
    this.endDateShow=moment(this.endDate.value).format(AppConstants.DATE_FORMAT);
    if(this.getCompanyByCodeSubscription)
     this.getCompanyByCodeSubscription.unsubscribe();
     const companyCode:string = this.companyControl.value?.companyCode ?? '';
     this.getAllCompanySubscription=this.companyService.getCompanyDetailsByCode(companyCode).pipe(finalize(()=>{
      this.isCompLoading=false;
     }))
     .subscribe((data : any)=>{
       this.companyDetail={...data.result}   
     },
     (error: any)=>{
         this.setError(error);
         this.isCompLoading=false;
         this.hasCompDetailsError=true;
     });
 }
 getStock(){
   this.isLoading=true;
   this.hasData=false;
   this.hasError=false;
  if(this.getAllStockSubscription)
   this.getAllStockSubscription.unsubscribe();
   const companyCode:string = this.companyControl.value?.companyCode ?? '';
   const startDate:string = moment(this.startDate.value).format('YYYY-MM-DD');
   const endDate:string = moment(this.endDate.value).format('YYYY-MM-DD');
   this.getAllCompanySubscription=this.stockService.getStockDetails(companyCode,startDate,endDate).pipe(finalize(()=>{
    this.isLoading=false;
   }))
   .subscribe((data : any)=>{
     this.stockDetail =[...data.detail]; 
     this.stockSummary=[...data.summary];
     this.hasData=this.stockDetail.length>0;  
   },
   (error: any)=>{
       this.setError(error);
      // this.isLoading=false;
       this.hasData=false;
       this.hasError=true;
   });
}
*/
ngOnDestroy():void{
    this.getAllProductofSellerSubscription?.unsubscribe();
    this.getBidSubscription?.unsubscribe();
    //this.getAllStockSubscription?.unsubscribe();
  }
  setError(error:any): void{
    console.log(error);
    
  }
}
