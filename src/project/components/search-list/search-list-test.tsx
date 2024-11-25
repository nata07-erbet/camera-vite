import { render, screen } from '@testing-library/react';
import { SearchList } from './search-list';
import { cameraMocks } from '../../mocks/camera-mocks';

describe('component: productsMocks', () => {
  it('should render correctly', () => {
    const expectedTestId = 'search';
    const preparedComponent = <SearchList cameras={cameraMocks}/>;

    render(preparedComponent);

    expect(screen.getByTestId(expectedTestId)).toBeInTheDocument();
  });
});
