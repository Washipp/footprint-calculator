import {Component, OnInit} from '@angular/core';
import {CalculatorData, CalculatorService} from '../calculator.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  data: CalculatorData;

  constructor(private cService: CalculatorService) { }

  ngOnInit(): void {
    this.data = this.cService.createEmptyData();
  }

}
