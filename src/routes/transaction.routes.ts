import { Router } from 'express';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';
import ListTransactionsService from '../services/ListTransactionsService';
import GetBalanceService from '../services/GetBalanceService';

const transactionRouter = Router();

const transactionsRepository = new TransactionsRepository();

transactionRouter.get('/', (request, response) => {
  try {
    const listTransactionsService: ListTransactionsService = new ListTransactionsService(transactionsRepository);
    const getBalanceSevice: GetBalanceService = new GetBalanceService(transactionsRepository);

    const transactions = listTransactionsService.execute();
    const balance = getBalanceSevice.execute();

    const result = {
      transactions: transactions,
      balance: balance
    }

    return response.status(200).json(result);

  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionRouter.post('/', (request, response) => {
  try {
    const {title, value, type} = request.body;

    const createTransactionService: CreateTransactionService = new CreateTransactionService(transactionsRepository);

    const transaction = createTransactionService.execute({title, value, type});

    return response.status(201).json(transaction);

  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
