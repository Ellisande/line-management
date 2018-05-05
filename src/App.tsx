import * as React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { FirebaseProvider, RootRef } from "fire-fetch";

import Manage from "./containers/Manage";
import config from "./firebaseConfig";
import { User } from "./containers/User";
import { Navigation } from "./containers/Navigation";
import Terminal from "./containers/Terminal";
import Dashboard from "./containers/Dashboard";
import { ThemeProvider, Style } from "./styles/ThemeProvider";
import { defaultTheme, Theme } from "./styles/theme";
import { css } from "aphrodite";

const styleBuilder = ({ colors: { background } }: Theme) => ({
  pageLayout: {
    backgroundColor: background,
    height: "100vh"
  }
});

class App extends React.Component {
  render() {
    return (
      <FirebaseProvider config={config}>
        <Router>
          <div>
            <Route path="/:line_name/">
              {({ match }) => (
                <RootRef path={`/${match.params.line_name}`}>
                  <ThemeProvider value={defaultTheme}>
                    <Style buildStyles={styleBuilder}>
                      {styles => (
                        <div className={css(styles.pageLayout)}>
                          <Navigation />
                          <Switch>
                            <Route
                              path={`${match.url}/manage`}
                              exact={true}
                              component={Manage}
                            />
                            <Route
                              path={`${match.url}/terminal`}
                              exact={true}
                              component={Terminal}
                            />
                            <Route
                              path={`${match.url}/dashboard`}
                              exact={true}
                              component={Dashboard}
                            />
                            <Route
                              path={`${match.url}`}
                              exact={true}
                              component={User}
                            />
                          </Switch>
                        </div>
                      )}
                    </Style>
                  </ThemeProvider>
                </RootRef>
              )}
            </Route>
          </div>
        </Router>
      </FirebaseProvider>
    );
  }
}

export default App;
