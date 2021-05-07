import { Component, OnInit } from '@angular/core';
import { ZoomData, CalculatorService } from '../calculator.service';
@Component({
  selector: 'app-zoom-form',
  templateUrl: './zoom-form.component.html',
  styleUrls: ['./zoom-form.component.css']
})
export class ZoomFormComponent implements OnInit {

  data: ZoomData;

  constructor(private cService: CalculatorService) { }

  ngOnInit(): void {
    this.data = this.cService.createEmptyZoomData();
    this.data = this.load();
  }

  save(): void {
    console.log('save called');
    localStorage.setItem('screenShareTime', String(this.data.screenShareTime));
    localStorage.setItem('webcamTime', String(this.data.webcamTime));
    localStorage.setItem('listeningTime', String(this.data.listeningTime));
  }

  load(): ZoomData {
    const data = {
      listeningTime: undefined,
      screenShareTime: undefined,
      webcamTime: undefined
      // TODO: add the other fields
    };
    data.listeningTime = localStorage.getItem('listeningTime');
    data.screenShareTime = localStorage.getItem('screenShareTime');
    data.webcamTime = localStorage.getItem('webcamTime');
    return data;
  }

  reset(): void {
    localStorage.removeItem('listeningTime');
    localStorage.removeItem('screenShareTime');
    localStorage.removeItem('webcamTime');
    this.data = this.cService.createEmptyZoomData();
  }

}
