export const INITIAL_DATA_LOADED 	= 'INITIAL_DATA_LOADED';
export const INITIAL_DATA_UNLOADED 	= 'INITIAL_DATA_UNLOADED';

export function initialDataLoaded() {
	return {
		type: INITIAL_DATA_LOADED,
	}
}

export function initialDataUnloaded() {
	return {
		type: INITIAL_DATA_UNLOADED,
	}
}


