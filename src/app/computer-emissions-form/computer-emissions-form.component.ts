import {Component, OnInit} from '@angular/core';
import {CalculatorService} from '../calculator.service';
import {Device, DevicesService} from '../devices.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-computer-emissions-form',
  templateUrl: './computer-emissions-form.component.html',
  styleUrls: ['./computer-emissions-form.component.css']
})
export class ComputerEmissionsFormComponent implements OnInit {

  devices: Array<Device> = [];
  selectedDevice: Device;
  usageTime: number;
  selectedDevices: Array<Device> = [];
  deviceTypes: Set<string>;
  selectedType: string;
  manufacturers: Set<string>;
  selectedManufacturer: string;
  filteredDevices: Array<Device> = [];

  constructor(private cService: CalculatorService, private http: HttpClient, private deviceService: DevicesService) { }

  ngOnInit(): void {
    this.selectedDevice = this.deviceService.createEmptyDevice();
    this.filteredDevices = [];
    this.deviceTypes = new Set<string>();
    this.selectedType = 'none';
    this.manufacturers = new Set<string>();
    this.selectedManufacturer = 'none';
    this.usageTime = 0;
    this.selectedDevices = this.load();
    if (this.selectedDevices === null) {
      this.selectedDevices = [];
    }

    // hack. Should be using devices.service.ts
    this.http.get('assets/computer_emission_data.json').subscribe(data => {
      this.devices = (JSON.parse(JSON.stringify(data)));
      for (const device of this.devices) {
        this.deviceTypes.add(device.deviceType);
        this.manufacturers.add(device.manufacturer);
      }
    });
  }

  filterDevices(): void {
    this.filteredDevices = [];
    for (const dev of this.devices) {
      if (dev.deviceType === this.selectedType) {
        if (dev.manufacturer === this.selectedManufacturer || this.selectedManufacturer === 'none') {
          this.filteredDevices.push(dev);
        }
      } else if (dev.manufacturer === this.selectedManufacturer && this.selectedType === 'none') {
        this.filteredDevices.push(dev);
      }
    }
  }

  addDevice(): void {
    this.selectedDevice.usageTime = this.usageTime;
    this.selectedDevices.push(this.selectedDevice);
    this.selectedType = 'none';
    this.selectedManufacturer = 'none';
    this.filteredDevices = [];
    this.selectedDevice = this.deviceService.createEmptyDevice();
  }

  removeDevice(name: string): void {
    const newArray = Array<Device>();
    for (const dev of this.selectedDevices) {
      if (dev.name !== name) {
        newArray.push(dev);
      }
    }
    this.selectedDevices = newArray;
  }


  save(): void {
    const jsonData = JSON.stringify(this.selectedDevices);
    localStorage.setItem('selectedDevices', jsonData);
  }

  load(): Array<Device> {
    const jsonData = localStorage.getItem('selectedDevices');
    return JSON.parse(jsonData);
  }

  reset(): void {
    this.selectedDevices = [];
    this.selectedDevice = this.deviceService.createEmptyDevice();
  }
}
