interface TextColors {
  primary: string;
  secondary: string;
  important: string;
  error: string;
}

interface ButtonColors {
  primary: string;
  cancel: string;
  secondary: string;
  tertiary: string;
  disabled: string;
  option: string;
}

interface ButtonBorders {
  borderWidth: string;
  borderRadius: string;
}

interface ButtonPadding {
  paddingLeft: string;
  paddingRight: string;
}

interface InputBorders {
  borderWidth: string;
  borderRadius: string;
}

interface InputPadding {
  paddingLeft: string;
  paddingRight: string;
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
    xl: string;
    large: string;
    normal: string;
    small: string;
    tiny: string;
  };
}

interface Separators {
  color: string;
}

export interface Theme {
  colors: Colors;
  buttons: {
    borderOptions: ButtonBorders;
    paddingOptions: ButtonPadding;
  };
  inputs: {
    borderOptions: InputBorders;
    paddingOptions: InputPadding;
  };
  links: Link;
  font: Font;
  separators: Separators;
}

const defaultTheme: Theme = {
  colors: {
    text: {
      primary: "white",
      secondary: "#dddddd",
      important: "#3de57b",
      error: "#e2544c"
    },
    button: {
      primary: "#008E43",
      secondary: "#483E56",
      cancel: "#AA3F39",
      tertiary: "#8E6D97",
      disabled: "#a0a0a0",
      option: '#AA3F39'
    },
    lowLight: "#0A020F",
    background: "#331D44",
    highLight: "#B09DC2",
    outThere: "#875975"
  },
  buttons: {
    borderOptions: {
      borderWidth: "0",
      borderRadius: "4rem"
    },
    paddingOptions: {
      paddingRight: "2rem",
      paddingLeft: "2rem"
    }
  },
  inputs: {
    borderOptions: {
      borderWidth: "0",
      borderRadius: "1rem"
    },
    paddingOptions: {
      paddingRight: "2rem",
      paddingLeft: "2rem"
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
      huge: "7rem",
      xl: '4rem',
      large: "3rem",
      normal: "2rem",
      small: "1.5rem",
      tiny: "0.8rem"
    }
  },
  separators: {
    color: "dimgrey"
  }
};

export { defaultTheme };
