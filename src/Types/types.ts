export interface Routine {
  // Ange strukturen för rutinlistan baserat på dina data
  // Exempelvis: 
  // property1: string;
  // property2: number;
  // ...
  // Justera strukturen efter dina behov.
  date: string; // Assuming date is a string representing the month
  week: number; // Assuming week is a number representing the week
  day: string;  // Assuming day is a string representing the day
  [property: string]: any;
}