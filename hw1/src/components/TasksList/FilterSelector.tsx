import { useAppDispatch, useAppSelector } from "../../redux";
import { changeFilter } from "../../redux/actions/tasksActions";

import styles from "./FilterSelector.module.css";

function FilterSelector() {
  const dispatch = useAppDispatch();
  const { currentFilter } = useAppSelector((store) => store.tasks);

  const filterFavourite = () => {
    if ("favourite" === currentFilter) {
      dispatch(changeFilter("all"));
      return;
    }
    dispatch(changeFilter("favourite"));
  };
  const filterCompleted = () => {
    if ("completed" === currentFilter) {
      dispatch(changeFilter("all"));
      return;
    }
    dispatch(changeFilter("completed"));
  };
  const filterNotCompleted = () => {
    if ("notCompleted" === currentFilter) {
      dispatch(changeFilter("all"));
      return;
    }
    dispatch(changeFilter("notCompleted"));
  };

  return (
    <div className={styles.filterSelector}>
      <button
        className={currentFilter === "completed" ? styles.selected : undefined}
        onClick={filterCompleted}
      >
        Выполненные задачи
      </button>
      <button
        className={
          currentFilter === "notCompleted" ? styles.selected : undefined
        }
        onClick={filterNotCompleted}
      >
        Задачи в работе
      </button>
      <button
        className={currentFilter === "favourite" ? styles.selected : undefined}
        onClick={filterFavourite}
      >
        Избранные задачи
      </button>
    </div>
  );
}

export default FilterSelector;
