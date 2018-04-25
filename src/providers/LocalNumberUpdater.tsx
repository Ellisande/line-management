import * as React from "react";

export interface Updater {
  (takenNumberId: string): void;
}

interface Props {
  path: string;
  children: (updater: Updater) => JSX.Element;
}

const LocalNumberUpdater: React.SFC<Props> = ({ children, path }) => {
  const updater = (nextId: string) =>
    localStorage.setItem(`${path}:number`, nextId);
  return children(updater);
};

export default LocalNumberUpdater;
