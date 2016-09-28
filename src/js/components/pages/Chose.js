import React from 'react';
import { connect } from 'react-redux';

import Button from '../../components/common/Button';
import Select from '../../components/common/Select';

import * as pageActions from '../../actions/page';
import * as childrenActions from '../../actions/children';

class Chose extends React.Component {

	componentWillMount(){
		this._checkChildrensCount();
	}

	componentWillUpdate(){
		this._checkChildrensCount();
	}

	_checkChildrensCount(){
		const { props } = this;

		if (props.children.list.length === 0){
			props.redirect('/parentsonly');
			return;
		}

		if (props.children.list.length === 1){
			props.redirect('/quiz');
			return;
		}
	}

	_start(){
		const { props } = this;
		props.redirect('/quiz');
	}

	_selectChildHandler = () => (e) => {
		e.preventDefault();

		const childId = parseInt(e.target.options[e.target.selectedIndex].value);

		this.props.childrenSetCurrent(childId);
	}

	_startClickHandler = () => (e) => {
		this._start();
	}

	render(){
		const { props } = this;

		if (!props.initialData){
			return null;
		}

		const fullNamedChildren = props.children.list.map( child => {
			return {
				...child,
				fullName: child.lastName + ' ' + child.firstName + ' ' + child.middleName,
			}
		})

		return(
			<div className="app__page">

				<div className="app__logo-placeholder">

					<span className="derinat-logo"></span>

				</div>

				<div className="app__content">

					<h1 className="app__title">
						Выберите ФИО ребенка для продолжения
					</h1>

					<div className="app__select">

					<Select
						options={fullNamedChildren}
						optionValueKey="id"
						optionTitleKey="fullName"
						name="children"
						onChangeHandler={this._selectChildHandler()}
					/>

					</div>

					<div className="app__buttons">

						<div className="app__button-placeholder">

							<Button
								size="m"
								color="orange"
								type="button"
								onClickHandler={this._startClickHandler()}
							>
								Продолжить
							</Button>

						</div>

					</div>

				</div>

			</div>
		);
	}
}



const mapStateToProps = (state, ownProps) => ({
	children: state.children,
	initialData: state.initialData,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
	childrenSetCurrent: (childId) => dispatch(childrenActions.childrenSetCurrent(childId)),
	redirect: (pageId) => dispatch(pageActions.setPageWithoutHistory(pageId)),
});

Chose.propTypes = {
	mixClass: React.PropTypes.string,
//	Array: React.PropTypes.array.isRequired,
//	Bool: React.PropTypes.bool.isRequired,
//	Func: React.PropTypes.func.isRequired,
//	Number: React.PropTypes.number.isRequired,
//	Object: React.PropTypes.object.isRequired,
//	String: React.PropTypes.string.isRequired,
//	Symbol: React.PropTypes.symbol.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Chose);
