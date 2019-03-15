import { useLineData } from "./useLineData";

export const useAcceptingNumbers = () => {
  const startedAcceptingAt = useLineData("startedAcceptingAt");
  const stoppedAcceptingAt = useLineData("stoppedAcceptingAt");
  return Boolean(startedAcceptingAt && !stoppedAcceptingAt);
};
