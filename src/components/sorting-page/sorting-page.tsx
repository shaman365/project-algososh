import React, { useState, useEffect } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import { RadioInput } from "../ui/radio-input/radio-input";
import styles from "./sorting-page.module.css"
import { Column } from "../ui/column/column"
import { DELAY_IN_MS } from "../../constants/delays";
import { randomArr, swapElementsBubble, stateBubbleElement, stateSelectionElement, swapElementsSelection } from "./utils";
import { Direction } from "../../types/direction";

export const SortingPage: React.FC = () => {

  const [radioValue, setRadioValue] = useState<string>('selection');
  const [arr, setArr] = useState<number[]>([]);
  const [currentElement, setCurrentElement] = useState<number | undefined>(undefined);
  const [nextElement, setNextElement] = useState<number | undefined>(undefined);
  const [lastElement, setLastElement] = useState<number | undefined>(undefined);
  const [loader, setLoader] = useState({
    buttonAsc: false,
    buttonDesc: false
  })

  useEffect(() => {
    setArr(randomArr());
  }, []);

  const doProcess = (direction: Direction) => {
    radioValue === 'selection' ? selectionSort(arr, direction) : bubbleSort(arr, direction);
  }

  const bubbleSort = async (arr: number[], direction: Direction) => {
    setLoader({ ...loader, buttonAsc: true })

    for (let i = 0; i < arr.length; i++) {
      setLastElement(arr.length - i - 1);
      for (let j = 0; j < arr.length - 1 - i; j++) {
        setCurrentElement(j)
        setNextElement(j + 1)
        await new Promise(resolve => setTimeout(resolve, DELAY_IN_MS));
        swapElementsBubble(arr, direction, j);
        setArr([...arr])
      }
      setCurrentElement(undefined);
      setNextElement(undefined);
    }
    setLoader({ ...loader, buttonAsc: false })
  }

  const selectionSort = async (arr: number[], direction: Direction) => {
    setLoader({ ...loader, buttonDesc: true })

    for (let i = 0; i < arr.length; i++) {
      let maxIndex = i;
      setNextElement(i)
      for (let j = i + 1; j < arr.length + 1; j++) {
        setCurrentElement(j)
        swapElementsSelection(arr, direction, j, maxIndex)
        await new Promise(resolve => setTimeout(resolve, DELAY_IN_MS));
        setArr([...arr])
        setNextElement(i + 1)
      }
    }
    setLoader({ ...loader, buttonDesc: false })    
  }

  const createNewArray = () => {
    setArr(randomArr());
    setCurrentElement(undefined);
    setNextElement(undefined);
    setLastElement(undefined);
  }

  const disableInput =
    loader.buttonAsc ||
    loader.buttonDesc  ? true : false;

  return (
    <SolutionLayout title="Сортировка массива">
      <section className={styles.main}>
        <form className={styles.form}>
          <RadioInput
            label="Выбор"
            name="chooseYourDestiny"
            value="selection"
            disabled={disableInput}
            defaultChecked={radioValue === 'selection'}
            onClick={() => setRadioValue('selection')}
          />
          <RadioInput
            name="chooseYourDestiny"
            label="Пузырёк"
            value="bubble"
            extraClass="ml-20"
            disabled={disableInput}
            onClick={() => setRadioValue('bubble')}
          />
          <Button
            extraClass={`${styles.button} ${styles.ml_50}`}
            text="По возрастанию"
            sorting={Direction.Ascending}
            isLoader={loader.buttonAsc}
            disabled={disableInput}
            onClick={() => doProcess(Direction.Ascending)}
          />
          <Button
            extraClass={styles.button}
            text="По убыванию"
            sorting={Direction.Descending}
            isLoader={loader.buttonDesc}
            disabled={disableInput}
            onClick={() => doProcess(Direction.Descending)}
          />
          <Button
            extraClass={`${styles.button} ${styles.ml_80}`}
            text="Новый массив"
            disabled={disableInput}
            onClick={createNewArray}
          />
        </form>
        <ul className={styles.columnList}>

          {arr && arr.map((item, index) => (
            <li key={index}>
              <Column
                index={item}
                state={radioValue === 'bubble' ? stateBubbleElement(index, nextElement, currentElement, lastElement) : stateSelectionElement(index, nextElement, currentElement)}
              />
            </li>
          ))
          }
        </ul>
      </section>
    </SolutionLayout>
  );
};
