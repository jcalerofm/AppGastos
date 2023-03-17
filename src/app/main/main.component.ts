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
    this.expService.getExpenses().subscribe((myExpenses: any[]) => {
      console.log(myExpenses);
      this.expenses = myExpenses.map(exp => new Expense(exp.date, exp.concept, exp.category, exp.amount));
      this.expService.addExpense(this.expenses);
    });
  }

  cuadroFecha: Date = new Date();
  cuadroConcepto: string = "";
  cuadroCategoria: string = "";
  cuadroImporte: number = 0;

  addExpense() {
    let newExpense = new Expense(this.cuadroFecha, this.cuadroConcepto, this.cuadroCategoria, this.cuadroImporte);
    this.expService.addExpense(newExpense);
    this.cuadroFecha = new Date();
    this.cuadroConcepto = "";
    this.cuadroCategoria = "";
    this.cuadroImporte = 0;
    
  }

}
