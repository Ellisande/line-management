import { createContext, useContext } from "react";

export const LineNameContext = createContext<string | undefined>(undefined);

export const useLineName = () => useContext(LineNameContext);
