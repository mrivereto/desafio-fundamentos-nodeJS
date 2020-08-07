import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    var totalIncome = 0;
    var totalOutcome = 0;

    this.transactions.forEach( transaction => {
      if(transaction.type === "income"){
        totalIncome += transaction.value;
      }

      if(transaction.type === "outcome"){
        totalOutcome += transaction.value;
      }
    });

    const balance: Balance = {

      income: totalIncome,
      outcome: totalOutcome,
      total: totalIncome - totalOutcome

    };

    return balance;
  }

  public create({title, value, type} : TransactionDTO): Transaction {
    const transaction = new Transaction({title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
