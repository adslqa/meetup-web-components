import React from 'react';

import Checkbox from './Checkbox';
import { storiesOf } from '@storybook/react';
import {
	decorateWithLocale,
	decorateWithInfo,
} from '../utils/decorators';

storiesOf('Checkbox', module)
	.addDecorator(decorateWithLocale)
	.addDecorator(decorateWithInfo)
	.add('default', () => (<Checkbox id='nada' name='no-name' value='nada' />))
	.add('with label', () => <Checkbox label='Ketchup' value='ketchup' name='condiment' />)
	.add('checked', () => <Checkbox label='Mustard' checked value='mustard' name='condiment' />)
	.add('disabled', () => (
		<div>
			<Checkbox label='Mustard' value='mustard' name='condiment' disabled />
			<Checkbox label='Mustard' value='mustard' name='condiment' checked disabled />
		</div>
	))
	.add('in a set', () => {
		return (<div>
			<Checkbox label='Ketchup' name='condiment' value='ketchup' />
			<Checkbox label='Mustard' checked name='condiment' value='mustard' />
			<Checkbox label='Relish' checked name='relish' value='relish' />
		</div>);
	});
