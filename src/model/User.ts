export interface IUser {
  nome: string;
  email: string;
  uid: string;
}

export class User {
  static tableName = "Utenti" as string;
  public nome: string;
  public email: string;
  public uid: string;

  constructor(data?: IUser) {
    this.nome = data ? data.nome : "";
    this.email = data ? data.email : "";
    this.uid = data ? data.uid : "";
  }
}
