import * as React from "react";
import { StyleSheet, css } from "aphrodite";
import { Route, Switch } from "react-router";
import { Link } from "react-router-dom";

const styles = StyleSheet.create({
  navLayout: {
    display: "flex",
    width: "95vw",
    justifyContent: "flex-end",
    marginBottom: "15px"
  },
  linkList: {
    display: "flex",
    justifyContent: "flex-end",
    ":nth-child(n) * + *": {
      marginLeft: "10px"
    }
  }
});

interface SetOpen {
  (shouldBeOpen: boolean): void;
}

interface CollapsableProps {
  openInitially: boolean;
  children: (isOpen: boolean, setOpen: SetOpen) => JSX.Element;
}

interface CollapsableState {
  isOpen: boolean;
}

class Collapsable extends React.Component<CollapsableProps, CollapsableState> {
  constructor(props: CollapsableProps) {
    super(props);
    this.state = {
      isOpen: props.openInitially
    };
    this.handleSetOpen = this.handleSetOpen.bind(this);
  }

  handleSetOpen(shouldBeOpen: boolean) {
    this.setState(() => ({
      isOpen: shouldBeOpen
    }));
  }

  render() {
    return this.props.children(this.state.isOpen, this.handleSetOpen);
  }
}

// TODO: Remove the current page link
const LinkList: React.SFC<{ basePath: string }> = ({ basePath }) => (
  <ul className={css(styles.linkList)}>
    <Link to={`${basePath}`}>User</Link>
    <Link to={`${basePath}/manage`}>Manage</Link>
    <Link to={`${basePath}/terminal`}>Terminal</Link>
    <Link to={`${basePath}/dashboard`}>Dashboard</Link>
  </ul>
);

const UserLink: React.SFC<{ basePath: string }> = ({ basePath }) => (
  <Link to={basePath}>User View</Link>
);

const Navigation: React.SFC<{}> = () => {
  return (
    <Route path="/:line_name/">
      {({ match: { params, url } }) => (
        <div>
          <Switch>
            <Route path={`${url}/manage`} exact={true}>
              {() => (
                <div className={css(styles.navLayout)}>
                  <UserLink basePath={url} />
                </div>
              )}
            </Route>
            <Route>
              {({ match: { url: baseUrl } }) => (
                <Collapsable openInitially={false}>
                  {(isOpen, setOpen) => (
                    <div
                      className={css(styles.navLayout)}
                      onClick={() => setOpen(!isOpen)}
                    >
                      {isOpen ? (
                        <LinkList basePath={baseUrl} />
                      ) : (
                        <div>I am a nav</div>
                      )}
                    </div>
                  )}
                </Collapsable>
              )}
            </Route>
          </Switch>
        </div>
      )}
    </Route>
  );
};

export { Navigation };
