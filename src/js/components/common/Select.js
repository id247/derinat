import React from 'react';

const Select = (props) => (

	<div className={( (props.mixClass ? props.mixClass : '') + ' select')}>

		<div className="select__select-placeholder">

			<select
				className="select__select"
				name={props.name}
				id={props.id}
				defaultValue={props.defaultValue}
				onChange={props.onChangeHandler}
			>
			{props.options.map( (option, id) => (
				<option
					key={id}
					value={option[props.optionValueKey]}
				>
					{option[props.optionTitleKey]}
				</option>
			))}
			</select>


		</div>

	</div>
);

Select.propTypes = {
	mixClass: React.PropTypes.string,
	id: React.PropTypes.string,
	defaultValue: React.PropTypes.string,
	name: React.PropTypes.string.isRequired,
	options: React.PropTypes.array.isRequired,
	optionValueKey: React.PropTypes.string.isRequired,
	optionTitleKey: React.PropTypes.string.isRequired,

	onChangeHandler: React.PropTypes.func.isRequired,
};

export default Select;

