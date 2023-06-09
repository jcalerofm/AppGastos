import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Expense } from '../models/expense.model';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private httpClient: HttpClient) { }

  guardaExpenses(Expenses: Expense[]) {
    this.httpClient.put('https://gastosapp-6b14d-default-rtdb.europe-west1.firebasedatabase.app/gastos.json', Expenses).subscribe(
      response => console.log("Gastos guardados: " + response),
      error => console.log("error al guardar los gastos: " + error)
    );
  }

  cargaExpenses() {
    return this.httpClient.get('https://gastosapp-6b14d-default-rtdb.europe-west1.firebasedatabase.app/gastos.json').pipe(
      map((data: any) => {
        const expensesArray: Expense[] = [];
        for (const key in data) {
          if (data.hasOwnProperty(key)) {
            expensesArray.push({ ...data[key], id: key });
          }
        }
        return expensesArray;
      })
    );
  }
}
