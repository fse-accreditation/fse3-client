import {BuyerDetail} from '../entity/Buyer-detail'
import {ProductDetail} from '../entity/product-detail'
export class ProductBidDetail {
    
    id:string ;
    bidAmount:number;
    userDetail:BuyerDetail;
    product:ProductDetail;
    
}
