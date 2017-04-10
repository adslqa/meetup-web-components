import React from 'react';
import cx from 'classnames';

/**
 * @module TextInput
 */
class TextInput extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			value: props.value || '',
		};
		this.onChange = this.onChange.bind(this);
	}

	onChange(e) {
		this.setState({ value: e.target.value });
		if (this.props.onChange) {
			this.props.onChange(e);
		}
	}

	render() {
		const {
			name,
			value, // eslint-disable-line no-unused-vars
			label,
			labelClassName,
			className,
			children,
			error,
			required,
			onChange, // eslint-disable-line no-unused-vars
			...other
		} = this.props;

		const classNames = cx(
			{ 'field--error': error },
			className
		);

		const labelClassNames = cx(
			{ required },
			labelClassName
		);

		return (
			<div>
				<label className={labelClassNames} htmlFor={other.id}>
					{label}
				</label>

				<input type='text'
					name={name}
					value={this.state.value}
					required={required}
					className={classNames}
					onChange={this.onChange}
					{...other} />

				{ this.props.maxLength && <p className='text--caption align--right'>{this.state.value.length} / {this.props.maxLength}</p> }

				{ error && <p className='text--error'>{error}</p> }
				{children}
			</div>
		);
	}
}

TextInput.propTypes = {
	name: React.PropTypes.string.isRequired,
	error: React.PropTypes.oneOfType([
		React.PropTypes.string,
		React.PropTypes.element
	]),
	label: React.PropTypes.oneOfType([
		React.PropTypes.string,
		React.PropTypes.element
	]),
	labelClassName: React.PropTypes.string,
	required: React.PropTypes.bool,
	onChange: React.PropTypes.func,
};

export default TextInput;