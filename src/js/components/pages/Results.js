import React from 'react';
import { connect } from 'react-redux';

import Button from '../../components/common/Button';

import * as asyncActions from '../../actions/async';
import * as pageActions from '../../actions/page';
import * as quizActions from '../../actions/quiz';

class Results extends React.Component {

	componentWillMount(){
		const { props } = this;		
	}

	_startAgain(){
		const { props } = this;
		props.quizSetCurrentQuestion(1);
		props.redirect('/');
	}

	_startAgainHandler = () => (e) => {
		this._startAgain();
	}

	render(){
		const { props } = this;

		return (
			<div className="app__page">

				<h1 className="app__title">
					Результаты
				</h1>

				<div className="app__buttons">

					<div className="app__button-placeholder">

						<Button 
							size="m"
							color="orange"
							type="button"
							onClickHandler={this._startAgainHandler()}
						>
							Пройти еще раз
						</Button>
					
					</div>

				</div>

			</div>
		);
	}
}

Results.propTypes = {
	mixClass: React.PropTypes.string,
};

const mapStateToProps = (state, ownProps) => ({
	profile: state.user.profile,
});

const mapDispatchToProps = (dispatch, ownProps) => ({ 
	redirect: (pageId) => dispatch(pageActions.setPageWithoutHistory(pageId)), 
	quizSetCurrentQuestion: (questionId) => dispatch(quizActions.quizSetCurrentQuestion(questionId)), 
});

export default connect(mapStateToProps, mapDispatchToProps)(Results);
