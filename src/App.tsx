import * as React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { StyleSheet, css } from 'aphrodite';
import { FirebaseProvider, RootRef } from 'fire-fetch';

import Manage from './containers/Manage';
import Dashboard from './containers/Dashboard';
import UserWithNumber from './containers/UserWithNumber';
import UserWithOutNumber from './containers/UserWithoutNumber';
import Terminal from './containers/Terminal';
import config from './firebaseConfig';

const linkStyles = StyleSheet.create({
  linkList: {
    display: 'flex',
    width: '80%',
    paddingBottom: '15px',
    ':nth-child(n) > *': {
      flex: 1,
      wordBreak: 'keep-all'
    }
  }
});

class App extends React.Component {
  // TODO: Root ref should not be hard coded
  render() {
    return (
      <FirebaseProvider config={config}>
        <Router>
            <div style={{ paddingTop: '20vh', paddingLeft: '10vw' }}>
              <Route
                path="/:aLine"
                render={({ match }) => (
                  <RootRef path={`/${match.params.aLine}`}>
                    <div>
                      <Route
                        path={`${match.url}`}
                        render={() => (
                          <div className={css(linkStyles.linkList)}>
                            <Link to="withNumber">has number</Link>
                            <Link to="withoutNumber">no number</Link>
                            <Link to="manage">manage</Link>
                            <Link to="terminal">terminal</Link>
                            <Link to="dashboard">dashboard</Link>
                          </div>
                        )}
                      />
                      <Route
                        path={`${match.url}/withNumber`}
                        exact={true}
                        component={UserWithNumber}
                      />
                      <Route
                        path={`${match.url}/withOutNumber`}
                        component={UserWithOutNumber}
                      />
                      <Route path={`${match.url}/manage`} component={Manage} />
                      <Route path={`${match.url}/terminal`} component={Terminal} />
                      <Route path={`${match.url}/dashboard`} component={Dashboard} />
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
