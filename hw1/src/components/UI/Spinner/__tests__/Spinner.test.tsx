import { shallow } from "enzyme";
import Spinner from "../Spinner";

describe("Spinner", () => {
  it("should render correctly", () => {
    let wrapper = shallow(<Spinner />);
    expect(wrapper).toMatchSnapshot();
  });
});
