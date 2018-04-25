import * as React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { StyleSheet, css } from "aphrodite";
import { FirebaseProvider, RootRef } from "fire-fetch";

import Manage from "./containers/Manage";
import config from "./firebaseConfig";
import { User } from "./containers/User";

const linkStyles = StyleSheet.create({
  linkList: {
    display: "flex",
    width: "100%",
    justifyContent: "flex-end",
    paddingBottom: "15px"
  }
});

class App extends React.Component {
  render() {
    return (
      <FirebaseProvider config={config}>
        <Router>
          <div>
            <Route
              path="/:aLine"
              render={({ match }) => (
                <RootRef path={`/${match.params.aLine}`}>
                  <div>
                    <Route
                      path={`${match.url}`}
                      render={() => (
                        <div className={css(linkStyles.linkList)}>
                          <Link to="manage">Manage Line</Link>
                        </div>
                      )}
                    />
                    <Route
                      path={`${match.url}`}
                      exact={true}
                      component={User}
                    />
                    <Route path={`${match.url}/manage`} component={Manage} />
                  </div>
                </RootRef>
              )}
            />
          </div>
        </Router>
      </FirebaseProvider>
    );
  }
}

export default App;
