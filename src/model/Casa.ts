import { User } from "./User";

export interface ICasa {
  nome: string;
  id: string;
  owner: User;
}

export class Casa {
  static tableName = "Case" as string;
  public nome: string;
  public id: string;
  public owner: User;

  constructor(data?: ICasa) {
    this.nome = data ? data.nome : "";
    this.id = data ? data.id : "";
    this.owner = data ? data.owner : new User();
  }
}
