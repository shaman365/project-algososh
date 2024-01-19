import { reverse } from './utils';
import { expect } from '@jest/globals';

describe('Тест алгоритма разворота строки:', () => {
  it('Строка с чётным количеством символов', () => {
    expect(reverse('тест')).toEqual(['т','с','е','т']);
  });

  it('Строка с нечётным количеством символов', () => {
    expect(reverse('кипарис')).toEqual(['с','и','р','а','п','и','к']);
  });

  it('Строка с одним символом', () => {
    expect(reverse('a')).toEqual(['a']);
  });

  it('Пустая строка', () => {
    expect(reverse('')).toEqual([]);
  });
});