import * as React from 'react';
import * as moment from 'moment';

import CurrentQueuerProvider from '../providers/CurrentQueuerProvider';
import MarkServedProvider from '../providers/MarkServedProvider';
import CallNextNumberProvider from '../providers/CallNextNumberProvider';
import MarkDone from '../presentational/MarkDone';
import AverageNumberTime from '../containers/AverageNumberTime';
import SkipNumber from '../containers/SkipCurrentNumber';
import AcceptingNumbersProvider from '../providers/AcceptingNumbersProvider';
import AcceptingNumbersUpdater from '../providers/AcceptingNumbersUpdater';
import EverythingRemover from '../providers/EverythingRemover';

interface AcceptNumbersProps {
    onStartAccepting: () => void;
  }
  
interface StopAcceptingNumbersProps {
    onStopAccepting: () => void;
}

const StartAccepting: React.SFC<AcceptNumbersProps> =
  ({ onStartAccepting }) => <button onClick={onStartAccepting}>Start Accepting Numbers</button>;

const StopAccepting: React.SFC<StopAcceptingNumbersProps> =
  ({ onStopAccepting }) => <button onClick={onStopAccepting}>Stop Accepting Numbers</button>;

const StartStopNumbers: React.SFC<{}> = () => (
    <AcceptingNumbersUpdater>
        {
        (startAccepting, stopAccepting) => (
        <AcceptingNumbersProvider>
            {
            accepting => accepting ?
            <StopAccepting onStopAccepting={() => stopAccepting(moment().format())} /> :
            <StartAccepting onStartAccepting={() => startAccepting(moment().format())}/>
            }
        </AcceptingNumbersProvider>
        )}
    </AcceptingNumbersUpdater>
);

interface ResetNumbersProps {
    onResetNumbers: () => void;
  }
  
const ResetNumbers: React.SFC<ResetNumbersProps> = () => (
    <EverythingRemover>
        {removeEverything => <button onClick={removeEverything}>Reset All Numbers</button>}
    </EverythingRemover>
);

const Manage: React.SFC<{}> = () => {
    return (
        <div>
        <CurrentQueuerProvider>
          {
            (currentQueuer, id) => currentQueuer && id ? (
              <MarkServedProvider>
                {
                  markCurrentComplete => (
                    <CallNextNumberProvider>
                      {
                        pullNext =>
                        <MarkDone
                          markAsDone={markCurrentComplete}
                          pullNextNumber={pullNext}
                          currentNumber={currentQueuer.number}
                        />
                      }
                    </CallNextNumberProvider>
                  )
                }
              </MarkServedProvider>
            ) : <div>Loading... fix me later</div>
          }
        </CurrentQueuerProvider>
        <AverageNumberTime />
        <SkipNumber />
        <StartStopNumbers />
        <ResetNumbers onResetNumbers={() => undefined}/>
      </div>
    );
};

export default Manage;