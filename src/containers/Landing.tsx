import * as React from "react";
import { Theme, defaultTheme } from "../styles/theme";
import { Style, ThemeProvider } from "../styles/ThemeProvider";
import { css } from "aphrodite";
import { Link } from "react-router-dom";
import { FirebaseQuery } from "fire-fetch";

// interface Props {
//   filteredLineNames: string[];
//   filterLines: (searchBy: string) => void;
// }

const logoStyles = ({ colors, font }: Theme) => ({
  logo: {
    color: colors.text.important,
    fontSize: font.size.large
  }
});

const Logo: React.SFC<{}> = () => (
  <Style buildStyles={logoStyles}>
    {styles => <div className={css(styles.logo)}>Line Management</div>}
  </Style>
);

const whatWeDoStyles = ({ colors, font }: Theme) => ({
  description: {
    color: colors.text.secondary,
    fontSize: font.size.small
  }
});
const WhatWeDo: React.SFC<{}> = () => (
  <Style buildStyles={whatWeDoStyles}>
    {styles => (
      <div className={css(styles.description)}>
        We make waiting in line easy. Take a number, and we'll tell you when
        your number is called.
      </div>
    )}
  </Style>
);

interface LineListProps {
  lineNames: string[];
}

const lineListStyles = ({ colors, links, font }: Theme) => ({
  list: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    alignItems: "center",
    listStyleType: "none",
    margin: "0",
    padding: "0"
  },
  lineLink: {
    fontSize: font.size.normal,
    color: colors.text.important,
    textDecoration: links.textDecoration,
    marginBottom: "3px",
    ":hover": {
      filter: "invert(100%)",
      transition: "all 0.3s ease-in"
    }
  }
});

const LineList: React.SFC<LineListProps> = ({ lineNames }) => (
  <Style buildStyles={lineListStyles}>
    {styles => (
      <ul className={css(styles.list)}>
        {lineNames.map(lineName => (
          <li key={lineName}>
            <Link to={`/line/${lineName}`} className={css(styles.lineLink)}>
              {lineName}
            </Link>
          </li>
        ))}
      </ul>
    )}
  </Style>
);

const landingStyles = ({
  colors: { background, text },
  font,
  separators
}: Theme) => ({
  page: {
    color: text.primary,
    backgroundColor: background,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100vh"
  },
  available: {
    color: text.primary,
    fontSize: font.size.normal,
    borderBottom: `1px solid ${separators.color}`,
    marginBottom: "5px"
  },
  lines: {
    marginTop: "20px"
  }
});

const Landing: React.SFC<{}> = () => {
  return (
    <ThemeProvider value={defaultTheme}>
      <Style buildStyles={landingStyles}>
        {styles => (
          <FirebaseQuery path="/" on={true}>
            {allLines => {
              const lineNames = Object.keys(allLines || {});
              return (
                <div className={css(styles.page)}>
                  <Logo />
                  <WhatWeDo />
                  <div className={css(styles.lines)}>
                    <div className={css(styles.available)}>Available Lines</div>
                    <LineList lineNames={lineNames} />
                  </div>
                </div>
              );
            }}
          </FirebaseQuery>
        )}
      </Style>
    </ThemeProvider>
  );
};

export { Landing };
