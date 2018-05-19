import * as React from "react";
import * as moment from "moment";

import CurrentNumberUpdater from "../providers/CurrentNumberUpdater";
import NextNumberProvider from "../providers/NextNumberProvider";
import PullNumberUpdater from "../providers/PullNumberUpdater";

export interface PullNext {
  (): void;
}

interface PullNextNumberProps {
  children: (pullNext: PullNext) => JSX.Element;
}

/**
 * This component should only update the next number.
 * 1. Grab the next number
 * 2. Mark it pulled
 * 3. Swap that with current
 * Be wary of a race condition where the next number or current changes and then updates this
 */
const CallNextNumberProvider: React.SFC<PullNextNumberProps> = ({
  children
}) => (
  <CurrentNumberUpdater>
    {setCurrentlyBeingServed => (
      <NextNumberProvider>
        {(nextNumber, id) => (
          <PullNumberUpdater id={id}>
            {setPulledAt => {
              if (!nextNumber && !id) {
                return <div>Loading</div>;
              }
              const pullNext = () => {
                setCurrentlyBeingServed(id);
                setPulledAt(moment().format());
              };
              return children(pullNext);
            }}
          </PullNumberUpdater>
        )}
      </NextNumberProvider>
    )}
  </CurrentNumberUpdater>
);

export default CallNextNumberProvider;
