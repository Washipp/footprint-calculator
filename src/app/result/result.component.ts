import { Component, OnInit } from '@angular/core';
import {CalculatorService, CEmissionData, ZoomData} from '../calculator.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  footprint: number;
  zoomData: ZoomData;
  zoomFprint: number;
  cData: CEmissionData;
  cDataFprint: number;

  constructor(private cService: CalculatorService) { }

  ngOnInit(): void {
    this.loadData();
    this.zoomFprint = this.cService.calculateZoomFootprint(this.zoomData);
    this.cDataFprint = this.cService.calculateComputerEmissions(this.cData);
    this.footprint = this.zoomFprint + this.cDataFprint;
  }

  loadData(): void {
    const zoomData = this.cService.createEmptyZoomData();
    zoomData.listeningTime = Number(localStorage.getItem('listeningTime'));
    zoomData.screenShareTime = Number(localStorage.getItem('screenShareTime'));
    zoomData.webcamTime = Number(localStorage.getItem('webcamTime'));
    this.zoomData = zoomData;

    const cData = this.cService.createEmptyCEmissionData();
    cData.lifeSpan = Number(localStorage.getItem('lifeSpan'));
    cData.lifeTimeEmission = Number(localStorage.getItem('lifeTimeEmission'));
    cData.usage = Number(localStorage.getItem('usage'));
    this.cData = cData;
  }

  resetAll(): void {
    localStorage.clear();
  }
}
