import * as React from 'react';

import LineCountProvider from './LineCountProvider';

interface Props {
    numberToCheck: number;
    path: string;
    children: (count: number) => JSX.Element;
}

const NumbersAheadProvider: React.SFC<Props> = ({ path, children, numberToCheck }) => {
    return (
        <LineCountProvider path={path} stopAt={numberToCheck}>
            {
                (count: number) => children(count)
            }
        </LineCountProvider>
    );
};

export default NumbersAheadProvider;