import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';

import Chunk from '../layout/Chunk';
import Flex from '../layout/Flex';
import FlexItem from '../layout/FlexItem';
import Icon from '../media/Icon';
import ToggleSwitch from '../forms/ToggleSwitch';

export const PANEL_CLASS = 'accordionPanel';
export const ACTIVEPANEL_CLASS = 'accordionPanel--active';

/**
 * @module AccordionPanel
 */
class AccordionPanel extends React.Component {
	constructor(props){
		super(props);
		this._handleToggle = this._handleToggle.bind(this);
		this.onToggleClick = this.onToggleClick.bind(this);
	}

	/**
	 * @parm {Boolean} isOpen (is panel open)
	 * @returns {Number} panel height
	 */
	getHeight(isOpen) {
		if (!this.contentEl) {
			return '0px';
		}
		return `${isOpen * this.contentEl.getBoundingClientRect().height}px`;
	}

	/**
	 *
	 * @description calls the AccordionPanelGroups's callback to toggle open state
	 * and render the `AccordionPanel` open or closed, sets height in state
	 * @param {Event} e - the event object
	 * @returns {undefined}
	 */
	_handleToggle(e){
		e.preventDefault();

		const isToggledOpen = !this.props.isOpen;
		this.props.setClickedPanel && this.props.setClickedPanel(this.props.clickId, isToggledOpen);
		this.props.onClickCallback && this.props.onClickCallback(e, isToggledOpen);
	}

	onToggleClick(e){
		e.preventDefault();
		this.props.onToggleClick ? this.props.onToggleClick(e) : this._handleToggle(e);
	}

	/**
	 * @description forceUpdate allows us to calculate height again now that contentEl is set
	 * @returns {undefined}
	 */
	componentDidMount() {
		this.forceUpdate();
	}

	/**
	 * @returns {String} icon shape
	 */
	getIconShape() {
		const {
			indicatorIcon,
			indicatorIconActive
		} = this.props;

		return this.props.isOpen && indicatorIconActive ?
			indicatorIconActive :
			indicatorIcon;
	}

	render() {
		const {
			panelContent,
			clickId, 				// eslint-disable-line no-unused-vars
			label,
			isOpen,
			setClickedPanel, 		// eslint-disable-line no-unused-vars
			onClickCallback, 		// eslint-disable-line no-unused-vars
			indicatorAlign, 		// eslint-disable-line no-unused-vars
			indicatorIcon, 			// eslint-disable-line no-unused-vars
			indicatorIconActive,	// eslint-disable-line no-unused-vars
			indicatorIconSize,
			indicatorSwitch,
			classNamesActive,
			className,
			onToggleClick,			// eslint-disable-line no-unused-vars
			...other
		} = this.props;

		const classNames = {
			accordionPanel: cx(
				PANEL_CLASS,
				{
					[ACTIVEPANEL_CLASS]: isOpen,
					[classNamesActive]: isOpen && classNamesActive
				},
				className
			),
			trigger: cx(
				className,
				'accordionPanel-label display--block span--100 padding--bottom'
			),
			content: cx(
				'accordionPanel-animator',
				{
					'accordionPanel-animator--collapse': !isOpen
				}
			)
		};

		// create valid attribute name from trigger label
		const ariaId = label.replace(/\s+/g, '').toLowerCase();

		return(
			<Flex
				className={classNames.accordionPanel}
				rowReverse={indicatorAlign === 'left' && 'all'}
				{...other}
			>

				<FlexItem>
					<button
						role='tab'
						id={`label-${ariaId}`}
						aria-controls={`panel-${ariaId}`}
						aria-expanded={isOpen}
						aria-selected={isOpen}
						className={classNames.trigger}
						onClick={this.onToggleClick}
					>
						{label}
					</button>

					<Chunk
						role='tabpanel'
						aria-labelledby={`label-${ariaId}`}
						aria-hidden={!isOpen}
						className={classNames.content}
						style={{ height: this.getHeight(isOpen) }}
					>
						<div
							className='accordionPanel-content'
							ref={(div) => { this.contentEl = div; }}
						>
							{panelContent}
						</div>
					</Chunk>
				</FlexItem>

				<FlexItem
					className='accordionPanel-icon'
					onClick={this.onToggleClick}
					shrink
				>
					{
						!indicatorSwitch && indicatorIcon
							? <Icon shape={this.getIconShape()} size={indicatorIconSize} />
							:
							<ToggleSwitch
								isActive={isOpen}
								disabled={!!onToggleClick}
								id={`${ariaId}-switch`}
								name={ariaId}
								onClick={this.onToggleClick}
							/>
					}
				</FlexItem>

			</Flex>
		);
	}
}

AccordionPanel.defaultProps = {
	isOpen: false,
	indicatorAlign: 'right',
	indicatorIcon: 'chevron-down',
	indicatorIconSize: 'xs'
};

AccordionPanel.propTypes = {
	clickId: PropTypes.number,
	classNamesActive: PropTypes.string,
	isOpen: PropTypes.bool,
	panelContent: PropTypes.element,
	setClickedPanel: PropTypes.func,
	onClickCallback: PropTypes.func,
	label: PropTypes.string.isRequired,
	className: PropTypes.string,
	indicatorAlign: PropTypes.string,
	indicatorIcon: PropTypes.string,
	indicatorIconActive: PropTypes.string,
	indicatorIconSize: PropTypes.oneOf(['xs', 's', 'm', 'l', 'xl']),
	indicatorSwitch: PropTypes.bool
};

export default AccordionPanel;
