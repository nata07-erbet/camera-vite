import { render, screen } from '@testing-library/react';
import { Sort } from './sort';

describe('component: Sorting', () => {
  it('should render correctly', () => {
    const expectedTestId = 'sort';

    const preparedComponent = <Sort onClickType ={vi.fn()} onClickDirection ={vi.fn()}/>;

    render(preparedComponent);

    expect(screen.getByTestId(expectedTestId)).toBeInTheDocument();
  });
});
