import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


export interface Device {
  id: number;
  deviceType: string;
  name: string;
  release_year: number;
  manufacturer: string;
  lifeTimeEmission: number;
  lifespan: number;
}
@Injectable({
  providedIn: 'root'
})
export class DevicesService {

  values: Array<Device> = [];

  constructor(private http: HttpClient) {
    http.get('assets/computer_emission_data.json').subscribe(data => {
      this.values = (JSON.parse(JSON.stringify(data)));
    });
  }

  createEmptyDevice(): Device {
    return  {
      id: undefined,
      deviceType: undefined,
      name: undefined,
      release_year: undefined,
      manufacturer: undefined,
      lifeTimeEmission: undefined,
      lifespan: undefined
    };
  }
}
