import renderer from 'react-test-renderer';
import { Button } from '../button';
import { fireEvent, render, screen } from '@testing-library/react';

describe('Тест компонента Button:', () => {
  test('Кнопка с текстом', () => {
    const tree = renderer
      .create(<Button text={'Кнопка'} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Кнопка без текста', () => {
    const tree = renderer
      .create(<Button />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Заблокированная кнопка', () => {
    const tree = renderer
      .create(<Button text={'Кнопка'} disabled={true} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Кнопка с индикацией загрузки', () => {
    const tree = renderer
      .create(<Button text={'Кнопка'} isLoader={true} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Вызов колбека при клике на кнопку', () => {
    window.alert = jest.fn();

    render(<Button text={'Кнопка'} onClick={() => alert('Кнопка нажата')} />)

    const link = screen.getByText('Кнопка');

    fireEvent.click(link);

    expect(window.alert).toHaveBeenCalledWith('Кнопка нажата');
  });
});