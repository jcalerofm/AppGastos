import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Expense } from '../models/expense.model';
import { DataService } from './data.service';


@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  constructor(
    private saveExpense: DataService
  ) { }

  getExpenses() {
    return this.saveExpense.cargaExpenses();
  }

  addExpense(misGastos: Expense[]) {
    this.expenses = misGastos;
  }

  addExpenseService(newExpense: Expense) {
    this.expenses.push(newExpense);
    this.saveExpense.guardaExpenses(this.expenses);
  }

  expenses: Expense[] = [
    new Expense(new Date('2023-03-01'), 'Cena con amigos', 'Comida', 50),
  ];

}
