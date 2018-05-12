import * as React from "react";
import { LineNameConsumer } from "./LineName";

interface Props {
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
    const { children } = this.props;
    return (
      <LineNameConsumer>
        {lineName => {
          const localId =
            localStorage.getItem(`${lineName}:number`) || undefined;
          return children(localId, this.forceUpdate);
        }}
      </LineNameConsumer>
    );
  }
}

export default LocalNumberProvider;
