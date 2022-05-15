import {SellerDetail} from '../entity/seller-detail'
export class ProductDetail {
    productId: string;
    productName: string;
    shortDescription: string;
    detailedDescription: string;
    startingPrice: number;
    bidEndDate: Date;
    sellerEmail: string;
    category: string
    userDetail:SellerDetail
    
}
