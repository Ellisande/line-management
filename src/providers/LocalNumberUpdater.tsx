import * as React from "react";
import { LineNameConsumer } from "./LineName";

export interface Updater {
  (takenNumberId: string): void;
}

export interface Remover {
  (): void;
}

interface Props {
  children: (updater: Updater, remover: Remover) => JSX.Element;
}

const LocalNumberUpdater: React.SFC<Props> = ({ children }) => {
  return (
    <LineNameConsumer>
      {lineName => {
        const storageKey = `${lineName}:number`;
        const updater = (nextId: string) =>
          localStorage.setItem(storageKey, nextId);
        const remover = () => localStorage.removeItem(storageKey);
        return children(updater, remover);
      }}
    </LineNameConsumer>
  );
};

export default LocalNumberUpdater;
