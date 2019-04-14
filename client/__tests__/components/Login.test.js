import React from 'react';
import { shallow } from 'enzyme';
import { Login } from '../../src/components/auth/Login';

// test setup
const setup = () => {
    // set the required props for the component
    const props = {
        loginUser: jest.fn(() => ({})),
        auth: {isAuthenticated: false},
        errors: {}
    };
    // render only the component
    const enzymeWrapper = shallow(
        <Login {...props} />
    );
    return {enzymeWrapper, props};
};

describe('Login Component', () => {
    it('Should have email and password input fields', () => {
        const { enzymeWrapper } = setup();
        
        expect(enzymeWrapper.find('TextFieldGroup[name="email"]').length).toBe(1);
        expect(enzymeWrapper.find('TextFieldGroup[name="password"]').length).toBe(1);

    });
});