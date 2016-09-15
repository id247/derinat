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

