import Routine from "./IRoutine";

interface Day {
    Namn: string;
    Datum: string;
    Rutiner: Routine[];
    Anledning: string;
  }
  export default Day;