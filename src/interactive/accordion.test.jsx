import React from 'react';
import TestUtils from 'react-addons-test-utils';

import AccordionPanelGroup from './AccordionPanelGroup';
import AccordionPanel, { ACTIVEPANEL_CLASS, PANEL_CLASS } from './AccordionPanel';
import Icon from '../media/Icon';

describe('AccordionPanelGroup', function(){
	let accordionPanelGroup,
		accordionPanelGroupToggle;

	const accordionPanelsArr = [
		<AccordionPanel
			label='First Section'
			panelContent={
				<div className='runningText'>
					<p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.</p>
				</div>
			} />,
		<AccordionPanel
			label='Next Section'
			panelContent={
				<div>
					<div className='runningText'>
						<p>Any kind of content can go in here, even inputs.</p>
					</div>
					<div className='chunk'>
						<label htmlFor='test-textinput'>I'm a label</label>
						<input id='test-textinput' type='text' placeholder='Input placeholder' />
					</div>
				</div>
			} />,
		<AccordionPanel
			label='Third Section'
			panelContent={
				<div className='runningText'>
					<p>Classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.</p>
				</div>
			} />,
	];

	beforeEach(() => {
		accordionPanelGroup = TestUtils.renderIntoDocument(
			<AccordionPanelGroup accordionPanels={accordionPanelsArr}/>
		);
		accordionPanelGroupToggle = TestUtils.renderIntoDocument(
			<AccordionPanelGroup accordionPanels={accordionPanelsArr} multiSelectable={false} />
		);
	});

	afterEach(() => {
		accordionPanelGroup = null;
		accordionPanelGroupToggle = null;
	});

	it('should render panels from array', function() {
		const nodes = TestUtils.scryRenderedDOMComponentsWithClass(accordionPanelGroup, PANEL_CLASS);

		expect(nodes.length).toEqual(3);
	});

	it('should store clicked panel in state', function(){
		const firstPanel = TestUtils.scryRenderedComponentsWithType(accordionPanelGroupToggle, AccordionPanel)[0];

		accordionPanelGroupToggle.setClickedPanel(firstPanel);

		expect(accordionPanelGroupToggle.state.clickedPanel).toEqual(firstPanel);
	});

	it('should support opening panels one-at-a-time', function(){
		const buttons = TestUtils.scryRenderedDOMComponentsWithTag(accordionPanelGroupToggle, 'button');
		let openPanels = TestUtils.scryRenderedDOMComponentsWithClass(accordionPanelGroupToggle, ACTIVEPANEL_CLASS);

		expect(openPanels.length).toBe(0);

		TestUtils.Simulate.click(buttons[0]);
		openPanels = TestUtils.scryRenderedDOMComponentsWithClass(accordionPanelGroupToggle, ACTIVEPANEL_CLASS);
		expect(openPanels.length).toBe(1);

		TestUtils.Simulate.click(buttons[1]);
		openPanels = TestUtils.scryRenderedDOMComponentsWithClass(accordionPanelGroupToggle, ACTIVEPANEL_CLASS);
		expect(openPanels.length).toBe(1);
	});

});

describe('AccordionPanel', function() {
	let panel,
		openPanel,
		panelCustomIcon,
		panelLeftIcon;

	const customIcon = 'plus';
	const customIconActive = 'minus';

	beforeEach(() => {

		panel = TestUtils.renderIntoDocument(
			<AccordionPanel
				label='First Section'
				panelContent={
					<div className='runningText'>
						<p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.</p>
					</div>
				} />
		);

		openPanel = TestUtils.renderIntoDocument(
			<AccordionPanel
				isOpen
				label='First Section'
				panelContent={
					<div className='runningText'>
						<p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.</p>
					</div>
				} />
		);

		panelLeftIcon = TestUtils.renderIntoDocument(
			<AccordionPanel
				label='First Section'
				iconAlign='left'
				panelContent={
					<div className='runningText'>
						<p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.</p>
					</div>
				} />
		);

		panelCustomIcon = TestUtils.renderIntoDocument(
			<AccordionPanel
				label='First Section'
				iconAlign='left'
				iconShape={customIcon}
				iconShapeActive={customIconActive}
				panelContent={
					<div className='runningText'>
						<p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.</p>
					</div>
				} />
		);
	});
	afterEach(() => {
		panel = null;
		openPanel = null;
	});

	it(`has the class ${ACTIVEPANEL_CLASS} when state is open`, function() {
		const node = TestUtils.scryRenderedDOMComponentsWithClass(openPanel, ACTIVEPANEL_CLASS);
		expect(node.length).toBe(1);
	});

	it('changes state to be open onClick', function() {
		const node = TestUtils.findRenderedDOMComponentWithTag(panel, 'button');

		expect(panel.state.isOpen).toBe(false);
		TestUtils.Simulate.click(node);
		expect(panel.state.isOpen).toBe(true);
	});

	it('reverses Flex direction when icon is right-aligned', function(){
		const node = TestUtils.scryRenderedDOMComponentsWithClass(panelLeftIcon, 'atAll_flex--rowReverse');

		expect(node.length).toBe(1);
	});

	it('should render an icon component', function(){
		const node = TestUtils.scryRenderedComponentsWithType(panel, Icon);

		expect(node.length).toBe(1);
	});

	it('should render custom icons', function(){
		const node = TestUtils.findRenderedDOMComponentWithTag(panelCustomIcon, 'button');
		const iconNode = TestUtils.scryRenderedDOMComponentsWithClass(panelCustomIcon, `svg--${customIcon}`);

		expect(iconNode.length).toBe(1);

		TestUtils.Simulate.click(node);

		const activeIconNode = TestUtils.scryRenderedDOMComponentsWithClass(panelCustomIcon, `svg--${customIconActive}`);
		expect(activeIconNode.length).toBe(1);
	});

});