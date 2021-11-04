export interface IAppInfo {
  Nome: string;
  version: string;
}

export class AppInfo {
  static tableName = "AppInfo" as string;
  public Nome: string;
  public version: string;

  constructor(data?: IAppInfo) {
    this.Nome = data ? data.Nome : "";
    this.version = data ? data.version : "0.0";
  }
}
