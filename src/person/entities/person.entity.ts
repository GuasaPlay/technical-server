export class Person {
  id: string;
  email: string;
  name: string;
  status: boolean;

  constructor(partial: Partial<Person>) {
    Object.assign(this, partial);
  }
}
