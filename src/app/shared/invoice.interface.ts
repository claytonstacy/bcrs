/******************************************************************************
 * Title: invoice.interface.ts
 * Author: Jeff Shepherd, Clayton Stacy, Chris Bohnet
 * Modified by:
 * Date: 11/5/2020
 * Description: Invioce interface
 *****************************************************************************/
import { LineItem } from './line-item.interface';


 export interface Invoice {
    userName: string;
    lineItems: LineItem[];
    partsAmount: number;
    laborAmout: number;
    lineItemTotal: number;
    total: number;
    orderDate: Date;
 }
