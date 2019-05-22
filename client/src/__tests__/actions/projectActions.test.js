import configureMockStore from 'redux-mock-store';
import mockAxios from 'axios';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import * as types from '../../actions/types'
import * as actions from '../../actions/projectActions';

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)
const mock = new MockAdapter(mockAxios);

describe('Project Actions', () => {
    afterEach(() => {
        mock.restore()
    });

    // get the project that shouldn't exist
    it('creates GET_PROJECT with payload null when trying to get a project with id that doesn\'t exist', (done) => {
        // fake id
        const id = "fid1";
        // mock the axios call of the action
        mock.onGet('/api/project/'+id).reply(404, {}, {'Authorization':'auth_key'});
        // expected actions
        const expectedActions = [
            { type: types.PROJECT_LOADING },
            { type: types.GET_PROJECT, payload: null }
        ];

        const store = mockStore();

        store.dispatch(actions.getProject(id));
        // need to add a timeout because without it, since the action is synchronous the first dispatch(action called) 
        //  will trigger an end, and the actual axios call will be added some time later.
        // Adding a timeout lets us wait for the axios call
        setTimeout(() => {
            expect(store.getActions()).toEqual(expectedActions);
            done();
        }, 1000);

    });
});