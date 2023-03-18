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
  sortColumn = '';
  sortDirection = 'asc';

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

  onHeaderClick(column: string): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
    this.sortExpenses();
  }

  sortExpenses(): void {
    const compare = (a: Expense, b: Expense): number => {
      let aValue: any;
      let bValue: any;

      switch (this.sortColumn) {
        case 'date':
          aValue = a.date;
          bValue = b.date;
          break;
        case 'concept':
          aValue = a.concept;
          bValue = b.concept;
          break;
        case 'category':
          aValue = a.category;
          bValue = b.category;
          break;
        case 'amount':
          aValue = a.amount;
          bValue = b.amount;
          break;
        default:
          return 0;
      }

      if (aValue < bValue) {
        return this.sortDirection === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return this.sortDirection === 'asc' ? 1 : -1;
      }
      return 0;
    };

    this.expenses.sort(compare);
  }

}

