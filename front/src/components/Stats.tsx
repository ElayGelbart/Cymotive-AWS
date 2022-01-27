import { useCallback, useState } from "react";
import axios from "axios";
const initStats = {
  numberofreports: "Number Of Reports",
  numberofanomalies: "Number Of Anomalies",
  numberofvehicles: "Number Of Vehicles",
};
export default function Stats() {
  const [stats, setStats] = useState<State.stats>(initStats);
  const getNumOfFromLambda = useCallback(
    async (numOfWhat: State.statName) => {
      try {
        const response = await axios.get(
          `https://vhqy0gu1x1.execute-api.eu-west-1.amazonaws.com/dev/${numOfWhat}`
        );
        const answer = await response.data;
        const newStats = { ...stats };
        newStats[numOfWhat] = answer;
        return setStats(newStats);
      } catch (err) {
        console.log(err);
      }
    },
    [stats]
  );
  return (
    <div id="statsDiv">
      <p
        className="button"
        onClick={() => {
          getNumOfFromLambda("numberofreports");
        }}
      >
        <span>{String(stats.numberofreports)}</span>
      </p>
      <p
        className="button"
        onClick={() => {
          getNumOfFromLambda("numberofvehicles");
        }}
      >
        <span>{String(stats.numberofvehicles)}</span>
      </p>
      <p
        className="button"
        onClick={() => {
          getNumOfFromLambda("numberofanomalies");
        }}
      >
        <span>{String(stats.numberofanomalies)}</span>
      </p>
    </div>
  );
}
