import { createMuiTheme } from "@material-ui/core/styles";
import { blueGrey, lightGreen } from "@material-ui/core/colors";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#8eacbb",
      main: "#607d8b",
      dark: "#34515e",
      contrastText: "#fff",
    },
    secondary: {
      light: "rgba(#001B5B, 0.2)",
      main: "#001B5B",
      dark: "#02163B",
      contrastText: "#000",
    },
    white: "#fff",
    openTitle: "#001B5B",
    protectedTitle: "#0e37e0",
    type: "light",
  },
});

export default theme;
