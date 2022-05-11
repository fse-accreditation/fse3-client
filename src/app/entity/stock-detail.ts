import {AppConstants} from '../entity/appConstants'
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import {default as _rollupMoment} from 'moment';

const moment = _rollupMoment || _moment;
export class StockDetail{
    stockId:string;
    stockPrice: number;
    stockDateTime: string ;
    time: string;
    companyCode: string;
    exchangeName:string;

    constructor(stockId:string,stockPrice:number,stockDateTime : string,time: string,companyCode:string,exchangeName:string){
        this.stockId=stockId,
        this.stockPrice=stockPrice,
        this.stockDateTime=moment(stockDateTime).format(AppConstants.DATE_FORMAT)
        this.time=time,
        this.companyCode=companyCode
        this.exchangeName=exchangeName
    }
    
}
