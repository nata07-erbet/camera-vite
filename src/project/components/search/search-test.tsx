import { render, screen } from '@testing-library/react';
import { Search } from './search';
import { cameraMocks } from '../../mocks/camera-mocks';

describe('component: productsMocks', () => {
  it('should render correctly', () => {
    const expectedTestId = 'search';
    const preparedComponent = <Search cameras={cameraMocks}/>;

    render(preparedComponent);

    expect(screen.getByTestId(expectedTestId)).toBeInTheDocument();
  });
});
