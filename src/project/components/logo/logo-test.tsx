import { render, screen } from '@testing-library/react';
import { Logo } from './logo';

describe('Component: Logo', () => {
  it('should render correctly', () => {
    const expectedText = 'logotype';
    const prepareComponent = <Logo />;

    render(prepareComponent);

    expect(screen.getByTestId(expectedText)).toBeInTheDocument();
  });
});
