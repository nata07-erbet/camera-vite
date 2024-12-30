import { render, screen } from '@testing-library/react';
import { PopUpRemove } from './pop-up-remove';
import { cameraMock } from '../../mocks/camera-mocks';

describe('component: PopUpContact', () => {
  it('should render correctly', () => {
    const expectedText = ' Удалить';

    const preparedComponent = (
      <PopUpRemove isActive={false} camera={cameraMock} />
    );

    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
