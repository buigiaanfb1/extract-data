import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import { store } from './app/store';
import App from './App';

describe('App', () => {
  it('should render app', () => {
    render(
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    );

    expect(screen.getByText('Welcome to Extract Data')).toBeInTheDocument();
  });
});
