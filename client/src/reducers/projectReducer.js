import { PROJECT_LOADING, GET_PROJECTS, GET_PROJECT, DELETE_PROJECT } from '../actions/types'

const initialState = {
    projects: [],
    project: {},
    loading: false
};

export default function (state = initialState, action) {
    switch (action.type) {

        case PROJECT_LOADING:
            return {
                ...state,
                loading: true
            };
        case GET_PROJECTS:
            return {
                ...state,
                projects: action.payload,
                loading: false
            };
        case GET_PROJECT:
            return {
                ...state,
                project: action.payload,
                loading: false
            };
        case DELETE_PROJECT:
            return {
                ...state,
                projects: state.projects.filter(project => project._id !== action.payload),
                project:{}

            }
        default:
            return state;
    }
}
