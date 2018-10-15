using System;
using System.ComponentModel.DataAnnotations;

namespace AccountingSystemProject.Models
{
  [Serializable]
    public class Expense
    {
        [Key]
        public int expense_id {get;set;}
        public string expense_name {get; set;}
        public double expense_amount_TL {get; set;}
        public double expense_amount_dollar {get; set;}
        public DateTime expense_date {get; set;}
        public string expense_explaination {get; set;}
        public DateTime record_created_date {get; set;}
        public int record_created_by_id {get; set;}
        public string whose_expense_name {get; set;}
    }

}
