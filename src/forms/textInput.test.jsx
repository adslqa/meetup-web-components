import React from 'react';
import TextInput from './TextInput';
import { mount } from 'enzyme';

describe('TextInput', function() {
	const onChange = jest.fn();
	const LABEL_TEXT = 'Super Hero',
		VALUE = 'Batman',
		NAME_ATTR = 'superhero',
		MAX_LEN = 20,
		ERROR_TEXT = 'Too wimpy.';

	let textInputComponent,
		inputEl;

	beforeEach(() => {
		const formAttrs = {
			id: NAME_ATTR,
			maxLength: MAX_LEN,
			error: ERROR_TEXT,
			required: true,
		};
		textInputComponent = mount(
			<TextInput
				name={NAME_ATTR}
				label={LABEL_TEXT}
				value={VALUE}
				onChange={onChange}
				{...formAttrs}
			/>
		);

		inputEl = textInputComponent.find('input');
	});

	afterEach(() => {
		textInputComponent = null;
		inputEl = null;
	});

	it('exists', () => {
		expect(() => textInputComponent.find('input')).not.toBeNull();
	});

	it('should have a name attribute', () => {
		expect(inputEl.prop('name')).toEqual(NAME_ATTR);
	});

	it('should have a value when one is specified', () => {
		expect(inputEl.prop('value')).toEqual(VALUE);
	});

	it('should have a label when label is given', () => {
		expect(() => textInputComponent.find('label')).not.toBeNull();
		const labelEl = textInputComponent.find('label').getDOMNode();
		expect(labelEl.textContent).toEqual(LABEL_TEXT);
	});

	it('should have input type search if `isSearch` is set to true', () => {
		textInputComponent = mount(
			<TextInput
				name={NAME_ATTR}
				label={LABEL_TEXT}
				defaultValue={VALUE}
				isSearch
			/>
		);

		inputEl = textInputComponent.find('input');
		expect(inputEl.prop('type')).toEqual('search');

	});

	it('should have a disabled attribute when specified', () => {
		textInputComponent = mount(
			<TextInput
				name={NAME_ATTR}
				label={LABEL_TEXT}
				defaultValue={VALUE}
				disabled
			/>
		);

		inputEl = textInputComponent.find('input');
		expect(inputEl.prop('disabled')).not.toBeNull();
	});

	it('should have a required attribute when specified', () => {
		expect(inputEl.prop('required')).not.toBeNull();
	});

	it('should specify attributes that are passed in', function() {
		expect(inputEl.prop('maxLength')).toEqual(MAX_LEN);
	});

	it('should have an error when one is specified', function() {
		const errorEl = textInputComponent.find('.text--error').getDOMNode();
		expect(errorEl.textContent).toEqual(ERROR_TEXT);
	});

	it('should call onChange `props` function when input is changed', () => {
		const newValue = `${VALUE}r`;
		const boundComponent = mount(
			<TextInput
				name={NAME_ATTR}
				label={LABEL_TEXT}
				value={VALUE}
				onChange={onChange}
			/>
		);
		inputEl = boundComponent.find('input');
		inputEl.simulate('change', { target: { value: newValue }});

		expect(onChange).toHaveBeenCalled();
	});
});
