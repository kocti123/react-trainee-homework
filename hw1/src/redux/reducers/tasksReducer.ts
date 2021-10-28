import { AnyAction } from "redux";
import { tasksActionTypes } from "../../constants/actionTypes";
import { TasksState } from "../../types";
import {
  filterAndSortTasks,
  filterOutById,
  findById,
  lastIdOfTasks,
} from "../../utils/utils";

const initialState: TasksState = {
  isLoaded: false,
  lastId: 0,
  tasks: [],
  currentFilter: "all",
  filtredTasks: [],
};

function tasksReducer(store = initialState, action: AnyAction): TasksState {
  switch (action.type) {
    case tasksActionTypes.SET_TASKS:
      return {
        ...store,
        isLoaded: true,
        lastId: lastIdOfTasks(action.payload),
        tasks: action.payload,
        filtredTasks: filterAndSortTasks(action.payload, store.currentFilter),
      };
    case tasksActionTypes.SET_NEW_TASK:
      const tasksWithNewTask = [...store.tasks, action.payload];
      return {
        ...store,
        lastId: lastIdOfTasks(tasksWithNewTask),
        tasks: tasksWithNewTask,
        filtredTasks: filterAndSortTasks(tasksWithNewTask, store.currentFilter),
      };
    case tasksActionTypes.UPDATE_TASK:
      const tasksWithUpdatedTask = [
        ...filterOutById(store.tasks, action.payload.id),
        action.payload.task,
      ];
      return {
        ...store,
        tasks: tasksWithUpdatedTask,
        filtredTasks: filterAndSortTasks(
          tasksWithUpdatedTask,
          store.currentFilter
        ),
      };
    case tasksActionTypes.REMOVE_TASK:
      const tasksWithRemovedTask = filterOutById(store.tasks, action.payload);
      return {
        ...store,
        tasks: tasksWithRemovedTask,
        filtredTasks: filterAndSortTasks(
          tasksWithRemovedTask,
          store.currentFilter
        ),
        lastId: lastIdOfTasks(tasksWithRemovedTask),
      };
    case tasksActionTypes.CHANGE_FILTER:
      return {
        ...store,
        currentFilter: action.payload,
        filtredTasks: filterAndSortTasks(store.tasks, action.payload),
      };
    case tasksActionTypes.SET_IS_EDIT:
      const task = findById(store.tasks, action.payload.id);
      const tasksWithChangedIsEdit = [
        ...filterOutById(store.tasks, action.payload.id),
        {
          ...task,
          isEdit: action.payload.isEdit,
          newBody: task.body,
        },
      ];
      return {
        ...store,
        tasks: tasksWithChangedIsEdit,
        filtredTasks: filterAndSortTasks(
          tasksWithChangedIsEdit,
          store.currentFilter
        ),
      };
    case tasksActionTypes.SET_NEW_BODY:
      const taskWithChangedNewBody = [
        ...filterOutById(store.tasks, action.payload.id),
        {
          ...findById(store.tasks, action.payload.id),
          newBody: action.payload.newBody,
        },
      ];
      return {
        ...store,
        tasks: taskWithChangedNewBody,
        filtredTasks: filterAndSortTasks(
          taskWithChangedNewBody,
          store.currentFilter
        ),
      };
    default:
      return store;
  }
}

export default tasksReducer;
