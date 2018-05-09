interface TextColors {
  primary: string;
  secondary: string;
  important: string;
}

interface ButtonColors {
  primary: string;
  cancel: string;
  secondary: string;
  tertiary: string;
}

interface ButtonBorders {
  borderWidth: string;
  borderRadius: string;
}

interface Colors {
  text: TextColors;
  button: ButtonColors;
  lowLight: string;
  highLight: string;
  background: string;
  outThere: string;
}

interface Link {
  colors: {
    default: string;
    visited: string;
    active: string;
  };
  textDecoration: string;
}

interface Font {
  size: {
    huge: string;
    large: string;
    normal: string;
    small: string;
    tiny: string;
  };
}

interface Separators {
  color: string;
}

interface Theme {
  colors: Colors;
  buttons: {
    borderOptions: ButtonBorders;
  };
  links: Link;
  font: Font;
  separators: Separators;
}

const defaultTheme: Theme = {
  colors: {
    text: {
      primary: "white",
      secondary: "dimgrey",
      important: "#3de57b"
    },
    button: {
      primary: "#008E43",
      secondary: "#483E56",
      cancel: "#AA3F39",
      tertiary: "#8E6D97"
    },
    lowLight: "#0A020F",
    background: "#331D44",
    highLight: "#B09DC2",
    outThere: "#875975"
  },
  buttons: {
    borderOptions: {
      borderWidth: "0",
      borderRadius: "6px"
    }
  },
  links: {
    colors: {
      default: "orange",
      visited: "green",
      active: "purple"
    },
    textDecoration: "none"
  },
  font: {
    size: {
      huge: "70px",
      large: "40px",
      normal: "25px",
      small: "10px",
      tiny: "4px"
    }
  },
  separators: {
    color: "dimgrey"
  }
};

export { defaultTheme, Theme };
