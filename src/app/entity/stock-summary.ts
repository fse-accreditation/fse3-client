export class StockSummary{
    minPrice:number;
    maxPrice: number;
    avgPrice: number ;
    exchangeName: string;
    

    constructor(minPrice:number,maxPrice:number,avgPrice : number,exchangeName: string){
        this.minPrice=minPrice,
        this.maxPrice=maxPrice,
        this.avgPrice=avgPrice,
        this.exchangeName=exchangeName
        
    }
    
}