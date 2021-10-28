import { AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";

export interface ITask {
  readonly id: number;
  readonly body: string;
  readonly completed: boolean;
  readonly favourite: boolean;
  readonly isEdit: boolean;
  readonly newBody: string;
  readonly creationDate: Date;
}

export type filters = "all" | "completed" | "favourite" | "notCompleted";

export type TasksState = {
  readonly isLoaded: boolean;
  readonly lastId: number;
  readonly tasks: ITask[];
  readonly currentFilter: filters;
  readonly filtredTasks: ITask[];
};

export type State = {
  readonly tasks: TasksState;
};

export type AppAction = ThunkAction<void, State, unknown, AnyAction>;
