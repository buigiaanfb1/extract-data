import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Modal from './Modal';

describe('Modal', () => {
  let modalProps = {
    isShowing: false,
    hide: jest.fn(),
    content: 'test',
  };

  beforeEach(() => {
    jest.resetAllMocks();
  });
  it('should not show modal when isShowing equals to false', () => {
    render(<Modal {...modalProps} />);
    expect(screen.queryByText('test')).not.toBeInTheDocument();
  });
  it('should show modal when isShowing equals to true', () => {
    modalProps.isShowing = true;
    render(<Modal {...modalProps} />);
    expect(screen.getByText('test')).toBeInTheDocument();
  });
  it('should call hide function to close modal', async () => {
    modalProps.isShowing = true;

    render(<Modal {...modalProps} />);

    const overlayModal = screen.getByTestId('modal-overlay');

    await waitFor(() => {
      // eslint-disable-next-line testing-library/no-wait-for-side-effects
      fireEvent.click(overlayModal);
    });
    expect(modalProps.hide).toHaveBeenCalled();
  });
});
