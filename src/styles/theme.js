import {createMuiTheme} from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#ffcc33',
      light: '#ffedb5',
      extraLight: '#fff8e2',
      darkerYellow: '#f5b800',
      darkGray: '#3d3d3d',
      midGray: '#5e5e5e',
      offWhite: '#fafafa',
      redDot: '#ff1717',
      almostBlack: 'rgba(0, 0, 0, 0.87)',
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
