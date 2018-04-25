import * as React from "react";

import AcceptingNumbersProvider from "../providers/AcceptingNumbersProvider";
import NumberDispenser from "./NumberDispenser";
import Serving from "../presentational/Serving";
import WaitProvider from "../providers/WaitProvider";
import CurrentQueuerProvider from "../providers/CurrentQueuerProvider";

const Terminal: React.SFC<{}> = () => {
  return (
    <div>
      <AcceptingNumbersProvider>
        {accepting =>
          !accepting ? (
            <div>We are not accepting numbers</div>
          ) : (
            <NumberDispenser onDispense={() => undefined} />
          )
        }
      </AcceptingNumbersProvider>
      <CurrentQueuerProvider>
        {currentQueuer =>
          currentQueuer ? (
            <WaitProvider>
              {waitTime => (
                <Serving
                  currentNumber={currentQueuer.number}
                  estimatedWait={waitTime}
                />
              )}
            </WaitProvider>
          ) : (
            <div>Loading</div>
          )
        }
      </CurrentQueuerProvider>
    </div>
  );
};

export default Terminal;
