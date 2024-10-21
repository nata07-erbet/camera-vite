import { render, screen } from '@testing-library/react';
import { Rate } from './rate';
import { cameraMock } from '../../mocks/camera-mocks';

describe('component: Rating', () => {
  it('should render correctly', () => {
    const expectedTestId = 'rate';
    const preparedComponent = <Rate camera={cameraMock} />;

    render(preparedComponent);

    expect(screen.getByTestId(expectedTestId)).toBeInTheDocument();
  });
});
