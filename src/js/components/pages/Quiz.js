import React from 'react';
import { connect } from 'react-redux';

import { PromoOptions } from 'appSettings';
import User from '../../components/user/User';

import ReactSlider from 'react-slider';

import * as quizActions from '../../actions/quiz';
import * as asyncActions from '../../actions/async';
import * as pageActions from '../../actions/page';


class Quiz extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			answers: [
				2,
				'',
				'',
				'',
				'',
				2,
				'',
				'',
				'',
				'',
			]
		};
	}

	componentWillMount(){
		const { props } = this;	
	}

	componentDidMount(){
		const { props } = this;		
	}

	_nextQuestion(){
		const { props, state } = this;

		if (props.quiz.currentQuestion === 10){
			props.getResults(state.answers);
		}

		props.quizSetCurrentQuestion( props.quiz.currentQuestion + 1 );
	}

	_addAnswer(questionIndex, answer){

		const answers = [...this.state.answers];

		answers[questionIndex - 1] = answer;
		
		this.setState({
			...this.state,
			...{
				answers: answers
			}
		});

		console.log(this.state);		
	}

	_changeRadioHandler = (questionIndex) => (e) => {
		e.preventDefault();

		this._addAnswer(questionIndex, e.target.value);

		setTimeout(() => { //hack for update state twice
			this._nextQuestion();	
		}, 0);
		
	}

	_nextQuestionHandler = () => (e) => {
		e.preventDefault();
		this._nextQuestion();
	}

	_sliderChangeHandler = (questionIndex) => (value) => {
		this._addAnswer(questionIndex, value);
	}

	_image(questionIndex){
		return(

			<div className="quiz__image-placeholder">

				<img src={(PromoOptions.cdn + 'images/quiz/' + questionIndex + '.png')} alt="" className="quiz__image"/>

			</div>

		);
	}


	_buttons(questionIndex){
		return(

			<div className="quiz__butons app__buttons"
			>

				<div className="app__button-placeholder">

					<label className="quiz__button button button--orange button--m">
						<input type="radio" 
							name={('questions-' + questionIndex + '')} 
							value="yes"
							className="quiz__radio" 
							onChange={this._changeRadioHandler(questionIndex)}
						/>
						Да
					</label>
				
				</div>

				<div className="app__button-placeholder">

					<label className="quiz__button button button--orange button--m">
						<input type="radio" 
							name={('questions-' + questionIndex + '')} 
							value="no"
							className="quiz__radio"
							onChange={this._changeRadioHandler(questionIndex)}
						/>
						Нет
					</label>
				
				</div>

			</div>

		);
	}

	_button(questionIndex){
		return(

			<div className="quiz__butons app__buttons">

				<div className="app__button-placeholder">

					<button 
						className="quiz__button button button--orange button--m"
						onClick={this._nextQuestionHandler()}
					>
						Следующий вопрос
					</button>
				
				</div>

			</div>

		);
	}

	_question(questionIndex, title){
		const { props } = this;

		return(
			<div 
				className={('quiz__item ' + ( props.quiz.currentQuestion === questionIndex ? 'quiz__item--visible' : '') )}
				key={questionIndex}
				>

				<h3 className="quiz__title app__title">
					{title}
				</h3>

				{this._image(questionIndex)}

				{	questionIndex === 1 
					? this._slider1(questionIndex)
					: null
				}

				{	questionIndex === 6 
					? this._slider2(questionIndex)
					: null
				}

				{	( questionIndex === 1 || questionIndex === 6 )
					? this._button(questionIndex)
					: this._buttons(questionIndex)
				}

			</div>
		);
	}

	_slider1(){
		return(

			<div className="quiz__slider quiz-slider">

				<div className="quiz-slider__line">
					
					<ReactSlider 
						defaultValue={2} 
						pearling={true} 
						withBars
						min={1} 
						max={4}
						className="quiz-slider__inner-line"
						onChange={this._sliderChangeHandler(1)}
						>
						<div className="quiz-slider__handle">
							
						</div>
					</ReactSlider>

				</div>

				<div className="quiz-slider__answers">

					<div className="quiz-slider__answer">
						1 раз в неделю <br/>
						и реже
					</div>

					<div className="quiz-slider__answer">
						2 раза <br/>
						в неделю
					</div>

					<div className="quiz-slider__answer">
						3 - 4 раза<br/>
						в неделю
					</div>

					<div className="quiz-slider__answer">
						Каждый день
					</div>

				</div>
			
			</div>
		);
	}

	_slider2(){
		return(

			<div className="quiz__slider quiz-slider">

				<div className="quiz-slider__line">
					
					<ReactSlider 
						defaultValue={2} 
						pearling={true} 
						withBars
						min={1} 
						max={4}
						className="quiz-slider__inner-line"
						onChange={this._sliderChangeHandler(2)}
						>
						<div className="quiz-slider__handle">
							
						</div>
					</ReactSlider>

				</div>

				<div className="quiz-slider__answers">

					<div className="quiz-slider__answer">
						Никогда
					</div>

					<div className="quiz-slider__answer">
						1 раз в день
					</div>

					<div className="quiz-slider__answer">
						2 раза в день
					</div>

					<div className="quiz-slider__answer">
						Несколько <br/>
						раз в день
					</div>

				</div>
			
			</div>
		);
	}

	render(){
		const { props } = this;

		if (!props.profile || props.children.list.length === 0){
			return null;
		}

		//let questionIndex = 0;

		const questions = [
			'Часто ли Ваш ребёнок посещает общественные места? ',
			'Моет ли ребёнок руки каждый раз, когда возвращается с улицы и перед едой?',
			'Умывается ли и промывает нос ребёнок каждый раз после улицы?',
			'Переодевается ли ребёнок в домашнюю одежду, когда приходит домой?',
			'Следите ли Вы, чтобы ребёнок надевал головной убор, выходя на улицу?',
			'Как часто Вы проветриваете воздух в квартире?',
			'Поддерживаете ли Вы нормальную влажность воздуха в квартире?',
			'Когда кто-то из членов семьи заболевает, используете ли вы одноразовые медицинские маски?',
			'Применяете ли вы профилактические лекарственные средства для профилактики ОРВИ, защиты от вирусов?',
			'Принимаются ли в школе меры по поддержанию здорового микроклимата в классе?',
		]

		return(
			<div className="app__page quiz">

				<div className="app__logo-placeholder">

					<span className="derinat-logo"></span>

				</div>

				<div className="app__content">

					<form action="#" 
						className="quiz__form"
						method="post"
					>

						{questions.map( (question, index) => (
							this._question(index + 1, question)
						))}

					</form>

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
	getResults: (data) => dispatch(asyncActions.getResults(data)), 
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
