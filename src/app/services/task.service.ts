import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  public name: string;

  constructor() {
  }

  public setName(name: string) {
    this.name = name;
  }
};
