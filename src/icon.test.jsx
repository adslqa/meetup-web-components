import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import Icon, { ICON_CLASS } from './Icon';
import { MEDIA_SIZES } from './utils/designConstants';

describe('Icon', () => {
	const label = 'Icon Label',
		shape = 'chevron-down';

	describe('is a Icon element', () => {
		let iconEl;

		beforeEach(() => {
			const icon = TestUtils.renderIntoDocument(
				<Icon
					aria-label={label}
					shape={shape} />
			);

			iconEl = ReactDOM.findDOMNode(icon);
		});

		afterEach(() => {
			iconEl = null;
		});

		it('exists', () => {
			expect(iconEl).not.toBeNull();
		});

		it('has SQ2 icon styles', () => {
			expect(iconEl.classList.contains(ICON_CLASS)).toBe(true);
		});

		it('creates a first-child svg element', () => {
			const svgEl = iconEl.firstChild;
			expect(svgEl.nodeName).toBe('svg');
		});
	});

	describe('renders icon sizes correctly', () => {
		const sizeChecker = (size) => {
			const icon = TestUtils.renderIntoDocument(
				<Icon
					aria-label={label}
					shape={shape}
					size={size} />
			);
			const iconEl = ReactDOM.findDOMNode(icon);
			const svgEl = iconEl.querySelector('svg');
			const value = MEDIA_SIZES[size];
			expect(svgEl.getAttribute('width')).toEqual(value);
			expect(svgEl.getAttribute('height')).toEqual(value);
			if (size === 'auto') {
				expect(svgEl.getAttribute('viewBox')).toEqual(`0 0 ${MEDIA_SIZES['xl']} ${MEDIA_SIZES['xl']}`);
			} else {
				expect(svgEl.getAttribute('viewBox')).toEqual(`0 0 ${value} ${value}`);
			}
		};

		it('renders each size correctly', () => {
			Object.keys(MEDIA_SIZES).forEach(sizeChecker);
		});
	});
});
