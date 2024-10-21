import { render, screen } from '@testing-library/react';
import { cameraMocks } from '../../mocks/camera-mocks';
import { Breadcrumbs } from './breadcrumbs';

describe('Component: NotFoundScreen', () => {
  it('should render correctly', () => {
    const expectedTestId = 'breadcrumbs-list';
    const prepareComponent =
      <Breadcrumbs camera={cameraMocks[0]}/>;

    render(prepareComponent);

    expect(screen.getByTestId(expectedTestId)).toBeInTheDocument();
  });
});
