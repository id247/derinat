import React from 'react';
import { connect } from 'react-redux';

import Button from '../../components/common/Button';

import * as asyncActions from '../../actions/async';
import * as pageActions from '../../actions/page';

class ParentsOnly extends React.Component {

	componentWillMount(){
		const { props } = this;		
		if (props.profile.roles && props.profile.roles.indexOf('EduParent') > -1){
			props.redirect('/');
		}
	}

	render(){
		const { props } = this;

		return (
			<div className="app__page">

				<h1 className="app__title">
					Приложение доступно только родителям
				</h1>

				<div className="app__buttons">

					<div className="app__button-placeholder">

						<Button 
							size="m"
							color="orange"
							type="button"
							onClickHandler={props.logout}
						>
							Выход
						</Button>
					
					</div>

				</div>

			</div>
		);
	}
}

ParentsOnly.propTypes = {
	mixClass: React.PropTypes.string,
};

const mapStateToProps = (state, ownProps) => ({
	profile: state.user.profile,
});

const mapDispatchToProps = (dispatch, ownProps) => ({ 
	logout: () => dispatch(asyncActions.logout()),
	redirect: (page) => dispatch(pageActions.setPageWithoutHistory(page)), 
});

export default connect(mapStateToProps, mapDispatchToProps)(ParentsOnly);
