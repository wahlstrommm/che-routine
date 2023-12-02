interface ResponseData {
    Namn: string;
    Datum: string;
    Rutiner: any[]; // replace 'any' with the actual type of Rutiner if possible
    SenastSparad: string; // Update the type for SenastSparad
    Anledning: string;
    index: number;
    // ... other properties ...
  }