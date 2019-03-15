import { useAverageServiceTime } from "./useAverageServiceTime";
import moment from "moment";

export const useEstimatedWait = (numbersAhead: number) => {
  const averageServiceTime = useAverageServiceTime();
  return moment.duration(averageServiceTime * numbersAhead);
};
