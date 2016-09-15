import React from 'react';
import { connect } from 'react-redux';

import { PromoOptions } from 'appSettings';
import User from '../../components/user/User';

import * as quizActions from '../../actions/quiz';
import * as pageActions from '../../actions/page';

class Quiz extends React.Component {


	componentWillMount(){
		const { props } = this;	
	}

	componentDidMount(){
		const { props } = this;		
	}

	_nextQuestion(){
		const { props } = this;

		if (props.quiz.currentQuestion === 3){
			props.redirect('/results');
			return;
		}

		props.quizSetCurrentQuestion( props.quiz.currentQuestion + 1 );
	}

	_clickRadioHandler = () => (e) => {
		this._nextQuestion();
	}

	render(){
		const { props } = this;

		if (!props.profile || props.children.list.length === 0){
			return null;
		}

		return(
			<div className="app__page quiz" ref="quiz">

				<div className={('quiz__item ' + ( props.quiz.currentQuestion === 1 ? 'quiz__item--visible' : '') )}>

					<h3 className="quiz__title app__title">
						Моет ли ребёнок руки каждый раз, 
						когда возвращается с улицы и перед едой?
					</h3>

					<div className="quiz__image-placeholder">

						<img src={(PromoOptions.cdn + 'images/quiz/2.png')} alt="" className="quiz__image"/>

					</div>

					<div className="quiz__butons app__buttons">

						<div className="app__button-placeholder">

							<label className="quiz__button button button--orange button--m">
								<input type="radio" className="quiz__radio" 
									onChange={this._clickRadioHandler()}
								/>
								Да
							</label>
						
						</div>

						<div className="app__button-placeholder">

							<label className="quiz__button button button--orange button--m">
								<input type="radio" className="quiz__radio"
									onChange={this._clickRadioHandler()}
								/>
								Нет
							</label>
						
						</div>

					</div>

				</div>

				<div className={('quiz__item ' + ( props.quiz.currentQuestion === 2 ? 'quiz__item--visible' : '') )}>

					<h3 className="quiz__title app__title">
						Умывается ли и промывает нос ребёнок
						каждый раз после улицы?
					</h3>

					<div className="quiz__image-placeholder">

						<img src={(PromoOptions.cdn + 'images/quiz/3.png')} alt="" className="quiz__image"/>

					</div>

					<div className="quiz__butons app__buttons">

						<div className="app__button-placeholder">

							<label className="quiz__button button button--orange button--m">
								<input type="radio" className="quiz__radio"
									onChange={this._clickRadioHandler()}
								/>
								Да
							</label>
						
						</div>

						<div className="app__button-placeholder">

							<label className="quiz__button button button--orange button--m">
								<input type="radio" className="quiz__radio"
									onChange={this._clickRadioHandler()}
								/>
								Нет
							</label>
						
						</div>

					</div>

				</div>

				<div className={('quiz__item ' + ( props.quiz.currentQuestion === 3 ? 'quiz__item--visible' : '') )}>

					<h3 className="quiz__title app__title">
						Умывается ли и промывает нос ребёнок
						каждый раз после улицы? 333
					</h3>

					<div className="quiz__image-placeholder">

						<img src={(PromoOptions.cdn + 'images/quiz/3.png')} alt="" className="quiz__image"/>

					</div>

					<div className="quiz__butons app__buttons">

						<div className="app__button-placeholder">

							<label className="quiz__button button button--orange button--m">
								<input type="radio" className="quiz__radio"
									onChange={this._clickRadioHandler()}
								/>
								Да
							</label>
						
						</div>

						<div className="app__button-placeholder">

							<label className="quiz__button button button--orange button--m">
								<input type="radio" className="quiz__radio"
									onChange={this._clickRadioHandler()}
								/>
								Нет
							</label>
						
						</div>

					</div>

				</div>

			</div>
		);
	}
}



const mapStateToProps = (state, ownProps) => ({
	profile: state.user.profile,
	children: state.children,
	quiz: state.quiz,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
	quizSetCurrentQuestion: (questionId) => dispatch(quizActions.quizSetCurrentQuestion(questionId)), 
	redirect: (page) => dispatch(pageActions.setPageWithoutHistory(page)), 
});

Quiz.propTypes = {
	mixClass: React.PropTypes.string,
//	Array: React.PropTypes.array.isRequired,
//	Bool: React.PropTypes.bool.isRequired,
//	Func: React.PropTypes.func.isRequired,
//	Number: React.PropTypes.number.isRequired,
//	Object: React.PropTypes.object.isRequired,
//	String: React.PropTypes.string.isRequired,
//	Symbol: React.PropTypes.symbol.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
