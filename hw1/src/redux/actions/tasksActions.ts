import {
  deleteTask,
  fetchTasks,
  postNewTask,
  updateTask,
} from "../../api/tasksApi";
import { tasksActionTypes } from "../../constants/actionTypes";
import { AppAction, filters, ITask } from "../../types";
import { findById, getUpdateAction } from "../../utils/utils";

export const fetchAndSetAllTasks = (): AppAction => async (dispatch) => {
  const newTasks = await fetchTasks();
  dispatch({
    type: tasksActionTypes.SET_TASKS,
    payload: newTasks,
  });
};

export const markTaskAsFavourite =
  (id: number): AppAction =>
  async (disptach, getState) => {
    const { tasks } = getState().tasks;
    const task = findById(tasks, id);
    const updatedTask = { ...task, favourite: true };
    disptach(getUpdateAction(id, updatedTask));
    await updateTask(updatedTask);
  };

export const removeFromFavourite =
  (id: number): AppAction =>
  async (disptach, getState) => {
    const { tasks } = getState().tasks;
    const task = findById(tasks, id);
    const updatedTask = { ...task, favourite: false };
    disptach(getUpdateAction(id, updatedTask));
    await updateTask(updatedTask);
  };

export const markTaskAsCompleted =
  (id: number): AppAction =>
  async (disptach, getState) => {
    const { tasks } = getState().tasks;
    const task = findById(tasks, id);
    const updatedTask = { ...task, completed: true };
    disptach(getUpdateAction(id, updatedTask));
    await updateTask(updatedTask);
  };

export const removeFromCompleted =
  (id: number): AppAction =>
  async (disptach, getState) => {
    const { tasks } = getState().tasks;
    const task = findById(tasks, id);
    const updatedTask = { ...task, completed: false };
    disptach(getUpdateAction(id, updatedTask));
    await updateTask(updatedTask);
  };

export const updateBodyOfTask =
  (id: number, value: string): AppAction =>
  async (disptach, getState) => {
    const task = findById(getState().tasks.tasks, id);
    const updatedTask = { ...task, body: value };
    disptach(getUpdateAction(id, updatedTask));
    await updateTask(updatedTask);
  };

export const changeFilter =
  (filter: filters): AppAction =>
  async (dispatch) => {
    dispatch({
      type: tasksActionTypes.CHANGE_FILTER,
      payload: filter,
    });
  };

export const removeTask =
  (id: number): AppAction =>
  async (dispatch) => {
    dispatch({
      type: tasksActionTypes.REMOVE_TASK,
      payload: id,
    });
    await deleteTask(id);
  };

export const createNewTask =
  (value: string): AppAction =>
  async (dispatch, getStore) => {
    const { lastId } = getStore().tasks;
    const newTask: ITask = {
      id: lastId + 1,
      body: value,
      completed: false,
      favourite: false,
      newBody: "",
      isEdit: false,
      creationDate: new Date(),
    };
    dispatch({
      type: tasksActionTypes.SET_NEW_TASK,
      payload: newTask,
    });
    await postNewTask(newTask);
  };

export const setIsEdit =
  (id: number, isEdit: boolean): AppAction =>
  async (dispatch) => {
    dispatch({
      type: tasksActionTypes.SET_IS_EDIT,
      payload: {
        id,
        isEdit,
      },
    });
  };

export const setNewBody =
  (id: number, newBody: string): AppAction =>
  async (dispatch) => {
    dispatch({
      type: tasksActionTypes.SET_NEW_BODY,
      payload: {
        id,
        newBody,
      },
    });
  };
