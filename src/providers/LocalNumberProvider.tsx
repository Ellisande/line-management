import * as React from "react";

interface Props {
  path: string;
  children: (id?: string, refresh?: () => void) => JSX.Element;
}

interface State {
  localId?: string;
}

class LocalNumberProvider extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.forceUpdate = this.forceUpdate.bind(this);
  }

  render() {
    const { children, path } = this.props;
    const localId = localStorage.getItem(`${path}:number`) || undefined;
    return children(localId, this.forceUpdate);
  }
}

export default LocalNumberProvider;
