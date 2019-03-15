import { useLineData } from "./useLineData";
import { useQueuer } from "./useQueuer";

export const useCurrentQueuer = () => {
  const currentQueuerId = useLineData("current");
  return useQueuer(currentQueuerId);
};
