import exp from "constants";
import { mount, ReactWrapper, shallow, ShallowWrapper } from "enzyme";
import { Provider } from "react-redux";
import createMockStore, { MockStoreEnhanced } from "redux-mock-store";
import thunk from "redux-thunk";
import { AppAction, filters, State } from "../../../types";
import { filterTasks } from "../../../utils/utils";
import FilterSelector from "../FilterSelector";
import styles from "../FilterSelector.module.css";

const mockActionType = {
  changeFilter: "changeFilter",
};

jest.mock("../../../redux/actions/tasksActions", () => ({
  changeFilter:
    (filter: filters): AppAction =>
      (dispatch) => {
        dispatch({
          type: mockActionType.changeFilter,
          payload: filter,
        });
      },
}));

const createStore = createMockStore([thunk]);

describe("FilterSelector", () => {
  let wrapper: ReactWrapper;
  let store: MockStoreEnhanced<unknown, {}>;

  beforeEach(() => {
    store = createStore({ tasks: { currentFilter: "all" } });
    jest.spyOn(store, "dispatch");
    wrapper = mount(<FilterSelector />, {
      wrappingComponent: Provider,
      wrappingComponentProps: { store },
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should match snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should change filter when click on button", () => {
    wrapper.find("button").forEach((node) => node.simulate("click"));

    expect(store.getActions()).toEqual([
      {
        type: mockActionType.changeFilter,
        payload: "completed",
      },
      {
        type: mockActionType.changeFilter,
        payload: "notCompleted",
      },
      {
        type: mockActionType.changeFilter,
        payload: "favourite",
      },
    ]);
  });

  it("should set class on active filter", () => {
    store = createStore({ tasks: { currentFilter: "completed" } });
    wrapper = mount(<FilterSelector />, {
      wrappingComponent: Provider,
      wrappingComponentProps: { store },
    });
    expect(wrapper.find(`.${styles.selected}`)).toHaveLength(1);

    store = createStore({ tasks: { currentFilter: "notCompleted" } });
    wrapper = mount(<FilterSelector />, {
      wrappingComponent: Provider,
      wrappingComponentProps: { store },
    });
    expect(wrapper.find(`.${styles.selected}`)).toHaveLength(1);

    store = createStore({ tasks: { currentFilter: "favourite" } });
    wrapper = mount(<FilterSelector />, {
      wrappingComponent: Provider,
      wrappingComponentProps: { store },
    });
    expect(wrapper.find(`.${styles.selected}`)).toHaveLength(1);
  });

  it("should disable filter when click on acitve filter", () => {
    store = createStore({ tasks: { currentFilter: "completed" } });
    wrapper = mount(<FilterSelector />, {
      wrappingComponent: Provider,
      wrappingComponentProps: { store },
    });

    wrapper.find(`.${styles.selected}`).simulate("click");

    expect(store.getActions()).toEqual([
      {
        type: mockActionType.changeFilter,
        payload: "all",
      },
    ]);
  });
});
