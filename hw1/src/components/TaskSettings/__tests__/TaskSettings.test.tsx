import { shallow, ShallowWrapper } from "enzyme";
import { wrap } from "module";
import { ITask } from "../../../types";
import TaskSettingPopup from "../../TaskSettingPopup/TaskSettingPopup";
import TaskSettings from "../TaskSettings";

describe("TaskSetting", () => {
  let wrapper: ShallowWrapper;
  const props: {
    onDelete: any;
    task: ITask;
  } = {
    onDelete: jest.fn(),
    task: {
      id: 1,
      body: "test",
      completed: false,
      favourite: false,
      isEdit: false,
      newBody: "",
      creationDate: new Date(1635768398831),
    },
  };

  beforeEach(() => {
    wrapper = shallow(<TaskSettings {...props} />);
  });

  it("should match snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should open popupSettings when click on button", () => {
    wrapper.find("button").simulate("click", { pageX: 100, pageY: 100 });

    expect(
      wrapper.find("TaskSettingPopup").getElement().props.position
    ).toEqual({ x: 100, y: 100 });
  });

  it("should stop showing popup after onClose call", () => {
    wrapper.find("button").simulate("click", { pageX: 100, pageY: 100 });

    expect(wrapper.children()).toHaveLength(2);

    wrapper.find("TaskSettingPopup").getElement().props.onClose();

    expect(wrapper.children()).toHaveLength(1);
  });
});
