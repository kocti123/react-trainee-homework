import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux";
import { createNewTask } from "../../redux/actions/tasksActions";
import styles from "./NewTaskForm.module.css";
import { ReactComponent as CreateIcon } from "../../icons/create.svg";

function NewTaskForm() {
  const dispatch = useAppDispatch();
  const { isLoaded } = useAppSelector((store) => store.tasks);
  const [value, setValue] = useState("");

  function changeValueHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
  }

  function submitHandler(event: React.FormEvent) {
    event.preventDefault();
    if (value.length > 160 || !isLoaded) return;
    dispatch(createNewTask(value));
    setValue("");
  }

  return (
    <div className={styles.newElementForm}>
      <h4>Создание новой задачи</h4>
      <form onSubmit={submitHandler} className={styles.form}>
        <input value={value} onChange={changeValueHandler}></input>
        <button onSubmit={submitHandler}>
          <CreateIcon />
        </button>
      </form>
      <p>
        {value.length > 160
          ? `превышен лимит текста задачи на ${value.length - 160} символов`
          : ""}
      </p>
    </div>
  );
}

export default NewTaskForm;
