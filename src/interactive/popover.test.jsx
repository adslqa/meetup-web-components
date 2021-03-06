import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/test-utils';
import Popover from './Popover';
import Button from '../forms/Button';

let popover, popoverEl, triggerEl, menuEl, optionEls;

const class_hidden = 'opacity--0';
const MOCK_HANDLER = jest.genMockFunction();

const popoverComponent = (
	<Popover
		trigger={<Button>Open</Button>}
		menuItems={[
			<Button onClick={MOCK_HANDLER}>First option</Button>,
			<Button onClick={MOCK_HANDLER}>Second option</Button>,
			<Button onClick={MOCK_HANDLER}>Third option</Button>,
		]}
	/>
);

const getIsActive = menuEl => {
	return !menuEl.classList.contains(class_hidden);
};

describe('Popover', function() {
	beforeEach(() => {
		popover = TestUtils.renderIntoDocument(popoverComponent);
		popoverEl = ReactDOM.findDOMNode(popover);
		triggerEl = ReactDOM.findDOMNode(
			TestUtils.findRenderedDOMComponentWithClass(popover, 'popover-trigger')
		);
		menuEl = ReactDOM.findDOMNode(
			TestUtils.findRenderedDOMComponentWithClass(
				popover,
				'popover-container--menu'
			)
		);
		optionEls = TestUtils.scryRenderedDOMComponentsWithClass(
			popover,
			'popover-menu-option-target'
		).map(option => ReactDOM.findDOMNode(option));
	});

	afterEach(() => {
		popover = null;
		popoverEl = null;
		triggerEl = null;
		menuEl = null;
		optionEls = null;
	});

	it('exists; menu hidden by default', () => {
		expect(popoverEl).not.toBeNull();
		expect(getIsActive(menuEl)).toBe(false);
	});

	it('menu appears on trigger click', () => {
		expect(getIsActive(menuEl)).toBe(false);
		TestUtils.Simulate.click(triggerEl);
		expect(getIsActive(menuEl)).toBe(true);
	});

	describe('onKeyDown', () => {
		it('menu is keyboard navigable with `escape` key', () => {
			const firstOption = optionEls[0];

			popover.openMenu();

			TestUtils.Simulate.keyDown(firstOption, { key: 'Escape' });
			expect(getIsActive(menuEl)).toBe(false);
		});
		it('menu is keyboard navigable with `enter` key', () => {
			TestUtils.Simulate.keyDown(triggerEl, { key: 'Enter' });
			expect(getIsActive(menuEl)).toBe(true);
		});
	});

	describe('onKeyDownMenuItem', () => {
		let firstOption, secondOption;

		beforeEach(() => {
			firstOption = optionEls[0];
			secondOption = optionEls[1];
			popover.openMenu();
		});

		it('menu is keyboard navigable with arrows `Down`', () => {
			TestUtils.Simulate.keyDown(firstOption, { key: 'ArrowDown' });
			expect(document.activeElement).toBe(secondOption);
		});
		it('menu is keyboard navigable with arrows `Up`', () => {
			TestUtils.Simulate.keyDown(firstOption, { key: 'ArrowUp' });
			expect(document.activeElement).toBe(firstOption);
		});
		it('menu is keyboard navigable with arrows `Enter`', () => {
			TestUtils.Simulate.keyDown(firstOption, { key: 'Enter' });
			expect(MOCK_HANDLER).toHaveBeenCalled();
		});
	});

	describe('updateFocusBy', () => {
		it('should increase the selectedIndex state for positive delta', () => {
			expect(popover.state.selectedIndex).toBe(0);
			popover.updateFocusBy(1);
			expect(popover.state.selectedIndex).toBe(1);
		});
		it('should not increase the selectedIndex state for zero delta', () => {
			expect(popover.state.selectedIndex).toBe(0);
			popover.updateFocusBy(0);
			expect(popover.state.selectedIndex).toBe(0);
		});
		it('should decrease the selectedIndex state for negative delta', () => {
			popover.updateFocusBy(1);
			expect(popover.state.selectedIndex).toBe(1);
			popover.updateFocusBy(-1);
			expect(popover.state.selectedIndex).toBe(0);
		});
	});

	describe('openMenu', () => {
		it('should set the component state to active', () => {
			expect(popover.state.isActive).toBe(false);
			popover.openMenu();
			expect(popover.state.isActive).toBe(true);
		});
	});

	describe('closeMenu', () => {
		it('should set the component state to inactive', () => {
			popover.openMenu();
			expect(popover.state.isActive).toBe(true);
			popover.closeMenu();
			expect(popover.state.isActive).toBe(false);
		});
	});

	describe('keyboard navigation', () => {
		it('should open the popover on Enter', () => {
			popover.onKeyDown({ key: 'Enter' });
			expect(popover.state.isActive).toBe(true);
		});

		it('should close the popover on ESC', () => {
			popover.openMenu();
			expect(popover.state.isActive).toBe(true);

			popover.onKeyDown({ key: 'Escape' });
			expect(popover.state.isActive).toBe(false);
		});
	});

	describe('Alignment Style', () => {
		describe('align right', () => {
			const popoverItem = (
				<Popover trigger={<Button>Open</Button>} align="right" menuItems={[]} />
			);

			popover = TestUtils.renderIntoDocument(popoverItem);
			menuEl = TestUtils.findRenderedDOMComponentWithClass(
				popover,
				'popover-container--menu'
			);
			expect(menuEl.classList).toContain('popover-container--horizontal-right');
		});

		describe('align left', () => {
			const popoverItem = (
				<Popover trigger={<Button>Open</Button>} align="left" menuItems={[]} />
			);

			popover = TestUtils.renderIntoDocument(popoverItem);
			menuEl = TestUtils.findRenderedDOMComponentWithClass(
				popover,
				'popover-container--menu'
			);
			expect(menuEl.classList).toContain('popover-container--horizontal-left');
		});
	});
	describe('Body', () => {
		it('is clickable in safari', () => {
			jest.clearAllMocks();
			const body = window.document.body;
			expect(body.getAttribute('class')).not.toEqual('clickable'); // include

			// iPhone Safari user agent
			const userAgent =
				'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3 like Mac OS X) AppleWebKit/603.1.23 (KHTML, like Gecko) Version/10.0 Mobile/14E5239e Safari/602.1';
			const original_ua = window.navigator.userAgent;
			Object.defineProperty(window.navigator, 'userAgent', {
				value: userAgent,
				configurable: true,
			});

			const popover = TestUtils.renderIntoDocument(popoverComponent);
			const closedMenuFn = jest.spyOn(popover, 'closeMenu');

			expect(popover.closeMenu).not.toHaveBeenCalled();

			// click on body
			expect(body.getAttribute('class')).toEqual('clickable');
			const clickEvent = new Event('click');
			body.dispatchEvent(clickEvent);

			expect(closedMenuFn).toHaveBeenCalled();

			Object.defineProperty(window.navigator, 'userAgent', {
				value: original_ua,
			});
		});
	});
});
