import { render, screen } from '@testing-library/react';
import { Spinner } from './spinner';

describe('component: Footer', () => {
  it('should render correctly', () => {
    const expectedText = 'Loading...';
    const preparedComponent = <Spinner />;

    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
