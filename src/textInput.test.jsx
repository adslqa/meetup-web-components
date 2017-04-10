import React from 'react';
import TestUtils from 'react-addons-test-utils';
import TextInput from './TextInput';

describe('TextInput', function() {
	const onChange = jest.fn();
	const LABEL_TEXT = 'Super Hero',
		VALUE = 'Batman',
		NAME_ATTR = 'superhero',
		MAX_LEN = '20',
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
		textInputComponent = TestUtils.renderIntoDocument(
			<TextInput
				name={NAME_ATTR}
				label={LABEL_TEXT}
				value={VALUE}
				{...formAttrs}
			/>
		);

		inputEl = TestUtils.findRenderedDOMComponentWithTag(textInputComponent, 'input');
	});

	afterEach(() => {
		textInputComponent = null;
		inputEl = null;
	});

	it('exists', () => {
		expect(() => TestUtils.findRenderedDOMComponentWithTag(textInputComponent, 'input')).not.toThrow();
	});

	it('should have a name attribute', () => {
		expect(inputEl.name).toEqual(NAME_ATTR);
	});

	it('should have a value when one is specified', () => {
		expect(inputEl.value).toEqual(VALUE);
	});

	it('should have a label when label is given', () => {
		expect(() => TestUtils.findRenderedDOMComponentWithTag(textInputComponent, 'label')).not.toThrow();
		const labelEl = TestUtils.findRenderedDOMComponentWithTag(textInputComponent, 'label');
		expect(labelEl.textContent).toEqual(LABEL_TEXT);
	});

	it('should have a required attribute when specified', () => {
		expect(inputEl.attributes.required).not.toBeNull();
	});

	it('should specify attributes that are passed in', function() {
		expect(inputEl.getAttribute('maxLength')).toEqual(MAX_LEN);
	});

	it('should have an error when one is specified', function() {
		expect(() => TestUtils.findRenderedDOMComponentWithClass(textInputComponent, 'text--error')).not.toThrow();
		const errorEl = TestUtils.findRenderedDOMComponentWithClass(textInputComponent, 'text--error');
		expect(errorEl.textContent).toEqual(ERROR_TEXT);
	});

	it('should specify attributes that are passed in', function() {
		expect(inputEl.getAttribute('maxLength')).toEqual(MAX_LEN);
	});

	it('should set its value on input change', function() {
		const newValue = `${VALUE}r`;
		expect(inputEl.value).toEqual(VALUE);
		TestUtils.Simulate.change(inputEl, { target: { value: newValue } });
		expect(inputEl.value).toEqual(newValue);
	});

	it('should call onChange and setState with input change', function() {
		const newValue = `${VALUE}r`;
		const changeSpy = spyOn(TextInput.prototype, 'onChange').and.callThrough();
		const stateSpy = spyOn(TextInput.prototype, 'setState').and.callThrough();

		const boundComponent = TestUtils.renderIntoDocument(
			<TextInput
				name={NAME_ATTR}
				label={LABEL_TEXT}
				value={VALUE}
				onChange={onChange}
			/>
		);

		inputEl = TestUtils.findRenderedDOMComponentWithTag(boundComponent, 'input');
		TestUtils.Simulate.change(inputEl, { target: { value: newValue } });

		expect(changeSpy).toHaveBeenCalled();
		expect(stateSpy).toHaveBeenCalledWith({ value: newValue });
	});

	it('should call onChange `props` function when input is changed', () => {
		const newValue = `${VALUE}r`;
		const boundComponent = TestUtils.renderIntoDocument(
			<TextInput
				name={NAME_ATTR}
				label={LABEL_TEXT}
				value={VALUE}
				onChange={onChange}
			/>
		);
		inputEl = TestUtils.findRenderedDOMComponentWithTag(boundComponent, 'input');
		TestUtils.Simulate.change(inputEl, { target: { value: newValue } });

		expect(onChange).toHaveBeenCalled();
	});
});