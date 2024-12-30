import { screen } from '@testing-library/react';
import { Header } from './header';
import { cameraMocks } from '../../mocks/camera-mocks';
import { renderWithRouter } from '../../utils/mock-components/test-utils';

describe('component: Header', () => {
  it('should render correctly', () => {
    const expectedText = 'Каталог';
    const preparedComponent = <Header cameras={cameraMocks} totalQuantity={0} />;

    renderWithRouter(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
