import React, { useState, useEffect } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import styles from "./queue-page.module.css"
import { Circle } from "../ui/circle/circle"
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { QUEUE_MAX_SIZE, QUEUE_STRING_MAX_LENGTH } from "../../constants/restrictions"
import { ElementStates } from "../../types/element-states";
import { TFormData } from "../../types/form"
import { useForm } from "../../hooks/useForm"
import { Queue } from "./utils";

const queue = new Queue<string>(QUEUE_MAX_SIZE);

export const QueuePage: React.FC = () => {

  const { values, handleChange } = useForm<TFormData>({ sourceString: '' });
  const [arr, setArr] = useState<(string | null)[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(-1);

  const [loader, setLoader] = useState({
    buttonAdd: false,
    buttonRemove: false,
    buttonClear: false,
  })

  useEffect(() => {
    setArr(Array(QUEUE_MAX_SIZE).fill(null))
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
  };

  const add = async () => {
    if (values.sourceString && queue.getLength < QUEUE_MAX_SIZE) {
      setLoader({ ...loader, buttonAdd: true })
      queue.enqueue(values.sourceString);
      values.sourceString = '';
      setCurrentIndex(queue.tail);
      setArr([...queue.getItems]);
      await new Promise(resolve => setTimeout(resolve, SHORT_DELAY_IN_MS));
      setCurrentIndex(-1);
      setLoader({ ...loader, buttonAdd: false })
    }
  }

  const remove = async () => {
    if (queue.getLength > 0) {
      setLoader({ ...loader, buttonRemove: true })
      setCurrentIndex(queue.head);
      queue.dequeue();
      await new Promise(resolve => setTimeout(resolve, SHORT_DELAY_IN_MS));
      setArr([...queue.getItems]);
      setCurrentIndex(-1);
      setLoader({ ...loader, buttonRemove: false })
    }
  }

  const clear = async () => {
    if (queue.getLength > 0) {
      setLoader({ ...loader, buttonClear: true })
      queue.clear();
      await new Promise(resolve => setTimeout(resolve, SHORT_DELAY_IN_MS));
      setArr([...queue.getItems]);
      setCurrentIndex(-1);
      setLoader({ ...loader, buttonClear: false })
    }
  }

  const disableInput =
    loader.buttonAdd ||
    loader.buttonRemove ||
    loader.buttonClear  ? true : false;

  return (

    <SolutionLayout title="Очередь">
      <section className={styles.main}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <Input
            extraClass={styles.inputWidth}
            isLimitText={true}
            maxLength={QUEUE_STRING_MAX_LENGTH}
            value={values.sourceString}
            onChange={handleChange}
            name={"sourceString"}
            disabled={disableInput}
          />
          <Button
            extraClass={`${styles.button} ${styles.ml_50}`}
            text="Добавить"
            isLoader={loader.buttonAdd}
            disabled={values.sourceString.length < 1 || queue.tail == QUEUE_MAX_SIZE - 1}
            onClick={add}
          />
          <Button
            extraClass={styles.button}
            text="Удалить"
            isLoader={loader.buttonRemove}
            disabled={queue.getLength === 0}
            onClick={remove}
          />
          <Button
            extraClass={`${styles.button} ${styles.ml_80}`}
            text="Очистить"
            onClick={clear}
            disabled={queue.getLength === 0}
          />
        </form>
        <ul className={styles.columnList}>
          {arr && arr.map((item, index) => (
            <li key={index}>
              <Circle
                index={index}
                state={currentIndex === index ? ElementStates.Changing : ElementStates.Default}
                head={queue.getLength && queue.head === index ? 'head' : ''}
                tail={queue.getLength && queue.tail === index ? 'tail' : ''}
                letter={item as string | undefined}
              />
            </li>
          ))
          }
        </ul>
      </section>
    </SolutionLayout>
  );
};
