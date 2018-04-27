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
  children: (ref: {}) => JSX.Element;
}

interface RootRefProps extends Children, Path {}
interface QueryProps extends Path {
  children: (value: {} | undefined, loading: boolean, ref: any) => JSX.Element;
  toArray?: boolean;
  on?: boolean;
  reference?: any;
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

declare module "fire-fetch" {
  export class FirebaseProvider extends React.Component<
    FirebaseProviderProps,
    {}
  > {}
  export class RootRef extends React.Component<RootRefProps, {}> {}
  export class FirebaseQuery extends React.Component<QueryProps, {}> {}
  export class FirebaseRef extends React.Component<RefProps, {}> {}
  export class FirebaseApp extends React.Component<FBAppProps, {}> {}
  export class GetRootRef extends React.Component<GetRootRefProps, {}> {}
}
