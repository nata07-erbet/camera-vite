import { screen } from '@testing-library/react';
import { cameraMocks } from '../../mocks/camera-mocks';
import { Breadcrumbs } from './breadcrumbs';
import { renderWithRouter } from '../../utils/mock-components/test-utils';

describe('Component: NotFoundScreen', () => {
  it('should render correctly', () => {
    const expectedTestId = 'breadcrumbs-list';
    const prepareComponent = <Breadcrumbs camera={cameraMocks[0]} />;

    renderWithRouter(prepareComponent);

    expect(screen.getByTestId(expectedTestId)).toBeInTheDocument();
  });
});
