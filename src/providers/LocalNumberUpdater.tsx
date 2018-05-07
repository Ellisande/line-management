import * as React from "react";

export interface Updater {
  (takenNumberId: string): void;
}

export interface Remover {
  (): void;
}

interface Props {
  path: string;
  children: (updater: Updater, remover: Remover) => JSX.Element;
}

const LocalNumberUpdater: React.SFC<Props> = ({ children, path }) => {
  const storageKey = `${path}:number`;
  const updater = (nextId: string) => localStorage.setItem(storageKey, nextId);
  const remover = () => localStorage.removeItem(storageKey);
  return children(updater, remover);
};

export default LocalNumberUpdater;
