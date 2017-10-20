import { Injectable } from 'angular-ts-decorators';

export interface IGreetingService {
  getGreeting(): string;
}

@Injectable('greetingService')
export class GreetingService {

  private greetings = [
    'Hello',
    'Gogo',
    'Howdy',
    'Oh Haio',
  ];

  constructor(
    private $http: ng.IHttpService,
  ) {
  }

  public getGreeting() {
    const index = Math.random() * this.greetings.length >> 0;
    return `${this.greetings[index]} Primula!`;
  }
}
