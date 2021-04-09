import {Component, OnInit} from '@angular/core';
import {CalculatorData, CalculatorService} from '../calculator.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  data: CalculatorData;
  footprint: number;

  constructor(private cService: CalculatorService) { }

  ngOnInit(): void {
     this.data = this.cService.createEmptyData();
  }

  calculate(): void {
    this.footprint = this.cService.calculateFootprint(this.data);
  }

  improve(): void {
    this.footprint -= 100;
  }
}
