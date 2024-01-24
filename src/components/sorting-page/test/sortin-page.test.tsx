import { Direction } from "../../../types/direction";
import { bubbleSortTst, selectionSortTst } from "../utils";
import { expect } from '@jest/globals';

describe('Тест алгоритма сортировки выбором:', () => {
  test('Тест с пустым массивом по возрастанию', () => {
    expect(selectionSortTst([], Direction.Ascending)).toEqual([]);
  });
  
  test('Тест с пустым массивом по убыванию', () => {
    expect(selectionSortTst([], Direction.Descending)).toEqual([]);
  });

  test('Тест массива из одного элемента по возрастанию', () => {
    expect(selectionSortTst([1], Direction.Ascending)).toEqual([1]);
  });

  test('Тест массива из одного элемента по убыванию', () => {
    expect(selectionSortTst([1], Direction.Descending)).toEqual([1]);
  });

  test('Тест массива из нескольких элементов по убыванию', () => {
    expect(selectionSortTst([5,2,4,3,1], Direction.Descending)).toEqual([5,4,3,2,1]);
  });

  test('Тест массива из нескольких элементов по возрастанию', () => {
    expect(selectionSortTst([5,2,4,3,1], Direction.Ascending)).toEqual([1,2,3,4,5]);
  });
});

describe('Тест алгоритма сортировки пузырьком:', () => {
  test('Тест с пустым массивом по возрастанию', () => {
    expect(bubbleSortTst([], Direction.Ascending)).toEqual([]);
  });
  
  test('Тест с пустым массивом по убыванию', () => {
    expect(bubbleSortTst([], Direction.Descending)).toEqual([]);
  });

  test('Тест массива из одного элемента по возрастанию', () => {
    expect(bubbleSortTst([1], Direction.Ascending)).toEqual([1]);
  });

  test('Тест массива из одного элемента по убыванию', () => {
    expect(bubbleSortTst([1], Direction.Descending)).toEqual([1]);
  });

  test('Тест массива из нескольких элементов по убыванию', () => {
    expect(bubbleSortTst([5,2,4,3,1], Direction.Descending)).toEqual([5,4,3,2,1]);
  });

  test('Тест массива из нескольких элементов по возрастанию', () => {
    expect(bubbleSortTst([5,2,4,3,1], Direction.Ascending)).toEqual([1,2,3,4,5]);
  });
});