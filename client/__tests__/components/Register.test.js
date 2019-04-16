import React from 'react';
import { shallow } from 'enzyme';
import { Register } from '../../src/components/auth/Register';

const setup = () => {
    // set the required props for the component
    const props = {
        registerUser: jest.fn(() => ({})),
        auth: { isAuthenticated: false },
        errors: {}
    };
    // render only the component
    const enzymeWrapper = shallow(
        <Register {...props} />
    );
    return { enzymeWrapper, props };
};

describe('Register Component', () => {
    it('Should have username, email, password and password confirm input fields', () => {
        const { enzymeWrapper } = setup();
        
        expect(enzymeWrapper.find('TextFieldGroup[name="username"]').length).toBe(1);
        expect(enzymeWrapper.find('TextFieldGroup[name="email"]').length).toBe(1);
        expect(enzymeWrapper.find('TextFieldGroup[name="password"]').length).toBe(1);
        expect(enzymeWrapper.find('TextFieldGroup[name="password2"]').length).toBe(1);

    });
});