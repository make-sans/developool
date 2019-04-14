import React from 'react';
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Navbar from '../../components/common/Navbar'
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";

Enzyme.configure({ adapter: new Adapter() })
// configure mock store
const mockStore = configureMockStore();

const setup = (props = {}) => {
    const store = mockStore({});
    const component = shallow(
        <Provider store={store}>
            <Navbar {...props} />
        </Provider>
    );
    return component;
};

describe('Navbar Component', () => {
    // check if the navbar renders
    it('Should render without errors', () => {
        // render the component only
        const component = setup();
        // find the class in the rendered component
        const wrapper = component.find('.navbar');
        expect(wrapper.length).toBe(1);
    });
});
