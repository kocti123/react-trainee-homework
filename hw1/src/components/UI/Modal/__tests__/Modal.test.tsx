import { mount, ReactWrapper } from "enzyme";
import Modal from "../Modal";
import styles from "../Modal.module.css";

const createClickEvent = (value: boolean) => ({
  target: { classList: { contains: jest.fn(() => value) } },
});

describe("Modal", () => {
  let wrapper: ReactWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>;
  const props = {
    show: false,
    onClose: jest.fn(),
    title: "test Title",
  };
  const children = <p id="testChildren">test</p>;
  const newNode = document.createElement("div");

  beforeAll(() => {
    newNode.id = "modal";
    document.body.append(newNode);
    window.scrollTo = jest.fn();
  });

  afterAll(() => {
    jest.clearAllMocks();
    newNode.remove();
  });

  beforeEach(() => {
    wrapper = mount(<Modal {...props}>{children}</Modal>);
  });

  afterEach(() => {
    jest.resetAllMocks();
    wrapper.unmount();
  });

  it("should match snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should render children components", () => {
    expect(wrapper.find("#testChildren").text()).toContain("test");
  });

  it("should render default title when not provided whith props", () => {
    wrapper.setProps({ ...props, title: undefined });
    expect(wrapper.find(`.${styles.modalTitle} h1`).text()).toBe("Title");
  });

  it("should render title correctly", () => {
    expect(wrapper.find(`.${styles.modalTitle} h1`).text()).toContain(
      "test Title"
    );
  });

  it("should call onClose when click on close button", () => {
    wrapper.find(`.${styles.modalWraper}`).simulate("click");
    expect(props.onClose).toBeCalledTimes(1);
  });

  it("should call onClose when click outside of modal", () => {
    const event = createClickEvent(true);
    wrapper.find(`.${styles.modalWraper}`).simulate("click", event);
    expect(props.onClose).toBeCalledTimes(1);
    expect(event.target.classList.contains).toBeCalledTimes(1);
  });

  it("should not call onClose when clicking on content of modal", () => {
    const event = createClickEvent(false);
    wrapper.find(`.${styles.modal}`).simulate("click", event);
    wrapper.find(`.${styles.modalTitle}`).simulate("click", event);
    wrapper.find(`.${styles.modalContent}`).simulate("click", event);
    wrapper.find("#testChildren").simulate("click", event);
    expect(event.target.classList.contains).toBeCalledTimes(4);
    expect(props.onClose).toBeCalledTimes(0);
  });

  it("should be visible and block scroling when show is true", () => {
    wrapper.setProps({ ...props, show: true });
    expect(document.body.style.top).toContain("px");
    expect(document.body.style.position).toContain("fixed");
    expect(wrapper.getDOMNode<HTMLDivElement>().style.top).toContain("px");
  });

  it("should be hidden and fix scroling when show is false", () => {
    wrapper.setProps({ ...props, show: false });
    expect(document.body.style.top).toHaveLength(0);
    expect(document.body.style.position).toHaveLength(0);
    expect(wrapper.getDOMNode<HTMLDivElement>().style.top).toBe("-100vh");
    expect(window.scrollTo).toBeCalled();
  });
});
