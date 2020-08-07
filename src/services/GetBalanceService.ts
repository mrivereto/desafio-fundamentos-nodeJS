import TransactionsRepository from '../repositories/TransactionsRepository';

interface Balance {
    income: number;
    outcome: number;
    total: number;
}

class GetBalanceService{

    private transactionsRepository: TransactionsRepository;

    constructor(repository: TransactionsRepository){
        this.transactionsRepository = repository;
    }

    public execute(): Balance {
        return this.transactionsRepository.getBalance();
    }

}

export default GetBalanceService;