import React from 'react';
import { connect } from 'react-redux';

import { PromoOptions } from 'appSettings';

import Button from '../../components/common/Button';

//import * as asyncActions from '../../actions/async';
import * as pageActions from '../../actions/page';
import * as quizActions from '../../actions/quiz';
import * as resultsActions from '../../actions/results';

class Results extends React.Component {

	constructor(props){
		super(props);

		this.state = {
			preview: false,
		}
	}

	componentWillMount(){
		const { props } = this;	
		if (!props.results.completed){
			props.redirect('/');
		}	
	}

	_startAgain(){
		const { props } = this;
		props.resultsReset();
		props.quizSetCurrentQuestion(1);
		props.redirect('/');
	}

	_startAgainHandler = () => (e) => {
		this._startAgain();
	}

	_save(){
		html2canvas(this.refs.forsave, {
		    onrendered: function(canvas) {
		   		document.body.appendChild(canvas);
		    }
		})
	}	

	_printHandler = () => (e) => {
		e.preventDefault();

		window.print();
	}

	_saveHandler = () => (e) => {
		e.preventDefault();

		this._save();
	}


	_previewHandler = () => (e) => {
		e.preventDefault();

		this.setState({
			...this.state,
			...{
				preview: true,
			}
		})
	}


	_buttons1(){

		const { state, props } = this;

		if (state.preview !== false){
			return null;
		}

		return (
			<div className="results__buttons app__buttons">

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


				<div className="app__button-placeholder">

					<Button 
						size="m"
						color="orange"
						type="button"
						onClickHandler={this._printHandler()}
					>
						Распечатать
					</Button>
				
				</div>

			</div>
		);
	}


	_buttons2(){

		const { state, props } = this;

		if (state.preview === false){
			return null;
		}

		return (
			<div className="results__buttons app__buttons">


				<div className="app__button-placeholder">

					<Button 
						size="m"
						color="orange"
						type="button"
						onClickHandler={this._saveHandler()}
					>
						Сохранить
					</Button>
				
				</div>


				<div className="app__button-placeholder">

					<Button 
						size="m"
						color="orange"
						type="button"
						onClickHandler={this._printHandler()}
					>
						Распечатать
					</Button>
				
				</div>

			</div>
		);
	}

	_calculateAge(birthday) { // birthday is a date
	    const ageDifMs = Date.now() - new Date(birthday).getTime();
	    const ageDate = new Date(ageDifMs); // miliseconds from epoch
	    return Math.abs(ageDate.getUTCFullYear() - 1970);
	}

	_declOfNum(number, titles) {  
	    const cases = [2, 0, 1, 1, 1, 2];  
	    return titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ];  
	}

	render(){
		const { props, state } = this;

		const age = this._calculateAge(props.results.child.birthday);

		const risk = props.results.quizAnswers.reduce( (prev, answer, index) => {

			if (index === 0){
				switch(answer){
					case 1: 
					case 2: return prev - 5;
							break;
					case 3: 
					case 4: return prev + 5;
							break;
				}
			}

			if (index === 5){
				switch(answer){
					case 1: 
					case 2: return prev + 5;
							break;
					case 3: 
					case 4: return prev - 5;
							break;
				}
			}

			switch(answer){
				case 'yes': return prev - 5;
				case 'no': return prev + 5;
			}

		}, 50);

		return (
			<div className="results">

				{/*
				<div className={('results__forsave ' + (state.preview ? 'results__forsave--preview' : '') )} ref="forsave">
				*/}
					<img 
						src={(PromoOptions.cdn + 'images/bg/res-bg.png')} 
						alt="" 
						className="results__bg"
					/>

					<div className="results__child results-child">

						<div className="results-child__top">

							<div className="results-child__logo">

								<img 
									src={(PromoOptions.cdn + 'images/derinat.png')} 
									alt="" 
									//className="results__bg"
								/>

							</div>

							<div className="results-child__avatar-placeholder">

								<img src={props.results.child.photoMedium} alt="" className="results-child__avatar"/>

							</div>

							<div className="results-child__info">

								<div className="results-child__name">
									{props.results.child.fullName}
								</div>

								<div className="results-child__age">
									{age} {this._declOfNum(age, ['год', 'года', 'лет'])}
								</div>

								<div className="results-child__text text">

									<p>
										Риск заражения ОРВИ и гриппом в этом году — {risk}%*
									</p>
									<p>
										<em>
											*значение получено на основании Ваших ответов на 
											вопросы и является приблизительным.
										</em>
									</p>

								</div>

							</div>

						</div>

						<div className="results-child__text text">

							<p>
								В прошлой четверти Ваш ребёнок пропустил 
								{' '}
								<strong>
									{props.results.absents.length} 
									{' '}
									{this._declOfNum(props.results.absents.length, ['урок', 'урока', 'уроков'])}
								</strong>. 
								{' '}
								{
									(props.results.absents.length > 10)
									? 
									<span>
										Если это произошло из-за болезни, рекомендуем в этом году тщательнее подготовиться к 
										периоду школьных эпидемий и обратить пристальное внимание на правила личной гигиены, 
										поддержание здорового микроклимата в помещениях и меры медикаментозной профилактики. 
										Ниже приведен список рекомендаций, придерживаясь которых, Вы сможете повысить иммунитет 
										ребенка и сократить пропуски занятий по болезни в этом учебном году.
									</span>
									:
									<span>
										Здорово! Значит, у него сильный иммунитет, который эффективно справляется с инфекцией. 
										Чтобы не болеть и в этом году, рекомендуем Вам обратить внимание на правила личной 
										гигиены, поддержание микроклимата в помещении и меры медикаментозной профилактики. 
										Ниже приведен список рекомендаций, придерживаясь которых,
										Вы сможете снизить риск заболеваний в этом учебном году.
									</span>
								}
								
							</p>

						</div>

					</div>

					<div className="results__boxes">

						<img 
							src={(PromoOptions.cdn + 'images/bg/bubles.jpg')} 
							alt="" 
							className="results__boxes-bg"
						/>

						<div className="results__box results-box">

							<h3 className="results-box__title">
								Личная гигиена
							</h3>

							<div className="results-box__text text">
								
								<p>
									В период эпидемий ребёнку следует:
								</p>
								
								<h4>
									В ШКОЛЕ:
								</h4>
								
								<ul>
									<li>
										Избегать прикосновений руками и посторонними предметами к своему лицу;
									</li>
									<li>
										Мыть руки перед приемом пищи.
									</li>
								</ul>

								
								<h4>
									ДОМА:
								</h4>

								
								<ul>
									<li>
										Мыть руки с мылом не менее 10 секунд после возвращения с улицы и перед каждым приёмом пищи, тщательно протирая пальцы и ладони; 
									</li>
									<li>
										Микробы переносятся не только на коже человека, но и на его одежде. Очень важно переодеваться в домашнюю одежду, возвращаясь из школы и с прогулки;
									</li>
									<li>
										В большинстве случаев вирус попадает в организм человека через слизистую носа. Именно поэтому очень важно промывать нос после каждого посещения улицы или общественного места, наполняя его водой из ладоней, с последующим высмаркиванием. Чтобы защитить слизистую от попадания инфекции, рекомендуем использовать препарат Деринат, который укрепляет защитные силы слизистой оболочки носоглотки и обладает противовирусными свойствами.
									</li>
								</ul>

							</div>

						</div>

						<div className="results__box results-box">

							<h3 className="results-box__title">
								Поведение
							</h3>

							<div className="results-box__text text">
								
								<p>
									В период эпидемий гриппа и простудных заболеваний ребёнку необходимо:
								</p>
																
								<ul>
									<li>
										Избегать контактов с больными людьми. Ограничить посещение культурно-массовых мероприятий, сократить время пребывания в местах скопления людей, пользоваться защитной маской;
									</li>
									<li>
										Высыпаться и правильно питаться. Защитить организм от вредных бактерий поможет употребление чеснока и лука, конечно, детям вряд ли понравятся такие меры, поэтому хотя бы включайте в ежедневный рацион ребенка свежие овощи и заставляйте пить много жидкости;
									</li>
									<li>
										Применять Деринат для защиты от вирусов, желательно несколько раз в день: утром перед школой, днем после школы, вечером и перед сном. Препарат оказывает иммуномодулирующее, противовирусное, противобактериальное и восстанавливающее действие.
									</li>
								</ul>

							</div>

						</div>

						<div className="results__box results-box">

							<h3 className="results-box__title">
								Микроклимат дома
							</h3>

							<div className="results-box__text text">
								
								<p>
									Все способы профилактики ОРВИ будут эффективнее, если:
								</p>
								
								<ul>
									<li>
										Поддерживать в жилом помещении чистоту, комфортную температуру и проветривать комнаты при каждом удобном случае;
									</li>
									<li>
										Поддерживать в помещении влажность воздуха в пределах 40-60%. Для этого необходимо иметь гигрометр (прибор для измерения влажности) и средство для увлажнения (мойку воздуха, увлажнитель) или использовать подручные средства: ёмкости с водой, размещенные под батареей (например, цветочные балконные ящики), аквариум, живые цветы в горшках.		
									</li>
								</ul>

							</div>

						</div>

						<img 
							src={(PromoOptions.cdn + 'images/pers/1.png')} 
							alt="" 
							className="results__pers results__pers--1"
						/>

						<img 
							src={(PromoOptions.cdn + 'images/pers/2.png')} 
							alt="" 
							className="results__pers results__pers--2"
						/>

						<img 
							src={(PromoOptions.cdn + 'images/pers/3.png')} 
							alt="" 
							className="results__pers results__pers--3"
						/>

						<img 
							src={(PromoOptions.cdn + 'images/pers/4.png')} 
							alt="" 
							className="results__pers results__pers--4"
						/>
						
					</div>
				{/*
				</div>
				*/}

				{this._buttons1()}

			</div>
		);
	}
}

Results.propTypes = {
	mixClass: React.PropTypes.string,
};

const mapStateToProps = (state, ownProps) => ({
	profile: state.user.profile,
	results: state.results,
});

const mapDispatchToProps = (dispatch, ownProps) => ({ 
	redirect: (pageId) => dispatch(pageActions.setPageWithoutHistory(pageId)), 
	quizSetCurrentQuestion: (questionId) => dispatch(quizActions.quizSetCurrentQuestion(questionId)), 
	resultsReset: () => dispatch(resultsActions.resultsReset()), 
});

export default connect(mapStateToProps, mapDispatchToProps)(Results);
