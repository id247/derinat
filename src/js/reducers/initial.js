import * as actions from '../actions/initial';

export function initialData(state = false, action) {
	switch (action.type) {
		case actions.INITIAL_DATA_LOADED:
			return true;
		case actions.INITIAL_DATA_UNLOADED:
			return false;
		default:
			return state
	}
}


