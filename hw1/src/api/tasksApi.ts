import { GET_TASKS } from "../constants/tasksURL";
import { ITask } from "../types";

export const fetchTasks = async () => {
  const tasksData = await fetch(GET_TASKS);
  const tasks: ITask[] = await tasksData.json();
  return tasks.map<ITask>((task: ITask) => ({
    id: task.id,
    completed: task.completed,
    favourite: task.favourite,
    body: task.body,
    newBody: task.body,
    isEdit: false,
    creationDate: new Date(task.creationDate),
  }));
};

export const postNewTask = async (task: ITask) => {
  await fetch(`${GET_TASKS}`, {
    method: "POST",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify({
      id: task.id,
      completed: task.completed,
      favourite: task.favourite,
      body: task.body,
      creationDate: task.creationDate.valueOf(),
    }),
  });
};

export const deleteTask = async (id: number) => {
  await fetch(`${GET_TASKS}/${id}`, {
    method: "DELETE",
  });
};

export const updateTask = async (task: ITask) => {
  await fetch(`${GET_TASKS}/${task.id}`, {
    method: "PUT",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify({
      id: task.id,
      completed: task.completed,
      favourite: task.favourite,
      body: task.body,
      creationDate: task.creationDate.valueOf(),
    }),
  });
};
