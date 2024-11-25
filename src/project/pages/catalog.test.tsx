import { screen } from '@testing-library/react';
import { Catalog } from './catalog';
import { renderWithRouter } from '../utils/mock-components/test-utils';

describe('Component: NotFoundScreen', () => {
  it('should render correctly', () => {
    const expectedHeaderText = 'Каталог фото- и видеотехники';

    renderWithRouter(<Catalog />);

    expect(screen.getByText(expectedHeaderText)).toBeInTheDocument();
  });
});
