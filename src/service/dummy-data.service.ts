import { Injectable } from '@nestjs/common';
const dataPerson = require('../../data/dataPerson.json');
const dataTransaction = require('../../data/dataTc.json');


@Injectable()
export class DummyDataService {


  private users = dataPerson.users;
  private transactions = dataTransaction.transactions;

  getUserDataByTc(card_number: string) {
    return this.users.find(user => user.card_number === card_number);
  }

  getTransactionByCardNumber(cardNumber: string) {
    return this.transactions.find(transaction => transaction.card_number === cardNumber);
  }
}
