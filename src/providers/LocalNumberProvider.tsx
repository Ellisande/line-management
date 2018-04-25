import * as React from "react";

interface Props {
  path: string;
  children: (id?: string) => JSX.Element;
}

const LocalNumberProvider: React.SFC<Props> = ({ children, path }) =>
  children(localStorage.getItem(`${path}:number`) || undefined);

export default LocalNumberProvider;
