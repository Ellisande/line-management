import * as React from "react";
import { css } from "aphrodite";
import { Route, Switch } from "react-router";
// import { Link } from "react-router-dom";
import { Style } from "../styles/ThemeProvider";
import { Theme } from "../styles/theme";
import { StyledLink } from "../presentational/StyledLink";

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
const LinkList: React.SFC<{ basePath: string; className: string }> = ({
  basePath,
  className
}) => (
  <ul className={className}>
    <StyledLink to={`${basePath}`}>User</StyledLink>
    <StyledLink to={`${basePath}/manage`}>Manage</StyledLink>
    <StyledLink to={`${basePath}/terminal`}>Terminal</StyledLink>
    <StyledLink to={`${basePath}/dashboard`}>Dashboard</StyledLink>
  </ul>
);

const UserLink: React.SFC<{ basePath: string }> = ({ basePath }) => (
  <StyledLink to={basePath}>User View</StyledLink>
);

const styleBuilder = ({
  colors: { text, button },
  buttons: { borderOptions }
}: Theme) => ({
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
  },
  open: {
    backgroundColor: button.secondary,
    color: text.primary,
    borderWidth: borderOptions.borderWidth,
    borderRadius: borderOptions.borderRadius
  }
});

const Navigation: React.SFC<{}> = () => {
  return (
    <Style buildStyles={styleBuilder}>
      {styles => (
        <Route path="/line/:line_name/">
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
                            <LinkList
                              basePath={baseUrl}
                              className={css(styles.linkList)}
                            />
                          ) : (
                            <button className={css(styles.open)}>
                              Options
                            </button>
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
      )}
    </Style>
  );
};

export { Navigation };
