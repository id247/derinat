import { combineReducers } from 'redux';

import * as actions from '../actions/children';


export function list(state = [], action) {
	switch (action.type) {
		case actions.CHILDREN_SET_LIST:
			return 	action.payload;
		case actions.CHILDREN_UNSET_LIST:
			return 	[];
		default:
			return state;
	}
}

export function current(state = false, action) {
	switch (action.type) {
		case actions.CHILDREN_SET_LIST:
			return 	action.payload[0].id;
		case actions.CHILDREN_UNSET_LIST:
			return 	false;
		case actions.CHILDREN_SET_CURRENT:
			return 	action.payload;
		default:
			return state;
	}
}


export const children = combineReducers({
	list,
	current,
});
