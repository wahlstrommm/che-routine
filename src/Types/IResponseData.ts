import { Routine } from "../Types/types";

interface ResponseData {
    Namn: string;
    Datum: string;
    Rutiner?: Routine[] | undefined; // 
    SenastSparad: string; 
    Anledning: string;
    index: number;
    // ... other properties ...
  }