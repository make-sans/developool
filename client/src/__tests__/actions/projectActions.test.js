import configureMockStore from 'redux-mock-store';
import mockAxios from 'axios';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import * as types from '../../actions/types'
import * as actions from '../../actions/projectActions';
import { API_URL } from '../../constants/index';

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)
let mock;
let store;

describe('Project Actions', () => {
    beforeEach(() => {
        mock = new MockAdapter(mockAxios)
        store = mockStore({})
      })
    afterEach(() => {
        mock.restore()
    });

    // get the project that shouldn't exist
    it('creates GET_PROJECT with payload null when getting a project that doesn\'t exist', (done) => {
        // fake id
        const id = "fid1";
        // mock the axios call of the action, intercepting any calls made to this api path and returning what we specify.
        mock.onGet(API_URL+'/project/'+id).reply(404, {'msg' : 'given project does not exist'});
        // expected actions
        const expectedActions = [
            { type: types.PROJECT_LOADING },
            { type: types.GET_PROJECT, payload: null }
        ];

        store.dispatch(actions.getProject(id));
        // need to add a timeout because without it, since the action is synchronous the first dispatch(action called) 
        //  will trigger an end, and the actual axios call will be added some time later.
        // Adding a timeout lets us wait for the axios call
        setTimeout(() => {
            expect(store.getActions()).toEqual(expectedActions);
            done();
        }, 1000);

    });

    // get a project that exists
    it('creates GET_PROJECT with payload value as the project\'s fields when getting a project that exists', (done) => {
        // project to return
        const tempId = 'id1';
        const proj = {'_id' : tempId};

        // intercept the api call and mock the api server
        mock.onGet(`${API_URL}/project/${tempId.toString()}`).reply(200, {proj});
        
        const expectedActions = [
            { type: types.PROJECT_LOADING },
            { type: types.GET_PROJECT, payload: {proj}}
        ];

        store.dispatch(actions.getProject(tempId));
        
        setTimeout(() => {
            expect(store.getActions()).toEqual(expectedActions);
            done();
        }, 1000);
    });
});