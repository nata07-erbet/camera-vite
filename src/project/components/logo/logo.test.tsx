import { screen } from '@testing-library/react';
import { Logo } from './logo';
import { renderWithRouter } from '../../utils/mock-components/test-utils';

describe('Component: Logo', () => {
  it('should render correctly', () => {
    const expectedText = 'logotype';
    const prepareComponent = <Logo />;

    renderWithRouter(prepareComponent);

    expect(screen.getByTestId(expectedText)).toBeInTheDocument();
  });
});
