import * as React from "react";
import * as moment from "moment";

import CurrentQueuerProvider from "./CurrentQueuerProvider";
import ServiceNumberUpdater from "./ServiceNumberUpdater";

interface Updater {
  (): void;
}

interface Props {
  children: (
    markCurrentComplete: Updater,
    currentNumber: number
  ) => JSX.Element;
}

const MarkServedProvider: React.SFC<Props> = ({ children }) => (
  <CurrentQueuerProvider>
    {(queuer, id) =>
      queuer && id ? (
        <ServiceNumberUpdater id={id}>
          {serviceNumberUpdater => {
            const updateWithTime: Updater = () =>
              serviceNumberUpdater(moment().format());
            return children(updateWithTime, queuer.number);
          }}
        </ServiceNumberUpdater>
      ) : (
        <button disabled={true}>No current number</button>
      )
    }
  </CurrentQueuerProvider>
);

export default MarkServedProvider;
