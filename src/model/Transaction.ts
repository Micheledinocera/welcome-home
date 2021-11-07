export interface ITransaction {
  casaId: string;
  casaNome: string;
  utenteId: string;
  utenteNome: string;
  transazione: number;
  subtotale: number;
  timestamp: Date;
}

export class Transaction {
  static tableName = "Transactions" as string;
  public casaId: string;
  public casaNome: string;
  public utenteId: string;
  public utenteNome: string;
  public transazione: number;
  public subtotale: number;
  public timestamp: Date;

  constructor(data?: ITransaction) {
    this.casaId = data ? data.casaId : "";
    this.casaNome = data ? data.casaNome : "";
    this.utenteId = data ? data.utenteId : "";
    this.utenteNome = data ? data.utenteNome : "";
    this.transazione = data ? data.transazione : 0;
    this.subtotale = data ? data.subtotale : 0;
    this.timestamp = data ? data.timestamp : new Date();
  }
}
