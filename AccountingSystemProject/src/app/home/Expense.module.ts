import {DecimalPipe} from "@angular/common";

export class Expense_module {
  expense_id:number;
  expense_name: string;
  expense_amount_TL: string;
  expense_amount_dollar: string;
  expense_date: Date;
  expense_explaination: string;
  record_created_date: Date;
  record_created_by_id:number;
  whose_expense_name: string;

}

export class Expense_insert_module {
  expense_name: string;
  expense_amount_TL: number;
  expense_amount_dollar: number;
  expense_date: Date;
  expense_explaination: string;
  whose_expense_name: string;
}

export class Expense_update_module {
  expense_id:number;
  expense_name: string;
  expense_amount_TL: string;
  expense_amount_dollar: string;
  expense_date: Date;
  expense_explaination: string;
  whose_expense_name: string;

}

export class Between_Two_Dates {
  fromDate:Date;
  toDate: Date;

}
