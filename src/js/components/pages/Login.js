import React from 'react';
import { connect } from 'react-redux';

import Button from '../../components/common/Button';

import * as asyncActions from '../../actions/async';
import * as pageActions from '../../actions/page';

class Login extends React.Component {

	componentWillMount(){
		const { props } = this;		
		if (props.profile){
			props.redirect('/');
		}
	}

	render(){
		const { props } = this;

		return (
			<div className="app__page">

				<h1 className="app__title">
					Заголовок
				</h1>

				<div className="app__text text">
					
					<p>
						Текст
					</p>

				</div>

				<div className="app__buttons">

					<div className="app__button-placeholder">

						<Button 
							size="m"
							color="orange"
							type="button"
							onClickHandler={props.login}
						>
							Войти через Дневник.ру
						</Button>
					
					</div>

				</div>

			</div>
		);
	}
}

Login.propTypes = {
	mixClass: React.PropTypes.string,
};

const mapStateToProps = (state, ownProps) => ({
	profile: state.user.profile,
});

const mapDispatchToProps = (dispatch, ownProps) => ({ 
	login: () => dispatch(asyncActions.login()),
	redirect: (page) => dispatch(pageActions.setPageWithoutHistory(page)), 
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
