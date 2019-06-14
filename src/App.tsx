/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useEffect, useState } from "react";
import firebase from "firebase";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { config } from "./firebaseConfig";
import { Landing } from "./components/landing/Landing";
import { FirestoreContext } from "./context/firestoreContext";
import { Options } from "./components/Options";
import { Main } from "./components/Main";
import { FirebaseAuthContext } from "./context/firebaseAuthContext";
import { CreateLine } from "./components/create/CreateLine";

const App = () => {
  const [intialized, setInitialized] = useState(false);
  useEffect(() => {
    firebase.initializeApp(config);
    setInitialized(true);
  }, [config]);
  if (!intialized) {
    return <div>Loading</div>;
  }
  return (
    <Router>
      <FirestoreContext.Provider value={firebase.firestore()}>
        <FirebaseAuthContext.Provider value={firebase.auth()}>
          <Switch>
            <Route path="/create" component={CreateLine} />
            <Route path="/line/:line_name/options" component={Options} />
            <Route path="/line/:line_name" component={Main} />
            <Route path="/" exact={true}>
              <Landing />
            </Route>
          </Switch>
        </FirebaseAuthContext.Provider>
      </FirestoreContext.Provider>
    </Router>
  );
};

export default App;
