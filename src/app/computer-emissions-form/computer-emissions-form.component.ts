import { Component, OnInit } from '@angular/core';
import {CalculatorService, CEmissionData} from '../calculator.service';
import {Device, DevicesService} from '../devices.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-computer-emissions-form',
  templateUrl: './computer-emissions-form.component.html',
  styleUrls: ['./computer-emissions-form.component.css']
})
export class ComputerEmissionsFormComponent implements OnInit {

  data: CEmissionData;
  devices: Array<Device> = [];
  selectedDevice: Device;

  constructor(private cService: CalculatorService, private http: HttpClient, private deviceService: DevicesService) { }

  ngOnInit(): void {
    this.data = this.cService.createEmptyCEmissionData();
    this.data = this.load();
    console.log(this.data);
    this.selectedDevice = this.deviceService.createEmptyDevice();

    // hack. Should be using devices.service.ts
    this.http.get('assets/computer_emission_data.json').subscribe(data => {
      this.devices = (JSON.parse(JSON.stringify(data)));
    });
  }

  loadDeviceSpecs(): void {
    this.data.lifeSpan = this.selectedDevice.lifespan;
    this.data.lifeTimeEmission = this.selectedDevice.lifeTimeEmission;
  }

  save(): void {
    this.loadDeviceSpecs();
    localStorage.setItem('lifeSpan', String(this.data.lifeSpan));
    localStorage.setItem('lifeTimeEmission', String(this.data.lifeTimeEmission));
    localStorage.setItem('usage', String(this.data.usage));
  }

  load(): CEmissionData {
    const data = this.cService.createEmptyCEmissionData();
    data.lifeSpan = Number(localStorage.getItem('lifeSpan'));
    data.lifeTimeEmission = Number(localStorage.getItem('lifeTimeEmission'));
    data.usage = Number(localStorage.getItem('usage'));
    return data;
  }

  reset(): void {
    localStorage.removeItem('lifeSpan');
    localStorage.removeItem('lifeTimeEmission');
    localStorage.removeItem('usage');
    this.data = this.cService.createEmptyCEmissionData();
    this.selectedDevice = this.deviceService.createEmptyDevice();
  }
}
