/** @jsx jsx */
import { jsx } from "@emotion/core";
import { Theme } from "../../theme/theme";
import { useStyle } from "../../theme/useStyle";
import { Link } from "react-router-dom";

interface LineListProps {
  lineNames: string[];
}

const listStyle = () => ({
  width: "100%",
  display: "flex",
  flexDirection: "column-reverse",
  flexWrap: "wrap",
  alignItems: "center",
  listStyleType: "none",
  margin: "0",
  padding: "0"
});

const linkLinkStyle = ({ colors, links, font }: Theme) => ({
  fontSize: font.size.normal,
  color: colors.text.important,
  textDecoration: links.textDecoration,
  marginBottom: "3px",
  ":hover": {
    filter: "invert(100%)",
    transition: "all 0.3s ease-in"
  }
});

export const LineList: React.SFC<LineListProps> = ({ lineNames }) => {
  const linkStyle = useStyle(linkLinkStyle);
  const list = useStyle(listStyle);
  return (
    <ul css={list}>
      {lineNames.map(lineName => (
        <li key={lineName}>
          <Link to={`/line/${lineName}`} css={linkStyle}>
            {lineName}
          </Link>
        </li>
      ))}
    </ul>
  );
};
