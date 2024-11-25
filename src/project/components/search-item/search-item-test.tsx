import { render, screen } from '@testing-library/react';
import { SearchItem } from './search-item';
import { cameraMock } from '../../mocks/camera-mocks';

describe('component: productsMocks', () => {
  it('should render correctly', () => {
    const expectedTestId = 'search-item';
    const preparedComponent = <SearchItem camera={cameraMock} />;

    render(preparedComponent);

    expect(screen.getByTestId(expectedTestId)).toBeInTheDocument();
  });
});
