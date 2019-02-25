import { createMuiTheme } from '@material-ui/core/styles';

export default createMuiTheme({
  typography: {
    // Use the system font instead of the default Roboto font.
    htmlFontSize: 10,
    fontFamily: [
      '"Comic Sans MS", cursive, sans-serif',
    ].join(','),
  },
});
