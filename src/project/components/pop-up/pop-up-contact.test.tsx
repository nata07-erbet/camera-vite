import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PopUpContact } from './pop-up-contact';
import { cameraMocks } from '../../mocks/camera-mocks';

describe('component: PopUpContact', () => {
  it('should render correctly', () => {
    const expectedText = 'Заказать';

    const preparedComponent = (
      <PopUpContact
        onSubmit={vi.fn()}
        cameraByBasket={cameraMocks[0]}
        isActive={false}
      />
    );

    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });

  it('should render correctly when user enter name, and other comments', async () => {
    const telId = 'telElement';

    const expectedTelValue = '9154704351';

    const preparedComponent = (
      <PopUpContact
        onSubmit={vi.fn()}
        cameraByBasket={cameraMocks[0]}
        isActive={false}
      />
    );

    render(preparedComponent);

    await userEvent.type(screen.getByTestId(telId), expectedTelValue);

    expect(screen.getByTestId(telId)).toHaveDisplayValue([
      '+7 (915) 470-43-51',
    ]);
  });
});
