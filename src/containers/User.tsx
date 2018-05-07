import * as React from "react";
import UserWithNumber from "./UserWithNumber";
import UserWithoutNumber from "./UserWithoutNumber";
import LocalQueuerProvider from "../providers/LocalQueuerProvider";
import LocalNumberUpdater from "../providers/LocalNumberUpdater";

const User: React.SFC<{}> = () => {
  const lineName = "minefaire";
  return (
    <LocalNumberUpdater path={`/${lineName}`}>
      {setLocalNumber => (
        <LocalQueuerProvider path={`/${lineName}`}>
          {(queuer, id, refresh) => {
            if (queuer && id) {
              return (
                <UserWithNumber
                  lineName={lineName}
                  onAcknowledge={() => undefined}
                />
              );
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
