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
      }
    },
)

ReactDOM.render(
    <div>
        <MuiThemeProvider theme={theme}>
            <App />
      </MuiThemeProvider>
    </div>,
    document.getElementById('root')
);

serviceWorker.unregister();