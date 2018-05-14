import * as React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
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
import { Landing } from "./containers/Landing";
import { LineNameProvider } from "./providers/LineName";

const styleBuilder = ({ colors: { background, text }, font }: Theme) => ({
  pageLayout: {
    backgroundColor: background,
    height: "100vh",
    color: text.primary,
    fontSize: font.size.normal
  }
});

class App extends React.Component {
  render() {
    return (
      <FirebaseProvider config={config}>
        <Router>
          <Switch>
            <Route path="/line/:line_name">
              {({ match }) => (
                <RootRef path={`/${match.params.line_name}`}>
                  <LineNameProvider value={`/${match.params.line_name}`}>
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
                  </LineNameProvider>
                </RootRef>
              )}
            </Route>
            <Route path="/" exact={true}>
              {() => <Landing />}
            </Route>
            <Redirect to="/" />
          </Switch>
        </Router>
      </FirebaseProvider>
    );
  }
}

export default App;
