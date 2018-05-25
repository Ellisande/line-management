declare module "fire-fetch" {
  import firebase = require("firebase/app");

  interface Children {
    children: JSX.Element;
  }

  interface FirebaseProviderProps extends Children {
    config: {};
  }

  interface Path {
    path: string;
  }

  interface RefProps extends Path {
    children: (ref: firebase.database.Reference) => JSX.Element;
  }

  interface RootRefProps extends Children, Path {}
  interface QueryProps extends Path {
    children: (
      value: {} | undefined,
      loading: boolean,
      ref: any
    ) => JSX.Element;
    toArray?: boolean;
    on?: boolean | string;
    reference?: firebase.database.Reference;
    once?: boolean;
    orderByChild?: string;
    equalTo?: any;
    limitToLast?: number;
    onChange?: () => {};
  }

  interface FBAppProps {
    children: (app: firebase.app.App) => JSX.Element;
  }

  interface GetRootRefProps {
    children: (rootPath: string) => JSX.Element;
  }

  interface AuthProps {
    children: (user?: firebase.User) => JSX.Element;
  }

  interface SignInToProvider {
    (provider: firebase.auth.AuthProvider, shouldRedirect: boolean): void;
  }

  interface SignInOptions {
    signInProvider: SignInToProvider;
  }

  interface SignInProps {
    children: (signInOptions: SignInOptions) => JSX.Element;
  }

  interface UserProps {
    children: (user?: firebase.User) => JSX.Element;
  }

  export class FirebaseProvider extends React.Component<
    FirebaseProviderProps,
    {}
  > {}
  export class RootRef extends React.Component<RootRefProps, {}> {}
  export class FirebaseQuery extends React.Component<QueryProps, {}> {}
  export class FirebaseRef extends React.Component<RefProps, {}> {}
  export class FirebaseApp extends React.Component<FBAppProps, {}> {}
  export class GetRootRef extends React.Component<GetRootRefProps, {}> {}
  export class AuthListener extends React.Component<AuthProps, {}> {}
  export class SignIn extends React.Component<SignInProps, {}> {}
  export class User extends React.Component<UserProps, {}> {}
}
