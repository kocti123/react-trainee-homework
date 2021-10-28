import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux";
import {
  fetchAndSetAllTasks,
  removeTask,
} from "../../redux/actions/tasksActions";
import FilterSelector from "./FilterSelector";
import TaskElement from "../TaskElement/TaskElement";
import styles from "./TasksList.module.css";
import Modal from "../UI/Modal";
import { ITask } from "../../types";
import Spinner from "../UI/Spinner";

function TasksList() {
  const dispatch = useAppDispatch();
  const { filtredTasks, isLoaded } = useAppSelector((store) => store.tasks);
  const [toDelete, setToDelete] = useState<ITask | null>(null);
  const [showToDelete, setShowToDelete] = useState(false);

  useEffect(() => {
    dispatch(fetchAndSetAllTasks());
  }, [dispatch]);

  function deleteHandler(task: ITask): void {
    setToDelete({ ...task });
    setShowToDelete(true);
  }

  function cancelDelete() {
    setShowToDelete(false);
  }

  function deleteTask() {
    if (toDelete) {
      dispatch(removeTask(toDelete.id));
    }
    setShowToDelete(false);
  }

  return (
    <div className={styles.tasksMenu}>
      <FilterSelector />
      {isLoaded ? (
        <>
          {filtredTasks.length !== 0 ? (
            <ul className={styles.tasksList}>
              {filtredTasks.map((task) => {
                return (
                  <TaskElement
                    id={task.id}
                    key={task.id}
                    onDelete={deleteHandler}
                    task={task}
                  />
                );
              })}
            </ul>
          ) : (
            <p className={styles.noTasks}>Нет задач</p>
          )}
        </>
      ) : (
        <div className={styles.loading}>
          <Spinner />
          <p>Загрузка</p>
        </div>
      )}
      <Modal show={showToDelete} title="Удаления задачи" onClose={cancelDelete}>
        <p>Вы действительно хотите удалить задачу?</p>
        <p>Текст задачи:</p>
        <p>{toDelete && toDelete.body}</p>
        <p>Дата создания:</p>
        <p>{toDelete && toDelete.creationDate.toLocaleString()}</p>
        <button onClick={cancelDelete}>Отмена</button>
        <button onClick={deleteTask}>Удалить</button>
      </Modal>
    </div>
  );
}

export default TasksList;
