import { render, screen } from '@testing-library/react';
import { PopUpMain } from './pop-up-main';

describe('component: PopUpMain', () => {
  it('should render correctly', () => {
    const expectedData = 'modal-window';
    const preparedComponent = <PopUpMain isActive={false} />;

    render(preparedComponent);

    expect(screen.getByTestId(expectedData)).toBeInTheDocument();
  });
});
