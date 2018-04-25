import * as React from 'react';
import UserWithNumber from './UserWithNumber';
import UserWithoutNumber from './UserWithoutNumber';
import LocalQueuerProvider from '../providers/LocalQueuerProvider';

const User: React.SFC<{}> = () => {
    const lineName = 'minefaire';
    return (
        <LocalQueuerProvider path={`/${lineName}`}>
            {
                (queuer, id) => queuer && id ?
                    <UserWithNumber lineName={lineName} onAcknowledge={() => undefined}/> :
                    <UserWithoutNumber />
            }
        </LocalQueuerProvider>
    );
};

export {User};