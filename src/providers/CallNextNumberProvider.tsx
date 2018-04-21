import * as React from 'react';
import * as moment from 'moment';

import CurrentNumberUpdater from '../providers/CurrentNumberUpdater';
import NextNumberProvider from '../providers/NextNumberProvider';
import PullNumberUpdater from '../providers/PullNumberUpdater';

export interface PullNext {
  (): void;
}

interface PullNextNumberProps {
  children: (pullNext: PullNext) => JSX.Element;
}

const CallNextNumberProvider: React.SFC<PullNextNumberProps> =
  ({ children }) => (
    <CurrentNumberUpdater>
      {setCurrentlyBeingServed => (
        <NextNumberProvider>
          {
            (nextNumber, id) => (
              <PullNumberUpdater id={id}>
                {
                  setPulledAt => {
                    if (!nextNumber && !id) {
                      return <div>Loading</div>;
                    }
                    const pullNext = () => {
                      setCurrentlyBeingServed(id);
                      setPulledAt(moment().format());
                    };
                    return children(pullNext);
                  }
                }
              </PullNumberUpdater>
            )
          }
        </NextNumberProvider>  
      )}
    </CurrentNumberUpdater>
  );

export default CallNextNumberProvider;