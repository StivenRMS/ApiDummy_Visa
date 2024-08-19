import { Injectable } from '@nestjs/common';
const dataPerson = require('../../data/dataPerson.json');
const dataTransaction = require('../../data/dataTc.json');


@Injectable()
export class DummyDataService {


  private users = dataPerson.users;
  private transactions = dataTransaction.transactions;

  getUserDataByDpi(dpi: number) {
    return this.users.find(user => user.dpi === dpi);
  }

  getTransactionByCardNumber(cardNumber: string) {
    return this.transactions.find(transaction => transaction.card_number === cardNumber);
  }
}
