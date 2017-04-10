import React from 'react';
import { storiesOf } from '@kadira/storybook';
import { InfoWrapper } from './utils/storyComponents';
import Section from './Section';

const shadingStyles = {
	backgroundColor: 'rgba(220, 192, 255, 0.45)',
	backgroundClip: 'content-box',
	outline: '1px dotted red'
};

storiesOf('Section', module)
	.addWithInfo(
		'default',
		'This is the basic usage with the component.',
		() => (
			<InfoWrapper>
				<div style={{height: '100vh', width: '100%', marginBottom: '20px'}}>
					<div style={{maxWidth: '850px', margin: 'auto', marginTop:'15px'}}>
						<Section style={shadingStyles}>
							<h2 className='text--display2'>About us</h2>
								<div className='runningText'>
									<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
									<p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>
								</div>
							<ul className='inlineblockList'><li><a className='token token--link' href='/topics/91146/tech-talks'>Tech Talks</a></li><li><a className='token token--link' href='/topics/10209/web'>Web Technology</a></li><li><a className='token token--link' href='/topics/16216/mobile-technology'>Mobile Technology</a></li><li><a className='token token--link' href='/topics/3833/softwaredev'>Software Development</a></li><li><a className='token token--link' href='/topics/48471/computer-programming'>Computer programming</a></li><li><a className='token token--link' href='/topics/127567/ios-development'>iOS Development</a></li><li><a className='token token--link' href='/topics/20346/android-developers'>Android Development</a></li><li><a className='token token--link' href='/topics/1040/ruby'>Ruby</a></li><li><a className='token token--link' href='/topics/563/opensource'>Open Source</a></li><li><a className='token token--link' href='/topics/189/java'>Java</a></li></ul>
						</Section>

						<Section style={shadingStyles}>
							<h2 className='text--display2'>Organized by</h2>
							<ul className='inlineblockList inlineblockList--bulleted'>
								<li>Ana</li>
								<li>Maria</li>
								<li>Helen Ford</li>
								<li>K Rattan</li>
								<li>Jenn</li>
								<li>Michael Colby</li>
								<li>Sarah Hall</li>
								<li>Viki</li>
							</ul>
						</Section>
					</div>
				</div>
			</InfoWrapper>
		)
	)
	.add('Padded', () => (
		<div style={{width: '100%'}}>
			<div style={{maxWidth: '850px', margin: 'auto'}}>
				<Section padded style={shadingStyles}>
						<h2 className='text--display2'>These sections are padded on all sides</h2>
				</Section>
				<Section padded style={shadingStyles}>
						<p className='text--bold'>123 attending</p>
						<p>Hosted by Amy, Rick, Mike, Natalie</p>
				</Section>
				<Section padded style={shadingStyles}>
						<div className='runningText'>
							<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
						</div>
				</Section>
			</div>
		</div>
	));