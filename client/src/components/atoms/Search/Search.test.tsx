import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Search from './Search';

describe('Search', () => {
  let onSearchMock = jest.fn();

  beforeEach(() => {
    jest.resetAllMocks();
  });
  it('should render search form', () => {
    render(<Search onSearch={onSearchMock} />);

    expect(screen.getByRole('button')).toBeInTheDocument();
  });
  it('should call onSearch function props', () => {
    render(<Search onSearch={onSearchMock} />);

    const input = screen.getByLabelText('input');
    fireEvent.change(input, { target: { value: 'news' } });

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(onSearchMock).toHaveBeenCalledWith('news');
  });
});
