declare namespace State {
  interface stats {
    numberofreports: string;
    numberofanomalies: string;
    numberofvehicles: string;
  }
  type statName = "numberofreports" | "numberofanomalies" | "numberofvehicles";
}
