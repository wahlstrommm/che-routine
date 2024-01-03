import {IRoutine} from "./IRoutine";

export interface Day {
    Namn: string;
    Datum: string;
    Rutiner: IRoutine[];
    Anledning: string;
  }
  