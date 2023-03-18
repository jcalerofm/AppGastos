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
  selectedFilter: string | null = null;
  filterMonth: number | null = null;
  filterYear: number | null = null;
  filterCategory: string | null = null;
  filterCategoryAndMonthCategory: string | null = null;
  filterCategoryAndMonthMonth: number | null = null;
  filterCategoryAndMonthYear: number | null = null;
  totalExpensesAmount: number | null = null;
  arrayCategoria: string[] = ["Compras", "Ocio", "Hogar", "Transporte", "Otros"];

  constructor(private expService: ExpenseService) { }

  ngOnInit(): void {
    this.expService.getExpenses().subscribe(
      (myExpenses: any) => {
        console.log(myExpenses);
        this.expenses = Object.values(myExpenses);
        this.expService.addExpense(this.expenses);
        this.updateTotalExpensesAmount();

      }
    );
  }

  clearFilters(): void {
    this.selectedFilter = '';
    this.filterMonth = null;
    this.filterYear = null;
    this.filterCategory = '';
    this.filterCategoryAndMonthCategory = '';
    this.filterCategoryAndMonthMonth = null;
    this.filterCategoryAndMonthYear = null;
    this.expService.getExpenses().subscribe(
      (myExpenses: any) => {
        console.log(myExpenses);
        this.expenses = Object.values(myExpenses);
        this.expService.addExpense(this.expenses);
        this.updateTotalExpensesAmount();

      }
    );
  }


  deleteExpense(expense: Expense): void {
    // Elimina el gasto del arreglo
    this.expenses = this.expenses.filter(item => item.id !== expense.id);
    // Actualiza la lista de gastos en tu servicio
    this.expService.updateExpenses(this.expenses);
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

  toggleFilter(filter: string) {
    if (this.selectedFilter === filter) {
      this.selectedFilter = '';
    } else {
      this.selectedFilter = filter;
    }
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

  updateTotalExpensesAmount() {
    this.totalExpensesAmount = this.expenses.reduce((sum, expense) => sum + expense.amount, 0);
  }

  filterByMonth(): void {
    this.expenses = this.expService.filterExpensesByMonth(this.filterMonth! -1, this.filterYear!);
    this.updateTotalExpensesAmount();

  }

  filterByCategory(): void {
    this.expenses = this.expService.filterExpensesByCategory(this.filterCategory!);
    this.updateTotalExpensesAmount();

  }

  filterByCategoryAndMonth(): void {
    this.expenses = this.expService.filterExpensesByCategoryAndMonth(this.filterCategoryAndMonthCategory!, this.filterCategoryAndMonthMonth! -1, this.filterCategoryAndMonthYear!);
    this.updateTotalExpensesAmount();
  }



}

