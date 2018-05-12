import * as React from "react";
import { AuthListener, SignIn, FirebaseApp } from "fire-fetch";
import { Style } from "../styles/ThemeProvider";
import { Theme } from "../styles/theme";
import { css } from "aphrodite";

const signInStyleBuilder = ({ colors, buttons, font }: Theme) => ({
  signIn: {
    ...buttons.borderOptions,
    color: colors.text.primary,
    backgroundColor: colors.button.primary,
    fontSize: font.size.large
  },
  layout: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "30vh"
  }
});

const LoggedOut: React.SFC<{}> = () => {
  return (
    <Style buildStyles={signInStyleBuilder}>
      {styles => (
        <FirebaseApp>
          {app => (
            <SignIn>
              {({ signInProvider }) => {
                const handleSignIn = () => {
                  // @ts-ignore

                  const provider: firebase.auth.AuthProvider = new app.firebase_.auth.GoogleAuthProvider();
                  signInProvider(provider, true);
                };
                return (
                  <div className={css(styles.layout)}>
                    <button
                      className={css(styles.signIn)}
                      onClick={handleSignIn}
                    >
                      Sign in
                    </button>
                  </div>
                );
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
