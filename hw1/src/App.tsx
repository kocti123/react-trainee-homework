import NewTaskForm from "./components/NewTaskForm/NewTaskForm";
import TasksList from "./components/TasksList/TasksList";

import styles from "./App.module.css";

function App() {
  return (
    <div className={styles.mainView}>
      <NewTaskForm />
      <TasksList />
    </div>
  );
}

export default App;
