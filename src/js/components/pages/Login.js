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
			<div className="app__page login">

				<div className="app__logo-placeholder">

					<span className="derinat-logo"></span>

				</div>

				<div className="app__content">

					<div className="login__content">

						<h1 className="login__title">
							Как снизить риск заражения ребёнка<br/>
							гриппом и ОРВИ в период<br/>
							школьных эпидемий?
						</h1>

						<div className="login__text text">
							
							<p>
								Ответьте на вопросы приложения-анализатора и получите рекомендации, 
								которые помогут Вам и Вашему ребенку легче преодолеть 
								период школьных эпидемий.
							</p>

						</div>

							<div className="login__button-placeholder">

								<Button 
									size="m"
									color="orange"
									type="button"
									onClickHandler={props.login}
								>
									Пройти тест
								</Button>

						</div>

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
