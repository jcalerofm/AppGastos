export class Expense {
  date: Date = new Date();
  concept: string = "";
  category: string = "";
  amount: number = 0;
  id: number = 0;

  constructor(date: Date, concept: string, category: string, amount: number) {
    this.date = date;
    this.concept = concept;
    this.category = category;
    this.amount = amount;

  }
}
