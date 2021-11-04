export interface IUser {
  Nome: string;
  email: string;
}

export class User {
  static tableName = "Utenti" as string;
  public Nome: string;
  public email: string;

  constructor(data?: IUser) {
    this.Nome = data ? data.Nome : "";
    this.email = data ? data.email : "";
  }
}
