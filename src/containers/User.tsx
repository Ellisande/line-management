import * as React from "react";
import UserWithNumber from "./UserWithNumber";
import UserWithoutNumber from "./UserWithoutNumber";
import LocalQueuerProvider from "../providers/LocalQueuerProvider";
import LocalNumberUpdater from "../providers/LocalNumberUpdater";

const User: React.SFC<{}> = () => {
  return (
    <LocalNumberUpdater>
      {setLocalNumber => (
        <LocalQueuerProvider>
          {(queuer, id, refresh) => {
            if (queuer && id) {
              return <UserWithNumber onAcknowledge={() => undefined} />;
            }
            const handlerSetLocalNumber = (newId: string) => {
              setLocalNumber(newId);
              if (refresh) {
                refresh();
              }
            };
            return <UserWithoutNumber setLocalNumber={handlerSetLocalNumber} />;
          }}
        </LocalQueuerProvider>
      )}
    </LocalNumberUpdater>
  );
};

export { User };
