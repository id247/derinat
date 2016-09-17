import { combineReducers } from 'redux';

import { error } from './error';
import { user } from './user';
import { loading } from './loading';
import { page } from './page';
import { children } from './children';
import { quiz } from './quiz';
import { initialData } from './initial';
import { results } from './results';

const rootReducer = combineReducers({
	error,
	loading,
	user,
	page,
	children,
	quiz,
	initialData,
	results,
});

export default rootReducer;
