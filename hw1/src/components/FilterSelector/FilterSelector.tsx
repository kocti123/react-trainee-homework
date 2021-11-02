import { useAppDispatch, useAppSelector } from "../../redux";
import { changeFilter } from "../../redux/actions/tasksActions";
import { filters } from "../../types";

import styles from "./FilterSelector.module.css";

function FilterSelector() {
  const dispatch = useAppDispatch();
  const { currentFilter } = useAppSelector((store) => store.tasks);

  const filterChangeHandler = (filter: filters) => {
    if (filter === currentFilter) {
      dispatch(changeFilter("all"));
      return;
    }
    dispatch(changeFilter(filter));
  };

  return (
    <div className={styles.filterSelector}>
      <button
        className={currentFilter === "completed" ? styles.selected : undefined}
        onClick={() => filterChangeHandler("completed")}
      >
        Выполненные задачи
      </button>
      <button
        className={
          currentFilter === "notCompleted" ? styles.selected : undefined
        }
        onClick={() => filterChangeHandler("notCompleted")}
      >
        Задачи в работе
      </button>
      <button
        className={currentFilter === "favourite" ? styles.selected : undefined}
        onClick={() => filterChangeHandler("favourite")}
      >
        Избранные задачи
      </button>
    </div>
  );
}

export default FilterSelector;
