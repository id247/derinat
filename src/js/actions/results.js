
export const RESULTS_SET_CHILD		= 'RESULTS_SET_CHILD';

export function resultsSetChild(child) {
	return {
		type: RESULTS_SET_CHILD,
		payload: child,
	}
};

export const RESULTS_COMPLETED		= 'RESULTS_COMPLETED';

export function resultsCompleted() {
	return {
		type: RESULTS_COMPLETED,
	}
};

export const RESULTS_SET_ABSENTS	= 'RESULTS_SET_ABSENTS';

export function resultsSetAbsents(number) {
	return {
		type: RESULTS_SET_ABSENTS,
		payload: number,
	}
};
export const RESULTS_SET_QUIZ_ANSWERS	= 'RESULTS_SET_QUIZ_ANSWERS';

export function resultsSetQuizAnswers(answers) {
	return {
		type: RESULTS_SET_QUIZ_ANSWERS,
		payload: answers,
	}
};


export const RESULTS_RESET		= 'RESULTS_RESET';

export function resultsReset() {
	return {
		type: RESULTS_RESET,
	}
};


