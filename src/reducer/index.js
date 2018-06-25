import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import coursesReducer from './coursesReducer';
import selectedCourseReducer from './selectedCourseReducer';
import apiReducer from './apiReducer';

export default combineReducers({
    coursesReducer,
    selectedCourseReducer,
    apiReducer,
    form: formReducer
});


