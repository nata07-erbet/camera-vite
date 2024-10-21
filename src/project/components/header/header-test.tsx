import { render, screen } from '@testing-library/react';
import { Header } from './header';


describe('component: Header', () => {
  it('should render correctly', () => {
    const expectedText = 'Каталог';
    const preparedComponent = <Header />;

    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
