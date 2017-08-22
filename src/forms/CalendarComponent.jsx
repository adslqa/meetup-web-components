import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';

/**
 * @module CalendarComponent
 * inits flatpickr js date picker over a text input
*/
class CalendarComponent extends React.Component {

	constructor(props) {
		super(props);

		this.flatpickrChange = this.flatpickrChange.bind(this);
	}

	/**
	* @description init the js date flatpickr component
	*/
	componentDidMount() {
		// flatpickr uses `window` on import,
		// which breaks on server-sider render.
		// lazy-loading flatpickr ensures it is
		// imported only in clientside envs.
		const Flatpickr = require('flatpickr');
		const options = {
			onChange: this.flatpickrChange,
			altInput: true,
			allowInput: true,
			altFormat: 'D M d, Y', // TODO localize
			defaultDate: this.props.value,
			nextArrow: `<span class="svg svg--chevron-right">
				<svg preserveAspectRatio="xMinYMin meet" width="12" height="12" viewBox="0 0 12 12" className="svg-icon valign--middle" role="img">
					<use xlink:href="#icon-chevron-right" />
				</svg>
			</span>`,
			prevArrow: `<span class="svg svg--chevron-left">
				<svg preserveAspectRatio="xMinYMin meet" width="12" height="12" viewBox="0 0 12 12" className="svg-icon valign--middle" role="img">
					<use xlink:href="#icon-chevron-left" />
				</svg>
			</span>`
		};

		Object.assign(options, this.props.opts);
		this.flatpickr = new Flatpickr(this.inputEl, options);
	}

	componentWillUnmount() {
		this.flatpickr && this.flatpickr.destroy();
	}

	componentWillReceiveProps(newProps) {
		this.flatpickr.setDate(newProps.value);
	}

	/**
	* @function flatpickrChange
	* @param Array selectedDates
	* @param dateStr
	* @param Object instance the calendar instance
	* @description signature conforms to the onChange handler flatpickr expects
	* calls the callback with the selectedDates value (callback used in wrapping components)
	*/
	flatpickrChange(selectedDates, dateStr, instance) {
		this.props.onChange && this.props.onChange(selectedDates[0]);
		this.props.datetimePickerCallback && this.props.datetimePickerCallback(selectedDates[0]);
	}

	render() {
		const {
			className,
			id,
			name,
			label,
			required,
			value,
			error,
			hideLabel,
			opts,					// eslint-disable-line no-unused-vars
			onChange,				// eslint-disable-line no-unused-vars
			datetimePickerCallback,	// eslint-disable-line no-unused-vars
			...other
		} = this.props;

		const classNames = cx(
			'input--dateTimePicker',
			{ 'visibility--a11yHide' : hideLabel },
			className
		);

		const labelClassNames = cx(
			{required},
			{ 'visibility--a11yHide' : hideLabel },
			className
		);

		return (
			<span>
				{ label && <label htmlFor={id} className={labelClassNames}>{label}</label> }
				<input
					type='text'
					id={id}
					name={name}
					defaultValue={value}
					className={classNames}
					ref={ input => this.inputEl = input }
					{...other} />

				{ error && <p className='text--error'>{error}</p> }
			</span>
		);
	}
}

CalendarComponent.propTypes = {
	name: PropTypes.string.isRequired,
	datetimePickerCallback: PropTypes.func
};

export default CalendarComponent;

