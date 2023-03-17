import { Component, OnInit } from '@angular/core';
import { ExpenseService } from '../services/expense.service';
import { Expense } from '../models/expense.model';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  title = 'Mis gastos';

  expenses: Expense[] = [];

  constructor(private expService: ExpenseService) { }

  ngOnInit(): void {
    this.expService.getExpenses().subscribe(
      myExpenses => {
        console.log(myExpenses)
        this.expenses = Object.values(myExpenses);
        this.expService.addExpense(this.expenses);
      }

    );
  }

  cuadroFecha: string = new Date().toISOString().split('T')[0];
  cuadroConcepto: string = "";
  cuadroCategoria: string = "";
  cuadroImporte: number = 0;

  addExpense() {
    let newExpense = new Expense(new Date(this.cuadroFecha), this.cuadroConcepto, this.cuadroCategoria, this.cuadroImporte);
    this.expService.addExpenseService(newExpense);
    this.cuadroFecha = "";
    this.cuadroConcepto = "";
    this.cuadroCategoria = "";
    this.cuadroImporte = 0;

  }

}
