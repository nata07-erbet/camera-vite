import { screen } from '@testing-library/react';
import { SimilarProduct } from './similar-product';
import { cameraMocks } from '../../mocks/camera-mocks';
import { renderWithRouter } from '../../utils/mock-components/test-utils';

describe('component: BannerOffer', () => {
  it('should render correctly', () => {
    const expectedTestId = 'similar-product'
    const preparedComponent = <SimilarProduct similars={cameraMocks}/>;

    renderWithRouter(preparedComponent);

    expect(screen.getByTestId(expectedTestId)).toBeInTheDocument();
  });
});
