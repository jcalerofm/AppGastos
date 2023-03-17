import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Expense } from '../models/expense.model';


@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFireDatabase
  ) { }

  // Agregar gasto
  addExpense(expense: any) {
    return this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.db.list(`users/${user.uid}/gastos`).push(expense);
        } else {
          throw new Error('No user is currently logged in.');
        }
      })
    );
  }

  // Obtener gastos
  getExpenses() {
    return this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.db
            .list(`users/${user.uid}/gastos`)
            .valueChanges();
        } else {
          return of([]);
        }
      })
    );
  }

  // Eliminar gasto
  deleteExpense(expenseId: string) {
    return this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.db.object(`users/${user.uid}/gastos/${expenseId}`).remove();
        } else {
          throw new Error('No user is currently logged in.');
        }
      })
    );
  }

  expenses: Expense[] = [
    new Expense(new Date('2023-03-17'), 'Cena', 'ocio', 50)
  ];
}
