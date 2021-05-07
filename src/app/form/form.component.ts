import {Component, OnInit} from '@angular/core';
import {ZoomData, CalculatorService} from '../calculator.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  data: ZoomData;
  footprint: number;

  constructor(private cService: CalculatorService) { }

  ngOnInit(): void {
     this.data = this.cService.createEmptyZoomData();
  }

  calculate(): void {
    this.footprint = this.cService.calculateZoomFootprint(this.data);
  }

  improve(): void {
    this.footprint -= 100;
  }
}
