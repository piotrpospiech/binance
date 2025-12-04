import { Injectable } from "@nestjs/common";

interface IExchangeService {}

@Injectable()
export class ExchangeService implements IExchangeService {
  constructor() {}
}
