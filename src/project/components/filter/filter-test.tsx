import { render, screen } from '@testing-library/react';
import { Filter } from './filter';

describe('component: FilterListCards', () => {
  it('should render correctly', () => {
    const expectedText = 'Фильтр';

    const preparedComponent = (<Filter
      onFeaturesChange={vi.fn()}
      initialFilters={{
        category: 'photocamera',
        types: ['digital', 'film'],
        levels: ['zero', 'non-professional']
      }}
      onReset={vi.fn()}
      minPrice={1900}
      maxPrice={456789}
      initPriceRange={[1, 3]}
      onPricesChange={vi.fn()}
    />);

    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
