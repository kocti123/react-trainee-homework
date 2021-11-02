import { ReactWrapper, mount } from "enzyme";
import { Provider } from "react-redux";
import createMockStore, {
  MockStoreCreator,
  MockStoreEnhanced,
} from "redux-mock-store";
import thunk from "redux-thunk";
import { AppAction, ITask, State } from "../../../types";
import { getFakeStoreState } from "../../../utils/fakeStoreState";
import TaskSettingPopup from "../TaskSettingPopup";
import styles from "../TaskSettingPopup.module.css";

const mockActionTypes = {
  markFav: "markFav",
  markComp: "markComp",
  removeFav: "removeFav",
  removeComp: "removeComp",
  isEdit: "isEdit",
};

jest.mock("../../../redux/actions/tasksActions", () => ({
  removeFromCompleted:
    (id: number): AppAction =>
      (dispatch) => {
        dispatch({ type: mockActionTypes.removeComp, payload: id });
      },
  markTaskAsCompleted:
    (id: number): AppAction =>
      (dispatch) => {
        dispatch({ type: mockActionTypes.markComp, payload: id });
      },
  removeFromFavourite:
    (id: number): AppAction =>
      (dispatch) => {
        dispatch({ type: mockActionTypes.removeFav, payload: id });
      },
  markTaskAsFavourite:
    (id: number): AppAction =>
      (dispatch) => {
        dispatch({ type: mockActionTypes.markFav, payload: id });
      },
  setIsEdit:
    (id: number, value: boolean): AppAction =>
      (dispatch) => {
        dispatch({ type: mockActionTypes.isEdit, payload: { id, value } });
      },
}));

const createStore: MockStoreCreator<State, any> = createMockStore([thunk]);
const storeState = getFakeStoreState();

describe("Task Setting Popup", () => {
  let popupDiv: HTMLDivElement;
  let wrapper: ReactWrapper;
  let store: MockStoreEnhanced<unknown, {}>;
  const props: {
    onClose: any;
    onDelete: any;
    task: ITask;
    position: { x: number; y: number };
  } = {
    onClose: jest.fn(),
    onDelete: jest.fn((task: ITask) => { }),
    task: storeState.tasks.filtredTasks[0],
    position: {
      x: 10,
      y: 10,
    },
  };

  beforeAll(() => {
    popupDiv = document.createElement("div");
    popupDiv.id = "popup";
    document.body.append(popupDiv);
  });

  afterAll(() => {
    popupDiv.remove();
    jest.clearAllMocks();
  });

  beforeEach(() => {
    store = createStore();
    jest.spyOn(store, "dispatch");
    wrapper = mount(<TaskSettingPopup {...props} />, {
      wrappingComponent: Provider,
      wrappingComponentProps: { store: store },
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
    wrapper.unmount();
  });

  it("should match snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should set inline styles based on provided position", () => {
    const popupDOM = wrapper
      .find(`.${styles.popup}`)
      .getDOMNode<HTMLUListElement>();

    expect(popupDOM.style.getPropertyValue("top")).toBe(
      `${props.position.x}px`
    );
    expect(popupDOM.style.getPropertyValue("left")).toBe(
      `${props.position.y}px`
    );
  });

  it("should change inline styles when position changed", () => {
    const popupDOM = wrapper
      .find(`.${styles.popup}`)
      .getDOMNode<HTMLUListElement>();

    wrapper.setProps({ position: { x: 20, y: 20 } });

    expect(popupDOM.style.getPropertyValue("top")).toBe("20px");
    expect(popupDOM.style.getPropertyValue("left")).toBe("20px");
  });

  it("should properly toggle favourite status", () => {
    const toggleButton = wrapper.find(".toggleFavourite");

    toggleButton.simulate("click");

    wrapper.setProps({ task: { ...props.task, favourite: true } });

    toggleButton.simulate("click");

    expect(store.dispatch).toBeCalledTimes(2);
    expect(store.getActions()).toEqual([
      { type: mockActionTypes.markFav, payload: 1 },
      { type: mockActionTypes.removeFav, payload: 1 },
    ]);
  });

  it("should have proper text in button based on favourite status", () => {
    const toggleButton = wrapper.find(".toggleFavourite");

    expect(toggleButton.text()).toBe("В избранное")

    wrapper.setProps({ task: { ...props.task, favourite: true } });

    expect(toggleButton.text()).toBe("Убрать из избранного")
  });

  it("should properly toggle completed status", () => {
    const toggleButton = wrapper.find(".toggleCompletion");

    toggleButton.simulate("click");

    wrapper.setProps({ task: { ...props.task, completed: true } });

    toggleButton.simulate("click");

    expect(store.dispatch).toBeCalledTimes(2);
    expect(store.getActions()).toEqual([
      { type: mockActionTypes.markComp, payload: 1 },
      { type: mockActionTypes.removeComp, payload: 1 },
    ]);
  });

  it("should have proper text in button based on completed status", () => {
    const toggleButton = wrapper.find(".toggleCompletion");

    expect(toggleButton.text()).toBe("Выполненно")

    wrapper.setProps({ task: { ...props.task, completed: true } });

    expect(toggleButton.text()).toBe("Вернуть в работу")
  });

  it("should properly toggle isEdit status", () => {
    const toggleButton = wrapper.find(".toggleIsEdit");

    toggleButton.simulate("click");

    wrapper.setProps({ task: { ...props.task, isEdit: true } });

    toggleButton.simulate("click");

    expect(store.dispatch).toBeCalledTimes(2);
    expect(store.getActions()).toEqual([
      { type: mockActionTypes.isEdit, payload: { id: 1, value: true } },
      { type: mockActionTypes.isEdit, payload: { id: 1, value: false } },
    ]);
  });

  it("should have proper text in button based on isEdit status", () => {
    const toggleButton = wrapper.find(".toggleIsEdit");

    expect(toggleButton.text()).toBe("Редактировать")

    wrapper.setProps({ task: { ...props.task, isEdit: true } });

    expect(toggleButton.text()).toBe("Отменить редактирование")
  });

  it("should call onDelete when click delete button", () => {
    const removeButton = wrapper.find(".remove");

    removeButton.simulate("click");

    expect(props.onDelete).toBeCalledTimes(1);
    expect(props.onDelete).toBeCalledWith(props.task);
  });

  it("should call onClose when click on any button", () => {
    wrapper.find(".toggleFavourite").simulate("click");
    wrapper.find(".toggleCompletion").simulate("click");
    wrapper.find(".toggleIsEdit").simulate("click");
    wrapper.find(".remove").simulate("click");

    expect(props.onClose).toBeCalledTimes(4);
  });

  it("should call onClose when click outside of popup", () => {
    wrapper.find(`.${styles.popupWrapper}`).simulate("click");

    expect(props.onClose).toBeCalledTimes(1);
  })
});
