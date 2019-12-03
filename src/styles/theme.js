import {createMuiTheme} from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: 'hsl(45, 100%, 60%)',
      darkerYellow: '#f5b800',
      darkGray: '#4a4a4a',
      link: '#295bff',
    },
    secondary: {
      main: 'hsl(232, 57%, 26%)',
    },
    error: {
      main: '#eb0000',
      dark: 'hsl(0, 89%, 40%)',
    },
  },
  typography: {
    // useNextVariants: true,
    fontFamily: 'Lato',
  },
});

export default theme;
