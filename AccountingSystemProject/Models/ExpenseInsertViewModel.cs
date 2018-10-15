using System;

namespace AccountingSystemProject.Objects
{
  public class ExpenseInsertViewModel
  {
    public string expense_name {get; set;}
    public double expense_amount_TL {get; set;}
    public double expense_amount_dollar {get; set;}
    public DateTime expense_date {get; set;}
    public string expense_explaination {get; set;}
    public DateTime record_created_date { get; set; }
    public string record_created_by_name { get; set; }
    public string whose_expense_name {get; set;}
  }
}
