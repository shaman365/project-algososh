import { reverseTst } from '../utils';
import { expect } from '@jest/globals';

describe('Тест алгоритма разворота строки:', () => {
  test('Строка с чётным количеством символов', () => {
    expect(reverseTst('тест')).toEqual(['т','с','е','т']);
  });

  test('Строка с нечётным количеством символов', () => {
    expect(reverseTst('кипарис')).toEqual(['с','и','р','а','п','и','к']);
  });

  test('Строка с одним символом', () => {
    expect(reverseTst('a')).toEqual(['a']);
  });

  test('Пустая строка', () => {
    expect(reverseTst('')).toEqual([]);
  });
});