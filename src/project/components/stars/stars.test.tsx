import { render, screen } from '@testing-library/react';
import { Stars } from './stars';

describe('component: Rating', () => {
  it('should render correctly', () => {
    const expectedTestId = 'star';
    const preparedComponent = <Stars rating={5} />;

    render(preparedComponent);

    expect(screen.getAllByTestId(expectedTestId)).toHaveLength(5);
  });
});
