import { Injectable, OnInit } from '@angular/core';
import { from, Observable, of, ReplaySubject } from 'rxjs';

let dummyCommitments = from<Array<Object>>([
  {
    "name": "dummy",
    "url": "dummyurl"
  }
]);

@Injectable({
  providedIn: 'root'
})
export class CommitmentService {
  public commitments = new ReplaySubject(10);

  constructor() {
    dummyCommitments.subscribe(this.commitments);
   }

  public getCommitments(): ReplaySubject<Object> {
    return this.commitments;
  }
}
