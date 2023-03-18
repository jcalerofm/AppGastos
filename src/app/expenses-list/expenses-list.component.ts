// expenses-list.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { Expense } from '../models/expense.model';
import { ExpenseService } from '../services/expense.service';



@Component({
  selector: 'app-expenses-list',
  templateUrl: './expenses-list.component.html',
  styleUrls: ['./expenses-list.component.css']
})
export class ExpensesListComponent implements OnInit {

  expenses: Expense[] = [];
  constructor(private expService: ExpenseService) { }

  ngOnInit(): void {
    this.expService.getExpenses().subscribe(
      (myExpenses: any) => {
        console.log(myExpenses);
        this.expenses = Object.values(myExpenses);
        this.expService.addExpense(this.expenses);
      }
    );

}

}

