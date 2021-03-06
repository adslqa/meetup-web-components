import React from 'react';
import Textarea from '../Textarea';

/**
 * This component wraps the standard Textarea component for use with redux-form.
 * It deconstructs props that redux-form sets and re-sets them on Textarea.
 * @param {object} props React component props
 * @return {React.Component} Textarea
 */
const ReduxFormTextarea = props => {
	const { meta, input, ...other } = props;

	return <Textarea error={meta.error} {...input} {...other} />;
};

ReduxFormTextarea.displayName = 'ReduxFormTextarea';

export default ReduxFormTextarea;
