import React from 'react';
import { storiesOf, action } from '@storybook/react';
import {
	decorateWithLocale,
	decorateWithInfo,
} from '../utils/decorators';
import TogglePill from './TogglePill';

const onChange = e => {
	action(`The value of the Toggle Pill clicked is: ${e.target.value}`)(e);
};

storiesOf('TogglePill', module)
	.addDecorator(decorateWithLocale)
	.addDecorator(decorateWithInfo)
	.add('default', () => (
			<TogglePill
				onChange={onChange}
				id='togglePillId'
				name='togglePillName'
				value='toggle-pill'
			>
				Toggle Pill Label
			</TogglePill>
		)
	)
	.add('Default Selected', () => (
		<TogglePill
			onChange={onChange}
			id='togglePillId'
			name='togglePillName'
			value='toggle-pill'
			isActive
		>
			Toggle Pill Label
		</TogglePill>
	))
	.add('Large', () => (
		<TogglePill
			onChange={onChange}
			id='togglePillId'
			name='togglePillName'
			value='toggle-pill'
			large
		>
			Toggle Pill Label
		</TogglePill>
	))
	.add('with labelClassName', () => (
		<TogglePill
			onChange={onChange}
			id='togglePillId'
			name='togglePillName'
			value='toggle-pill'
			labelClassName='span--100'
		>
			I will span--100
		</TogglePill>
	))
	.add('Topic pill', () => (
		<TogglePill
			topic
			onChange={onChange}
			id='togglePillId'
			name='togglePillName'
			value='toggle-pill'
		>
			Toggle Pill Label
		</TogglePill>
	))
	.add('Topic pill selected', () => (
		<TogglePill
			topic
			onChange={onChange}
			id='togglePillId'
			name='togglePillName'
			value='toggle-pill'
			isActive
		>
			Toggle Pill Label
		</TogglePill>
	))
	.add('Radio button', () => (
		<div>
			<TogglePill
				onChange={onChange}
				id='togglePill1'
				name='pills'
				value='toggle-pill'
				isActive
				useRadio
			>
				Toggle Pill A
			</TogglePill>
			<TogglePill
				onChange={onChange}
				id='togglePill2'
				name='pills'
				value='toggle-pill'
				isActive
				useRadio
			>
				Toggle Pill B
			</TogglePill>
		</div>
	));
