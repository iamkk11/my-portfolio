import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { MuiThemeProvider,createMuiTheme} from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#D2691E'
    }
  },

  overrides: {
    MuiOutlinedInput: {
      root: {
        // position: 'relative',
        // '& $notchedOutline': {
        //   borderColor: 'rgba(0, 0, 0, 0.23)', //Outline color
        //   borderWidth: 1.8,
        // },
        '&:hover:not($disabled):not($focused):not($error) $notchedOutline': {
          borderColor: '#4A90E2',
          borderWidth: 2.1,

          // Reset on touch devices, it doesn't add specificity
          '@media (hover: none)': {
              borderColor: 'rgba(0, 0, 0, 0.23)',
          },
        },
        // '&$focused $notchedOutline': {
        //     borderColor: '#D2691E',
        //     borderWidth: 1.8,
        // },
      },
    }
  }

})

ReactDOM.render(
    <div>
        <MuiThemeProvider theme={theme}>
            <App />
      </MuiThemeProvider>
    </div>,
    document.getElementById('root')
);

serviceWorker.unregister();