import {SellerDetail} from '../entity/seller-detail'
export class ProductDetail {
    productId: string;
    productName: string;
    shortDescription: string;
    detailDescription: string;
    startingPrice: number;
    bidEndDate: Date;
    sellerEmail: string;
    category: string
    userDetail:SellerDetail
    
}
