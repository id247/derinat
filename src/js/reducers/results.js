import { combineReducers } from 'redux';

import * as actions from '../actions/results';

export function child(state = false, action) {
	switch (action.type) {
		case actions.RESULTS_SET_CHILD:
			return 	action.payload;
		case actions.RESULTS_RESET:
			return 	false;
		default:
			return state;
	}
}
export function completed(state = false, action) {
	switch (action.type) {
		case actions.RESULTS_COMPLETED:
			return 	true;
		case actions.RESULTS_RESET:
			return 	false;
		default:
			return state;
	}
}

export function absents(state = [], action) {
	switch (action.type) {
		case actions.RESULTS_SET_ABSENTS:
			return 	action.payload;
		case actions.RESULTS_RESET:
			return 	[];
		default:
			return state;
	}
}

export function quizAnswers(state = [], action) {
	switch (action.type) {
		case actions.RESULTS_SET_QUIZ_ANSWERS:
			return 	action.payload;
		case actions.RESULTS_RESET:
			return 	[];
		default:
			return state;
	}
}


export const results = combineReducers({
	child,
	completed,
	absents,
	quizAnswers,
});
