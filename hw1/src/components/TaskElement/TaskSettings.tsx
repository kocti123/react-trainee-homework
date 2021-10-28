import { useState } from "react";
import { ReactComponent as MenuIcon } from "../../icons/menu.svg";
import { ITask } from "../../types";
import TaskSettingPopup from "./TaskSettingPopup";
import styles from "./TaskSettings.module.css";

function TaskSettingsPopup({
  id,
  task,
  onDelete,
}: {
  id: number;
  task: ITask;
  onDelete: (task: ITask) => void;
}) {
  const [showSetting, setShowSetting] = useState(false);
  const [positionOfElement, setPostionOfElement] = useState({ x: 0, y: 0 });

  function openSetting(event: React.MouseEvent<HTMLButtonElement>) {
    setPostionOfElement({ x: event.pageX, y: event.pageY });
    setShowSetting(true);
  }

  function close() {
    setShowSetting(false);
  }

  return (
    <div className={styles.taskSettings}>
      <button onClick={openSetting} className={styles.menuButton}>
        <MenuIcon />
      </button>
      {showSetting ? (
        <TaskSettingPopup
          onDelete={onDelete}
          onClose={close}
          id={id}
          task={task}
          position={positionOfElement}
        />
      ) : undefined}
    </div>
  );
}

export default TaskSettingsPopup;
