export class User {
  private readonly _name: string;
  private readonly _birthday: string;
  private readonly _email: string;

  constructor(name: string, birthday: string, email: string) {
    this._name = name;
    this._birthday = birthday;
    this._email = email;
  }

  get name(): string {
    return this._name;
  }
  get birthday(): string {
    return this._birthday;
  }
  get email(): string {
    return this._email;
  }
}