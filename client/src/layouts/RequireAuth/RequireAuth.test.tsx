import { render, screen } from '@testing-library/react';
import { store } from 'app/store';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import { RequireAuth } from './RequireAuth';

describe('RequireAuth', () => {
  it('should render RequireAuth', () => {
    render(
      <Provider store={store}>
        <Router>
          <RequireAuth />
        </Router>
      </Provider>
    );

    expect(screen).toMatchSnapshot();
  });
});
