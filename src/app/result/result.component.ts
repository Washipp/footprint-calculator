import { Component, OnInit } from '@angular/core';
import {CalculatorService, CEmissionData, ZoomData} from '../calculator.service';
import {Device} from '../devices.service';

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
  selectedDevices: Array<Device> = [];
  numberOfQueries: number;
  queriesEmissions: number;

  constructor(private cService: CalculatorService) { }

  ngOnInit(): void {
    this.loadData();
    this.zoomFprint = this.cService.calculateZoomFootprint(this.zoomData);

    this.footprint = 0;
    // Loop to sum up total device emissions
    for (const dev of this.selectedDevices) {
      const cData = this.cService.createEmptyCEmissionData();
      cData.lifeTimeEmission = dev.lifeTimeEmission;
      cData.usage = dev.usageTime;
      cData.lifeSpan = dev.lifespan;
      const e = this.cService.calculateComputerEmissions(cData);
      dev.emissions = e;
      this.footprint += e;
    }

    this.footprint += this.zoomFprint;
    this.queriesEmissions = this.cService.calculateQueriesEmissions(this.numberOfQueries);
    this.footprint += this.queriesEmissions;
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

    const jsonData = localStorage.getItem('selectedDevices');
    this.selectedDevices =  JSON.parse(jsonData);

    this.numberOfQueries = Number(localStorage.getItem('numberOfQueries'));
  }

  resetAll(): void {
    localStorage.clear();
  }
}
