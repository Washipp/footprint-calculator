import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-queries-form',
  templateUrl: './queries-form.component.html',
  styleUrls: ['./queries-form.component.css']
})
export class QueriesFormComponent implements OnInit {

  numberOfQueries: number;
  key = 'numberOfQueries';


  constructor() { }

  ngOnInit(): void {
    this.load();
  }

  save(): void {
    localStorage.setItem(this.key, String(this.numberOfQueries));
  }

  load(): void {
    const val = Number(localStorage.getItem(this.key));
    this.numberOfQueries = (val === 0) ? null : val;
  }

  reset(): void {
    localStorage.removeItem(this.key);
    this.numberOfQueries = null;
  }

}
