import * as React from "react";

export const NO_LINE = "none";

const LineNameContext = React.createContext(NO_LINE);

const LineNameProvider = LineNameContext.Provider;
const LineNameConsumer = LineNameContext.Consumer;

export { LineNameConsumer, LineNameProvider };
