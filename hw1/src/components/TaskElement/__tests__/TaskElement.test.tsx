import { mount, ReactWrapper } from "enzyme";
import { wrap } from "module";
import { Provider } from "react-redux";
import createMockStore, { MockStoreEnhanced } from "redux-mock-store";
import thunk from "redux-thunk";
import { AppAction, ITask, State } from "../../../types";
import TaskElement from "../TaskElement";
import styles from "../TaskElement.module.css";

const stringWithLengthMoreThan160 =
  "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";

const mockActionTypes = {
  updateNewBody: "updateNewBody",
  updateBody: "updateBody",
  isEdit: "isEdit",
  markFav: "markFav",
  removeFav: "removeFav",
};

jest.mock("../../../redux/actions/tasksActions", () => ({
  setNewBody:
    (id: number, value: string): AppAction =>
      (disptach) => {
        disptach({
          type: mockActionTypes.updateNewBody,
          payload: { id, value },
        });
      },
  updateBodyOfTask:
    (id: number, value: string): AppAction =>
      (disptach) => {
        disptach({
          type: mockActionTypes.updateBody,
          payload: { id, value },
        });
      },
  setIsEdit:
    (id: number, value: boolean): AppAction =>
      (disptach) => {
        disptach({
          type: mockActionTypes.isEdit,
          payload: { id, value },
        });
      },
  removeFromFavourite:
    (id: number): AppAction =>
      (disptach) => {
        disptach({
          type: mockActionTypes.removeFav,
          payload: id,
        });
      },
  markTaskAsFavourite:
    (id: number): AppAction =>
      (disptach) => {
        disptach({
          type: mockActionTypes.markFav,
          payload: id,
        });
      },
}));

const createStore = createMockStore([thunk]);

describe("TaksElement", () => {
  let wrapper: ReactWrapper;
  let store: MockStoreEnhanced<unknown, {}>;
  let root: HTMLDivElement;
  let props: {
    task: ITask;
    onDelete: any;
  } = {
    task: {
      id: 1,
      body: "test",
      completed: false,
      favourite: false,
      isEdit: true,
      newBody: "",
      creationDate: new Date(Date.now()),
    },
    onDelete: jest.fn(),
  };

  beforeAll(() => {
    root = document.createElement("div");
    root.id = "app";
    document.body.append(root);
  });

  afterAll(() => {
    root.remove();
  });

  beforeEach(() => {
    store = createStore();
    wrapper = mount(<TaskElement {...props} />, {
      wrappingComponent: Provider,
      wrappingComponentProps: { store },
      attachTo: root,
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
    wrapper.unmount();
  });

  it("should match snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should render body when edit not active", () => {
    wrapper.setProps({ task: { ...props.task, isEdit: false } });

    expect(wrapper.find("p").text()).toBe("test");
  });

  it("should render input when edit is active", () => {
    expect(wrapper.find(`.${styles.input}`)).toHaveLength(1);
  });

  it("should update input when typing", () => {
    wrapper
      .find(`.${styles.input}`)
      .simulate("change", { target: { value: "test input" } });

    expect(store.getActions()).toEqual([
      {
        type: mockActionTypes.updateNewBody,
        payload: { id: props.task.id, value: "test input" },
      },
    ]);
  });

  it("should update body when submited", () => {
    wrapper.find(`.${styles.input}`).simulate("submit");
    expect(store.getActions()).toEqual([
      {
        type: mockActionTypes.updateBody,
        payload: { id: props.task.id, value: "" },
      },
      {
        type: mockActionTypes.isEdit,
        payload: { id: props.task.id, value: false },
      },
    ]);
  });

  it("should discard submit when newBody to long", () => {
    wrapper.setProps({
      task: { ...props.task, newBody: stringWithLengthMoreThan160 },
    });
    wrapper.find(`.${styles.input}`).simulate("submit");

    expect(store.getActions()).toHaveLength(0);
  });

  it("should make input in focus when edit start", () => {
    expect(document.activeElement).toBe(
      wrapper.find(`.${styles.input}`).getDOMNode()
    );
  });

  it("should correct toggle favourite status", () => {
    wrapper.find(`.${styles.favouriteStatus}`).simulate("click");
    wrapper.setProps({ task: { ...props.task, favourite: true } });
    wrapper.find(`.${styles.favouriteStatus}`).simulate("click");

    expect(store.getActions()).toEqual([
      {
        type: mockActionTypes.markFav,
        payload: 1,
      },
      {
        type: mockActionTypes.removeFav,
        payload: 1,
      },
    ]);
  });

  it("should correct render incon is favourite button", () => {
    expect(
      wrapper.find(`.${styles.favouriteStatus}`).find("svg").text()
    ).toContain("dot.svg");

    wrapper.setProps({ task: { ...props.task, favourite: true } });

    expect(
      wrapper.find(`.${styles.favouriteStatus}`).find("svg").text()
    ).toContain("star.svg");
  });

  it("should correctly show complition status", () => {
    expect(wrapper.find(`.${styles.completed}`)).toHaveLength(0);
    wrapper.setProps({ task: { ...props.task, completed: true } });
    expect(wrapper.find(`.${styles.completed}`)).toHaveLength(1);
  });
});
