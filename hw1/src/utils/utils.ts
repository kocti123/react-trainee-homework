import { AnyAction } from "redux";
import { tasksActionTypes } from "../constants/actionTypes";
import { filters, ITask } from "../types";

export const filterTasks = (tasks: ITask[], filter: filters): ITask[] => {
  switch (filter) {
    case "all":
      return tasks;
    case "favourite":
      return filterFavouriteAndNotCompleted(tasks);
    case "completed":
      return filterCompleted(tasks);
    case "notCompleted":
      return filterNotCompleted(tasks);
    default:
      throw new Error("wrong filter type");
  }
};

export const filterFavouriteAndNotCompleted = (tasks: ITask[]): ITask[] => {
  return tasks.filter((task) => task.favourite && !task.completed);
};

export const filterCompleted = (tasks: ITask[]): ITask[] => {
  return tasks.filter((task) => task.completed);
};

export const filterNotCompleted = (tasks: ITask[]): ITask[] => {
  return tasks.filter((task) => !task.completed);
};

export const filterOutById = (tasks: ITask[], id: number): ITask[] => {
  return tasks.filter((task) => task.id !== id);
};

export const findById = (tasks: ITask[], id: number): ITask => {
  return tasks.filter((task) => task.id === id)[0];
};

export const lastIdOfTasks = (tasks: ITask[]): number => {
  return Math.max(...tasks.map((task) => task.id));
};

export const filterAndSortTasks = (
  tasks: ITask[],
  filter: filters
): ITask[] => {
  const filteredTasks = filterTasks(tasks, filter);
  return filteredTasks.sort((a, b) => b.id - a.id);
};

export const getUpdateAction = (id: number, task: ITask): AnyAction => {
  return {
    type: tasksActionTypes.UPDATE_TASK,
    payload: {
      id,
      task: {
        ...task,
      },
    },
  };
};
