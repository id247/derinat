import API from '../api/api';
import OAuth from '../api/hello';

import { ForumOptions } from 'appSettings';

import * as visual from '../helpers/visual.js';

import * as loadingActions 		from '../actions/loading';
import * as errorActions 		from '../actions/error';
import * as userActions 		from '../actions/user';
import * as pageActions 		from '../actions/page';
import * as childrenActions 	from '../actions/children';
import * as initialActions 		from '../actions/initial';
import * as resultsActions 		from '../actions/results';


//error handler

export function catchError(err){
	return dispatch => {
		
		let errorStart = 'Ошибка ' + err.message + ':';
		let errorEnd = 'Попробуйте обновить страницу.';

		if (!err.description) {
			console.error(errorStart + ' ' + err);			
			dispatch(errorActions.setError(errorStart + err + errorEnd));
			return;
		}

		let description = err.description;

		if (err.description.type && err.description.description){

			description = err.description.type + ' (' + err.description.description + ')'; 

		}

		console.error(errorStart + ' ' + description);

		switch (err.message){
			case 401:					
				dispatch(logout());
				return;
				
				break;
			case 403: 
				errorEnd = 'Отказано в доступе.'
				
				break;
			case 404: 
				errorEnd = 'Запрошеный ресурс не найден.'
				
				break;
		}

		dispatch(errorActions.setError(errorStart + ' ' + description + ' ' + errorEnd));
	
	}
}

// authorisation

export function login() {
	return dispatch => {
		dispatch(loadingActions.loadingShow());
		
		return OAuth.login()
		.then( () => {
			dispatch(loadingActions.loadingHide());	

			dispatch(pageActions.setPageWithoutHistory('/'));
		},(err) => {
			dispatch(loadingActions.loadingHide());	

			//dispatch(catchError(err));
		});
	}
}


export function logout() {
	return dispatch => {
		OAuth.logout();
		dispatch(userActions.userUnset());
		dispatch(pageActions.setPageWithoutHistory('/login'));
	}
}

export function getUserChildren(){
	return dispatch => {
		dispatch(loadingActions.loadingShow());	

		API.getUserRelatives()
		.then( (relatives) => {	
			dispatch(loadingActions.loadingHide());

			const children = relatives
			.filter( relative => {
				return (
					relative.type === 'Child' 
					&&
					relative.person
					&&
					relative.person.userId
				);
			})
			.map( child => child.person );

			console.log(children);

			let page;

			switch(true){
				case (children.length === 0):
					page = '/parentsonly';
					break;
				case (children.length === 1):
					page = '/quiz';
					break;
				default:
					page = '/';
					break;
			}

			dispatch(childrenActions.childrenSetList(children));
			dispatch(pageActions.setPageWithoutHistory(page));
			dispatch(initialActions.initialDataLoaded());

		})
		.catch( err => { 
			dispatch(loadingActions.loadingHide());

			dispatch(catchError(err)); 
		});
	}	
}


//getResults

export function getResults(quizData) {

	return (dispatch, getState) => {

		const state = getState();

		dispatch(resultsActions.resultsSetQuizAnswers(quizData));

		console.log(quizData, state.children.current);

		const currentChild = state.children.list.filter( child => child.id === state.children.current )[0];

		console.log(currentChild);

		const dates = [
			{
				from: '03-01-2016',
				to: '03-31-2016',
			},
			{
				from: '04-01-2016',
				to: '04-30-2016',
			},
			{
				from: '05-01-2016',
				to: '05-31-2016',
			},
		];

		dispatch(loadingActions.loadingShow());	

		API.getUser(currentChild.userId)
		.then( child => {

			console.log(child);

			dispatch(resultsActions.resultsSetChild(child));

			const promises = dates.map( date => {
				return API.getUserLogEntries(child.personId, date.from, date.to);
			});

			return Promise.all(promises);
		})
		.then( entries => {

			console.log(entries);

			let allEntries = [];

			entries.map( item => {
				allEntries = allEntries.concat(item.logEntries);
			});

			console.log(allEntries);

			const statuses = ['Absent','Ill','Pass'];

			const AbsentEntries = allEntries.filter( entry => {
				return statuses.indexOf(entry.status) > -1;
			});
			
			console.log(AbsentEntries, AbsentEntries.length);


			dispatch(loadingActions.loadingHide());

			
			dispatch(resultsActions.resultsSetAbsents(AbsentEntries));
			dispatch(resultsActions.resultsCompleted());

			dispatch(pageActions.setPageWithoutHistory('/results'));

			
		})
		.catch( err => { 
			dispatch(loadingActions.loadingHide());

			dispatch(catchError(err)); 
		});

	}
}

//init

export function getInitialData() {

	return dispatch => {
		dispatch(loadingActions.loadingShow());	

		return API.getUser()
		.then( (user) => {	
			dispatch(loadingActions.loadingHide());
			
			dispatch(userActions.userSet(user));

			if (user.roles.indexOf('EduParent') > -1){
				dispatch(getUserChildren());
			}else{
				dispatch(initialActions.initialDataLoaded());
				dispatch(pageActions.setPageWithoutHistory('/parentsonly'));
			}
		
		})		
		.catch( err => { 
			dispatch(loadingActions.loadingHide());

			dispatch(catchError(err)); 
		});
	}
}


export function init() {
	return dispatch => {
		return dispatch(getInitialData());	
	}
}

