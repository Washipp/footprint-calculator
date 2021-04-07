import {Injectable} from '@angular/core';

export interface CalculatorData {
  timeOnZoom: number;
  usingWebcam: boolean;
  timeOnZoomWithWebcam: number;
}

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {

  constructor() { }

  createEmptyData(): CalculatorData {
    return {
      timeOnZoom: 0,
      usingWebcam: false,
      timeOnZoomWithWebcam: 0
      // TODO: add the other fields
    };
  }

  calculateFootprint(): number {
    // TODO: create calculation
    return 0;
  }
}
