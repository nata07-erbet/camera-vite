import { render, screen } from '@testing-library/react';
import { Summary } from './summary';

describe('component: Footer', () => {
  it('should render correctly', () => {
    const expectedTestId = 'summary';
    const preparedComponent = (
      <Summary
        onSending={vi.fn()}
        onSubmit={vi.fn()}
        onError={vi.fn()}
        isSending={false}
      />
    );

    render(preparedComponent);

    expect(screen.getByTestId(expectedTestId)).toBeInTheDocument();
  });
});
