
export const CHILDREN_SET_LIST		= 'CHILDREN_SET_LIST';
export const CHILDREN_UNSET_LIST	= 'CHILDREN_UNSET_LIST';
export const CHILDREN_SET_CURRENT 	= 'CHILDREN_SET_CURRENT';

export function childrenSetList(childrens) {
	return {
		type: CHILDREN_SET_LIST,
		payload: childrens,
	}
};

export function childrenSetCurrent(childId) {
	return {
		type: CHILDREN_SET_CURRENT,
		payload: childId,
	}
};

