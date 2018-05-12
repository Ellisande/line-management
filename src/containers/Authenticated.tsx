import * as React from "react";
import * as firebase from "firebase";
import { AuthListener, SignIn, FirebaseApp } from "fire-fetch";
import { Style } from "../styles/ThemeProvider";

// take in children
// render children if and if only the use is logged in
// otherwise render a login page

// const provider = new firebase.auth.GoogleAuthProvider();
const LoggedOut: React.SFC<{}> = () => {
  return (
    <Style buildStyles={() => ({})}>
      {styles => (
        <FirebaseApp>
          {app => (
            <SignIn>
              {({ signInProvider }) => {
                const handleSignIn = () => {
                  console.log(signInProvider);
                  const provider = new firebase.auth.GoogleAuthProvider();
                  app.auth().signInWithRedirect(provider);
                  //   signInProvider(provider, false);
                };
                return <button onClick={handleSignIn}>Sign in</button>;
              }}
            </SignIn>
          )}
        </FirebaseApp>
      )}
    </Style>
  );
};

const Authenticated: React.SFC<{ children: JSX.Element }> = ({ children }) => {
  return (
    <AuthListener>{user => (user ? children : <LoggedOut />)}</AuthListener>
  );
};

export { Authenticated };
