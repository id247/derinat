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

	_printHandler = () => (e) => {
		e.preventDefault();

		window.print();
	}

	render(){
		const { props } = this;

		return (
			<div className="results">

				<div className="results__child results-child">

					<div className="results-child__top">

						<div className="results-child__logo">

							<span className="derinat-logo"></span>

						</div>

						<div className="results-child__avatar-placeholder">

							<img src="" alt="" className="results-child__avatar"/>

						</div>

						<div className="results-child__info">

							<div className="results-child__name">
								Иванов Степан Юрьевич
							</div>

							<div className="results-child__age">
								11 лет
							</div>

							<div className="results-child__text text">

								<p>
									Риск заражения ОРВИ и гриппом в этом году — 70%*
								</p>
								<p>
									<em>
										(значение получено на основании Ваших ответов на вопросы и является приблизительным).
									</em>
								</p>

							</div>

						</div>

					</div>

					<div className="results-child__text text">

						<p>
							В прошлой четверти Ваш ребёнок пропустил 45 уроков. Если это произошло из-за болезни, рекомендуем в этом году тщательнее подготовиться к периоду школьных эпидемий и обратить пристальное внимание на правила личной гигиены, поддержание здорового микроклимата в помещениях и меры медикаментозной профилактики. Ниже приведен список рекомендаций, придерживаясь которых, Вы сможете повысить иммунитет ребенка и сократить пропуски занятий по болезни в этом учебном году.
						</p>

					</div>

				</div>

				<div className="results__boxes">

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

					<span className="results__pers results__pers--1"></span>
					<span className="results__pers results__pers--2"></span>
					<span className="results__pers results__pers--3"></span>
					<span className="results__pers results__pers--4"></span>
					
				</div>

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
