import {Injectable} from '@angular/core';

export interface ZoomData {
  screenShareTime: number;
  webcamTime: number;
  listeningTime: number;
}
export interface CEmissionData {
  usage: number;
  lifeSpan: number;
  lifeTimeEmission: number;
}
interface Constants {
  electricityIntensity: number; // in kWh/GB
  kwhTokgCO2: number; // in kWh/kGCO2
  voip: number; // in kbps
  webcam: number; // in kbps
  screenShare: number; // in kbps
  durationOfAYear: number;
  dailyUsage: number;
}
@Injectable({
  providedIn: 'root'
})
export class CalculatorService {

  c: Constants;

  constructor() {
    this.c = {
      electricityIntensity: 0.015,
      kwhTokgCO2: 0.205,
      voip: 60,
      webcam: 600,
      screenShare: 50,
      durationOfAYear: 365.25,
      dailyUsage: 8
    };
  }

  createEmptyZoomData(): ZoomData {
    return {
      listeningTime: undefined,
      screenShareTime: undefined,
      webcamTime: undefined
    };
  }

  createEmptyCEmissionData(): CEmissionData {
    return {
      lifeSpan: undefined,
      lifeTimeEmission: undefined,
      usage: undefined
    };
  }

  /**
   * Calculates the zoom emissions in kgCO2 given the data.
   * @param data Emission Data provided by the user
   */
  calculateZoomFootprint(data: ZoomData): number {
    const val = (this.calculateKWh(this.c.screenShare) * data.screenShareTime
      + this.calculateKWh(this.c.webcam) * data.webcamTime
      + this.calculateKWh(this.c.voip) * data.listeningTime) * this.c.kwhTokgCO2;
    return isNaN(val) ? 0 : val;
  }

  /**
   * Calculates the computer emissions in kgCO2 given the data.
   * @param data Emission Data provided by the user
   */
  calculateComputerEmissions(data: CEmissionData): number {
    const val = (data.lifeTimeEmission * (data.usage / (data.lifeSpan * this.c.durationOfAYear * this.c.dailyUsage)));
    return isNaN(val) ? 0 : val;
  }

  /**
   * Calculates the emissions done by google search queries.
   * @param numberOfQueries number of queries done. Provided by user.
   */
  calculateQueriesEmissions(numberOfQueries: number): number {
    return isNaN(numberOfQueries) ? 0 : ((numberOfQueries * 0.37) / 1000);
  }

  /**
   * Helper function that calculates how much kWh (kilowatt hours) per GB are used during 1 hour.
   * @param bandwidth Provided bandwidth in kbps.
   */
  private calculateKWh(bandwidth: number): number {
    return (bandwidth / (8 * 1000 * 100)) * 60 * 60 * this.c.electricityIntensity;
  }
}
