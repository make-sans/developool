import React from 'react';
import { shallow } from 'enzyme';
import { Navbar } from '../../components/common/Navbar';

const setup = () => {
    // set the required props for the component
    const props = {
        logoutUser: jest.fn(() => ({})),
        auth: {isAuthenticated: false}
    };
    // render only the component
    const enzymeWrapper = shallow(
        <Navbar {...props} />
    );

    return {enzymeWrapper, props};
};

describe('Navbar Component', () => {
    // check if the navbar renders
    it('Should render without errors', () => {
        // render the component only
        const { enzymeWrapper } = setup();
        expect(enzymeWrapper.find('.navbar').length).toBe(1);
    });
});
