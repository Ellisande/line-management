/** @jsx jsx */
import { jsx } from "@emotion/core";
import { LineNameContext } from "../context/lineNameContext";
import { Navigation } from "./Navigation";
import { User } from "./user/User";
import {
  RouterProps,
  RouteProps,
  RouteComponentProps,
  Route,
  Switch
} from "react-router";
import { Theme } from "../theme/theme";
import { useStyle } from "../theme/useStyle";
import { Dashboard } from "./Dashboard";
import { Terminal } from "./Terminal";
import { Manage } from "./Manage";
import { Preferences } from "./preferences/Preferences";

const styleBuilder = ({ colors: { background, text }, font }: Theme) => ({
  pageLayout: {
    backgroundColor: background,
    minHeight: "100vh",
    color: text.primary,
    fontSize: font.size.normal
  }
});

export const Main: React.SFC<RouteComponentProps> = ({ match }) => {
  const params: any = match.params;
  const styles = useStyle(styleBuilder);
  return (
    <LineNameContext.Provider value={params.line_name}>
      <div css={styles.pageLayout}>
        <Navigation />
        <Switch>
          <Route path={`${match.url}/dashboard`}>
            <Dashboard />
          </Route>
          <Route path={`${match.url}/terminal`}>
            <Terminal />
          </Route>
          <Route path={`${match.url}/manage`}>
            <Manage />
          </Route>
          <Route path={`${match.url}/preferences`}>
            <Preferences />
          </Route>
          <Route path={match.url} exact={true}>
            <User />
          </Route>
        </Switch>
      </div>
    </LineNameContext.Provider>
  );
};
