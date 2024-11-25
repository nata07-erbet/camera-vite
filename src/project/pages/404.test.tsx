import { screen } from '@testing-library/react';
import { NotFoundPage } from './404';
import { renderWithRouter } from '../utils/mock-components/test-utils';

describe('Component: NotFoundScreen', () => {
  it('should render correctly', () => {
    const expectedHeaderText = 'This page not found';
    const expectedLinkText = 'Go to main page';

    renderWithRouter(<NotFoundPage />, '/404');

    expect(screen.getByText(expectedHeaderText)).toBeInTheDocument();
    expect(screen.getByText(expectedLinkText)).toBeInTheDocument();
  });
});
