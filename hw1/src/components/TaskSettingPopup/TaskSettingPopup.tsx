import { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { useAppDispatch } from "../../redux";
import {
  removeFromCompleted,
  markTaskAsCompleted,
  removeFromFavourite,
  markTaskAsFavourite,
  setIsEdit,
} from "../../redux/actions/tasksActions";
import { ITask } from "../../types";
import styles from "./TaskSettingPopup.module.css";

function TaskSettingPopup({
  onClose,
  onDelete,
  task,
  position,
}: {
  onClose: () => void;
  onDelete: (task: ITask) => void;
  task: ITask;
  position: { x: number; y: number };
}) {
  const dispatch = useAppDispatch();
  const { completed, favourite, isEdit, id } = task;
  const popupDOM = document.querySelector<HTMLDListElement>("#popup")!;
  const popupRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (popupRef.current) {
      popupRef.current.style.top = `${position.y}px`;
      popupRef.current.style.left = `${position.x}px`;
    }
  }, [position, popupRef]);

  function toggleCompleted() {
    if (completed) {
      dispatch(removeFromCompleted(id));
    } else {
      dispatch(markTaskAsCompleted(id));
    }
    onClose();
  }

  function toggleFavourite() {
    if (favourite) {
      dispatch(removeFromFavourite(id));
    } else {
      dispatch(markTaskAsFavourite(id));
    }
    onClose();
  }

  function toggleIsEdit() {
    if (isEdit) {
      dispatch(setIsEdit(id, false));
    } else {
      dispatch(setIsEdit(id, true));
    }
    onClose();
  }

  function removeTaskHandler() {
    onDelete(task);
    onClose();
  }

  return ReactDOM.createPortal(
    <>
      <div className={styles.popupWrapper} onClick={onClose}></div>
      <ul ref={popupRef} className={styles.popup}>
        <li>
          <button onClick={toggleFavourite} className="toggleFavourite">
            {favourite ? "Убрать из избранного" : "В избранное"}
          </button>
        </li>
        <li>
          <button onClick={toggleCompleted} className="toggleCompletion">
            {completed ? "Вернуть в работу" : "Выполненно"}
          </button>
        </li>
        <li>
          <button onClick={toggleIsEdit} className="toggleIsEdit">
            {isEdit ? "Отменить редактирование" : "Редактировать"}
          </button>
        </li>
        <li>
          <button onClick={removeTaskHandler} className="remove">
            Удалить
          </button>
        </li>
      </ul>
    </>,
    popupDOM
  );
}

export default TaskSettingPopup;
