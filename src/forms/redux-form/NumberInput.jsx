import React from 'react';
import NumberInput from '../NumberInput';

/**
 * @param {Object} props - props passed in from parent and redux-form
 * @description wraps standard NumberInput web component for use with redux-form
 * deconstructs props that redux-forms sets and sets them on NumberInput
 * @return {Component} NumberInput
 */
const ReduxFormNumberInput = props => {
	const { meta, input, ...other } = props;

	// NumberInput calls onChange with a plain object that simulates an Event.
	// redux-form will treat anything other than a React SyntheticEvent instance
	// as the input _value_, so we need to wrap its `onChange` handler with
	// logic that will extract the simulated value from the NumberInput onChange
	const wrappedOnChange = ({ target: { value } }) => input.onChange(value);
	return (
		<NumberInput
			error={(meta || {}).error}
			{...input}
			onChange={wrappedOnChange}
			{...other}
		/>
	);
};

ReduxFormNumberInput.displayName = 'ReduxFormNumberInput';

export default ReduxFormNumberInput;
