import * as React from 'react';
import * as moment from 'moment';
import SkipNumberUpdater from './SkipNumberUpdater';

interface SkipProps {
    path: string;
    idToSkip: string;
    children: React.ReactNode;
}

const SkipNumber: React.SFC<SkipProps> = ({ children, idToSkip, path }) => (
    <SkipNumberUpdater path={path} id={idToSkip}>
        {onSkip => <button onClick={() => onSkip(moment().format())}>{children}</button>}
    </SkipNumberUpdater>
);

export default SkipNumber;
