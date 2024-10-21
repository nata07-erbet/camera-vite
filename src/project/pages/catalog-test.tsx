import { render, screen } from '@testing-library/react';
import { Catalog } from './catalog';

describe('Component: NotFoundScreen', () => {
  it('should render correctly', () => {
    const expectedHeaderText = 'Каталог фото- и видеотехники';

    render (<Catalog/>);

    expect(screen.getByText(expectedHeaderText)).toBeInTheDocument();
  });
});
