import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import Loading 		from '../components/loading/Loading';
import ErrorMessage from '../components/error/ErrorMessage';
import App 			from '../components/App';

import Quiz 		from '../components/pages/Quiz';
import Login 		from '../components/pages/Login';
import ParentsOnly 	from '../components/pages/ParentsOnly';
import Chose 		from '../components/pages/Chose';
import Results 		from '../components/pages/Results';
import Fabric 		from '../components/pages/Fabric';

const routes = (
	<Router history={hashHistory}>
		<Route path="/" component={App}>
			<IndexRoute component={Chose} />
			<Route path="parentsonly" component={ParentsOnly} />
			<Route path="quiz" component={Quiz} />
			<Route path="results" component={Results} />
			<Route path="fabric" component={Fabric} />
		</Route>
		<Route path="/login" component={Login} />		
	</Router>
);

class Root extends React.Component {

	render() {		
		return (
			<Provider store={this.props.store}>		
				<div className="app">
					{routes}
					
					<Loading 
						mixClass="app__loader"
						visibleClass="loader--visible"
					/>
					
					<ErrorMessage 
						mixClass="app__error"
					/>
				</div>
			</Provider>
		);
	}
}

export default Root;

