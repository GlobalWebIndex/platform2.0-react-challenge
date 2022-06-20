import { Provider as ReduxProvider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import Store from 'state/store';
import Routes from 'routes';

function App() {
  return (
    <BrowserRouter>
      <ReduxProvider store={Store}>
        <Routes />
      </ReduxProvider>
    </BrowserRouter>
  );
}

export default App;
