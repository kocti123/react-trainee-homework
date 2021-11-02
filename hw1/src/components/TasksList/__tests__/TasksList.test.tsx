import { mount } from "enzyme";
import { act } from "react-dom/test-utils";
import { Provider } from "react-redux";
import createMockStore, { MockStoreEnhanced } from "redux-mock-store";
import thunk from "redux-thunk";
import { AppAction, ITask, State } from "../../../types";
import { filterTasks, lastIdOfTasks } from "../../../utils/utils";
import TasksList from "../TasksList";
import styles from "../TasksList.module.css";

const mockActionType = {
  setTasks: "setTasks",
  removeTask: "removeTask",
};

jest.mock("../../../redux/actions/tasksActions", () => ({
  fetchAndSetAllTasks: (): AppAction => (dispatch) => {
    dispatch({
      type: mockActionType.setTasks,
    });
  },
  removeTask:
    (id: number): AppAction =>
      (dispatch) => {
        dispatch({
          type: mockActionType.removeTask,
          payload: id,
        });
      },
}));

const createStore = createMockStore([thunk]);

const tasks: ITask[] = [
  {
    id: 1,
    body: "test",
    completed: true,
    favourite: false,
    isEdit: false,
    newBody: "",
    creationDate: new Date(),
  },
  {
    id: 2,
    body: "test1",
    completed: false,
    favourite: false,
    isEdit: false,
    newBody: "",
    creationDate: new Date(),
  },
];
const state: State = {
  tasks: {
    currentFilter: "completed",
    isLoaded: true,
    tasks: tasks,
    filtredTasks: filterTasks(tasks, "completed"),
    lastId: lastIdOfTasks(tasks),
  },
};

const mountElement = (store: MockStoreEnhanced<unknown, {}>) => {
  return mount(<TasksList />, {
    wrappingComponent: Provider,
    wrappingComponentProps: { store },
  });
};

describe("FilterSelector", () => {
  let modalRoot: HTMLDivElement;

  beforeAll(() => {
    modalRoot = document.createElement("div");
    modalRoot.id = "modal";
    document.body.append(modalRoot);

    window.scrollTo = jest.fn();
  });

  afterAll(() => {
    modalRoot.remove();
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should match snapshow", () => {
    const store = createStore(state);
    const wrapper = mountElement(store);

    expect(wrapper).toMatchSnapshot();

    wrapper.unmount();
  });

  it("should request tasks from server", () => {
    const store = createStore(state);
    const wrapper = mountElement(store);

    expect(store.getActions()).toEqual([{ type: mockActionType.setTasks }]);

    wrapper.unmount();
  });

  it("should show loading when tasks not loaded", () => {
    const store = createStore({ tasks: { ...state.tasks, isLoaded: false } });
    const wrapper = mountElement(store);

    expect(wrapper.find(`.${styles.loading}`)).toHaveLength(1);

    wrapper.unmount();
  });

  it("should render filtered tasks", () => {
    const store = createStore(state);
    const wrapper = mountElement(store);

    expect(wrapper.find("TaskElement")).toHaveLength(1);
    expect(wrapper.find("TaskElement").prop<ITask>("task").body).toBe("test");

    wrapper.unmount();
  });

  it("should show message when no tasks", () => {
    const store = createStore({ tasks: { ...state.tasks, filtredTasks: [] } });
    const wrapper = mountElement(store);

    expect(wrapper.find(`.${styles.noTasks}`).text()).toBe("Нет задач");

    wrapper.unmount();
  });

  it("should show modal when trigger deletion", () => {
    const store = createStore(state);
    const wrapper = mountElement(store);

    act(() => {
      wrapper.find("TaskElement").prop<(task: ITask) => {}>("onDelete")(
        state.tasks.filtredTasks[0]
      );
    });

    wrapper.update();

    expect(wrapper.find("Modal").prop("show")).toBeTruthy();

    wrapper.unmount();
  });

  it("should close modal when Modal triger close", () => {
    const store = createStore(state);
    const wrapper = mountElement(store);

    act(() => {
      wrapper.find("TaskElement").prop<(task: ITask) => {}>("onDelete")(
        state.tasks.filtredTasks[0]
      );
    });
    wrapper.update();
    expect(wrapper.find("Modal").prop("show")).toBeTruthy();

    act(() => {
      wrapper.find("Modal").prop<() => {}>("onClose")();
    });
    wrapper.update();
    expect(wrapper.find("Modal").prop("show")).toBeFalsy();

    wrapper.unmount();
  });

  it("should close modal when click on cancle button", () => {
    const store = createStore(state);
    const wrapper = mountElement(store);

    act(() => {
      wrapper.find("TaskElement").prop<(task: ITask) => {}>("onDelete")(
        state.tasks.filtredTasks[0]
      );
    });
    wrapper.update();
    expect(wrapper.find("Modal").prop("show")).toBeTruthy();

    wrapper.find(".cancel").simulate("click");
    expect(wrapper.find("Modal").prop("show")).toBeFalsy();

    wrapper.unmount();
  });

  it("should delete task when click on delete button", () => {
    const store = createStore(state);
    const wrapper = mountElement(store);

    act(() => {
      wrapper.find("TaskElement").prop<(task: ITask) => {}>("onDelete")(
        state.tasks.filtredTasks[0]
      );
    });
    wrapper.update();
    expect(wrapper.find("Modal").prop("show")).toBeTruthy();

    wrapper.find(".delete").simulate("click");
    expect(store.getActions()[1]).toEqual({
      type: mockActionType.removeTask,
      payload: 1,
    });

    wrapper.unmount();
  });
});
