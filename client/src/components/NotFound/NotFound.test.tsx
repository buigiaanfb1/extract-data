import { render, screen } from '@testing-library/react';
import React from 'react';

import NotFound from './index';

describe('NotFound', () => {
  it('should render not found page', () => {
    render(<NotFound />);
    expect(screen.getByText('NotFound')).toBeInTheDocument();
  });
});
