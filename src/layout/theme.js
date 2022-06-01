import { createTheme } from '@mui/material/styles'
import { red } from '@mui/material/colors'

// Create a theme instance.
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#f44336',
    },
    secondary: {
      main: '#f50057',
    },
    error: {
      main: '#ffc107',
    },
    warning: {
      main: '#ffeb3b',
    },
  },
  shape: {
    borderRadius: 4,
  },
  props: {
    MuiAppBar: {
      color: 'transparent',
      elevation: 1,
    },
  },
})

export default theme
