import thunk from "redux-thunk";
import configureStore, { MockStoreEnhanced } from "redux-mock-store";
import { mount, ReactWrapper } from "enzyme";
import { Provider } from "react-redux";
import NewTaskForm from "../NewTaskForm";
import styles from "../NewTaskForm.module.css";
import { AppAction } from "../../../types";

const mockStore = configureStore([thunk]);

const stringWithLengthGreaterThan160 =
  "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";

jest.mock("../../../redux/actions/tasksActions", () => ({
  createNewTask:
    (value: string): AppAction =>
      (dispatch) => {
        dispatch({ type: "test", payload: value });
      },
}));

describe("NewTaskForm", () => {
  let store: MockStoreEnhanced<unknown, {}>;
  let wrapper: ReactWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>;

  beforeEach(() => {
    store = mockStore({
      tasks: {
        isLoaded: true,
        lastId: 0,
        tasks: [],
        currentFilter: "all",
        filtredTasks: [],
      },
    });
    jest.spyOn(store, "dispatch");

    wrapper = mount(
      <Provider store={store}>
        <NewTaskForm />
      </Provider>
    );
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should match snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should show correct value when typing in input", () => {
    const input = wrapper.find(`.${styles.form} input`);
    input.simulate("change", { target: { value: "test string" } });
    expect(input.getDOMNode<HTMLInputElement>().value).toBe("test string");
  });

  it("should dispatch action when submited", () => {
    const input = wrapper.find(`.${styles.form} input`);

    input.simulate("change", { target: { value: "test string1" } });
    wrapper.find("input").simulate("submit", { text: "input" });

    input.simulate("change", { target: { value: "test string2" } });
    wrapper.find("button").simulate("submit", { text: "button" });

    expect(store.dispatch).toBeCalledTimes(2);
    expect(store.getActions()).toEqual([
      { type: "test", payload: "test string1" },
      { type: "test", payload: "test string2" },
    ]);
  });
  it("should show error message when input to long", () => {
    const input = wrapper.find(`.${styles.form} input`);
    input.simulate("change", { target: { value: stringWithLengthGreaterThan160 } });

    expect(wrapper.find("p").text()).toContain(
      "превышен лимит текста задачи на"
    );
  });

  it("should discard submit when input to long", () => {
    const input = wrapper.find(`.${styles.form} input`);
    input.simulate("change", { target: { value: stringWithLengthGreaterThan160 } });

    wrapper.find("button").simulate("submit", { text: stringWithLengthGreaterThan160 });
  });
});
