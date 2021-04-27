import {Injectable} from '@angular/core';

export interface CalculatorData {
  timeOnZoom: number;
  usingWebcam?: boolean;
  timeOnZoomWithWebcam?: number;
  screenShareTime: number;
  webcamTime: number;
  listeningTime: number;
  // TODO: add the necessary fields
}
interface Constants {
  electricityIntensity: number; // in kWh/GB
  voip: number; // in kbps
  webcam: number; // in kbps
  screenShare: number; // in kbps
}
@Injectable({
  providedIn: 'root'
})
export class CalculatorService {

  c: Constants;

  constructor() {
    this.c = {
      electricityIntensity: 0.015,
      voip: 60,
      webcam: 600,
      screenShare: 50,
    };
  }

  createEmptyData(): CalculatorData {
    return {
      listeningTime: undefined,
      screenShareTime: undefined,
      webcamTime: undefined,
      timeOnZoom: undefined,
      usingWebcam: false,
      timeOnZoomWithWebcam: undefined
      // TODO: add the other fields
    };
  }

  calculateFootprint(data: CalculatorData): number {
    // return Math.random() * (data.timeOnZoom - data.timeOnZoomWithWebcam + 1) + data.timeOnZoomWithWebcam;
    // TODO: insert formula to calculate the footprint
    return this.calculateKWh(this.c.screenShare) * data.screenShareTime
         + this.calculateKWh(this.c.webcam) * data.webcamTime
         + this.calculateKWh(this.c.voip) * data.listeningTime;
  }

  /**
   * Helper function that calculates how much kWh (kilowatt hours) per GB are used during 1 hour.
   * @param bandwidth Provided bandwidth in kbps.
   */
  calculateKWh(bandwidth: number): number {
    return (bandwidth / (8 * 1000 * 100)) * 60 * 60 * this.c.electricityIntensity;
  }
}
