import React from 'react';
import TimeInput from './TimeInput';
import { storiesOf } from '@kadira/storybook';

storiesOf('TimeInput', module)
	.addWithInfo(
		'default',
		'renders a time input, values are in 24:00 time (ex 13:00)',
		() => (
			<InfoWrapper>
				<TimeInput name='time' required value='14:30' label='Dentist appt time' />
			</InfoWrapper>
		)
	)
	.add('default', () => {
		return (<div className='span--25'>
			<TimeInput name='time' label='End time' />
		</div>);
	})
	.add('initial value', () => {
		return (<div className='span--25'>
			<TimeInput name='time' value='13:00' label='End time' />
		</div>);
	})
	.add('required', () => {
		return (<div className='span--25'>
			<TimeInput name='time' required label='End time' />
		</div>);
	})
	.add('with error', () => {
		return (<div className='span--25'>
			<TimeInput name='time' value='13:00' label='End time' error='Sorry, out of time!' />
		</div>);
	});
