import {Injectable} from '@angular/core';

export interface CalculatorData {
  timeOnZoom: number;
  usingWebcam: boolean;
  timeOnZoomWithWebcam: number;
  // TODO: add the necessary fields
}

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {

  constructor() { }

  createEmptyData(): CalculatorData {
    return {
      timeOnZoom: undefined,
      usingWebcam: false,
      timeOnZoomWithWebcam: undefined
      // TODO: add the other fields
    };
  }

  calculateFootprint(data: CalculatorData): number {
    return Math.random() * (data.timeOnZoom - data.timeOnZoomWithWebcam + 1) + data.timeOnZoomWithWebcam;
    // TODO: insert formula to calculate the footprint
    // return 0;
  }
}
