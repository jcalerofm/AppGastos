import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Expense } from '../models/expense.model';
import { DataService } from './data.service';
import { environment } from 'src/environments/environment';
const firebase = environment.firebase;


@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  updateExpenses(expenses: Expense[]) {
    throw new Error('Method not implemented.');
  }


  constructor(
    private saveExpense: DataService
  ) { }

  getExpenses() {
    return this.saveExpense.cargaExpenses();
  }

  addExpense(misGastos: Expense[]) {
    this.expenses = misGastos;
  }

  expenses: Expense[] = [
    new Expense(new Date('2023-03-01'), 'Cena con amigos', 'Comida', 50),
  ];

  addExpenseService(newExpense: Expense) {
    this.expenses.push(newExpense);
    this.saveExpense.guardaExpenses(this.expenses);
  }

  //Filtrar gastos por un mes especifico
  filterExpensesByMonth(month: number, year: number): Expense[] {
    return this.expenses.filter(expense => {
      const expenseDate = new Date(expense.date);
      return expenseDate.getMonth() === month && expenseDate.getFullYear() === year;
    });
  }

  //Sumatorio de todos los gastos
  getTotalExpenses(): number {
    return this.expenses.reduce((sum, expense) => sum + expense.amount, 0);
  }

  //Filtrar gastos por categoria
  filterExpensesByCategory(category: string): Expense[] {
    return this.expenses.filter(expense => expense.category === category);
  }

  //Filtrar gastos por categoria en un mes especifico
  filterExpensesByCategoryAndMonth(category: string, month: number, year: number): Expense[] {
    const expensesByMonth = this.filterExpensesByMonth(month, year);
    return expensesByMonth.filter(expense => expense.category === category);
  }




}
