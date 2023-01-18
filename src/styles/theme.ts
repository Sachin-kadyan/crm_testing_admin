import { PaletteMode } from '@mui/material';
import { deepPurple, indigo, lightGreen } from '@mui/material/colors';

export const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    primary: {
      dark: indigo[900],
      main: indigo[600],
      light: indigo[400]
    },
    secondary: {
      dark: deepPurple[800],
      main: deepPurple[600],
      light: deepPurple[400]
    },
    background: {
      default: indigo[50]
    }
  }
});
